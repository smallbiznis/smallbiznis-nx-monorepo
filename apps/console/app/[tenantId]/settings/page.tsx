'use client'

import React, { useState } from "react"
import { Settings, Key, CreditCard, Bell, Shield, Globe, Users, Building2, Save } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Input } from "@smallbiznis/ui/input"
import { Label } from "@smallbiznis/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"
import { Separator } from "@smallbiznis/ui/separator"
import { Switch } from "@smallbiznis/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@smallbiznis/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smallbiznis/ui/select"
import { Textarea } from "@smallbiznis/ui/textarea"
import { Badge } from "@smallbiznis/ui/badge"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your organization and billing preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Update your organization information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-slug">Organization Slug</Label>
                  <Input id="org-slug" defaultValue="acme-corp" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your organization"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="idr">IDR - Indonesian Rupiah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="wib">WIB - Jakarta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Test Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable test mode for development
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Live Key */}
                <div className="p-4 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-success-50">
                        <Key className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <div className="font-medium">Live API Key</div>
                        <p className="text-sm text-muted-foreground">
                          For production use
                        </p>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-3 py-2 rounded font-mono text-sm">
                      sb_live_•••••••••••••••abc123
                    </code>
                    <Button variant="outline" size="sm">Copy</Button>
                    <Button variant="outline" size="sm" variant="destructive">
                      Revoke
                    </Button>
                  </div>
                </div>

                {/* Test Key */}
                <div className="p-4 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning-50">
                        <Key className="w-5 h-5 text-warning-600" />
                      </div>
                      <div>
                        <div className="font-medium">Test API Key</div>
                        <p className="text-sm text-muted-foreground">
                          For development and testing
                        </p>
                      </div>
                    </div>
                    <Badge variant="warning">Test</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-3 py-2 rounded font-mono text-sm">
                      sb_test_•••••••••••••••xyz789
                    </code>
                    <Button variant="outline" size="sm">Copy</Button>
                    <Button variant="outline" size="sm" variant="destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Key className="w-4 h-4" />
                Generate New API Key
              </Button>

              <div className="p-4 rounded-lg bg-info-50 border border-info-200">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-info-700 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-info-900">
                      Keep your API keys secure
                    </p>
                    <p className="text-sm text-info-700">
                      Never share your secret API keys publicly. If you believe a key has been compromised, revoke it immediately.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Configuration</CardTitle>
              <CardDescription>
                Configure your billing and invoicing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Legal Name</Label>
                  <Input id="company-name" defaultValue="Acme Corporation Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" placeholder="XX-XXXXXXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input id="billing-email" type="email" defaultValue="billing@acme.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Billing Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Street address, City, State, ZIP"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Invoice Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-send invoices</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send invoices to customers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include PDF attachments</Label>
                    <p className="text-sm text-muted-foreground">
                      Attach PDF version to invoice emails
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Default Payment Terms</Label>
                  <Select defaultValue="net30">
                    <SelectTrigger id="payment-terms">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="due-on-receipt">Due on receipt</SelectItem>
                      <SelectItem value="net15">Net 15</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Invoice paid</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when an invoice is paid
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment failed</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a payment fails
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New customer</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a new customer signs up
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Subscription changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about subscription modifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Weekly Reports</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly revenue and usage reports
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage who has access to your organization
                  </CardDescription>
                </div>
                <Button className="gap-2">
                  <Users className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", email: "john@acme.com", role: "Owner", active: true },
                  { name: "Jane Smith", email: "jane@acme.com", role: "Admin", active: true },
                  { name: "Bob Wilson", email: "bob@acme.com", role: "Member", active: true },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>{member.role}</Badge>
                      {member.role !== "Owner" && (
                        <Button variant="ghost" size="sm" variant="destructive">
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}