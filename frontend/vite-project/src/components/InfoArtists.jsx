import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/InfoArtists.css";

function removeHtml(value = "") {
    return new DOMParser()
        .parseFromString(value, "text/html")
        .body.textContent
        .trim();
}

function formatNumber(value) {
    const number = Number(value);

    return Number.isFinite(number)
        ? number.toLocaleString("pt-BR")
        : "Não informado";
}

function InfoArtist() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const name = params.get("nome");

    const [artist, setArtist] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadArtist() {
            if (!name) {
                setError("Nenhum artista foi informado.");
                setIsLoading(false);
                return;
            }

            const apiKey = import.meta.env.VITE_LASTFM_API;

            if (!apiKey) {
                setError("A chave da API Last.fm não foi configurada.");
                setIsLoading(false);
                return;
            }

            setError("");
            setArtist(null);
            setIsLoading(true);

            try {
                const params = new URLSearchParams({
                    method: "artist.getInfo",
                    artist: name,
                    api_key: apiKey,
                    format: "json",
                });

                const response = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?${params}`
                );

                if (!response.ok) {
                    throw new Error("Não foi possível acessar a API Last.fm.");
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.message || "Não foi possível carregar o artista.");
                }

                const result = data.artist;

                if (!result) {
                    throw new Error("A Last.fm não retornou esse artista.");
                }

                const bio = removeHtml(result.bio?.summary || "");
                const stats = result.stats || {};

                if (!cancelled) {
                    setArtist({
                        name: result.name,
                        image: null,
                        bio: bio || "Biografia não disponível.",
                        listeners: stats.listeners,
                        // A resposta JSON pode chamar esse campo de playcount.
                        plays: stats.playcount ?? stats.plays,
                        url: result.url,
                    });
                }
            } catch (requestError) {
                if (!cancelled) {
                    setError(requestError.message || "Erro ao carregar o artista.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadArtist();

        return () => {
            cancelled = true;
        };
    }, [name]);

    return (
        <main className="info-page">
            <button className="btn-back" onClick={() => navigate("/")}>
                ← Voltar
            </button>

            {isLoading && <p role="status">Carregando artista...</p>}

            {error && <p className="feedback-error" role="alert">{error}</p>}

            {artist && !isLoading && (
                <section className="info-artist">
                    {artist.image ? (
                        <img className="artist-img" src={artist.image} alt={artist.name} />
                    ) : (
                        <div className="artist-img artist-img-placeholder" aria-hidden="true">
                            {artist.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="artist-details">
                        <h2>{artist.name}</h2>
                        <p className="artist-bio">{artist.bio}</p>

                        <div className="artist-stats">
                            <div className="stat">
                                <span className="stat-value">{formatNumber(artist.listeners)}</span>
                                <span className="stat-label">Ouvintes</span>
                            </div>

                            <div className="stat">
                                <span className="stat-value">{formatNumber(artist.plays)}</span>
                                <span className="stat-label">Reproduções</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export default InfoArtist;