# ts-sinon

[`sinon`](https://github.com/sinonjs/sinon) extension providing functions to:

- stub or replace object methods
- stub object constructors
- stub interfaces

in Typescript.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) `>= 8.4.0`
- [Typescript](https://www.typescriptlang.org/index.html#download-links)

## Installation

```sh
npm install --save-dev ts-sinon
# or
yarn add --dev ts-sinon
```

## Object method stubbing

### Importing

Importing the `stubObject` function:

- as a single function:

```javascript
import { stubObject } from 'ts-sinon';
```

- as part of the module:

```javascript
import * as tsSinon from 'ts-sinon';

const stubObject = tsSinon.stubObject;
```

### Examples

Stub all object methods:

```javascript
class MyClass {
    method() { return 'original' }
}

const instance = new MyClass();
const stub = stubObject(instance);

stub.method.returns('stubbed');

expect(stub.method()).to.equal('stubbed');
```

Stub only some methods:

```javascript
class MyClass {
    methodA() { return 'A: original' }
    methodB() { return 'B: original' }
}

const instance = new MyClass();
const stub = stubObject(instance, ['methodA']);

expect(stub.methodA()).to.be.undefined;
expect(stub.methodB()).to.equal('B: original');
```

## Object method replacement

`sinon` allows us to [replace object methods](https://sinonjs.org/releases/v8.1.1/stubs/#var-stub--sinonstubobject-method).

### Importing

Importing the `replaceObject` function:

- as a single function:

```javascript
import { replaceObject } from 'ts-sinon';
```

- as part of the module:

```javascript
import * as tsSinon from 'ts-sinon';

const replaceObject = tsSinon.replaceObject;
```

### Examples

Replace all object methods:

```javascript
class MyClass {
    method() { return 'original' }
}

const instance = new MyClass();
const stub = replaceObject(instance);

stub.method.returns('stubbed');

// note: calling the instance instead of the stub
expect(instance.method()).to.equal('stubbed');

stub.restore();

expect(instance.method()).to.equal('original');
```

Replace only some methods:

```javascript
class MyClass {
    methodA() { return 'A: original' }
    methodB() { return 'B: original' }
}

const instance = new MyClass();
const stub = replaceObject(instance, ['methodA']);

// note: calling the instance instead of the stub
expect(instance.methodA()).to.be.undefined;
expect(instance.methodB()).to.equal('B: original');

stub.restore();

expect(instance.methodA()).to.equal('A: original');
```

## Object constructor stubbing

### Importing

Importing the `stubConstructor` function:

- as a single function:

```javascript
import { stubConstructor } from 'ts-sinon';
```

- as part of the module:

```javascript
import * as tsSinon from 'ts-sinon';

const stubConstructor = tsSinon.stubConstructor;
```

### Examples

Stub all object methods:

- without passing predefined arguments to the constructor:

```javascript
class MyClass {
    public someVar: number = 42;

    method(): string {
        return 'original';
    }
}
const stub = stubConstructor(MyClass);
```
```javascript
// stub methods
expect(stub.method()).to.be.undefined;

stub.method.returns('stubbed');

expect(stub.method()).to.equal('stubbed');
```
```javascript
// stub other properties
expect(stub.someVar).to.equal(42);

stub.someVar = 24;

expect(stub.someVar).to.equal(24);
```

- by passing predefined arguments to the constructor:

```javascript
class MyClass {
    constructor(public foobar: string, xyzzy: boolean) {}
}

// only allows passing arguments of correct type
const stub = stubConstructor(MyClass, 'string', true);

expect(stub.foobar).to.equal('string');
expect(stub.xyzzy).to.equal(true);
```

## Interface stubbing

### Importing

Importing the `stubInterface` function:

- as a single function:

```javascript
import { stubInterface } from 'ts-sinon';
```

- as part of the module:

```javascript
import * as tsSinon from 'ts-sinon';

const stubInterface = tsSinon.stubInterface;
```

### Examples

Stub all interface methods:

```javascript
interface MyInterface {
    method(): string;
}

const stub = stubInterface<MyInterface>();

expect(stub.method()).to.be.undefined;

stub.method.returns('stubbed');

expect(stub.method()).to.equal('stubbed');
```

## Accessing Sinon functions

By importing `ts-sinon` you have access to all `sinon` functions.

```javascript
import sinon, { stubInterface } from 'ts-sinon';

const stub = sinon.stub();
const spy = sinon.spy();
// ...
```

or

```javascript
import * as tsSinon from 'ts-sinon'

const stub = tsSinon.default.stub();
const spy = tsSinon.default.spy();
// ...

const interfaceStub = tsSinon.stubInterface<T>();
// ...
```

## Testing

```
npm test
```

## References

##### Dependencies:
- [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript)
- [TypeStrong/ts-node](https://github.com/TypeStrong/ts-node)
- [sinonjs/sinon](https://github.com/sinonjs/sinon)

##### Development dependencies:
- [mochajs/mocha](https://github.com/mochajs/mocha)
- [chaijs/chai](https://github.com/chaijs/chai)
- [domenic/sinon-chai](https://github.com/domenic/sinon-chai)