import * as sinon from "sinon";

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;
export type StubLib = {
    stub: sinon.SinonStubStatic
}

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubObjectWithStubLib<T extends object>(object: T, stubLib: StubLib, methods?: string[] | object): StubbedInstance<T> {
    const stubObject = Object.assign(<sinon.SinonStubbedInstance<T>>{}, object);
    const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    const excludedMethods: string[] = [
        '__defineGetter__', '__defineSetter__', 'hasOwnProperty',
        '__lookupGetter__', '__lookupSetter__', 'propertyIsEnumerable',
        'toString', 'valueOf', '__proto__', 'toLocaleString', 'isPrototypeOf'
    ];

    for (let method in object) {
        if (typeof object[method] == "function") {
            objectMethods.push(method);
        }
    }

    for (let method of objectMethods) {
        if (!excludedMethods.includes(method)) {
            stubObject[method] = object[method];
        }
    }

    if (Array.isArray(methods)) {
        for (let method of methods) {
            stubObject[method] = stubLib.stub();
        }
    } else if (typeof methods == "object") {
        for (let method in methods) {
            stubObject[method] = stubLib.stub();
            stubObject[method].returns(methods[method]);
        }
    } else {
        for (let method of objectMethods) {
            if (typeof object[method] == "function" && method !== "constructor") {
                stubObject[method] = stubLib.stub();
            }
        }
    }

    return stubObject;
}

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubObject<T extends object>(object: T, methods?: string[] | object): StubbedInstance<T> {
    return stubObjectWithStubLib(object, sinon, methods);
}

export function stubConstructorWithStubLib<T extends new (...args: any[]) => any>(
    constructor: T,
    stubLib: StubLib,
    ...constructorArgs: ConstructorParameters<T> | undefined[]
): StubbedInstance<InstanceType<T>> {
    return stubObjectWithStubLib(new constructor(...constructorArgs), stubLib);
}

export function stubConstructor<T extends new (...args: any[]) => any>(
    constructor: T,
    ...constructorArgs: ConstructorParameters<T> | undefined[]
): StubbedInstance<InstanceType<T>> {
    return stubConstructorWithStubLib(constructor, sinon, ...constructorArgs)
}

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubInterfaceWithStubLib<T extends object>(stubLib: StubLib, methods: object = {}): StubbedInstance<T> {
    const object = stubObjectWithStubLib<T>(<T>{}, stubLib, methods);

    const proxy = new Proxy(object, {
        get: (target, name) => {
            if (!target[name] && name !== 'then') {
                target[name] = stubLib.stub();
            }

            return target[name];
        }
    })

    return proxy;
}

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubInterface<T extends object>(methods: object = {}): StubbedInstance<T> {
    return stubInterfaceWithStubLib<T>(sinon, methods);
}

sinon['stubObject'] = stubObject;
sinon['stubInterface'] = stubInterface;

export default sinon;