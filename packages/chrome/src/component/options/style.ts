import {css} from "lit";

export const style = css`
    label {
        position: unset;
        display: block;
        top: unset;
        transform: unset;
        inset-inline-start: unset;
        margin-bottom: 16px;
    }
    
    .options {
        display: flex;
        gap: 16px 32px;
        flex-wrap: nowrap;

        label {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            overflow: visible;
            margin-bottom: 0;

            span {
                position: relative;
                display: inline-block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 8px;
                border: 1px solid var(--grey-5);
                transition: opacity 200ms ease-out;
                margin-top: -2px;

                &:before {
                    content: '';
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    opacity: .2;
                    background-color: var(--grey-5);
                    transition: opacity 200ms ease-out;
                }
            }
        }
    }
    
    input {
        opacity: 0;
        appearance: none;
        margin: 0;

        &:focus-visible {
            outline: none;

            + label span {
                box-shadow: 0 0 1px 2px var(--secondary);
            }
        }
    }

    input[type="checkbox"] + label span {
        border-radius: 6px;
        
        &:before {
            border-radius: 4px;
        }
    }

    input:checked + label span {
        border-color: var(--primary) !important;
        border-width: 2px;

        &:before {
            opacity: 1;
            background-color: var(--primary);
        }
    }
    
`