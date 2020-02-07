import * as sinon from 'sinon';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods_2
const excludedProperties: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf({}))
    .filter(p => p !== 'constructor');

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
        if (!excludedProperties.includes(method)) {
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

export type ReplacedInstance<T> = StubbedInstance<T> & { restore(): void }

export function replaceObject<T extends object, K extends keyof T>(object: T, onlyTheseMethods?: K[]): ReplacedInstance<T> {
    const stubbedObject = Object.assign(<sinon.SinonStubbedInstance<T>> {}, object);
    const objectPrototypeMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
        .filter(attr => typeof object[attr] === 'function');
    const objectMethods = Object.keys(object)
        .filter(attr => typeof object[attr] === 'function');
    const allMethods = objectPrototypeMethods.concat(objectMethods)
        .filter(attr => !excludedProperties.includes(attr));
    const stubbedMethods = [];

    for (const method of allMethods) {
        stubbedObject[method] = object[method];
    }
        
    if (onlyTheseMethods && onlyTheseMethods.length > 0) {
        for (const method of onlyTheseMethods) {
            stubbedObject[<string>method] = sinon.stub(object, method);
            stubbedMethods.push(<string>method);
        }
    } else {
        for (const method of allMethods) {
            stubbedObject[method] = sinon.stub(object, <K>method);
            stubbedMethods.push(method);
        }
    }
    
    return {
        ...stubbedObject,
        restore: function() {
            for (const method of stubbedMethods) {
                stubbedObject[method].restore();
            }
        }
    }
}

export function stubConstructor<T extends new (...args: any[]) => any>(
    constructor: T, ...constructorArgs: ConstructorParameters<T>
): StubbedInstance<InstanceType<T>> {
    return stubObject(new constructor(...constructorArgs));
}

export function stubInterface<T extends object>(): StubbedInstance<T> {
    const object = stubObject(<T> {});
    
    return new Proxy(object, {
        get: (target, property) => {
            if (!target[property] && property !== 'then') {
                target[property] = sinon.stub();
            }

            return target[property];
        }
    });
}

sinon['stubObject'] = stubObject;
sinon['replaceObject'] = replaceObject;
sinon['stubConstructor'] = stubConstructor;
sinon['stubInterface'] = stubInterface;

export default sinon;
