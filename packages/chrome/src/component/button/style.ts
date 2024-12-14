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
    }

    .xs {
        padding: 2px 8px;
        font-size: var(--font-size-s);
    }

    .s {
        padding: 4px 12px;
        font-size: var(--font-size-s);
    }

    .m {
        padding: 8px 16px;
    }

    .l {
        padding: 12px 24px;
        font-size: var(--font-size-l);
    }

    .xl {
        padding: 16px 36px;
        font-size: var(--font-size-l);
    }

    .primary, .secondary, .tertiary {
        color: #fff;
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

    .primary-outline {
        border-color: var(--primary);
        color: var(--primary);
    }

    .secondary-outline {
        border-color: var(--secondary);
        color: var(--secondary);
    }

    .tertiary-outline {
        border-color: var(--tertiary);
        color: var(--tertiary);
    }

    .primary-outline,
    .secondary-outline,
    .tertiary-outline {
        &:hover,
        &:focus,
        &:focus-visible {
            background-color: #f1f1f1;
        }
    }

    .primary-clean {
        color: var(--primary);

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--primary-dark);
        }
    }

    .secondary-clean {
        color: var(--secondary);

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--secondary-dark);
        }
    }

    .tertiary-clean {
        color: var(--tertiary);

        &:hover,
        &:focus,
        &:focus-visible {
            color: var(--tertiary-dark);
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
    wf-button {
        margin: 0 !important;
    }
`