import * as sinon from "sinon";

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;

export type AllowedKeys<T, Condition> = {
    [Key in keyof T]:
    T[Key] extends Condition ? Key : never
}[keyof T];

export type ObjectMethodsKeys<T> = AllowedKeys<T, (...args: any[]) => any>[];

export type ObjectMethodsMap<T> = {
  [Key in keyof T]?: T[Key] extends (...args: any[]) => any ? ReturnType<T[Key]> : never;
};

export function stubObject<T extends object>(object: T, methods?: ObjectMethodsKeys<T> | ObjectMethodsMap<T>): StubbedInstance<T> {
    const stubObject = Object.assign(<sinon.SinonStubbedInstance<T>> {}, object);
    const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    const excludedMethods: string[] = [
        '__defineGetter__', '__defineSetter__', 'hasOwnProperty',
        '__lookupGetter__', '__lookupSetter__', 'propertyIsEnumerable',
        'toString', 'valueOf', '__proto__', 'toLocaleString', 'isPrototypeOf'
    ];

    for (let method in object) {
        if (object.hasOwnProperty(method) && typeof object[method] == "function") {
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
            stubObject[<string>method] = sinon.stub();
        }
    } else if (typeof methods == "object") {
        for (let method in methods) {
            if (methods.hasOwnProperty(method)) {
                stubObject[<string>method] = sinon.stub();
                stubObject[<string>method].returns(methods[method]);
            }
        }
    } else {
        for (let method of objectMethods) {
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

export function stubInterface<T extends object>(methods: ObjectMethodsMap<T> = {}): StubbedInstance<T> {
    const object = stubObject<T>(<T> {}, methods);
        
    return new Proxy(object, {
        get: (target, name) => {
            if (!target.hasOwnProperty(name) && name !== 'then') {
                target[name] = sinon.stub();
            }

            return target[name];
        }
    })
}

sinon['stubObject'] = stubObject;
sinon['stubInterface'] = stubInterface;

export default sinon;