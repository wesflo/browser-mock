import { resizeHandler, scrollHandler } from './windowEventHandler';

describe('resizeHandler', () => {
    const { addEventListener, removeEventListener } = window;

    describe('initialization', () => {
        const func1Mock = jest.fn();
        const func2Mock = jest.fn();
        const addEventListenerMock = jest.fn();
        const removeEventListenerMock = jest.fn();

        beforeAll(() => {
            (window as any).addEventListener = addEventListenerMock;
            (window as any).removeEventListener = removeEventListenerMock;
        });

        test('should return all needed functions', async () => {
            expect(resizeHandler.add).toEqual(expect.any(Function));
            expect(resizeHandler.remove).toEqual(expect.any(Function));
            expect(resizeHandler.callAll).toEqual(expect.any(Function));
            expect(scrollHandler.add).toEqual(expect.any(Function));
            expect(scrollHandler.remove).toEqual(expect.any(Function));
            expect(scrollHandler.callAll).toEqual(expect.any(Function));
        });

        test('should register all functions once and set resize event', async () => {
            expect(addEventListenerMock).toBeCalledTimes(0);
            resizeHandler.add(func1Mock);
            expect(addEventListenerMock).toBeCalledTimes(1);
            resizeHandler.add(func2Mock);
            resizeHandler.add(func2Mock);

            resizeHandler.callAll(null as any);

            expect(addEventListenerMock).toBeCalledTimes(1);
            expect(func1Mock).toBeCalledTimes(1);
            expect(func2Mock).toBeCalledTimes(1);
        });

        test('should unregister all functions and unset resize event', async () => {
            expect(removeEventListenerMock).toBeCalledTimes(0);
            resizeHandler.remove(func1Mock);
            expect(removeEventListenerMock).toBeCalledTimes(0);
            resizeHandler.remove(func2Mock);
            resizeHandler.remove(func2Mock);

            resizeHandler.callAll(null as any);

            expect(removeEventListenerMock).toBeCalledTimes(1);
        });
    });

    describe('.handler()', () => {
        const func1Mock = jest.fn();

        beforeAll(() => {
            (window as any).addEventListener = addEventListener;
            (window as any).removeEventListener = removeEventListener;
        });

        test('should resize after timeout', async () => {
            resizeHandler.add(func1Mock);
            // wait multiple times till timeout is reached
            await wait(200);
            (window as any).dispatchEvent(new Event('resize'));
            expect(func1Mock).toBeCalledTimes(0);
            await wait(200);
            (window as any).dispatchEvent(new Event('resize'));
            expect(func1Mock).toBeCalledTimes(0);
            await wait(200);
            (window as any).dispatchEvent(new Event('resize'));
            expect(func1Mock).toBeCalledTimes(0);
            await wait(400);
            expect(func1Mock).toBeCalledTimes(1);
        });
    });
});

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
