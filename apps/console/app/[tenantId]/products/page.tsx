'use client'

import React, { useState } from "react"
import { Package, Plus, Edit, Trash2, DollarSign } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"
import { Badge } from "@smallbiznis/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@smallbiznis/ui/tabs"

interface Product {
  id: string
  name: string
  code: string
  active: boolean
  prices: number
}

interface Price {
  id: string
  product: string
  type: 'flat' | 'tiered' | 'per-unit'
  amount: string
  interval: 'month' | 'year'
  tiers: number
}

const mockProducts: Product[] = [
  { id: "prod_1", name: "API Access", code: "api-access", active: true, prices: 3 },
  { id: "prod_2", name: "Storage", code: "storage", active: true, prices: 2 },
  { id: "prod_3", name: "Support Plan", code: "support", active: false, prices: 1 },
  { id: "prod_4", name: "Compute", code: "compute", active: true, prices: 2 },
]

const mockPrices: Price[] = [
  { id: "price_1", product: "API Access", type: "flat", amount: "$99", interval: "month", tiers: 0 },
  { id: "price_2", product: "API Access", type: "tiered", amount: "Usage-based", interval: "month", tiers: 3 },
  { id: "price_3", product: "Storage", type: "per-unit", amount: "$0.10/GB", interval: "month", tiers: 0 },
  { id: "price_4", product: "Support Plan", type: "flat", amount: "$499", interval: "year", tiers: 0 },
  { id: "price_5", product: "Compute", type: "per-unit", amount: "$0.05/hour", interval: "month", tiers: 0 },
]

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products & Prices</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Define your products and configure pricing models
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="products" className="gap-2">
            <Package className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="prices" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Prices
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Define your sellable products and services
                  </CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Code: {product.code} · {product.prices} price(s)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={product.active ? "outline" : "default"}>
                      {product.active ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-error-50 hover:text-error-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prices Tab */}
        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prices</CardTitle>
                  <CardDescription>
                    Configure pricing models and billing intervals
                  </CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Price
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPrices.map((price) => (
                <div
                  key={price.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-stripe-50">
                      <DollarSign className="w-5 h-5 text-stripe-600" />
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Product</div>
                        <div className="font-medium text-sm">{price.product}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Model</div>
                        <div className="font-medium text-sm capitalize">{price.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Amount</div>
                        <div className="font-medium text-sm">{price.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Billing</div>
                        <div className="font-medium text-sm capitalize">{price.interval}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {price.tiers > 0 && (
                      <Badge variant="default" className="bg-info-50 text-info-700">
                        {price.tiers} tier(s)
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-error-50 hover:text-error-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-info-50 border-info-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-info-100">
                  <DollarSign className="w-5 h-5 text-info-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-info-900 mb-1">
                    Pricing Models
                  </h3>
                  <p className="text-sm text-info-700 leading-relaxed">
                    <strong>Flat:</strong> Fixed price per billing interval. <strong>Tiered:</strong> Different rates based on usage volume. <strong>Per Unit:</strong> Pay for what you use, per unit consumed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}