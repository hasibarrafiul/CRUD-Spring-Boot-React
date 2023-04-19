import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        try {
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            "Could not fetch the data for that resource"
                        );
                    }
                    return res.json();
                })
                .then((res) => {
                    setData(res);
                    setLoading(false);
                    setError(null);
                });
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Fetch Aborted");
            } else {
                setLoading(false);
                setError(err.message);
            }
        }

        return () => abortCont.abort();
    }, [url]);

    return { data, loading, error };
}
