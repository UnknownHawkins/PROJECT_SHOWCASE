import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T extends { id: string | number }>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-auto border border-border rounded-lg", className)}>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={cn("px-6 py-3 font-medium", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="bg-card border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              {columns.map((col, i) => (
                <td key={i} className={cn("px-6 py-4", col.className)}>
                  {typeof col.accessor === "function" ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
