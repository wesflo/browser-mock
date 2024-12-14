import {css} from "lit";

export const style = css`
    :host * {
        margin-bottom: 16px;
    }
    ep-collapse {
        margin-bottom: 8px;
    }
    :host *,
    ep-collapse {
        &:last-child {
            margin-bottom: 0;
        }
    }
`