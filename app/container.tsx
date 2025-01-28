"use client"

import SearchBar from "./searchBar"
import WinnersTable from "./winnersTable"
import { Winner, columns } from "./columns"
import { useState, useEffect, useMemo } from "react"
import { getSortedData } from './utils/getSortedData'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FELLOWSHIP_THEMES } from './config/fellowships';
import type { FellowshipKey } from './config/fellowships';

async function fetchSimilarity(query: string) {
    const API_URL = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/similarity?query='
      : '/api/similarity?query=';
  
    try {
      const response = await fetch((API_URL + query), { cache: 'no-store' });
      const data = await response.json();
      // console.log(data); // Log the response
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

interface ContainerProps {
    data: any[];
}

export default function Container({ data }: ContainerProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const arr: number[] = []
    
    const [embedding, setEmbedding] = useState(arr)
    const [renderedData, setRenderedData] = useState(data);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fellowship = pathname.slice(1) as FellowshipKey;
    const theme = FELLOWSHIP_THEMES[fellowship];

    const setLoadingTrue = () => {
        setLoading(true);
    }
    
    useEffect(() => {
        const q = params.get('query') || '';
        if (q !== '') {
            setLoading(true);
            setQuery(q);
    
            // Fetch similarity and then update data
            fetchSimilarity(q)
                .then((res) => {
                    setEmbedding(res.message);
    
                    // Once embedding is available, sort and set data
                    setRenderedData(getSortedData(data, res.message));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching similarity:', error);
                });
        }
    }, [params, data]); // dependencies
    

    return(
        <>
            <div 
                className="p-4 rounded-lg mb-6 text-black"
                style={{ backgroundColor: `${theme.color}15` }}
            >
                <SearchBar setLoadingTrue={setLoadingTrue} fellowship={fellowship} theme={theme} />
            </div>
            {loading ? (
                <div className="text-center py-8">Loading results...</div>
            ) : (
                <WinnersTable
                    columns={theme.columns}
                    data={renderedData}
                    query={query}
                />
            )}
        </>
    )
}