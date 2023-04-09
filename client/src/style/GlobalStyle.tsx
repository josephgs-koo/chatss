import { css } from "@emotion/react";

const reset = css`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        height: 100vh;
        margin: 0;
        padding: 0;
        background-color: #e8e8e8;
    }
`;

export default reset;
