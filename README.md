# ts-sinon

Sinon extension providing functions to:
- stub all object methods 
- stub interface

## Prerequisites

1. You have a version of Node.js >= [v8.4.0](https://nodejs.org/en/download/)
2. You have installed [Typescript](https://www.typescriptlang.org/index.html#download-links)

## Installation

`npm install ts-sinon`

## Object stubs example

Importing stubObject function:

- import single function:
```javascript
import { stubObject } from "ts-sinon";
```

- import as part of sinon singleton:
```javascript
import * as sinon from "ts-sinon";

const stubObject = sinon.stubObject;
```

Stub all object methods:

```javascript
class Test {
    method() { return 'original' }
}

const test = new Test();
const testStub = stubObject<Test>(test);

testStub.method.returns('stubbed');

expect(testStub.method()).to.equal('stubbed');
```

Partial stub:

```javascript
class Test {
    methodA() { return 'A: original' }
    methodB() { return 'B: original' }
}

const test = new Test();
const testStub = stubObject<Test>(test, ['methodA']);

expect(testStub.methodA()).to.be.undefined;
expect(testStub.methodB()).to.equal('B: original');
```

Stub with predefined return values:

```javascript
class Test {
    method() { return 'original' }
}

const test = new Test();
const testStub = stubObject<Test>(test, { method: 'stubbed' });

expect(testStub.method()).to.equal('stubbed');
```
## Interface stubs example

Importing stubInterface function:

- import single function:
```javascript
import { stubInterface } from "ts-sinon";
```

- import as part of sinon singleton:
```javascript
import * as sinon from "ts-sinon";

const stubInterface = sinon.stubInterface;
```

Interface stub with predefined return values (recommended):

```javascript
interface Test {
    method(): string;
}

const testStub = stubInterface<Test>({ method: 'stubbed' });

expect(testStub.method()).to.equal('stubbed');
```

Interface stub (not recommended due to interface stub method return types incompatibility - if the return value of stubInterface method is not cast to "any" type and returned type of interface method is not compatible with "object" we'll get a compiler error).

```javascript
interface Test {
    method(): string;
}

// if we have "Test" type instead of "any" code does not compile
const testStub: any = stubInterface<Test>();

expect(testStub.method()).to.be.undefined;

testStub.method.returns('stubbed');

expect(testStub.method()).to.equal('stubbed');
```

## Sinon methods

By importing 'ts-sinon' you have access to all sinon methods.

```javascript
import * as sinon from "ts-sinon";

const functionStub = sinon.stub();
const spy = sinon.spy();

// etc.
```

## Packages

##### Dependencies:
1. [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript)
2. [TypeStrong/ts-node](https://github.com/TypeStrong/ts-node)
3. [sinonjs/sinon](https://github.com/sinonjs/sinon)

##### Dev Dependencies:
4. [mochajs/mocha](https://github.com/mochajs/mocha)
5. [chaijs/chai](https://github.com/chaijs/chai)
6. [domenic/sinon-chai](https://github.com/domenic/sinon-chai)

## Tests

`npm test`