import {css} from "lit";

export const style = css`
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        margin-bottom: 8px;
        
        &:last-child {
            margin-bottom: 0;
        }
    }

    wf-button {
        border-radius: 50%;
        width: 32px;
        height: 32px;
    }
`