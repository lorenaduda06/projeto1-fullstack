import { Routes, Route } from "react-router-dom";

import FindArtists from "./components/FindArtists";
import InfoArtist from "./components/InfoArtists";
import "./styles/App.css";

function App() {
  return (
    <div className="container-app">
      <header className="header-app">
        <h1>SonarHub</h1>
      </header>

      <Routes>
        <Route path="/" element={<FindArtists></FindArtists>}></Route>
        <Route path="/info-artist" element={<InfoArtist></InfoArtist>}></Route>
      </Routes>
    </div>
  )
}

export default App;