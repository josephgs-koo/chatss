import { css } from "@emotion/react";

const reset = css`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #e8e8e8;
        color: #424242;
    }
`;

export default reset;
