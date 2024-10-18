import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(url, config);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetch;
