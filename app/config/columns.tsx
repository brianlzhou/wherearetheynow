"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EVWinner, ThielFellow, ZFellow, NeoScholar, STSScholar, KPFellow, CameronScholar, RiseScholar } from "../types/fellowships";
import Link from "next/link";
import React, { useState } from "react";

const formatLink = (link: string | null | undefined) => {
  if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
    return `https://${link}`;
  }
  return link || undefined;
};

const formatSocialLink = (username: string | null | undefined, platform: 'twitter' | 'linkedin' | 'github'): string | undefined => {
  if (!username) return undefined;
  const baseUrls = {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/'
  };
  return `${baseUrls[platform]}${username.replace('@', '')}`;
};

function DetailsCell({ fellow }: { fellow: ThielFellow }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 hover:text-blue-800"
      >
        {isOpen ? "Hide" : "Show"} Details
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2 text-sm">
          {fellow.school && (
            <p><span className="font-semibold">School:</span> {fellow.school}</p>
          )}
          {fellow.project_area && (
            <p><span className="font-semibold">Project Area:</span> {fellow.project_area}</p>
          )}
          {fellow.company_name && (
            <p><span className="font-semibold">Company:</span> {fellow.company_name}</p>
          )}
          <div className="flex gap-2 mt-1">
            {fellow.twitter && (
              <a 
                href={formatSocialLink(fellow.twitter, 'twitter')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
            )}
            {fellow.linkedin && (
              <a 
                href={formatSocialLink(fellow.linkedin, 'linkedin')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const evColumns: ColumnDef<EVWinner>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "batch",
    header: "Cohort",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = formatLink(row.original.link);
      return link ? <a className="underline" href={link} target="_blank" rel="noopener noreferrer">Link</a> : null;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export const thielColumns: ColumnDef<ThielFellow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "batch",
    header: "Class",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => <DetailsCell fellow={row.original} />,
  },
];

export const zFellowsColumns: ColumnDef<ZFellow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "batch",
    header: "Cohort",
  },
  {
    accessorKey: "startup_idea",
    header: "Startup Idea",
  },
  {
    accessorKey: "tech_stack",
    header: "Tech Stack",
    cell: ({ row }) => row.original.tech_stack?.join(", "),
  },
  {
    id: "social",
    header: "Links",
    cell: ({ row }) => {
      const githubLink = formatSocialLink(row.original.github, 'github');
      const twitterLink = formatSocialLink(row.original.twitter, 'twitter');
      const linkedinLink = formatSocialLink(row.original.linkedin, 'linkedin');
      const websiteLink = formatLink(row.original.personal_website);
      return (
        <div className="flex gap-2">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {twitterLink && (
            <a href={twitterLink} target="_blank" rel="noopener noreferrer">Twitter</a>
          )}
          {linkedinLink && (
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
          {websiteLink && (
            <a href={websiteLink} target="_blank" rel="noopener noreferrer">Website</a>
          )}
        </div>
      );
    },
  },
];

export const neoColumns: ColumnDef<NeoScholar>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "batch",
    header: "Batch",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export const stsColumns: ColumnDef<STSScholar>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "batch",
    header: "Year",
  },
  {
    accessorKey: "project_title",
    header: "Project Title",
  }
];

export const kpColumns: ColumnDef<KPFellow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "batch",
    header: "Year",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "company",
    header: "Company",
  }
];

export const cameronColumns: ColumnDef<CameronScholar>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "batch",
    header: "Year",
  },
  {
    accessorKey: "impact_area",
    header: "Impact Area",
  },
  {
    accessorKey: "project_description",
    header: "Project Description",
  }
];

export const riseColumns: ColumnDef<RiseScholar>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
  {
    accessorKey: "batch",
    header: "Year",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "project_area",
    header: "Project Area",
  }
]; 