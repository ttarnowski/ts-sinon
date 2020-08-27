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
```typescript
import * as sinon from "ts-sinon";

const stubObject = sinon.stubObject;
```

Stub all object methods:

```typescript
class Test {
    method() { return "original" }
}

const test = new Test();
const testStub = stubObject<Test>(test);

testStub.method.returns("stubbed");

expect(testStub.method()).to.equal("stubbed");
```

Partial stub:

```typescript
class Test {
    public someProp: string = "test";
    methodA() { return "A: original" }
    methodB() { return "B: original" }
}

const test = new Test();
// second argument must be existing class method name, in this case only "methodA" or "methodB" are accepted.
const testStub = stubObject<Test>(test, ["methodA"]);

expect(testStub.methodA()).to.be.undefined;
expect(testStub.methodB()).to.equal("B: original");
```

Stub with predefined return values (type-safe):

```typescript
class Test {
    method() { return "original" }
}

const test = new Test();
const testStub = stubObject<Test>(test, { method: "stubbed" });

expect(testStub.method()).to.equal("stubbed");
```
## Interface stubs example

Importing stubInterface function:

- import single function:
```typescript
import { stubInterface } from "ts-sinon";
```

- import as part of sinon singleton:
```typescript
import * as sinon from "ts-sinon";

const stubInterface = sinon.stubInterface;
```

Interface stub (stub all methods):

```typescript
interface Test {
    method(): string;
}

const testStub = stubInterface<Test>();

expect(testStub.method()).to.be.undefined;

testStub.method.returns("stubbed");

expect(testStub.method()).to.equal("stubbed");
```

Interface stub with predefined return values (type-safe):

```typescript
interface Test {
    method(): string;
}

// method property has to be the same type as method() return type
const testStub = stubInterface<Test>({ method: "stubbed" });

expect(testStub.method()).to.equal("stubbed");
```

## Object constructor stub example

Importing stubConstructor function:

- import single function:
```typescript
import { stubConstructor } from "ts-sinon";
```

- import as part of sinon singleton:
```typescript
import * as sinon from "ts-sinon";

const stubConstructor = sinon.stubConstructor;
```

Object constructor stub (stub all methods):

- without passing predefined args to the constructor:
```typescript
class Test {
    public someVar: number = 10;

    method(): string {
        return "value";
    }
}

// type will be guessed automatically
const testStub = stubConstructor(Test);

expect(testStub.method()).to.be.undefined;

testStub.method.returns("stubbed");

expect(testStub.method()).to.equal("stubbed");

expect(testStub.someVar).to.equal(10);

testStub.someVar = 20;

expect(testStub.someVar).to.equal(20);
```

- with passing predefined args to the constructor:
```typescript
class Test {
    constructor(public someVar: string, y: boolean) {}

    // ...
}

// it won't allow to pass incorrect args
const testStub = stubConstructor(Test, "someValue", true);

expect(testStub.someVar).to.equal("someValue");
```

## Sinon methods

By importing 'ts-sinon' you have access to all sinon methods.

```typescript
import sinon, { stubInterface } from "ts-sinon";

const functionStub = sinon.stub();
const spy = sinon.spy();
// ...
```

or

```typescript
import * as tsSinon from "ts-sinon"

const functionStub = tsSinon.default.stub();
const spy = tsSinon.default.spy();
const tsStubInterface = tsSinon.stubInterface<T>();

// ...
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