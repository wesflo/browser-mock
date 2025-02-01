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

    .m {
        display: grid;
        grid-template-columns: 3fr auto 2fr;
        gap: 16px;
        align-items: center;
        justify-content: center;
    }
    
    .spacer {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
        height: 100%;
    }
    
    .spacer:after {
        content: '';
        display: block;
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0;
        left: 6px;
        z-index: -1;
        background: linear-gradient(
                0deg,
                var(--main-bg) 0%,
                var(--grey-3) 40%,
                var(--grey-3) 60%,
                var(--main-bg) 100%);
    }
    
    .spacer span {
        display: block;
        padding: 8px 0;
        background: var(--main-bg);
    }
`