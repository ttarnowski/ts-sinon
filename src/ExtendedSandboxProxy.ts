import { StubbedInstance, stubInterfaceWithStubLib, stubObjectWithStubLib, stubConstructorWithStubLib } from "./index";

export class ExtendedSandboxProxy implements sinon.SinonSandbox {
    public constructor(private sandbox: sinon.SinonSandbox) { }

    public set assert(assert: sinon.SinonAssert) {
        this.sandbox.assert = assert;
    }

    public get assert(): sinon.SinonAssert {
        return this.sandbox.assert;
    }

    public set clock(clock: sinon.SinonFakeTimers) {
        this.sandbox.clock = clock;
    }

    public get clock(): sinon.SinonFakeTimers {
        return this.sandbox.clock;
    }

    public set requests(requests: sinon.SinonFakeXMLHttpRequest[]) {
        this.sandbox.requests = requests;
    }

    public get requests(): sinon.SinonFakeXMLHttpRequest[] {
        return this.sandbox.requests;
    }

    public set server(server: sinon.SinonFakeServer) {
        this.sandbox.server = server;
    }

    public get server(): sinon.SinonFakeServer {
        return this.sandbox.server;
    }

    public set spy(spy: sinon.SinonSpyStatic) {
        this.sandbox.spy = spy;
    }

    public get spy(): sinon.SinonSpyStatic {
        return this.sandbox.spy;
    }

    public set stub(stub: sinon.SinonStubStatic) {
        this.sandbox.stub = stub;
    }

    public get stub(): sinon.SinonStubStatic {
        return this.sandbox.stub;
    }

    public set mock(mock: sinon.SinonMockStatic) {
        this.sandbox.mock = mock;
    }

    public get mock(): sinon.SinonMockStatic {
        return this.sandbox.mock;
    }

    public useFakeTimers(config?: number | Date | Partial<sinon.SinonFakeTimersConfig>): sinon.SinonFakeTimers {
        return this.sandbox.useFakeTimers(config);
    }

    public useFakeXMLHttpRequest(): sinon.SinonFakeXMLHttpRequestStatic {
        return this.sandbox.useFakeXMLHttpRequest();
    }

    public useFakeServer(): sinon.SinonFakeServer {
        return this.sandbox.useFakeServer();
    }

    public restore(): void {
        this.sandbox.restore();
    }

    public reset(): void {
        this.sandbox.reset();
    }

    public resetHistory(): void {
        this.sandbox.resetHistory();
    }

    public resetBehavior(): void {
        this.sandbox.resetBehavior();
    }

    public usingPromise(promiseLibrary: any): sinon.SinonSandbox {
        return this.sandbox.usingPromise(promiseLibrary);
    }

    public verify(): void {
        this.sandbox.verify();
    }

    public verifyAndRestore(): void {
        this.sandbox.verifyAndRestore();
    }

    public replace<T, TKey extends keyof T>(obj: T, prop: TKey, replacement: T[TKey]): T[TKey] {
        return this.sandbox.replace(obj, prop, replacement);
    }

    public replaceGetter<T, TKey extends keyof T>(obj: T, prop: TKey, replacement: () => T[TKey]): () => T[TKey] {
        return this.sandbox.replaceGetter(obj, prop, replacement);
    }

    public replaceSetter<T, TKey extends keyof T>(obj: T, prop: TKey, replacement: (val: T[TKey]) => void): (val: T[TKey]) => void {
        return this.sandbox.replaceSetter(obj, prop, replacement);
    }

    public createStubInstance<TType>(constructor: sinon.StubbableType<TType>, overrides?: { [K in keyof TType]?: sinon.SinonStubbedMember<TType[K]> | (TType[K] extends (...args: any[]) => infer R ? R : TType[K]); }): sinon.SinonStubbedInstance<TType> {
        return this.sandbox.createStubInstance(constructor, overrides);
    }

    public stubInterface<T extends object>(methods: object = {}): StubbedInstance<T> {
        return stubInterfaceWithStubLib(this.sandbox, methods);
    }

    public stubObject<T extends object>(object: T, methods?: string[] | object): StubbedInstance<T> {
        return stubObjectWithStubLib(object, this.sandbox, methods);
    }

    public stubConstructor<T extends new (...args: any[]) => any>(
        constructor: T,
        ...constructorArgs: ConstructorParameters<T> | undefined[]
    ): StubbedInstance<InstanceType<T>> {
        return stubConstructorWithStubLib(constructor, this.sandbox, ...constructorArgs);
    }
}