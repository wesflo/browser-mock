type ICallback = (...args: any[]) => void;
type TEventName = 'resize' | 'scroll';

export const windowEventHandler = (eventName: TEventName, timeoutMs: number) => {
    const callBacks: ICallback[] = [];
    const eventTarget: Window | Document = ['scroll'].includes(eventName) ? document : window;
    let to: number;
    let added = false;

    const add = (func: ICallback) => {
        if (callBacks.indexOf(func) === -1) {
            callBacks.push(func);
        }
        !added && addEvent();
        added = true;
    };
    const remove = (func: ICallback) => {
        callBacks.splice(callBacks.indexOf(func), 1);
        if (added && !callBacks.length) {
            removeEvent();
            added = false;
        }
    };

    const eventHandler = (e: Event) => {
        if (timeoutMs) {
            window.clearTimeout(to);
            to = window.setTimeout(() => callAll(e), timeoutMs);
        } else {
            callAll(e);
        }
    };
    // document.addEventListener("scroll", eventHandler);
    const callAll = (e: Event) => callBacks.forEach((cb) => cb(e));

    const addEvent = () => eventTarget.addEventListener(eventName, eventHandler);

    const removeEvent = () => eventTarget.removeEventListener(eventName, (e) => eventHandler(e));

    return {
        add,
        remove,
        callAll
    };
};

export const resizeHandler = windowEventHandler('resize', 300);
export const scrollHandler = windowEventHandler('scroll', 0);
