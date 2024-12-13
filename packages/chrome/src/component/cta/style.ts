import {css} from "lit";

export const style = css`
    :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    :host(:focus-visible) {
        outline: 0;
    }
    
    .cta {
        border: 2px solid transparent;
        cursor: pointer;
    }
    
    .xs { padding: 2px 8px; }
    .s { padding: 4px 12px; }
    .m { padding: 8px 16px; }
    .l { padding: 16px 24px; }
    .xl {  padding: 24px 36px; }
        
    .primary, .secondary, .tertiary { color: #fff; }
    
    .primary { background-color: var(--primary); border-color: var(--primary); }
    .secondary { background-color: var(--secondary); border-color: var(--secondary); }
    .tertiary { background-color: var(--tertiary); border-color: var(--tertiary); }

    .primary-outline { border-color: var(--primary); color: var(--primary); }
    .secondary-outline { border-color: var(--secondary); color: var(--secondary); }
    .tertiary-outline { border-color: var(--tertiary); color: var(--tertiary); }
`