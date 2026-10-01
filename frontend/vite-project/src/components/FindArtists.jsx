import { useState } from "react";
import "../styles/FindArtists.css";

function FindArtists() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const [findArtists, setFindArtists] = useState([]);

    async function send(e) {
        e.preventDefault();
        const name = text.trim();

        if (!name) {
            setError("Digite o nome de um artista.");
            return;
        }
        
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(name)}&api_key=${import.meta.env.VITE_LASTFM_API}&format=json&limit=30`);

        if (!response.ok) {
            setError("Erro ao buscar informações do artista.");
            return;
        }

        const data = await response.json();

        console.log(data);

        if (data.error) {
            setError("Artistas não encontrados");
            return;
        }

        console.log(data?.results?.artistmatches?.artist);
        
        setFindArtists(data?.results?.artistmatches?.artist?.sort((a, b) => b.listeners - a.listeners));
        // navigate(`/info-artist?nome=${encodeURIComponent(name)}`);
    }

    console.log(findArtists);

    return (
        <main className="search-page">
            <section className="search-intro">
                <p className="eyebrow">EXPLORE AS FAIXAS</p>
                <h2>Encontre informações sobre seus artistas favoritos.</h2>

                <form className="artist-search-form" onSubmit={send}>
                    <label htmlFor="artist-name">Nome do artista</label>

                    <div className="search-controls">
                        <input type="text" placeholder="Digite o nome do artista" value={text} onChange={(evento) => setText(evento.target.value)} className="inp-search">
                        </input>
                        <button className="btn-search" >Buscar</button>
                    </div>

                    <ul className="artist-list">
                        {findArtists.map((artist) => (
                            <li key={artist.mbid}>
                                <a href={`/info-artist?nome=${encodeURIComponent(artist.name)}`} className="artist-link">
                                    <p>{artist.name}</p>
                                    <span>Ouvintes: {artist.listeners}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {error && <p className="feedback-error" role="alert">{error}</p>}
                </form>
            </section>
        </main>
    );
}

export default FindArtists;
