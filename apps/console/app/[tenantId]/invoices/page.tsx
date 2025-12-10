'use client'

import React, { useState } from "react"
import { FileText, Plus, Download, Send, Eye, Calendar, Filter, Search } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Input } from "@smallbiznis/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"
import { Badge } from "@smallbiznis/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@smallbiznis/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smallbiznis/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@smallbiznis/ui/tabs"

interface Invoice {
  id: string
  number: string
  customer: string
  amount: number
  status: 'paid' | 'open' | 'draft' | 'void'
  dueDate: string
  paidDate?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "inv_1",
    number: "INV-2024-001",
    customer: "Acme Corp",
    amount: 29900,
    status: "paid",
    dueDate: "2024-12-15",
    paidDate: "2024-12-10"
  },
  {
    id: "inv_2",
    number: "INV-2024-002",
    customer: "Beta Inc",
    amount: 59900,
    status: "open",
    dueDate: "2024-12-20"
  },
  {
    id: "inv_3",
    number: "INV-2024-003",
    customer: "Gamma Tech",
    amount: 99900,
    status: "paid",
    dueDate: "2024-12-10",
    paidDate: "2024-12-08"
  },
  {
    id: "inv_4",
    number: "INV-2024-004",
    customer: "Delta Solutions",
    amount: 149900,
    status: "draft",
    dueDate: "2024-12-25"
  },
]

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusVariant = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'success'
      case 'open': return 'warning'
      case 'draft': return 'default'
      case 'void': return 'destructive'
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100)
  }

  const stats = {
    total: mockInvoices.length,
    paid: mockInvoices.filter(i => i.status === 'paid').length,
    open: mockInvoices.filter(i => i.status === 'open').length,
    draft: mockInvoices.filter(i => i.status === 'draft').length,
    totalAmount: mockInvoices.reduce((sum, i) => sum + i.amount, 0),
    paidAmount: mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage invoices for your customers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Invoices
                </p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Amount
              </p>
              <p className="text-2xl font-bold mt-2">{formatAmount(stats.totalAmount)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatAmount(stats.paidAmount)} collected
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Paid
              </p>
              <p className="text-2xl font-bold mt-2 text-success-600">{stats.paid}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatAmount(stats.paidAmount)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Open
              </p>
              <p className="text-2xl font-bold mt-2 text-warning-600">{stats.open}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting payment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>
                View and manage all your invoices
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[250px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.number}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell className="font-semibold">
                        {formatAmount(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}