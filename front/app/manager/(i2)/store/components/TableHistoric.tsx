import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { FlavorsController } from "@/controller/FlavorsController"
import { RevenueController } from "@/controller/RevenueController"
import { SalesController } from "@/controller/SalesController"
import { StockController } from "@/controller/StockController"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { ISales } from "@/interface/ISales"
import { IStore } from "@/interface/IStore"
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

interface TableHistoric {
  store: IStore
  revenue: IRevenueStore
}
type SalesTable = {
  name: string
  quantity: number
  price: number
  date: Date
}
const TableHistoric = ({ store, revenue }: TableHistoric) => {
  const [sales, setSales] = useState<ISales[]>()
  useEffect(() => {
    if (store) {
      load()
    }
  }, [store])

  async function load() {
    const respSales = await SalesController.getAllByRevenueId(revenue.id)
    if (respSales) {
      setSales(respSales)
    }
  }

  const columns: ColumnDef<SalesTable>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    }, {
      accessorKey: "quantity",
      header: "Quantidade",
    }, {
      accessorKey: "price",
      header: "Valor",
      cell: ({ row }) => {
        const price = row.getValue("price") as number
        return <div>R${price.toFixed(2).replace(".", ",")}</div>
      }
    }, {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => {
        const date = dayjs(row.getValue("date")).format("DD/MM/YY")
        const time = dayjs(row.getValue("date")).format("HH:mm:ss")
        return <div>{date} às {time}</div>
      }
    },
  ]

  const table = useReactTable({
    data: sales!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <>
      {sales ?
        <div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sem resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end gap-3">
            <Button variant={"outline"} size={"sm"} onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>Anterior</Button>
            <Button variant={"outline"} size={"sm"} onClick={table.nextPage} disabled={!table.getCanNextPage()}>Próximo</Button>
          </div>
        </div>
        :
        <Label>Não há histórico de vendas no momento!</Label>
      }
    </>
  )
}
export default TableHistoric