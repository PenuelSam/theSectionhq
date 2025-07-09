import React, { forwardRef } from "react";

type MasonryGridProps = {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  style?: React.CSSProperties;
};

const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ children, columns = 3, className = "", style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`gap-2 [column-gap:1.5rem] ${className}`}
        style={{
          columnCount: columns,
          columnGap: "1.5rem",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";

export default MasonryGrid;
