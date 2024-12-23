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

    :host([disabled]) {
        .cta {
            opacity: .6;
            cursor: not-allowed;
            pointer-events: none;
        }
    }

    .cta {
        border: 2px solid transparent;
        cursor: pointer;
        border-radius: 999em;
        transition: all 300ms ease-in-out;
        background-color: transparent;
    }

    ::slotted(svg) {
        width: 24px;
        height: 24px;
        fill: var(--grey-0);
        transition: fill 300ms ease-in-out;
    }
    
    .xs,
    .s {
        font-size: var(--font-size-s);

        ::slotted(svg) {
            width: 18px;
            height: 18px;
        }
    }
    .xs {
        padding: 2px 8px;
    }

    .s {
        padding: 4px 12px;
    }

    .m {
        padding: 8px 16px;
    }

    .l,
    .xl {
        font-size: var(--font-size-l);

        ::slotted(svg) {
            width: 32px;
            height: 32px;
        }
    }

    .l {
        padding: 12px 24px;
    }

    .xl {
        padding: 16px 36px;
    }

    .inherit {
        padding: inherit;
        font-size: inherit;
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }

    .primary, .secondary, .tertiary {
        color: var(--grey-0);
    }

    .clean {
        background-color: rgba(0,0,0, 0);
        border-color: rgba(0,0,0, 0);

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--primary-inverse);
        }

        ::slotted(svg) {
            fill: var(--grey-7);
        }
    }

    .primary {
        background-color: var(--primary);
        border-color: var(--primary);

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--primary-dark);
            border-color: var(--primary-dark);
        }
    }

    .secondary {
        background-color: var(--secondary);
        border-color: var(--secondary);

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--secondary-dark);
            border-color: var(--secondary-dark);
        }
    }

    .tertiary {
        background-color: var(--tertiary);
        border-color: var(--tertiary);

        &:hover,
        &:focus,
        &:focus-visible {
            background-color: var(--tertiary-dark);
            border-color: var(--tertiary-dark);
        }
    }

    .primary-outline,
    .primary-clean {
        color: var(--primary);

        ::slotted(svg) {
            fill: var(--primary);
        }

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--primary-dark);

            ::slotted(svg) {
                fill: var(--primary-dark);
            }
        }
    }

    .primary-outline {
        border-color: var(--primary);

        &:hover,
        &:focus,
        &:focus-visible {
            border-color: var(--primary-dark);
        }
    }

    .secondary-outline,
    .secondary-clean {
        color: var(--secondary);

        ::slotted(svg) {
            fill: var(--secondary);
        }

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--secondary-dark);

            ::slotted(svg) {
                fill: var(--secondary-dark);
            }
        }
    }
    
    .secondary-outline {
        border-color: var(--secondary);

        &:hover,
        &:focus,
        &:focus-visible {
            border-color: var(--secondary-dark);
        }
    }

    .tertiary-outline,
    .tertiary-clean {
        color: var(--tertiary);

        ::slotted(svg) {
            fill: var(--tertiary);
        }

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--tertiary-dark);
            ::slotted(svg) {
                fill: var(--tertiary-dark);
            }
        }
    }
    
    .tertiary-outline {
        border-color: var(--tertiary);

        &:hover,
        &:focus,
        &:focus-visible {
            border-color: var(--tertiary-dark);
        }
    }
`

export const buttonsWrapperStyles = css`
    .buttons {
        display: flex;
        gap: 16px;

        &.right {
            justify-content: right;
        }

        &.center {
            justify-content: center;
        }
    }
`