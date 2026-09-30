import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindArtists() {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    function send(e) {
        e.preventDefault();
        const nome = text.trim();
        if (!nome) return;

        navigate(`/info-artist?nome=${encodeURIComponent(nome)}`);
    }

    return (
        <main className="container-find-artists">
            <p>Encontre informações sobre seus artistas favoritos.</p>

            <section className="find-artists">
                <form onSubmit={send}>
                    <input
                        type="text"
                        placeholder="Digite o nome do artista"
                        value={text}
                        onChange={(evento) => setText(evento.target.value)} className="inp-search">
                    </input>
                    <button className="btn-search" >Buscar</button>
                </form>
            </section>
        </main>
    );
}

export default FindArtists;