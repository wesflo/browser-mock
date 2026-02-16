import {css} from "lit";

export const style = css`
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    
    ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    li {
        position: relative;
        padding-right: 60px;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    a {
        display: block;
        padding: 16px;
        border-radius: var(--border-radius);
        background-color: var(--main-bg);
        transition: background-color 260ms ease-out, color 260ms ease-out;
        color: var(--font-color);

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--primary-inverse);
            color: var(--primary);
        }
    }

    .buttons {
        display: flex;
        gap: 8px;
        position: absolute;
        top: 8px;
        right: 8px;
    }

    wf-button {
        border-radius: 99rem;
        width: 32px;
        height: 32px;
    }
`