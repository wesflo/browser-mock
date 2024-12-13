import {css} from "lit";


export const defaultStyle = css`
    :host {
        display: block;
        font-family: var(--font-family), sans-serif;
        font-size: var(--font-size);
        color: var(--font-color);
    }
    
    :host, 
    *,
    *:before, 
    *:after {
        box-sizing: border-box;
    }
    
    a {
        text-decoration: none;
    }


    div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    
    ul,
    ol,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
`