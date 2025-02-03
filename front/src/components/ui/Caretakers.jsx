import React, { useEffect, useState } from 'react';
import CaretakerCardSkeleton from './SkeletonCard';
import CaretakerCard from './CaretakerCard';
import getCaretakers from "../../api/apiCaretakers";

export default function Caretakers({ neighborhood }) {
    const [caretakers, setCaretakers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const updateFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    useEffect(() => {
        
        const fetchCaretakers = async () => {
            setIsLoading(true);
            try {
                const data = await getCaretakers(filters || {});
                setIsLoading(false);
                setCaretakers(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCaretakers();
    }, [filters]);

    useEffect(() => {
        if (neighborhood && neighborhood.neighborhood !== "") {
            updateFilter('neighborhood', neighborhood.neighborhood || "");
        } else {
            const prevFilters = { ...filters };
            delete prevFilters.neighborhood;
            setFilters(prevFilters);
        }
    }, [neighborhood]);

    return (
        <div className="positioncards">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <CaretakerCardSkeleton key={index} />
                ))
            ) : caretakers && caretakers.length > 0 ? (
                caretakers.map((caretaker) => (
                    <CaretakerCard key={caretaker._id} caretaker={caretaker} />
                ))
            ) : (
                <h1>No hay cuidadores disponibles</h1>
            )}
        </div>
    );
}
