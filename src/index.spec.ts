import * as chai from "chai";
import * as sinonChai from "sinon-chai";

import { stubObject, stubInterface, stubConstructor } from "./index";
import * as s from "./index"

chai.use(sinonChai);
const expect = chai.expect;

describe('ts-sinon', () => {
    describe('stubObject', () => {
        describe('when no methods or method map given', () => {
            it('returns stub es6 object with all methods stubbed', () => {
                class A {
                    test() {
                        return 123;
                    }
    
                    run() {
                        return 'run';
                    }
                }

                const object = new A();
    
                const objectStub = stubObject<A>(object);
    
                expect(object.test()).to.equal(123);
                expect(object.run()).to.equal('run');
    
                expect(objectStub.test()).to.be.undefined;
                expect(objectStub.run()).to.be.undefined;
    
                expect(objectStub.run).to.have.been.called;
                expect(objectStub.test).to.have.been.called;
            });
    
            it('returns stub literal object with all methods stubbed', () => {
                const object = {
                    test: () => {
                        return 123;
                    },
                    run: () => {
                        return 'run';
                    }
                };
    
                const objectStub = stubObject(object);
    
                expect(object.test()).to.equal(123);
                expect(object.run()).to.equal('run');
    
                expect(objectStub.test()).to.be.undefined;
                expect(objectStub.run()).to.be.undefined;
    
                expect(objectStub.run).to.have.been.called;
                expect(objectStub.test).to.have.been.called;
            });

            it('allows to change stub values', () => {
                const object1 = new class {
                    methodA() {
                        return 'A';
                    }

                    methodB() {
                        return 'B';
                    }
                }

                const object2 = {
                    methodC: () => {
                        return 'C';
                    },
                    methodD: () => {
                        return 'D';
                    }
                }

                const object1Stub = stubObject(object1);
                const object2Stub = stubObject(object2);

                object1Stub.methodA.returns('new A');
                object1Stub.methodB.returns('new B');

                expect(object1Stub.methodA()).to.equal('new A');
                expect(object1Stub.methodB()).to.equal('new B');

                object2Stub.methodC.returns('1');
                object2Stub.methodD.returns('2');

                expect(object2Stub.methodC()).to.equal('1');
                expect(object2Stub.methodD()).to.equal('2');
            });
        });

        
        it('returns partial stub object with only "test" method stubbed when array with "test" has been given', () => {
            const object = new class {
                private r: string;
                constructor() {
                    this.r = 'run';
                }

                test() {
                    return 123;
                }

                run() {
                    return this.r;
                }
            }

            const objectStub = stubObject(object, ['test']);

            expect(objectStub.test()).to.be.undefined;
            expect(objectStub.run()).to.equal('run');

            expect(objectStub.test).to.have.been.called;
        });

        it('returns partial stub object with "run" method stubbed and returning "some val" value when key value map { run: "some val" } has been given', () => {
            const object = new class {
                test() {
                    return 123;
                }

                run() {
                    return "run";
                }
            }
            
            const objectStub = stubObject(object, { "run": "some val" });

            expect(objectStub.run()).to.equal("some val");
            expect(objectStub.test()).to.equal(123);

            objectStub.run.returns('new run');
            expect(objectStub.run()).to.equal('new run');

            expect(objectStub.run).to.have.been.called;
        });
    });
    describe('stubInterface', () => {
        interface ITest {
            prop1: string;
            method1(): void;
            method2(num: number): string;
        }

        it("sets an \"x\" value on \"prop1\" property", () => {
           const stub = stubInterface<ITest>();

           stub.prop1 = "x";

           expect(stub.prop1).to.equal("x");
        });

        it('returns stub object created from interface with all methods stubbed with "method2" predefined to return value of "abc" and "method1" which is testable with expect that has been called', () => {
            const expectedMethod2Arg: number = 2;
            const expectedMethod2ReturnValue = 'abc';

            const interfaceStub: ITest = stubInterface<ITest>({
                method2: expectedMethod2ReturnValue,
            });

            const object = new class {
                test: ITest;
                constructor(test: ITest) {
                    this.test = test;
                    this.test.method1();
                }
                run(num: number): string {
                    return this.test.method2(num);
                }
            }(interfaceStub);

            expect(object.run(expectedMethod2Arg)).to.equal(expectedMethod2ReturnValue);
            expect(interfaceStub.method1).to.have.been.called;
            expect(interfaceStub.method2).to.have.been.calledWith(expectedMethod2Arg);
        });

        it('returns stub object created from interface with all methods stubbed including "method2" predefined to return "x" when method map to value { method: x } has been given', () => {
            const interfaceStub: ITest = stubInterface<ITest>({
                method2: 'test'
            });

            const object = new class {
                test: ITest;
                constructor(test: ITest) {
                    this.test = test;
                    this.test.method1();
                }
                run(num: number): string {
                    return this.test.method2(num);
                }
            }(interfaceStub);

            expect(object.run(123)).to.equal('test');
        });

        it('gives an access to method stubs of the stub object created from interface', () => {
            const expectedMethod2Arg = 2;
            const expectedMethod2Value = 'string';

            const interfaceStub = stubInterface<ITest>();

            expect(interfaceStub.method2(1)).to.be.undefined;
            interfaceStub.method2.returns(expectedMethod2Value);

            const actualMethod2Value = interfaceStub.method2(expectedMethod2Arg);
            interfaceStub.method1();

            expect(interfaceStub.method2).to.have.been.calledWith(expectedMethod2Arg);
            expect(actualMethod2Value).to.equal(expectedMethod2Value);
            expect(interfaceStub.method1).to.have.been.called;
        });

        it('stubs method to return resolved Promise with another interface stub', async () => {
            interface Test {
                methodA(): Promise<ITest>;
            }

            const interfaceTestStub = stubInterface<Test>();
            const interfaceITestStub = stubInterface<ITest>();

            interfaceTestStub.methodA.returns(Promise.resolve(interfaceITestStub));

            expect(await interfaceTestStub.methodA()).to.equal(interfaceITestStub);
        });

        it('stubs method to return rejected Promise with another interface stub', async () => {
            interface Test {
                methodA(): Promise<ITest>;
            }

            const interfaceTestStub = stubInterface<Test>();
            const interfaceITestStub = stubInterface<ITest>();

            interfaceTestStub.methodA.returns(Promise.reject(interfaceITestStub));

            try {
                await interfaceTestStub.methodA();
            } catch (e) {
                expect(e).to.equal(interfaceITestStub);
            }
        });
    });         
    
    describe('stubConstructor', () => {
        it('stubs all object constructor methods', () => {
            class A {
                private pp = 5;
                public ps: string = "x";

                constructor(private pt: string, public px: number, y: boolean) {}
                
                method1(): string {
                    return 'value1';
                }
                method2(x: number): number {
                    return 13;
                }
            }
            const expectedNewMethod1Value = 'new value';
            const expectedNewMethod2Value = 43;
            const expectedMethod2Argument = 111;
            const expectedPxPassedToConstructor = 4;

            const stub = stubConstructor(A, "a", expectedPxPassedToConstructor, true);
            
            expect(stub.ps).to.equal("x");
            expect(stub.px).to.equal(expectedPxPassedToConstructor);
            expect(stub.method1()).to.be.undefined;
            expect(stub.method2(expectedMethod2Argument)).to.be.undefined;

            stub.method1.returns(expectedNewMethod1Value);
            stub.method2.returns(expectedNewMethod2Value);
            expect(stub.method2).to.have.been.calledWith(expectedMethod2Argument);

            expect(stub.method1()).to.equal(expectedNewMethod1Value);
            expect(stub.method2(222)).to.equal(expectedNewMethod2Value);
            expect(stub.method2).to.have.been.calledWith(222);
        });

        it('stubs all object methods with inheritance', () => {
          
          class B {
              methodB(): string {
                  return 'B';
              }
          }
          class A extends B{             
              method1(): string {
                  return 'value1';
              }
              method2(x: number): number {
                  return 13;
              }
          }
          const expectedNewMethod1Value = 'new value';
          const expectedNewMethod2Value = 43;
          const expectedMethodBValue = 'new B value';
          const expectedMethod2Argument = 111;


          const stub = stubConstructor(A);
          
          expect(stub.method1()).to.be.undefined;
          expect(stub.method2(expectedMethod2Argument)).to.be.undefined;
          expect(stub.methodB()).to.be.undefined;

          stub.method1.returns(expectedNewMethod1Value);
          stub.method2.returns(expectedNewMethod2Value);
          stub.methodB.returns(expectedMethodBValue);
          expect(stub.method2).to.have.been.calledWith(expectedMethod2Argument);

          expect(stub.method1()).to.equal(expectedNewMethod1Value);
          expect(stub.method2(222)).to.equal(expectedNewMethod2Value);
          expect(stub.methodB()).to.equal(expectedMethodBValue);
          expect(stub.method2).to.have.been.calledWith(222);
      });
    });
});