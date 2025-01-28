"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FELLOWSHIP_THEMES, FELLOWSHIP_CATEGORIES } from "@/app/config/fellowships";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative h-full bg-gray-50 border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-100"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div className="p-4">
        <Link href="/" className={cn(
          "block font-semibold text-lg mb-6",
          isCollapsed ? "text-center" : ""
        )}>
          {isCollapsed ? "F" : "Fellowships"}
        </Link>

        <nav className="space-y-6">
          {Object.entries(FELLOWSHIP_CATEGORIES).map(([categoryKey, category]) => (
            <div key={categoryKey} className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-3">
                  {category.title}
                </h3>
              )}
              <div className="space-y-1">
                {category.fellowships.map((fellowshipKey) => {
                  const fellowship = FELLOWSHIP_THEMES[fellowshipKey];
                  const isActive = pathname === `/${fellowshipKey}`;
                  return (
                    <Link
                      key={fellowshipKey}
                      href={`/${fellowshipKey}`}
                      style={{
                        '--fellowship-color': fellowship.color,
                        '--fellowship-hover-color': fellowship.hoverColor,
                      } as React.CSSProperties}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-colors",
                        isCollapsed ? "justify-center" : "",
                        isActive
                          ? "bg-[var(--fellowship-color)] text-white"
                          : "hover:bg-[var(--fellowship-hover-color)] hover:bg-opacity-10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          "bg-[var(--fellowship-color)]",
                          isActive && "bg-white"
                        )}
                      />
                      {!isCollapsed && (
                        <span className="ml-3">{fellowship.shortName}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
} 