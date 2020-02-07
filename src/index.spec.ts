import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { stubConstructor, stubInterface, stubObject } from './index';

const expect = chai.expect;
chai.use(sinonChai);

describe('ts-sinon', () => {
    describe(stubObject.name, () => {
        describe('when methods list is not given', () => {
            it('stubs all methods of an ES6 class', () => {
                class MyClass {
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
                    }
                }

                const object = new MyClass();
                const stub = stubObject(object);
    
                expect(stub.number()).to.be.undefined;
                expect(stub.string()).to.be.undefined;
    
                expect(stub.string).to.have.been.called;
                expect(stub.number).to.have.been.called;
            });

            it(`allows to change ES6 class instance stub values`, () => {
                class MyClass {
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
                    }
                }

                const object = new MyClass();
                const stub = stubObject(object);

                stub.number.returns(24);
                stub.string.returns('bye');

                expect(stub.number()).to.equal(24);
                expect(stub.string()).to.equal('bye');
            });
    
            it('stubs all methods of an object literal', () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                };
    
                const stub = stubObject(object);
    
                expect(stub.number()).to.be.undefined;
                expect(stub.string()).to.be.undefined;
    
                expect(stub.number).to.have.been.called;
                expect(stub.string).to.have.been.called;
            });

            it(`allows to change am object literal stub values`, () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                }

                const stub = stubObject(object);

                stub.number.returns(24);
                stub.string.returns('bye');

                expect(stub.number()).to.equal(24);
                expect(stub.string()).to.equal('bye');
            });
        });

        describe('when methods list is given', () => {
            it('stubs given methods of an ES6 class', () => {
                class MyClass {
                    private s: string;
                    constructor() {
                        this.s = 'hi';
                    }
                    number() {
                        return 42;
                    }
                    string() {
                        return this.s;
                    }
                }
                
                const object = new MyClass();
                const stub = stubObject(object, ['number']);
    
                expect(stub.number()).to.be.undefined;
                expect(stub.string()).to.equal('hi');

                stub.number.returns(24);

                expect(stub.number()).to.equal(24);
                expect(stub.number).to.have.been.called;
            });
    
            it('stubs given methods of an object literal', () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                }
                
                const stub = stubObject(object, ['number']);
    
                expect(stub.number()).to.be.undefined;
                expect(stub.string()).to.equal('hi');
    
                stub.number.returns(24);
                
                expect(stub.number()).to.equal(24);
                expect(stub.number).to.have.been.called;
            });
        });
    });

    describe(stubConstructor.name, () => {
        it('stubs all methods using an ES6 class constructor', () => {
            class MyClass {
                public greeting: string = 'hi';
                constructor(private secret: string, public number: number) {}
                add(a: number): number {
                    return this.number + a;
                }
                string(): string {
                    return this.secret;
                }
            }

            const stub = stubConstructor(MyClass, 'some string', 0);
            
            expect(stub.greeting).to.equal('hi');
            expect(stub.number).to.equal(0);
            
            expect(stub.string()).to.be.undefined;

            stub.string.returns('bye');

            expect(stub.string()).to.equal('bye');
            expect(stub.string).to.have.been.called;

            expect(stub.add(0)).to.be.undefined;
            
            stub.add.returns(42);

            expect(stub.add(1)).to.equal(42);
            expect(stub.add).to.have.been.calledWith(1);
        });
    });

    describe(stubInterface.name, () => {
        interface SomeInterface {
            numberToString(n: number): string;
            doSomething(): void;
        }

        it('stubs all methods of an object constructed from the interface', () => {
            const stub = stubInterface<SomeInterface>();

            expect(stub.numberToString(0)).to.be.undefined;

            stub.numberToString.returns('0');

            const numberToStringValue = stub.numberToString(0);

            expect(stub.numberToString).to.have.been.calledWith(0);
            expect(numberToStringValue).to.equal('0');

            stub.doSomething();

            expect(stub.doSomething).to.have.been.called;
        });

        it(`stubs a method which returns a resolved Promise with another interface's stub`, async () => {
            interface MyInterface {
                method(): Promise<SomeInterface>;
            }

            const myStub = stubInterface<MyInterface>();
            const someStub = stubInterface<SomeInterface>();

            myStub.method.returns(Promise.resolve(someStub));

            expect(await myStub.method()).to.equal(someStub);
        });

        it(`stubs a method which returns a rejected Promise with another interface's stub`, async () => {
            interface MyInterface {
                method(): Promise<SomeInterface>;
            }

            const myStub = stubInterface<MyInterface>();
            const someStub = stubInterface<SomeInterface>();

            myStub.method.returns(Promise.reject(someStub));

            try {
                await myStub.method();
            } catch (e) {
                expect(e).to.equal(someStub);
            }
        });
    });
});
