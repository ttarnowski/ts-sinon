import * as sinon from "sinon";

export function stubObject<T extends object>(object: T, methods?): T {
    const stubObject = Object.assign(<T> {}, object);
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
            stubObject[method] = sinon.stub();
        }
    } else if (typeof methods == "object") {
        for (let method in methods) {
            stubObject[method] = sinon.stub();
            stubObject[method].returns(methods[method]);
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

export function stubInterface<T extends object>(methods: object = {}): T {
    const object: T = stubObject<T>(<T> {}, methods);
        
    const proxy = new Proxy(object, {
        get: (target, name) => {
            if (!target[name]) {
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