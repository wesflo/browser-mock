import {css} from "lit";

export const style = css`
    :host {
        display: block;
    }
    
    nav {
        display: flex;
        border-bottom: 1px solid var(--grey-3);
        flex-wrap: wrap;
        padding: 0 8px;
        
        a {
            padding: 14px 16px 8px;
            color: var(--font-color);
            border: 1px solid var(--grey-3);
            margin-bottom: -1px;
            transition: all 400ms ease-in-out;
            
            &:not(:first-child) {
                border-left: 0;
            }
            
            &:first-child {
                border-top-left-radius: 4px;
            }
            
            &:last-of-type {
                border-top-right-radius: 4px;
            }
            
            &.active {
                border-bottom-color: #fff;
                color: var(--secondary);
            }
            
            &:hover {
                color: var(--primary);
            }
        }
        
        wf-switch {
            padding-top: 6px;
            margin-left: auto;
        }
    }

    .tabs {
        padding: 16px 8px;
    }
    
    
`