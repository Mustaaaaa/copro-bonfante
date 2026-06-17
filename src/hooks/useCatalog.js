import { useState, useEffect } from 'react';
import { fetchCatalog } from '../features/categories/services/categoryService';

export function useCatalog() {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCatalog()
      .then(data => {
        setCatalog(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return { catalog, isLoading };
}