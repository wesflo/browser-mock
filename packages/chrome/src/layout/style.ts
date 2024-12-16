import {css} from "lit";

export const style = css`
    :host {
        display: block;
        background-color: var(--main-bg);
    }
    
    nav {
        display: flex;
        flex-wrap: wrap;
        background-color: var(--primary);
        font-size: var(--font-size-l);
        font-weight: bold;
        
        a {
            position: relative;
            padding: 16px 24px 14px;
            color: var(--font-color-iverse);
            background-color: var(--primary);
            transition: background-color 400ms ease-in-out;
            
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 4px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0;
                background-color: var(--font-color-iverse);
                transition: all 400ms ease-in-out;
            }
            
            &.active {
                background-color: var(--primary-bright);
            }
            
            &:hover {
                
                &:after {
                    opacity: 1;
                    width: 100%;
                }
            }
        }
        
        wf-switch {
            padding: 10px 24px 0 0;
            margin-left: auto;
            width: 177px;
        }
    }

    .tabs {
        padding: 16px 8px;
    }
    
    
`