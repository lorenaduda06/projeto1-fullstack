import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistList from "./ArtistList";
import "../styles/FindArtists.css";

function FindArtists() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

    const sortedArtists = useMemo(
        () => [...artists].sort(
            (a, b) => Number(b.listeners || 0) - Number(a.listeners || 0)
        ),
        [artists]
    );

    async function send(e) {
        e.preventDefault();
        const name = text.trim();
        setError("");

        if (!name) {
            setError("Digite o nome de um artista.");
            return;
        }

        const apiKey = import.meta.env.VITE_LASTFM_API;

        if (!apiKey) {
            setError("A chave da API Last.fm não foi configurada.");
            return;
        }

        setIsLoading(true);
        setHasSearched(false);
        setArtists([]);

        try {
            const params = new URLSearchParams({
                method: "artist.search",
                artist: name,
                api_key: apiKey,
                format: "json",
                limit: "30",
            });

            const response = await fetch(
                `https://ws.audioscrobbler.com/2.0/?${params}`
            );

            if (!response.ok) {
                throw new Error("Não foi possível acessar a API Last.fm.");
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || "A Last.fm retornou um erro.");
            }

            const result = data?.results?.artistmatches?.artist;
            const matches = Array.isArray(result)
                ? result
                : result
                    ? [result]
                    : [];

            const normalizedArtists = matches.map((artist) => ({
                name: artist.name,
                mbid: artist.mbid,
                url: artist.url,
                image: null,
                listeners: Number(artist.listeners) || 0,
            }));

            setArtists(normalizedArtists);
            setHasSearched(true);
        } catch (requestError) {
            setError(requestError.message || "Erro ao buscar artistas.");
            setArtists([]);
            setHasSearched(true);
        } finally {
            setIsLoading(false);
        }
    }

    function openArtist(name) {
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
                        <input id="artist-name" type="text" placeholder="Digite o nome do artista" value={text} onChange={(e) => setText(e.target.value)} className="inp-search">
                        </input>
                        <button className="btn-search" disabled={isLoading}>
                            {isLoading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>
                </form>

                {error && <p className="feedback-error" role="alert">{error}</p>}

                {isLoading && <p role="status">Buscando artistas...</p>}

                {!isLoading && hasSearched && !error && artists.length === 0 && (
                    <p role="status">Nenhum artista encontrado. Tente outro nome.</p>
                )}
            </section>
            {sortedArtists.length > 0 && (
                <ArtistList
                    artists={sortedArtists}
                    onSelect={openArtist}
                />
            )}
        </main>
    );
}

export default FindArtists;
