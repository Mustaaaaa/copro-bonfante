import { useState, useEffect } from 'react';
import { fetchProposals } from '../features/proposals/services/proposalService';

export function useProposals() {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProposals()
      .then(data => {
        setProposals(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return { proposals, isLoading };
}