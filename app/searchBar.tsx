"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { FELLOWSHIP_THEMES } from './config/fellowships';
import type { FellowshipKey } from './config/fellowships';

// Update badges based on common themes across fellowships
export const BADGES = [
    'AI', 'Climate', 'Education', 'Healthcare', 'Robotics', 
    'Startups', 'Research', 'Software', 'Impact', 'Innovation'
];

interface SearchBarProps {
    setLoadingTrue: () => void;
    fellowship: FellowshipKey;
    theme: typeof FELLOWSHIP_THEMES[FellowshipKey];
}

export default function SearchBar({ setLoadingTrue, fellowship, theme }: SearchBarProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();
    const params = new URLSearchParams(searchParams);

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

    function handleSearch(term: string) {
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        push(`${pathname}?${params.toString()}`);
        setSearchTerm(term);
        setLoadingTrue();
    }

    const isHomePage = pathname === '/';

    return (
        <>
            <p className="mb-4 text-sm">
                {isHomePage 
                    ? "Discover talented individuals across multiple prestigious fellowship programs. From entrepreneurs and researchers to innovators and change-makers."
                    : theme.description
                }
            </p>
            <p className="mb-4 text-sm">
                This search uses semantic similarity to find relevant results - you don&apos;t need to get the exact keywords right.
                Try searching for any of these topics:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {BADGES.map((badgeText) => (
                    <button
                        key={badgeText}
                        className={`badge ${badgeVariants({ variant: "secondary" })}`}
                        onClick={() => handleSearch(badgeText)}
                    >
                        {badgeText}
                    </button>
                ))}
            </div>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    handleSearch(searchTerm);
                }} className="flex">
                    <Input
                        className="flex-1 mr-2"
                        placeholder={isHomePage ? "Search across all fellowships..." : "Search project descriptions..."}
                        name="query"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </>
    )
}