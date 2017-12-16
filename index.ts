import * as sinon from "sinon";

export function stubObject<T extends object>(object: T, methods?): T {
    if (Array.isArray(methods)) {
        for (let method of methods) {
            object[method] = sinon.stub();
        }
    } else if (typeof methods == "object") {
        for (let method in methods) {
            object[method] = sinon.stub();
            object[method].returns(methods[method]);
        }
    } else {
        for (let method in object) {
            if (typeof object[method] == "function") {
                object[method] = sinon.stub();
            }
        }
    }

    return object;
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