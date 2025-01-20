import {css} from "lit";

export const style = css`
    li {
        display: flex;
        align-items: center;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        margin-bottom: 8px;
        overflow: hidden;

        &:last-child {
            margin-bottom: 0;
        }
        
        span {
            margin-right: auto;
        }
    }
    
    .cta {
        cursor: pointer;
        display: flex;
        flex: 1 0 1%;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        background-color: var(--main-bg);
        transition: background-color 260ms ease-out;
        
        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--primary-inverse);
        }
    }

    wf-switch {
        padding: 16px;
    }
    
    wf-button {
        border-radius: 50%;
        width: 32px;
        height: 32px;
    }
`