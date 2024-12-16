import {css} from "lit";

export const style = css`
    :host {
        display: flex;
        gap: 16px 32px;
        flex-wrap: nowrap;
    }
    
    input {
        opacity: 0;
        appearance: none;
        margin: 0;

        &:focus-visible {
            outline: none;
        }
    }
    h5 {
        font-weight: bold;
        font-size: var(--font-size-l);
    }

    label {
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        top: unset;
        transform: unset;
        inset-inline-start: unset;
        border-radius: var(--border-radius);
        border: 1px solid;
        padding: 8px 0 8px 16px;
        background-color: var(--main-bg);
        transition: color 200ms ease-out, background-color 200ms ease-out;

        span {
            position: relative;
            display: inline-block;
            width: 0;
            padding-left: 16px;
            overflow: hidden;
            transition: opacity 200ms ease-out, width 360ms ease-out;
        }
    }

    svg {
        width: 24px;
        filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .2 ));
        fill: var(--font-color-iverse);
    }

    input:checked + label {
        color: var(--font-color-iverse);
        
        span {
            opacity: 1;
            width: 56px;
        }
    }
    
    .success {
        label {
            border-color: var(--success);
            color: var(--success);
        }
        input:checked + label {
            background-color: var(--success-bg);
        }
    }
    
    .error {
        label {
            border-color: var(--error);
            color: var(--error);
        }
        input:checked + label {
            background-color: var(--error-bg);
        }
    }
    
`