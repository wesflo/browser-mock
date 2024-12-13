import {css} from "lit";

export const style = css`
    input {
        display: none;
    }

    label {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        top: unset;
        transform: unset;
        inset-inline-start: unset;
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
            box-shadow:  1px 1px 4px 0px rgba(0,0,0,0.2);;
            //box-shadow:  rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
        }
    }

    input:checked + label span {
        &:before {
            background: var(--primary);
        }

        &:after {
            background: var(--primary);
            left: 25px;
        }
    }
`