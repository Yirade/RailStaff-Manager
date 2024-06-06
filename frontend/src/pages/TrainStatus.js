import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TrainStatus() {
    const [trainStatuses, setTrainStatuses] = useState([]);

    useEffect(() => {
        const fetchTrainStatuses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/trainStatus");
                setTrainStatuses(response.data);
            } catch (error) {
                console.error("Errore nel recupero degli stati dei treni:", error);
            }
        };

        fetchTrainStatuses();
    }, []);

    return (
        <div>
            <h1>Stati dei Treni</h1>
            <ul>
                {trainStatuses.map((status, index) => (
                    <li key={status[0]}> {/* Usa il primo elemento dell'array come chiave unica */}
                        {status[1]} {/* Usa il secondo elemento dell'array come nome dello stato */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
