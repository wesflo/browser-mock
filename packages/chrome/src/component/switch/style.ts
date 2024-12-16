import {css} from "lit";

export const style = css`
    
    input {
        position: absolute;
        opacity: 0;
        appearance: none;
        margin: 0;

        &:focus-visible {
            outline: none;

            + label {
                box-shadow: 0 0 1px 2px var(--secondary);
            }
        }

        &:checked + label span {
            &:before {
                background: var(--primary);
            }

            &:after {
                background: var(--primary);
                left: 25px;
            }
        }
    }

    label {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        top: unset;
        transform: unset;
        inset-inline-start: unset;
        overflow: visible;
    }

    span {
        position: relative;
        display: inline-block;
        padding: 8px 4px;
        margin-right: 8px;

        &:before,
        &:after {
            content: '';
            display: block;
            transition: all 300ms ease-out;
        }

        &:before {
            width: 40px;
            height: 12px;
            border-radius: 999em;
            background: var(--grey-7);
            opacity: .4;
        }

        &:after {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: var(--grey-7);
            box-shadow: var(--box-shadow);
        }
    }

    :host([inverse]) {
        input {
            &:checked + label span {
                &:before {
                    background: var(--primary-inverse);
                }

                &:after {
                    background: var(--primary-inverse);
                }
            }
        }
        span {
            &:before {
            background: var(--grey-3);
        }

            &:after {
                background: var(--grey-5);
            }
        }
    }
`