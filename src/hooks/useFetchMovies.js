import { use, useEffect, useState } from "react";

//Clave API 
export const API_KEY = "11c01e41";

//Hook para obtener peliculas de la API de OMDb
/*
@param {string} query → termino de busqueda ingresado por el usuario
@returns {object} → objeto con los resultados de la busqueda (movies, isLoading, error)
- movies (lista de peliculas obtenida de la API)
- isLoading (estado de carga de la petición)
- error (mensaje de error en caso de fallo)
*/

export function useFetchMovies(query) {
    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        //Si la query tiene menos de 3 caracteres, error y limpiar resultados
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        //Funcion asincrona para obtener las peliculas de la API
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError(null);

                //Peticion
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);

                //Verificar response
                if (!response.ok) {
                    throw new Error("Error al cargar las películas");
                }

                const data = await response.json();

                // Si la API devuelve un error, lanzar una excepción
                if (data.Response === "False") {
                    throw new Error("No se encontraron resultados");
                }

                setMovies(data.Search);
            } catch (err) {
                //Manejo de errores (guardar mensaje y limpiar lista de pelis)
                setError(err.message);
                setMovies([]);
            } finally {
                //Detener el estado de carga sin importar el resultado
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    return { movies, isLoading, error };
}