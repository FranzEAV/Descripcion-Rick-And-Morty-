import { useState, useEffect } from 'react';

const Descripcion = () => {
    const [movies, setMovies] = useState([]);
    const [modalCharacter, setModalCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = () => {
            fetch('https://rickandmortyapi.com/api/character')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    return response.json();
                })
                .then(data => {
                    setMovies(data.results);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        };

        fetchMovies();
    }, []);

    const openModal = (character) => {
        setModalCharacter(character);
    };

    const closeModal = () => {
        setModalCharacter(null);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div>
            <h1 className="titulo">Rick And Morty Personajes</h1>
            <div className="contenedor-peliculas">
                {movies.map((character) => (
                <div key={character.id} className="tarjeta-pelicula">
                    <h3>{character.name}</h3>
                    <img src={character.image} alt={character.name} className="imagen-personaje" />
                    <div className="datos-personaje">
                    <p><strong>Ubicación:</strong> {character.location.name}</p>
                    <p><strong>Primera aparición:</strong> {character.episode[0]}</p>
                    <p><strong>Tipo:</strong> {character.type}</p>
                    <p><strong>Estado:</strong> {character.status}</p>
                    </div>
                    <button onClick={() => openModal(character)}>Más información</button>
                </div>
                ))}
                {modalCharacter && (
                <div className="modal">
                    <div className="contenido-modal">
                    <span className="cerrar" onClick={closeModal}>&times;</span>
                    <h2>{modalCharacter.name}</h2>
                    <img src={modalCharacter.image} alt={modalCharacter.name} className="imagen-personaje" />
                    <p><strong>Ubicación:</strong> {modalCharacter.location.name}</p>
                    <p><strong>Primera aparición:</strong> {modalCharacter.episode[0]}</p>
                    <p><strong>Tipo:</strong> {modalCharacter.type}</p>
                    <p><strong>Estado:</strong> {modalCharacter.status}</p>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Descripcion;
