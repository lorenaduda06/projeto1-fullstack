import ArtistCard from "./ArtistCard";
import "../styles/ArtistList.css";

function ArtistList({ artists, onSelect }) {
    return (
        <section className="artist-results">
            <div className="results-heading">
                <h2>Resultados</h2>
                <span>{artists.length} artistas</span>
            </div>

            <div className="artist-grid">
                {artists.map((a) => (
                    <ArtistCard key={a.name} {...a} onSelect={onSelect} />
                ))}
            </div>
        </section>
    );
}

export default ArtistList;