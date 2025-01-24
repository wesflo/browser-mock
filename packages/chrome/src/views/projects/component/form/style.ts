import {css} from "lit";

export const style = css`
    :host > * {
        margin-bottom: 16px;
    }

    wf-input[name="path"] {
        margin-bottom: 32px
    }
    
    wf-button {
        margin-bottom: 0;
    }
    
    .spacer {
        display: flex;
        justify-content: center;
        position: relative;
        z-index: 1;
    }
    
    .spacer:after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        position: absolute;
        top: 8px;
        z-index: -1;
        background: linear-gradient(
                90deg,
                var(--main-bg) 0%,
                var(--grey-3) 40%,
                var(--grey-3) 60%,
                var(--main-bg) 100%);
    }
    
    .spacer span {
        display: block;
        padding: 0 16px;
        background: var(--main-bg);
    }
`