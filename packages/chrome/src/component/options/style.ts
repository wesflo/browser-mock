import {css} from "lit";

export const style = css`
    :host {
        display: flex;
        gap: 16px 32px;
        flex-wrap: nowrap;
    }
    input {
        display: none;
    }

    label {
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        top: unset;
        transform: unset;
        inset-inline-start: unset;
        padding-top: 2px;

        span {
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 8px;
            border: 1px solid var(--grey-5);
            transition: opacity 200ms ease-out;
            margin-top: -2px;
            
            &:before {
                content: '';
                display: inline-block;
                width: 12px;
                height: 12px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                opacity: .2;
                background-color: var(--grey-5);
                transition: opacity 200ms ease-out;
            }
        }

        &:focus-visible,
        &:focus {
            outline: none;
            
            span {
                border-width: 2px;
            }
        }
    }

    input[type="checkbox"] + label span {
        border-radius: 6px;
        &:before {
            border-radius: 4px;
        }
    }

    input:checked + label span {
        border-color: var(--primary);
        border-width: 2px;

        &:before {
            opacity: 1;
            background-color: var(--primary);
        }
    }
    
`