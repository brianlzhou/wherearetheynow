"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { FELLOWSHIP_THEMES } from "../config/fellowships";
import type { FellowshipKey } from "../config/fellowships";
import Container from "../container";

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

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
  const isLight = isLightColor(theme.color);

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
          <a href="#footer" className="text-blue-600">
            about
          </a>
          <a className="text-blue-600" href="https://github.com/nqureshi/wherearetheynow">
            github
          </a>
        </div>
      </div>
      
      <div 
        className="p-6 rounded-lg mb-8"
        style={{ 
          backgroundColor: `${theme.color}15`,
          color: isLight ? '#1a1a1a' : '#ffffff'
        }}
      >
        <p className="text-current">
          {theme.description}
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <Container data={data} />
      )}
    </div>
  );
} 