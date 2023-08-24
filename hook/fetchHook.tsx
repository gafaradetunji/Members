import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { MemberInfo } from '@/types';

export const api = 'https://jsonplaceholder.typicode.com/users';

const useFetch = (url: string) => {
  const [data, setData] = useState<MemberInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);


  return { data, loading, error };
}

export default useFetch;
