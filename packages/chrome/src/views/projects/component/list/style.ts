import {css} from "lit";

export const style = css`
    li {
        display: flex;
        align-items: center;
        padding: 16px;
    }
    
    .project {
        justify-content: space-between;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        margin-bottom: 8px;
        cursor: pointer;
        background-color: var(--main-bg);
        transition: background-color 260ms ease-out;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--primary-inverse);
        }

        wf-button {
            border-radius: 50%;
            width: 32px;
            height: 32px;
        }
    }
    
    li:last-child {
        padding-right: 0;
        justify-content: right;
    }
`
