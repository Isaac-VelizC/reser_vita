import { useState, useEffect } from 'react';

function usePersistedState<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
}

export default usePersistedState;
