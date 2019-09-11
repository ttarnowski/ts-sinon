# ts-sinon

Sinon extension providing functions to:
- stub all object methods 
- stub interface
- stub object constructor

## Prerequisites

1. You have a version of Node.js >= [v8.4.0](https://nodejs.org/en/download/)
2. You have installed [Typescript](https://www.typescriptlang.org/index.html#download-links)

## Installation

`npm install --save-dev ts-sinon`
or
`yarn add --dev ts-sinon`

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

Stub with predefined return values (deprecated - see the deprecation note):

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

Interface stub (stub all methods):

```javascript
interface Test {
    method(): string;
}

const testStub = stubInterface<Test>();

expect(testStub.method()).to.be.undefined;

testStub.method.returns('stubbed');

expect(testStub.method()).to.equal('stubbed');
```

Interface stub with predefined return values (deprecated - see the deprecation note):

```javascript
interface Test {
    method(): string;
}

const testStub = stubInterface<Test>({ method: 'stubbed' });

expect(testStub.method()).to.equal('stubbed');
```

## Object constructor stub example

Importing stubConstructor function:

- import single function:
```javascript
import { stubConstructor } from "ts-sinon";
```

- import as part of sinon singleton:
```javascript
import * as sinon from "ts-sinon";

const stubConstructor = sinon.stubConstructor;
```

Object constructor stub (stub all methods):

```javascript
class Test {
    method(): string {
        return 'value';
    }
}

const testStub = stubConstructor<Test>(Test);

expect(testStub.method()).to.be.undefined;

testStub.method.returns('stubbed');

expect(testStub.method()).to.equal('stubbed');
```

## Method map argument deprecation note

Due to a potential risk of overwriting return value type of stubbed method (that won't be caught by TypeScript compiler) I have decided to mark it as deprecated.
Please look at the following example of type overwriting using method map:

```javascript
interface ITest {
    method1(): void;
    method2(num: number): string;
}

const interfaceStub: ITest = stubInterface<ITest>({
    method2: 12345
});

// following expression will assign 12345 value of type number to v variable which is incorrect (it will compile without an error)
const v: string = interfaceStub.method2(1);

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