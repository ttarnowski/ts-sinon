import * as chai from "chai";
import * as sinonChai from "sinon-chai";
import * as sinon from "sinon";

import { stubInterface } from "./index";
import * as tsSinonLib from "./index";
import { ExtendedSandboxProxy } from "./ExtendedSandboxProxy"

chai.use(sinonChai);
const expect = chai.expect;

describe('ExtendedSandboxProxy', function () {
    let extendedSandboxProxy: ExtendedSandboxProxy
    let sandboxStub: sinon.SinonSandbox

    beforeEach(function () {
        sandboxStub = stubInterface<sinon.SinonSandbox>()

        extendedSandboxProxy = new ExtendedSandboxProxy(sandboxStub)
    })

    describe('.assert', function () {
        let dummyAssertion: sinon.SinonAssert

        beforeEach(function () {
            dummyAssertion = stubInterface<sinon.SinonAssert>()
        })

        it('sets the objects assert property', function () {
            extendedSandboxProxy.assert = dummyAssertion

            expect(sandboxStub.assert).to.equal(dummyAssertion)
        })

        it('gets the objects assert property', function () {
            sandboxStub.assert = dummyAssertion

            expect(extendedSandboxProxy.assert).to.equal(dummyAssertion)
        })
    })

    describe('.clock', function () {
        let dummyClock: sinon.SinonFakeTimers

        beforeEach(function () {
            dummyClock = stubInterface<sinon.SinonFakeTimers>()
        })

        it('sets the objects clock property', function () {
            extendedSandboxProxy.clock = dummyClock

            expect(sandboxStub.clock).to.equal(dummyClock)
        })

        it('gets the objects clock property', function () {
            sandboxStub.clock = dummyClock

            expect(extendedSandboxProxy.clock).to.equal(dummyClock)
        })
    })

    describe('.requests', function () {
        let dummyRequests: sinon.SinonFakeXMLHttpRequest[]

        beforeEach(function () {
            dummyRequests = [stubInterface<sinon.SinonFakeXMLHttpRequest>()]
        })

        it('sets the objects requests property', function () {
            extendedSandboxProxy.requests = dummyRequests

            expect(sandboxStub.requests).to.equal(dummyRequests)
        })

        it('gets the objects requests property', function () {
            sandboxStub.requests = dummyRequests

            expect(extendedSandboxProxy.requests).to.equal(dummyRequests)
        })
    })

    describe('.server', function () {
        let dummyServer: sinon.SinonFakeServer

        beforeEach(function () {
            dummyServer = stubInterface<sinon.SinonFakeServer>()
        })

        it('sets the objects requests property', function () {
            extendedSandboxProxy.server = dummyServer

            expect(sandboxStub.server).to.equal(dummyServer)
        })

        it('gets the objects requests property', function () {
            sandboxStub.server = dummyServer

            expect(extendedSandboxProxy.server).to.equal(dummyServer)
        })
    })

    describe('.spy', function () {
        let dummySpy: sinon.SinonSpyStatic

        beforeEach(function () {
            dummySpy = stubInterface<sinon.SinonSpyStatic>()
        })

        it('sets the objects spy property', function () {
            extendedSandboxProxy.spy = dummySpy

            expect(sandboxStub.spy).to.equal(dummySpy)
        })

        it('gets the objects spy property', function () {
            sandboxStub.spy = dummySpy

            expect(extendedSandboxProxy.spy).to.equal(dummySpy)
        })
    })

    describe('.stub', function () {
        let dummyStub: sinon.SinonStubStatic

        beforeEach(function () {
            dummyStub = stubInterface<sinon.SinonStubStatic>()
        })

        it('sets the objects stub property', function () {
            extendedSandboxProxy.stub = dummyStub

            expect(sandboxStub.stub).to.equal(dummyStub)
        })

        it('gets the objects stub property', function () {
            sandboxStub.stub = dummyStub

            expect(extendedSandboxProxy.stub).to.equal(dummyStub)
        })
    })

    describe('.mock', function () {
        let dummyMock: sinon.SinonMockStatic

        beforeEach(function () {
            dummyMock = stubInterface<sinon.SinonMockStatic>()
        })

        it('sets the objects mock property', function () {
            extendedSandboxProxy.mock = dummyMock

            expect(sandboxStub.mock).to.equal(dummyMock)
        })

        it('gets the objects mock property', function () {
            sandboxStub.mock = dummyMock

            expect(extendedSandboxProxy.mock).to.equal(dummyMock)
        })
    })

    describe('.useFakeTimers', function () {
        const dummyConfig = 1000
        it('calls the objects implementation', function () {
            extendedSandboxProxy.useFakeTimers(dummyConfig)

            expect(sandboxStub.useFakeTimers).to.be.calledWith(dummyConfig)
        })
    })

    describe('.useFakeXMLHttpRequest', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.useFakeXMLHttpRequest()

            expect(sandboxStub.useFakeXMLHttpRequest).to.be.called
        })
    })

    describe('.useFakeServer', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.useFakeServer()

            expect(sandboxStub.useFakeServer).to.be.called
        })
    })

    describe('.restore', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.restore()

            expect(sandboxStub.restore).to.be.called
        })
    })

    describe('.reset', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.reset()

            expect(sandboxStub.reset).to.be.called
        })
    })

    describe('.resetHistory', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.resetHistory()

            expect(sandboxStub.resetHistory).to.be.called
        })
    })

    describe('.resetBehavior', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.resetBehavior()

            expect(sandboxStub.resetBehavior).to.be.called
        })
    })

    describe('.usingPromise', function () {
        const dummyPromisLibrary = {}
        it('calls the objects implementation', function () {
            extendedSandboxProxy.usingPromise(dummyPromisLibrary)

            expect(sandboxStub.usingPromise).to.be.calledWith(dummyPromisLibrary)
        })
    })

    describe('.verify', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.verify()

            expect(sandboxStub.verify).to.be.called
        })
    })

    describe('.verifyAndRestore', function () {
        it('calls the objects implementation', function () {
            extendedSandboxProxy.verifyAndRestore()

            expect(sandboxStub.verifyAndRestore).to.be.called
        })
    })

    describe('.replace', function () {
        const dummyObject = {
            dummyAttribute: 'dummyAttribute'
        }
        const newDummyAttribute = 'newDummyAttribute'

        it('calls the objects implementation', function () {
            extendedSandboxProxy.replace(dummyObject, 'dummyAttribute', newDummyAttribute)

            expect(sandboxStub.replace).to.be.calledWith(dummyObject, 'dummyAttribute', newDummyAttribute)
        })
    })

    describe('.replaceGetter', function () {
        class DummyClass {
            public get dummyAttribute(): string {
                return 'dummyAttribute'
            }
        }
        const dummyClassObject = new DummyClass()
        const newDummyAttributeGetter = () => 'newDummyAttribute'

        it('calls the objects implementation', function () {
            extendedSandboxProxy.replaceGetter(dummyClassObject, 'dummyAttribute', newDummyAttributeGetter)

            expect(sandboxStub.replaceGetter).to.be.calledWith(dummyClassObject, 'dummyAttribute', newDummyAttributeGetter)
        })
    })

    describe('.replaceSetter', function () {
        class DummyClass {
            public set dummyAttribute(_dummyAttribute: string) { }
        }
        const dummyClassObject = new DummyClass()
        const newDummyAttributeSetter = () => { }

        it('calls the objects implementation', function () {
            extendedSandboxProxy.replaceSetter(dummyClassObject, 'dummyAttribute', newDummyAttributeSetter)

            expect(sandboxStub.replaceSetter).to.be.calledWith(dummyClassObject, 'dummyAttribute', newDummyAttributeSetter)
        })
    })

    describe('.createStubInstance', function () {
        class DummyClass {
            public dummyMethod(): any { }
        }
        const dummyOverrides = {
            dummyMethod: sinon.stub()
        }

        it('calls the objects implementation', function () {
            extendedSandboxProxy.createStubInstance(DummyClass, dummyOverrides)

            expect(sandboxStub.createStubInstance).to.be.calledWith(DummyClass, dummyOverrides)
        })
    })

    describe('.stubInterface', function () {
        let stubInterfaceWithStubLibStub: sinon.SinonStub
        interface DummyInterface {
            dummyMethod(): () => void
        }
        const dummyMethods = {
            dummyMethod: sinon.stub()
        }

        before(function () {
            stubInterfaceWithStubLibStub = sinon.stub(tsSinonLib, 'stubInterfaceWithStubLib')
        })

        after(function () {
            stubInterfaceWithStubLibStub.restore()
        })

        it('calls stubInterfaceWithStubLib with sandbox object', function () {
            extendedSandboxProxy.stubInterface<DummyInterface>(dummyMethods)

            expect(stubInterfaceWithStubLibStub).to.be.calledWith(sandboxStub, dummyMethods)
        })
    })

    describe('.stubObject', function () {
        let stubObjectWithStubLibStub: sinon.SinonStub
        class DummyClass {
            dummyMethod(): void { }
        }
        const dummyMethods = {
            dummyMethod: sinon.stub()
        }

        before(function () {
            stubObjectWithStubLibStub = sinon.stub(tsSinonLib, 'stubObjectWithStubLib')
        })

        after(function () {
            stubObjectWithStubLibStub.restore()
        })

        it('calls stubObjectWithStubLib with sandbox object', function () {
            const dummyObject = new DummyClass()
            extendedSandboxProxy.stubObject(dummyObject, dummyMethods)

            expect(stubObjectWithStubLibStub).to.be.calledWith(dummyObject, sandboxStub, dummyMethods)
        })
    })

    describe('.stubConstructor', function () {
        let stubConstructorWithStubLibStub: sinon.SinonStub
        class DummyClass {
            constructor(private argument) { }
            dummyMethod(): void { }
        }
        const dummyMethods = {
            dummyMethod: sinon.stub()
        }

        before(function () {
            stubConstructorWithStubLibStub = sinon.stub(tsSinonLib, 'stubConstructorWithStubLib')
        })

        after(function () {
            stubConstructorWithStubLibStub.restore()
        })

        it('calls stubObjectWithStubLib with sandbox object', function () {
            extendedSandboxProxy.stubConstructor(DummyClass, dummyMethods)

            expect(stubConstructorWithStubLibStub).to.be.calledWith(DummyClass, sandboxStub, dummyMethods)
        })
    })
})