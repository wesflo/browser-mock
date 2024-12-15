import {css} from "lit";

export const style = css`
   
    :host {
        padding: 16px;
        display: grid;
        grid-template-columns: 40px auto 40px;
        align-items: center;
        max-width: 300px;
        border-left: 4px solid var(--grey-5);
        background-color: var(--grey-0);
        box-shadow: var(--box-shadow);
        margin-bottom: 12px;
        transition: margin-left 400ms ease-out;

        &:last-child {
            margin-bottom: 0;
        }
    }
    svg {
        fill: var(--grey-5);
        width: 24px;
        filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .2 ));
    }
    
   :host([appearance="success"]) {
       background-color: var(--success-bg);
       border-color: var(--success);
       color:  var(--grey-0);
       svg {
           fill: var(--grey-0);
       }
       > svg {
           fill: var(--success);
       }
   }

    :host([appearance="error"]) {
        background-color: var(--error-bg);
        border-color: var(--error);
        color:  var(--grey-0);
        svg {
            fill: var(--grey-0);
        }
        > svg {
            fill: var(--error);
        }
    }
`