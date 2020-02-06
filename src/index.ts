import * as sinon from "sinon";

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubObject<T extends object>(object: T, methods?: string[] | object): StubbedInstance<T> {
    const stubObject = Object.assign(<sinon.SinonStubbedInstance<T>> {}, object);
    const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    const excludedMethods: string[] = [
        '__defineGetter__', '__defineSetter__', 'hasOwnProperty',
        '__lookupGetter__', '__lookupSetter__', 'propertyIsEnumerable',
        'toString', 'valueOf', '__proto__', 'toLocaleString', 'isPrototypeOf'
    ];

    for (const method in object) {
        if (typeof object[method] == "function") {
            objectMethods.push(method);
        }
    }    

    for (const method of objectMethods) {
        if (!excludedMethods.includes(method)) {
            stubObject[method] = object[method];
        }
    }

    if (Array.isArray(methods)) {
        for (const method of methods) {
            stubObject[method] = sinon.stub();
        }
    } else if (typeof methods == "object") {
        for (const method in methods) {
            stubObject[method] = sinon.stub();
            stubObject[method].returns(methods[method]);
        }
    } else {
        for (const method of objectMethods) {
            if (typeof object[method] == "function" && method !== "constructor") {
                stubObject[method] = sinon.stub();
            }
        }
    }

    return stubObject;
}

export function stubConstructor<T extends new (...args: any[]) => any>(
    constructor: T,
    ...constructorArgs: ConstructorParameters<T> | undefined[]
): StubbedInstance<InstanceType<T>> {
    return stubObject(new constructor(...constructorArgs));
}

/**
 * @param methods passing map of methods has become @deprecated as it may lead to overwriting stubbed method type
 */
export function stubInterface<T extends object>(methods: object = {}): StubbedInstance<T> {
    const object = stubObject<T>(<T> {}, methods);
        
    const proxy = new Proxy(object, {
        get: (target, name) => {
            if (!target[name] && name !== 'then') {
                target[name] = sinon.stub();
            }

            return target[name];
        }
    })

    return proxy;
}

sinon['stubObject'] = stubObject;
sinon['stubInterface'] = stubInterface;

export default sinon;
