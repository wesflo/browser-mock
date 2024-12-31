import {css} from "lit";

export const style = css`
    header {
        margin-bottom: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        gap: 8px 16px;
        align-items: center;
        
        h4 {
            flex: 0 1 100%;
        }

        wf-switch {
            margin-left: auto;
        }

        wf-button svg {
            fill: var(--primary);
        }
    }

    :host {
        padding: 16px;
        border: 1px solid var(--grey-5);
        border-radius: var(--border-radius);
        margin-bottom: 20px;

       
    }

    header {
        padding-bottom: 8px;
        border-bottom: 1px solid var(--grey-1);
    }

    .cnt {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
    }

    dl {
        margin-bottom: 16px;
    }

    h6 {
        font-weight: normal;
    }
    
    .flag {
        display: inline-block;
        padding: 4px 8px;
        margin-right: 16px;
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