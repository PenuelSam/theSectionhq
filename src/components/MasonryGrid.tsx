type MasonryGridProps = {
    children: React.ReactNode;
    columns?: number;
}

export default function MasonryGrid({ children, columns = 3 }: MasonryGridProps) {
    return (
        <div className="gap-2 [column-gap:1.5rem]"
            style={{
                columnCount: columns,
                columnGap: '1.5rem',
            }}>
            {children}
        </div>
    );
}