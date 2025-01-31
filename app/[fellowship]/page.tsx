"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { FELLOWSHIP_THEMES } from "../config/fellowships";
import type { FellowshipKey } from "../config/fellowships";
import Container from "../container";

interface FellowshipPageProps {
  params: {
    fellowship: string;
  };
}

export default function FellowshipPage({ params }: FellowshipPageProps) {
  const fellowship = params.fellowship as FellowshipKey;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  if (!FELLOWSHIP_THEMES[fellowship]) {
    notFound();
  }

  const theme = FELLOWSHIP_THEMES[fellowship];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`/api/${fellowship}`);
        const fellowshipData = await response.json();
        setData(fellowshipData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fellowship]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold" style={{ color: theme.color }}>
          {theme.name}
        </h1>
        <div className="flex space-x-4">
          {theme.footer && (
            <a href="#footer" className="font-bold" style={{ color: theme.color }}>
              about
            </a>
          )}
          <a className="font-bold" href="https://github.com/brianlzhou/wherearetheynow" style={{ color: theme.color }}>
            github
          </a>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <Container data={data} />
          {theme.footer && (
            <div id="footer" className="mt-8 text-gray-600">
              {theme.footer}
            </div>
          )}
        </>
      )}
    </div>
  );
} 