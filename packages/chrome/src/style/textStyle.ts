import {css} from "lit";


export const textStyle = css`
    h1, h2, h4, h6 {
        font-weight: bold;
    }
    h5, h4 {
        font-size: var(--font-size-l);
    }
    h3, h2 {
        font-size: 18px;
    }
    h1 {
        font-size: 20px;
    }

    dl {
        dt, dd {
            margin-bottom: 4px;
        }
        
        dt {
            font-weight: bold;
            font-size: var(--font-size-s);
        }
        
        dd {
            font-size: var(--font-size);
        }
    }
`