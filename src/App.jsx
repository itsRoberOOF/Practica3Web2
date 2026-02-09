import { useEffect, useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import {
    WatchedMoviesContainer,
    WatchedMoviesList,
    WatchedSummary,
} from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

// Componente principal de la aplicación
export default function App() {
    // Estado para la búsqueda de películas
    const [query, setQuery] = useState("");

    // Obtiene películas basadas en la query
    const { movies, isLoading, error } = useFetchMovies(query);

    // Estado de películas vistas
    const [watched, setWatched] = useState(() => {
        const storedWatched = localStorage.getItem("watched");
        return storedWatched ? JSON.parse(storedWatched) : [];
    });

    // Estado para la película seleccionada
    const [selectedId, setSelectedId] = useState(null);

    //Use effect para actualizar localstorage
    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    /**
     * Función para manejar la selección de una película.
     * @param {string} id - ID de la película seleccionada.
     */
    function handleSelectMovie(id) {
        setSelectedId(id);
    }

    /**
     * Función para cerrar los detalles de la película.
     */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /**
     * Función para agregar una película a la lista de "vistas".
     * @param {Object} movie - Película a agregar.
     */
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        const updatedWatched = watched.filter((movie) => movie.imdbID !== id);
        setWatched(updatedWatched);
    }

    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Nav>
            <main className="main">
                <Box>
                    {isLoading && <p className="loader">Cargando...</p>}
                    {error && <p className="error">⛔ {error}</p>}
                    <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectMovie}
                    />
                </Box>
                <Box>
                    <WatchedMoviesContainer>
                        {selectedId ? (
                            <MovieDetails
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            />
                        ) : (
                            <>
                                <WatchedSummary watched={watched} />
                                <WatchedMoviesList
                                    watched={watched}
                                    onDeleteWatched={handleDeleteWatched}
                                />
                            </>
                        )}
                    </WatchedMoviesContainer>
                </Box>
            </main>
        </>
    );
}
