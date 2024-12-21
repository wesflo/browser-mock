import {css} from "lit";

export const style = css`
    :host {
        position: relative;
    }
    
    input {
        position: absolute;
        overflow: hidden;
        padding: 0;
        border: 0;
        margin: -1px;
        block-size: 1px;
        clip: rect(0px, 0px, 0px, 0px);
        inline-size: 1px;
        visibility: inherit;
        white-space: nowrap;
    }
    .input {
        font-family: var(--font-family), sans-serif;
        color: var(--font-color);
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-5);
        padding-top: 20px;
        padding-bottom: 4px;
        padding-inline: 16px 40px;
        min-height: 54px;
        width: 100%;
        max-width: 100%;
        font-size: var(--font-size-l);
        outline: none;
    }
    
    li {
        padding: 4px 0;
        cursor: pointer;
        display: flex;
        gap: 8px;
        align-items: center;

        svg {
            width: 16px;
            height: 16px;
            fill: var(--secondary);
        }
    }

    wf-button {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        
        svg {
            width: 24px;
            height: 24px;
            fill: var(--primary);
        }
        
        &:focus-visible,
        &:focus {
            + .input {
                border-color: var(--secondary);
                border-width: 2px;
            }
        }
    }
`