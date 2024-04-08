import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { SalesController } from "@/controller/SalesController"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { ISales } from "@/interface/ISales"
import { IStore } from "@/interface/IStore"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { TbReload } from "react-icons/tb"

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
      setSales(respSales.reverse())
    }
  }

  function reloadTableHistoric() {
    setSales(undefined)
    load()
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
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Histórico de Vendas</h2>
        <Button variant={"outline"} onClick={reloadTableHistoric} size={"sm"} className="flex gap-2">
          <TbReload className="text-lg" />
          Recarregar
        </Button>
      </div>
      <Card className="flex flex-col w-full px-6 py-3 gap-3">

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
      </Card>

    </>
  )
}
export default TableHistoric