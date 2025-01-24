import {css} from "lit";


export const formStyle = css`
    :host {
        position: relative;
    }

    :host([disabled]) {
        cursor: default;
        pointer-events: none;
    }
    
    textarea,
    select,
    input {
        font-family: var(--font-family), sans-serif;
        color: var(--font-color);
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-5);
        background-color: var(--main-bg);
        padding-top: 16px;
        padding-bottom: 2px;
        padding-inline: 16px 40px;
        height: 48px;
        width: 100%;
        max-width: 100%;
        font-size: var(--font-size-l);
        outline: none;
        transition:
                border-left-color 140ms ease-out,
                border-right-color 140ms ease-out,
                border-right-width 140ms ease-out,
                border-top-color 140ms ease-out,
                border-top-width 140ms ease-out,
                border-bottom-color 140ms ease-out,
                border-bottom-width 140ms ease-out;

        &:focus-visible, 
        &:focus {
            border-color: var(--secondary);
            border-width: 2px;
            padding-inline: 15px 40px;
        }

        &:disabled {
            background-color: var(--main-bg);
            border-color: var(--grey-3);

            &,
            + label {
                color: var(--grey-3);
            }
        }
    }

    textarea,
    input {
        &:focus-visible,
        &:focus {
            + label {
                font-size: var(--font-size-s);
                top: 2px;
            }
        }
    }
`

export const labelStyle = css`
    label {
        position: absolute;
        top: 16px;
        font-size: var(--font-size-l);
        inset-inline-start: 12px;
        padding: 4px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 240ms ease-out;
        color: var(--grey-7);
        background: var(--main-bg);
    }
    
    label.active {
        font-size: var(--font-size-s);
        top: 2px;
    }

    :host([inverse]) {
        label {
            color: var(--font-color-iverse);
        }
    }
    
    .asterisks {
        color: var(--grey-3);
    }
`

export const formHintStyle = css`
    .hint {
        display: block;
        padding: 4px 0 0 8px;
        font-size: var(--font-size-s);
        color: var(--grey-3);
    }
`

export const formErrorStyle = css`
    .err {
        display: block;
        padding: 4px 0 0 8px;
        color: var(--error);
    }

    :host([error]) {
        label {
            color: var(--error);
        }
        textarea,
        select,
        input {
            border-color: var(--error);
        }
    }
`