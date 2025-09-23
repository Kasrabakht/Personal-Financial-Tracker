import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useFinancialRecords } from "../Context/financialrecord-context"; // <- make sure this path/casing matches

export default function FinancialRecordList() {
  const { records } = useFinancialRecords();

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ getValue }) => {
          const v = getValue();
          return v ? new Date(v).toLocaleDateString() : "";
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: ({ getValue }) => String(getValue() ?? ""),
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const n = Number(getValue() ?? 0);
          return n.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
      {
        header: "Method",
        accessorKey: "paymentMethod",
        cell: ({ getValue }) => String(getValue() ?? ""),
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => String(getValue() ?? ""),
      },
    ],
    []
  );

  const table = useReactTable({
    data: records || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No records yet</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
