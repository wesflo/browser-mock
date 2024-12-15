import {css} from "lit";

export const style = css`

    :host {
        display: none;
    }
    
    :host([visible]) {
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        aspect-ratio: 1;

        &:before,
        &:after {
            content: "";
            position: absolute;
            border-radius: 99em;
            animation: progressAni 2.5s infinite;
            background: var(--grey-1);
            border: 4px solid;
            box-shadow: var(--box-shadow);
        }

        &:before {
            border-color: var(--primary);
        }
        
        &:after {
            border-color: var(--secondary);
            animation-delay: -1.25s;
        }
    }
    
    @keyframes progressAni {
        0% {
            inset: 0 34px 34px 0;
        }
        12.5% {
            inset: 0 34px 0 0;
        }
        25% {
            inset: 34px 34px 0 0;
        }
        37.5% {
            inset: 34px 0 0 0;
        }
        50% {
            inset: 34px 0 0 34px;
        }
        62.5% {
            inset: 0 0 0 34px;
        }
        75% {
            inset: 0 0 34px 34px;
        }
        87.5% {
            inset: 0 0 34px 0;
        }
        100% {
            inset: 0 34px 34px 0;
        }
    }
`