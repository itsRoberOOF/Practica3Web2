/*
    Componente para mostrar una lista de peliculas
    @param {Object[]} movies - Lista de peliculas a renderizar
    @param {Function} onSelectMovie - Funcion q se ejecuta al seleccionar una pelicula
*/

export const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
};

/*
    Componente para mostrar los detalles basicos de una pelicula
    @param {Object} movie - Datos de la pelicula
    @param {Function} onSelectMovie - Funcion q se ejecuta al seleccionar una pelicula
*/
export const Movie = ({ movie, onSelectMovie }) => {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};
