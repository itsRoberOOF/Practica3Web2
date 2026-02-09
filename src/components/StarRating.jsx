import { useState } from "react";

// Estilos generales del contenedor de estrellas
const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

// Estilos del contenedor de estrellas individuales
const starContainerStyle = {
    display: "flex",
    gap: "4px",
};
/**
 * Componente que muestra un sistema de calificación con estrellas.
 * @param {Object} props
 * @param {number} props.maxRating - Número máximo de estrellas (por defecto 5).
 * @param {string} props.color - Color de las estrellas (por defecto '#fcc419').
 * @param {number} props.size - Tamaño de las estrellas en píxeles (por defecto 30px).
 * @param {number} props.defaultRating - Calificación inicial seleccionada (por defecto 0).
 * @param {Function} props.onSetRating - Función que se ejecuta al seleccionar una calificación.
 */
export default function StarRating({
    maxRating = 5,
    color = "#fcc419",
    size = 30,
    defaultRating = 0,
    onSetRating,
}) {
    // Estilos del texto de calificación
    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size}px`,
    };

    // Estado para almacenar la calificacion seleccionada
    const [rating, setRating] = useState(defaultRating);

    // Estado temporal para manejar la calificación al pasar el mouse
    const [tempRating, setTempRating] = useState(0);
    /**
     * Maneja el evento de selección de una calificación.
     * @param {number} rating - Calificación seleccionada.
     */
    function handleRating(rating) {
        setRating(rating);
        onSetRating?.(rating); // Llama a la función de callback si está definida
    }
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={
                            tempRating ? tempRating >= i + 1 : rating >= i + 1
                        }
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}

/**
    Componente que representa una estrella individual
    @param {Object} props
    @param {boolean} props.full - Indica si la estrella está rellena o vacía.
    @param {Function} props.onRate - Función que se ejecuta al hacer clic en la estrella.
    @param {Function} props.onHoverIn - Función que se ejecuta al pasar el mouse sobre la estrella.
    @param {Function} props.onHoverOut - Función que se ejecuta al quitar el mouse de la estrella.
    @param {string} props.color - Color de la estrella.
    @param {number} props.size - Tamaño de la estrella en píxeles.
*/
function Star({ full, onRate, onHoverIn, onHoverOut, color, size }) {
    // Estilos de la estrella
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer",
    };
    return (
        <span
            role="button"
            style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {full ? (
                // Estrella rellena
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={color}
                    stroke={color}
                    strokeWidth="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                </svg>
            ) : (
                //Estrella vacía
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                </svg>
            )}
        </span>
    );
}
