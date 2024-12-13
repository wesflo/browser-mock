import {css} from "lit";


export const formStyle = css`
    :host {
        position: relative;
    }
    select,
    input {
       border-radius: 12px;
       border: 1px solid var(--grey-5);
       padding-top: 16px;
       padding-inline: 16px 40px;
       height: 54px;
       width: 100%;
        font-size: var(--font-size-l);
        outline: none;
        
        &:focus-visible,
        &:focus {
            border-color: var(--primary);
            border-width: 2px;
        }
   }

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
        top: 50%;
        transform: translateY(-50%);
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