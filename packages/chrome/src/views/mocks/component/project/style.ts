import {css} from "lit";

export const style = css`
    header {
        display: grid;
        grid-template-columns: 60px 1fr 90px;
        gap: 32px;
        align-items: center;
        padding: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--grey-5);

        wf-switch {
            margin-left: auto;
        }
    }

    h2 {
        margin-bottom: 4px;
    }

`