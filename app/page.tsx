"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FELLOWSHIP_THEMES, FELLOWSHIP_CATEGORIES } from './config/fellowships';
import SearchBar from "./searchBar";
import Footer from "./footer";
import PreviewTable from './components/previewTable';
import type { FellowshipKey } from './config/fellowships';
import { getSortedData } from './utils/getSortedData';

export default function Page() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Record<FellowshipKey, any>>({
    ev: [],
    zFellows: [],
    thiel: [],
    neo: [],
    sts: [],
    kp: [],
    cameron: [],
    rise: []
  });
  const [searchResults, setSearchResults] = useState<Record<FellowshipKey, any>>(data);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchPromises = Object.keys(FELLOWSHIP_THEMES).map(async (fellowship) => {
          const response = await fetch(`/api/${fellowship}`);
          return [fellowship, await response.json()];
        });

        const results = await Promise.all(fetchPromises);
        const initialData = results.reduce((acc, [fellowship, data]) => {
          acc[fellowship as FellowshipKey] = data;
          return acc;
        }, {} as Record<FellowshipKey, any>);

        setData(initialData);
        setSearchResults(initialData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Handle search
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setIsLoading(true);
      const searchData = async () => {
        try {
          const response = await fetch(`/api/similarity?query=${encodeURIComponent(query)}`);
          const { message: embedding } = await response.json();
          
          // Sort data for each fellowship
          const newResults = Object.entries(data).reduce((acc, [key, fellowshipData]) => {
            acc[key as FellowshipKey] = getSortedData(fellowshipData, embedding);
            return acc;
          }, {} as Record<FellowshipKey, any>);
          
          setSearchResults(newResults);
        } catch (error) {
          console.error('Error searching:', error);
        } finally {
          setIsLoading(false);
        }
      };
      searchData();
    } else {
      setSearchResults(data);
    }
  }, [searchParams, data]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Where are they now?</h1>
        <div className="flex space-x-4">
          <a href="#footer" className="font-bold">
            about
          </a>
          <a className="font-bold" href="https://github.com/brianlzhou/wherearetheynow">
            github
          </a>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Search Across All Fellowships</h2>
        <SearchBar 
          setLoadingTrue={() => setIsLoading(true)} 
          fellowship="ev" 
          theme={FELLOWSHIP_THEMES.ev}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading results...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(FELLOWSHIP_CATEGORIES).map(([categoryKey, category]) => (
            <div key={categoryKey}>
              <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.fellowships.map((fellowshipKey) => (
                  <PreviewTable
                    key={fellowshipKey}
                    fellowship={fellowshipKey}
                    theme={FELLOWSHIP_THEMES[fellowshipKey]}
                    data={searchResults[fellowshipKey]?.slice(0, 3) || []}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div id="footer" className="text-gray-500 mt-8 w-4/5">
        <Footer />
      </div>
    </div>
  );
}