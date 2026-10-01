import "../styles/ArtistCard.css";

function ArtistCard({ name, image, listeners, onSelect }) {
    return (
        <article className="artist-card">
            {image ? (
                <img className="artist-card-image" src={image} alt={name} />
            ) : (
                <div className="artist-card-image" aria-hidden="true" />
            )}

            <div className="artist-card-content">
                <h3 title={name}>{name}</h3>
                {listeners && <p>{listeners} ouvintes</p>}
                <button type="button" onClick={() => onSelect(name)}>Ver detalhes</button>
            </div>
        </article>
    );
}

export default ArtistCard;