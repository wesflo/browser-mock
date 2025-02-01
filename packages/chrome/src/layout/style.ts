import {css} from "lit";

export const style = css`
    :host {
        display: block;
        background-color: var(--main-bg);
        padding-top: 50px;
        padding-bottom: 20px;
    }

    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
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
            padding: 10px 16px 0 0;
            margin-left: auto;
        }
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        background: var(--grey-1);
        opacity: .5;
        transition: opacity 260ms ease-out;
        
        &:hover {
            opacity: 1;
        }

        dl {
            display: flex;
        }

        dt {
            display: inline-block;
            padding-right: 10px;
            font-weight: bold;
        }

        dd {
            &:after {
                display: inline-block;
                padding: 0 8px 0 4px;
                content: '-';
            }

            &:last-child:after {
                content: unset;
            }
        }

        a {
            color: var(--primary);
            text-decoration: none;

            &:focus,
            &:focus-visible,
            &:hover {
                color: var(--primary-dark);
            }
        }

    }

    .tabs {
        padding: 16px 8px;
    }


`