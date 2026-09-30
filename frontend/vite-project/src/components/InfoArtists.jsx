import { useNavigate } from "react-router-dom";

function InfoArtist() {
    const navigate = useNavigate();
    // No início são usados dados fictícios temporariamwnte
    const artist = {
        name: "Taylor Swift",
        image: "https...",
        bio: "Cantora e compositora",
        listeners: "1.000.000",
        streams: "5.000.000"
    }

    return (
        <section className="info-artist">
            <div style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}>
                <button id="btn-back" onClick={() => navigate("/")}>
                    ← Voltar
                </button>
            </div>

            <img className="artist-img" src={artist.image} alt={artist.name}></img>

            <div className="artist-details">
                <h2>{artist.name}</h2>
                <p className="artist-bio">{artist.bio}</p>
                <p>Ouvintes: {artist.listeners}</p>
                <p>Reproduções: {artist.streams}</p>
            </div>
        </section>
    );
}

export default InfoArtist;