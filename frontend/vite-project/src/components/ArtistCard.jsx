import "../styles/ArtistCard.css";
const FALLBACK_IMAGE = "/images/artist-placeholder.svg";

function ArtistCard({ name, image, listeners, onSelect }) {
    return (
        <article className="artist-card">
            <img
                className="artist-card-image"
                src={image || FALLBACK_IMAGE}
                alt={`Imagem de ${name}`}
                onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = FALLBACK_IMAGE;
                }}
            />

            <div className="artist-card-content">
                <h3 title={name}>{name}</h3>
                {listeners && <p>{listeners} ouvintes</p>}
                <button type="button" onClick={() => onSelect(name)}>Ver detalhes</button>
            </div>
        </article>
    );
}

export default ArtistCard;