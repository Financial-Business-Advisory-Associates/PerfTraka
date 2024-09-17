import { useState, useEffect } from 'react';

function useDebouncedSearch(
  searchFunction: (searchTerm: string) => Promise<any[]>,
  delay: number
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchTerm) {
        try {
          const results = await searchFunction(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchFunction, delay]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    searchResults,
    handleSearch,
  };
}

export default useDebouncedSearch;
