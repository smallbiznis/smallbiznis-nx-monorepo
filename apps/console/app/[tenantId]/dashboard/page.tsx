'use client'

import React from "react"
import {
  DollarSign,
  Users,
  FileText,
  Activity,
  ArrowUpRight,
  Plus,
  Key,
  Shield,
  Download,
  TrendingUp
} from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
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
import { Avatar, AvatarFallback } from "@smallbiznis/ui/avatar"
import { Separator } from "@smallbiznis/ui/separator"

const stats = [
  {
    label: "Monthly Recurring Revenue",
    value: "$124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-stripe-50 to-stripe-100"
  },
  {
    label: "Active Customers",
    value: "1,248",
    change: "+8 new",
    trend: "up",
    icon: Users,
    color: "from-info-50 to-info-100"
  },
  {
    label: "Invoices (Dec)",
    value: "156",
    change: "$45.2K total",
    trend: "neutral",
    icon: FileText,
    color: "from-warning-50 to-warning-100"
  },
  {
    label: "Usage This Month",
    value: "2.4M",
    change: "events",
    trend: "neutral",
    icon: Activity,
    color: "from-success-50 to-success-100"
  }
]

const recentInvoices = [
  {
    id: "inv_1",
    number: "INV-2024-001",
    customer: "Acme Corp",
    amount: "$299.00",
    status: "paid",
    date: "Dec 7, 2024"
  },
  {
    id: "inv_2",
    number: "INV-2024-002",
    customer: "Beta Inc",
    amount: "$890.00",
    status: "open",
    date: "Dec 6, 2024"
  },
  {
    id: "inv_3",
    number: "INV-2024-003",
    customer: "Gamma Tech",
    amount: "$2,100.00",
    status: "paid",
    date: "Dec 5, 2024"
  }
]

const quickActions = [
  {
    title: "Create Customer",
    description: "Add new account",
    icon: Users,
    color: "primary"
  },
  {
    title: "New Subscription",
    description: "Start subscription",
    icon: Activity,
    color: "success"
  },
  {
    title: "Record Usage",
    description: "Submit events",
    icon: TrendingUp,
    color: "info"
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here's what's happening with your billing.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-linear-to-br ${stat.color} transition-colors`}>
                  <stat.icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>
                {stat.trend === "up" && (
                  <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-success-50 text-success-700">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                {stat.trend !== "up" && (
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Latest billing activity</CardDescription>
              </div>
              <Button variant={"ghost"} size="sm" className="gap-1">
                View all
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-muted">
                          <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{invoice.number}</div>
                          <div className="text-xs text-muted-foreground">{invoice.date}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell className="font-semibold">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={invoice.status === "paid" ? "default" : "destructive"}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 hover:border-primary hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`p-2 rounded-lg bg-${action.color}/10 text-${action.color}`}>
                    <action.icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-muted-foreground" />
              <CardTitle>API Keys</CardTitle>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border border-border flex items-center justify-between hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-muted">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <code className="font-mono text-sm bg-muted px-2.5 py-1 rounded font-medium">
                    sb_live_abc123...
                  </code>
                  <Badge variant={"default"}>Active</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Production Key · Created Dec 1, 2024
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" title="Download">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}