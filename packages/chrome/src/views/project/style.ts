import {css} from "lit";

export const style = css`
    h1 {
        margin-bottom: 16px;
    }
    
    header {
    }
    
    .cnt {
        display: flex;
        gap: 16px;
        align-items: center;

        wf-switch {
            margin-bottom: 8px;
        }
    }
    
    ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    li {
        border-radius: var(--border-radius);
        overflow: hidden;
        padding: 8px 16px;
    }
    
    .mock {
        background-color: var(--grey-1);
    }
    
    .request {
        background-color: var(--grey-0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;

        h5 {
            margin-right: auto;
        }
    }
    

    h6 {
        font-size: var(--font-size-s);
        font-weight: normal;
        margin: 8px;
    }

    .flag {
        display: inline-flex;
        justify-content: center;
        padding: 4px 8px;
        border: 1px solid;
        border-radius: 999em;
        font-weight: bold;

        &.success,
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
        
        &.error,
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