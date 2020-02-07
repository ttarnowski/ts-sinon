import * as sinon from 'sinon';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods_2
const excludedMethods: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf({}))
    .filter(p => !['constructor', 'toSource'].includes(p));

export type StubbedInstance<T> = sinon.SinonStubbedInstance<T> & T;

export function stubObject<T extends object, K extends keyof T>(object: T, onlyTheseMethods?: K[]): StubbedInstance<T> {
    const stubbedObject = Object.assign(<sinon.SinonStubbedInstance<T>> {}, object);
    const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(object));

    for (const method in object) {
        if (typeof object[method] === 'function') {
            objectMethods.push(method);
        }
    }

    for (const method of objectMethods) {
        if (!excludedMethods.includes(method)) {
            stubbedObject[method] = object[method];
        }
    }

    if (onlyTheseMethods && onlyTheseMethods.length > 0) {
        for (const method of onlyTheseMethods) {
            stubbedObject[<string>method] = sinon.stub();
        }
    } else {
        for (const method of objectMethods) {
            if (typeof object[method] === 'function' && method !== 'constructor') {
                stubbedObject[method] = sinon.stub();
            }
        }
    }
    
    return stubbedObject;
}

export function stubConstructor<T extends new (...args: any[]) => any>(
    constructor: T, ...constructorArgs: ConstructorParameters<T>
): StubbedInstance<InstanceType<T>> {
    return stubObject(new constructor(...constructorArgs));
}

export function stubInterface<T extends object>(): StubbedInstance<T> {
    const object = stubObject(<T> {});
        
    const proxy = new Proxy(object, {
        get: (target, property) => {
            if (!target[property] && property !== 'then') {
                target[property] = sinon.stub();
            }

            return target[property];
        }
    })

    return proxy;
}

sinon['stubObject'] = stubObject;
sinon['stubConstructor'] = stubConstructor;
sinon['stubInterface'] = stubInterface;

export default sinon;
