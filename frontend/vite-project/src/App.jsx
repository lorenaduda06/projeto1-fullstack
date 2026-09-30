import BuscaArtista from "./components/FindArtists";
import InfoArtist from "./components/InfoArtists";

function App() {
  return(
    <div className="container-app">
      <header>
        <h1>SonarHub</h1>
        <p>Encontre informações sobre seus artistas favoritos.</p>
      </header>

      <main>
        <BuscaArtista></BuscaArtista>
        <InfoArtist></InfoArtist>
      </main>
    </div>
  )
}