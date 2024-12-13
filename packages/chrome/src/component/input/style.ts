import {css} from "lit";

export const style = css`
    
    select {
        appearance: none;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .hide {
        color: transparent;
    }
    
    svg {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        fill: var(--grey-7);
    }
`