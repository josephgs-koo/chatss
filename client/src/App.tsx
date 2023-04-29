/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import reset from "./style/GlobalStyle";
import Layout from "./pages/ui/Layout";
import MenuLayout from "./pages/ui/MenuLayout";
import Main from "./pages/Main/Main";
import GameList from "./pages/GameList/GameList";
import Game from "./pages/Game/Game";

const style = css({
    width: "100%",
    height: "100%",
});

function App() {
    return (
        <div css={style}>
            <BrowserRouter>
                <Global styles={reset} />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<MenuLayout />}>
                            <Route path="" element={<Main />} />
                            <Route path="gamelist" element={<GameList />} />
                            <Route path="game/:roomID" element={<Game />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
