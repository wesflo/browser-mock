import {css} from "lit";

export const style = css`
    :host {
        padding: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--grey-5);
    }
    
    header {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 16px;
        align-items: center;
        margin-bottom: 8px;

        strong {
            font-weight: bold;
            margin-right: 16px;
        }
    }

    .cnt {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
    }

    dl {
        margin-bottom: 16px;
    }

    h6 {
        font-weight: normal;
    }
    
    .flag {
        display: inline-flex;
        justify-content: center;
        padding: 4px 8px;
        border: 1px solid;
        border-radius: 999em;
        font-weight: bold;

        &.get {
            color: #1fa900;
            border-color: #1fa900;
        }

        &.post {
            color: #f58200;
            border-color: #f58200;
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