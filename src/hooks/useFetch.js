import { useEffect, useState, useRef } from "react";

// Generic data-fetching hook.

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    setError("");
    Promise.resolve()
      .then(fetcher)
      .then((res) => { if (mounted.current) setData(res); })
      .catch((e) => {
        if (mounted.current) setError(e?.message || "Failed to load data");
      })
      .finally(() => mounted.current && setLoading(false));
    return () => { mounted.current = false; };
  }, deps);

  return { data, loading, error };
}
