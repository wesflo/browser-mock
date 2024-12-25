import {css} from "lit";

export const style = css`
    header {
        margin-bottom: 16px;
        display: flex;
        justify-content: left;
        gap: 16px;
        align-items: center;

        wf-switch {
            margin-left: auto;
        }

        wf-button svg {
            fill: var(--primary);
        }
    }
    
    dl {
        margin-bottom: 32px;
    }

`