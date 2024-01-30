import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-silver: linear-gradient( 45deg, #999 5%, #fff 10%, #ccc 30%, #ddd 50%,#ccc 70%, #fff 80%, #999 95%);
    --color-gold: linear-gradient( 45deg, #ffd700 7%,  #fff 17%, #ffd700 30%, #ffd700 50%, #ffd700 60%, #fff 75%, #ffd700 95% );
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
    color: white;
}

  /* HTML5 display-role reset for older browsers */

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}

`
