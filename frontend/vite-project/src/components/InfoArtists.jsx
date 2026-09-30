function InfoArtist() {
    // No início são usados dados fictícios temporariamwnte
    const artist = {
        name: "Taylor Swift",
        image: "https...",
        bio: "Cantora e compositora",
        listeners: "1.000.000",
        streams: "5.000.000"
    }

    return(
        <section className="info-artist">
            <img className="artist-img" src={artist.image} alt={artist.name}></img>

            <div className="artist-details">
                <h2>{artist.name}</h2>
                <p>{artist.bio}</p>
                <p>Ouvintes: {artist.listeners}</p>
                <p>Reproduções: {artist.streams}</p>
            </div>
        </section>
    );
}

export default InfoArtist;