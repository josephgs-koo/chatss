import { css } from "@emotion/react";

const reset = css`
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

    * {
        box-sizing: border-box;
    }

    html {
        font-family: "Noto Sans KR", sans-serif;

        @media screen and (max-width: 932px) {
            font-size: 90%;
        }
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
