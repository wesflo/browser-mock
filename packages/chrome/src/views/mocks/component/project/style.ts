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
    }

    .card {
        padding: 16px;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        margin-bottom: 20px;

        header {
            padding-bottom: 8px;
            border-bottom: 1px solid var(--grey-1);
        }

        .cnt {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(3, 1fr);
        }
    }

    wf-option-picker,
    dl {
        margin-bottom: 16px;
    }

    .flag {
        display: inline-block;
        padding: 4px 8px;
        margin-right: 16px;
        border: 1px solid;
        border-radius: 999em;

        &.get {
            color: #006aa9;
            border-color: #006aa9;
        }

        &.post {
            color: #b76100;
            border-color: #b76100;
        }

        &.put {
            color: #0091a4;
            border-color: #0091a4;
        }

        &.delete {
            color: #9f1300;
            border-color: #9f1300;
        }

        &.patch {
            color: #0275bb;
            border-color: #0275bb;
        }
    }
`