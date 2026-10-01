
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/InfoArtists.css";

function InfoArtist() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const name = params.get("name");

    // No início são usados dados fictícios temporariamente
    const artist = {
        name: "Taylor Swift",
        image: "https...",
        bio: "Cantora e compositora",
        listeners: "1.000.000",
        streams: "5.000.000"
    }

    return (
        <main className="info-page">
            <button id="btn-back" onClick={() => navigate("/")}>
                ← Voltar
            </button>

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
                            <span className="stat-value">{artist.listeners}</span>
                            <span className="stat-label">Ouvintes</span>
                        </div>

                        <div className="stat">
                            <span className="stat-value">{artist.streams}</span>
                            <span className="stat-label">Reproduções</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default InfoArtist;