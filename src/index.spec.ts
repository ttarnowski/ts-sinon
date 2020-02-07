import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { stubConstructor, stubInterface, stubObject, replaceObject } from './index';

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

            it(`allows to change an object literal stub values`, () => {
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
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
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

    describe(replaceObject.name, () => {
        it('returned stub has restore property', () => {
            const object = {};
            const stub = replaceObject(object);
            expect(typeof stub.restore).to.be.equal('function');
        });

        describe('when methods list is not given', () => {
            it('replaces all methods of an ES6 class', () => {
                class MyClass {
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
                    }
                }

                const object = new MyClass();
                const stub = replaceObject(object);

                expect(object.number()).to.be.undefined;
                expect(object.string()).to.be.undefined;

                stub.restore();

                expect(object.number()).to.be.equal(42);
                expect(object.string()).to.be.equal('hi');

                expect(stub.string).to.have.been.calledOnce;
                expect(stub.number).to.have.been.calledOnce;
            });

            it('allows to change ES6 class instance values', () => {
                class MyClass {
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
                    }
                }

                const object = new MyClass();
                const stub = replaceObject(object);

                stub.number.returns(24);
                stub.string.returns('bye');

                expect(object.number()).to.equal(24);
                expect(object.string()).to.equal('bye');

                stub.restore();

                expect(object.number()).to.be.equal(42);
                expect(object.string()).to.be.equal('hi');

                expect(stub.string).to.have.been.calledOnce;
                expect(stub.number).to.have.been.calledOnce;
            });

            it('replaces all methods of an object literal', () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                };

                const stub = replaceObject(object);

                expect(object.number()).to.be.undefined;
                expect(object.string()).to.be.undefined;

                stub.restore();

                expect(object.number()).to.be.equal(42);
                expect(object.string()).to.be.equal('hi');

                expect(stub.number).to.have.been.calledOnce;
                expect(stub.string).to.have.been.calledOnce;
            });

            it(`allows to change an object literal stub values`, () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                }

                const stub = replaceObject(object);

                stub.number.returns(24);
                stub.string.returns('bye');

                expect(object.number()).to.equal(24);
                expect(object.string()).to.equal('bye');

                stub.restore();

                expect(object.number()).to.be.equal(42);
                expect(object.string()).to.be.equal('hi');

                expect(stub.number).to.have.been.calledOnce;
                expect(stub.string).to.have.been.calledOnce;
            });
        });

        describe('when methods list is given', () => {
            it('replaces given methods of an ES6 class', () => {
                class MyClass {
                    number() {
                        return 42;
                    }
                    string() {
                        return 'hi';
                    }
                }
                
                const object = new MyClass();
                const stub = replaceObject(object, ['number']);
    
                expect(object.number()).to.be.undefined;
                expect(object.string()).to.equal('hi');

                stub.number.returns(24);

                expect(object.number()).to.equal(24);
                expect(object.string()).to.equal('hi');

                expect(stub.number).to.have.been.calledTwice;
            });
    
            it('replaces given methods of an object literal', () => {
                const object = {
                    number: () => {
                        return 42;
                    },
                    string: () => {
                        return 'hi';
                    }
                }
                
                const stub = replaceObject(object, ['number']);
    
                expect(object.number()).to.be.undefined;
                expect(object.string()).to.equal('hi');

                stub.number.returns(24);

                expect(object.number()).to.equal(24);
                expect(object.string()).to.equal('hi');

                expect(stub.number).to.have.been.calledTwice;
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

    describe('examples in readme', () => {
        describe('object method stubbing', () => {
            it('stub all object methods', () => {
                class MyClass {
                    method() { return 'original' }
                }
                
                const instance = new MyClass();
                const stub = stubObject(instance);
                
                stub.method.returns('stubbed');
                
                expect(stub.method()).to.equal('stubbed');
            });

            it('stub only some methods', () => {
                class MyClass {
                    methodA() { return 'A: original' }
                    methodB() { return 'B: original' }
                }
                
                const instance = new MyClass();
                const stub = stubObject(instance, ['methodA']);
                
                expect(stub.methodA()).to.be.undefined;
                expect(stub.methodB()).to.equal('B: original');
            });
        });

        describe('object method replacement', () => {
            it('replace all object methods', () => {
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
            });
            
            it('replace only some methods', () => {
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
            });
        });

        describe('object constructor stubbing', () => {
            describe('stub all object methods', () => {
                it('without passing predefined arguments to the constructor', () => {
                    class MyClass {
                        public someVar: number = 42;
                    
                        method(): string {
                            return 'original';
                        }
                    }

                    const stub = stubConstructor(MyClass);

                    // stub methods
                    expect(stub.method()).to.be.undefined;

                    stub.method.returns('stubbed');

                    expect(stub.method()).to.equal('stubbed');

                    // stub other properties
                    expect(stub.someVar).to.equal(42);

                    stub.someVar = 24;

                    expect(stub.someVar).to.equal(24);
                });
            
                it('by passing predefined arguments to the constructor', () => {
                    class MyClass {
                        constructor(public foobar: string, public xyzzy: boolean) {}
                    }
                    
                    // only allows passing arguments of correct type
                    const stub = stubConstructor(MyClass, 'string', true);
                    
                    expect(stub.foobar).to.equal('string');
                    expect(stub.xyzzy).to.equal(true);
                });
            });
        });

        describe('interface stubbing', () => {
            it('stub all interface methods', () => {
                interface MyInterface {
                    method(): string;
                }
                
                const stub = stubInterface<MyInterface>();
                
                expect(stub.method()).to.be.undefined;
                
                stub.method.returns('stubbed');
                
                expect(stub.method()).to.equal('stubbed');
            });
        });
    });
});
