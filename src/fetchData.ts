import { useEffect, useState } from 'react';
import { isError } from './utils';

function useFetchData<TResponse>(url: string) {

  const [data, setData] = useState<TResponse>();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        setIsFetching(false);
          const json = await response.json()
          setData(json);
      } catch (e : unknown) { 
        console.log(e);
        setIsFetching(false);
        if(isError(e)) {
          setError(e.message)
        }
      }
    };
    fetchData();
  }, [url]);

  return {data, isFetching, error};
}

export default useFetchData;