import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FindArtists.css";

function FindArtists() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function send(e) {
        e.preventDefault();
        const name = text.trim();
        if (!name) {
            setError("Digite o nome de um artista.");
            return;
        }
        navigate(`/info-artist?nome=${encodeURIComponent(name)}`);
    }

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

                    {error && <p className="feedback-error" role="alert">{error}</p>}
                </form>
            </section>
        </main>
    );
}

export default FindArtists;
