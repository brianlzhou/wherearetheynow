"use client";

import Link from "next/link";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FELLOWSHIP_THEMES } from "../config/fellowships";
import type { FellowshipKey } from "../config/fellowships";
import { Winner } from "../columns";

interface PreviewTableProps {
  fellowship: FellowshipKey;
  theme: typeof FELLOWSHIP_THEMES[FellowshipKey];
  data: Winner[];
}

export default function PreviewTable({ fellowship, theme, data }: PreviewTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div 
        className="p-4 border-b"
        style={{ backgroundColor: `${theme.color}15` }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold" style={{ color: theme.color }}>
            {theme.name}
          </h3>
          <Link
            href={`/${fellowship}`}
            className="text-sm hover:underline"
            style={{ color: theme.color }}
          >
            View all →
          </Link>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {theme.description}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item.description}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 