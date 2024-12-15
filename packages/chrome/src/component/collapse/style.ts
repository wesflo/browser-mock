import {css} from "lit";

export const style = css`
    :host {
        position: relative;
    }
    
    input {
        position: absolute;
        opacity: 0;
        appearance: none;
        margin: 0;

        &:focus-visible,
        &:focus {
            outline: none;

            + label {
                border-color: var(--secondary);
            }
        }
        
        &:checked + label {
            &:after {
                width: 100%;
                opacity: 1;
            }
            svg {
                transform: translateY(-50%) rotate(-90deg);
            }
        }
    }
    
    label {
        display: block;
        width: 100%;
        font-size: var(--font-size-l);
        padding: 20px 0 16px;
        padding-inline: 16px 40px;
        cursor: pointer;
        position: relative;
        border: 1px solid var(--grey-5);
        border-radius: 8px 8px 0 0;
        
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            //background-color: var(--grey-5);
            position: absolute;
            top: 100%;
            left: 50%;
            opacity: 0;
            transform: translateX(-50%);
            transition: width 600ms ease-in-out, opacity 200ms ease-in;
        }
    }

    svg {
        width: 36px;
        height: 36px;
        fill: var(--grey-7);
        position: absolute;
        right: 12px;
        top: 50%;
        transition: transform 260ms ease-in-out;
        transform: translateY(-50%) rotate(90deg);
        filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, .2 ));
    }
     
    #cnt {
        max-height: 0;
        overflow: hidden;
        transition: max-height ease-in-out 600ms;
        border: 1px solid var(--grey-5);
        border-top: 0;
        border-radius:  0 0 8px 8px;
    }
    
    #wrp {
        padding: var(--collapse-padding);
    }
    
`