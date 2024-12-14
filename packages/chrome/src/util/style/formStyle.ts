import {css} from "lit";


export const formStyle = css`
    :host {
        position: relative;
    }
    
    textarea,
    select,
    input {
        font-family: var(--font-family), sans-serif;
        color: var(--font-color);
        border-radius: 8px;
        border: 1px solid var(--grey-5);
        padding-top: 20px;
        padding-bottom: 4px;
        padding-inline: 16px 40px;
        height: 54px;
        width: 100%;
        max-width: 100%;
        font-size: var(--font-size-l);
        outline: none;

        &:focus-visible,
        &:focus {
            border-color: var(--secondary);
            border-width: 2px;
        }
    }

    textarea,
    input {
        &:focus-visible,
        &:focus {
            + label {
                font-size: var(--font-size-s);
                top: 12px;
            }
        }
    }
`

export const labelStyle = css`
    label {
        position: absolute;
        top: 20px;
        font-size: var(--font-size-l);
        inset-inline-start: 16px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 240ms ease-out;
        color: var(--grey-7);
    }
    
    label.active {
        font-size: var(--font-size-s);
        top: 12px;
    }
`