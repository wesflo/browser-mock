import '../index';
import {TNotificationTypes} from "../interface";

export const toastFactory = () => {
    const targetId = 'wf-toast-target';

    const add = (msg: string, appearance: TNotificationTypes) => {
        const toast = document.createElement('wf-toast') as any;
        const id = 'toast' + +new Date();
        toast.setAttribute('appearance', appearance);
        toast.innerText = msg;
        toast.id = id;

        toast.to = setTimeout(() => remove(id), 5000)
        target.appendChild(toast)
    };

    const remove = (id) => {
        const toast = document.getElementById(id) as any;
        toast.style.marginLeft = '-120%';
        clearTimeout(toast.to)
        setTimeout(() => toast.remove(), 500)
    };

    const getTarget = () :HTMLDivElement => {
        let target = document.getElementById(targetId) as HTMLDivElement;

        if(!target) {
            target = document.createElement('div');
            target.id = targetId;
            target.style.position = 'fixed';
            target.style.bottom = '20px';
            target.style.left = '20px';

            document.body.appendChild(target);
        }

        return target
    }

    const target: HTMLDivElement = getTarget()

    return {
        add,
        remove,
    };
}