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
        justify-content: space-between;
        background-color: var(--grey-2);
        font-size: var(--font-size);
        z-index: 2;
        box-shadow: var(--box-shadow);

        svg {
            fill: var(--primary);
        }

        a {
            position: relative;
            padding: 16px 16px 10px;
            color: var(--primary);
            background-color: var(--grey-2);
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
                background-color: var(--primary);
                transition: all 400ms ease-in-out;
            }
            &.new-project,
            &.app-config {
                padding-top: 10px;
                padding-bottom: 8px;
            }

            &.active {
                background-color: var(--grey-1);
            }
            
            &:hover {
                &:after {
                    opacity: 1;
                    width: 100%;
                }
            }
        }
        
        .box {
            display: flex;
        }

        wf-switch {
            padding: 4px 8px;
            margin-left: auto;
        }
    }
    
    .cnt {
        padding: 16px 8px;
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

`