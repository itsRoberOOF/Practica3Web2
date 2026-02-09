import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies";

/*
    Hook personalizado para obtener los detalles de una peli
    @param {string} selectedId → ID de la película a buscar
    @returns {object} → objeto con los detalles de la película
    - movie (detalles de la peli)
    - isLoading (estado de carga de la petición)
    - error (mensaje de error en caso de fallo)
*/

export function useFetchMovieDetails(selectedId) {
    const [movie, setMovie] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        //Si no hay id seleccionado, limpiar el estado
        if (!selectedId) {
            setMovie({});
            setError("");
            return;
        }

        async function fetchMovieDetails(selectedId) {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);

                if (!response.ok) {
                    throw new Error("Error al cargar los detalles de la película");
                }

                const data = await response.json();

                setMovie(data);
            } catch (error) {
                setError(error.message);
                setMovie({});
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovieDetails(selectedId);
    }, [selectedId]);

    return { movie, isLoading, error };
}