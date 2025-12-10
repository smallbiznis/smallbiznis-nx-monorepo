'use client'

import React, { useEffect } from "react";
import { create } from "zustand";
import { 
  LayoutDashboard, 
  Users, 
  Repeat, 
  FileText, 
  TrendingUp, 
  Settings, 
  ChevronDown,
  Plus,
  ArrowUpRight,
  DollarSign,
  Activity,
  Key,
  Shield,
  Building2,
  Check,
  ExternalLink,
  MoreVertical,
  Download,
  RefreshCw,
  Filter,
  Package,
  Gauge,
  Edit,
  Trash2
} from "lucide-react";

export default function BillingDashboard() {

  return (
    // <div className="min-h-screen bg-muted/30 text-foreground flex">
    //   {/* Sidebar */}
    //   <aside className="w-64 border-r border-border bg-card flex flex-col shadow-sm">
    //     <div className="p-4 flex-1 flex flex-col">
    //       {/* Logo */}
    //       <div className="flex items-center gap-2.5 mb-6 px-2">
    //         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stripe-500 to-stripe-600 flex items-center justify-center shadow-sm">
    //           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    //           </svg>
    //         </div>
    //         <div>
    //           <div className="text-base font-bold tracking-tight">Acme Billing</div>
    //           <div className="text-xs text-muted-foreground">Revenue Platform</div>
    //         </div>
    //       </div>

    //       {/* Organization Switcher */}
    //       <div className="mb-4 relative">
    //         <button
    //           onClick={toggleOrgSwitcher}
    //           className="w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-left flex items-center justify-between group"
    //         >
    //           <div className="flex items-center gap-2.5 flex-1 min-w-0">
    //             <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
    //               <Building2 className="w-4 h-4 text-primary" />
    //             </div>
    //             <div className="flex-1 min-w-0">
    //               <div className="font-medium text-sm truncate">{currentOrg?.name}</div>
    //               <div className="text-xs text-muted-foreground capitalize">{currentOrg?.role}</div>
    //             </div>
    //           </div>
    //           <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showOrgSwitcher ? 'rotate-180' : ''}`} />
    //         </button>

    //         {showOrgSwitcher && (
    //           <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
    //             {organizations.map((org: any) => (
    //               <button
    //                 key={org.id}
    //                 onClick={() => setActiveOrg(org.id)}
    //                 className={`w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-muted/50 transition-colors text-left ${
    //                   activeOrg === org.id ? "bg-muted/30" : ""
    //                 }`}
    //               >
    //                 <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
    //                   <Building2 className="w-4 h-4 text-primary" />
    //                 </div>
    //                 <div className="flex-1 min-w-0">
    //                   <div className="font-medium text-sm truncate">{org.name}</div>
    //                   <div className="text-xs text-muted-foreground capitalize">{org.role}</div>
    //                 </div>
    //                 {activeOrg === org.id && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
    //               </button>
    //             ))}
    //             <div className="border-t border-border p-2">
    //               <button className="w-full px-3 py-2 text-sm font-medium text-primary hover:bg-muted/50 rounded-md transition-colors flex items-center gap-2">
    //                 <Plus className="w-4 h-4" />
    //                 <span>Add organization</span>
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </div>

    //       {/* Navigation */}
    //       <nav className="space-y-0.5 flex-1">
    //         {tabs.map((tab) => {
    //           const iconName = tab.icon;
    //           let Icon;
              
    //           // Handle string icon names
    //           if (iconName === "Package") Icon = Package;
    //           else if (iconName === "Gauge") Icon = Gauge;
    //           else Icon = iconName;
              
    //           return (
    //             <button
    //               key={tab.id}
    //               onClick={() => setActiveTab(tab.id)}
    //               className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 transition-all ${
    //                 activeTab === tab.id
    //                   ? "bg-primary text-primary-foreground font-medium shadow-sm"
    //                   : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    //               }`}
    //             >
    //               <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
    //               <span className="text-sm">{tab.label}</span>
    //             </button>
    //           );
    //         })}
    //       </nav>

    //       {/* Help Section */}
    //       <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
    //         <div className="flex items-start gap-2 mb-2">
    //           <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
    //             <ExternalLink className="w-3.5 h-3.5 text-primary" />
    //           </div>
    //           <div>
    //             <div className="text-xs font-semibold mb-0.5">Documentation</div>
    //             <div className="text-xs text-muted-foreground">Learn about our APIs</div>
    //           </div>
    //         </div>
    //         <button className="w-full text-xs text-primary hover:underline font-medium text-left">
    //           View docs →
    //         </button>
    //       </div>
    //     </div>

    //     {/* User Profile */}
    //     <div className="p-3 border-t border-border bg-muted/30">
    //       <div className="flex items-center gap-2.5 px-2 py-1.5">
    //         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stripe-500 to-stripe-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
    //           JD
    //         </div>
    //         <div className="flex-1 min-w-0">
    //           <div className="font-medium text-sm truncate">John Doe</div>
    //           <div className="text-xs text-muted-foreground truncate">john@acme.com</div>
    //         </div>
    //         <button className="p-1 hover:bg-muted rounded transition-colors">
    //           <MoreVertical className="w-4 h-4 text-muted-foreground" />
    //         </button>
    //       </div>
    //     </div>
    //   </aside>

    //   {/* Main Content */}
    //   <main className="flex-1 overflow-auto">
    //     {/* Top Bar */}
    //     <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
    //       <div className="flex items-center justify-between px-8 h-16">
    //         <div>
    //           <h1 className="text-lg font-semibold tracking-tight">
    //             {tabs.find(t => t.id === activeTab)?.label}
    //           </h1>
    //           <p className="text-xs text-muted-foreground">
    //             {currentOrg?.name}
    //           </p>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Refresh">
    //             <RefreshCw className="w-4 h-4 text-muted-foreground" />
    //           </button>
    //           <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Filter">
    //             <Filter className="w-4 h-4 text-muted-foreground" />
    //           </button>
    //           <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
    //             <Plus className="w-4 h-4" />
    //             Create
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="p-8 max-w-[1600px] mx-auto">
    //       {/* Loading State */}
    //       {isLoading && (
    //         <div className="flex items-center justify-center py-12">
    //           <RefreshCw className="w-6 h-6 text-primary animate-spin" />
    //         </div>
    //       )}

    //       {/* Content */}
    //       {!isLoading && activeTab === "overview" && (
    //         <div className="space-y-6">
    //           {/* Stats Grid */}
    //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    //             {/* MRR Card */}
    //             <div className="rounded-xl bg-card border border-border p-5 hover:shadow-md transition-shadow group">
    //               <div className="flex items-start justify-between mb-3">
    //                 <div className="p-2 rounded-lg bg-gradient-to-br from-stripe-50 to-stripe-100 group-hover:from-stripe-100 group-hover:to-stripe-200 transition-colors">
    //                   <DollarSign className="w-5 h-5 text-stripe-600" strokeWidth={2.5} />
    //                 </div>
    //                 <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-success-50 text-success-700">
    //                   <ArrowUpRight className="w-3 h-3" />
    //                   <span>{stats.mrr.change}%</span>
    //                 </div>
    //               </div>
    //               <div className="space-y-1">
    //                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly Recurring Revenue</p>
    //                 <p className="text-2xl font-bold tracking-tight">{stats.mrr.value}</p>
    //                 <p className="text-xs text-muted-foreground">vs last month</p>
    //               </div>
    //             </div>

    //             {/* Customers Card */}
    //             <div className="rounded-xl bg-card border border-border p-5 hover:shadow-md transition-shadow group">
    //               <div className="flex items-start justify-between mb-3">
    //                 <div className="p-2 rounded-lg bg-gradient-to-br from-info-50 to-info-100 group-hover:from-info-100 group-hover:to-info-200 transition-colors">
    //                   <Users className="w-5 h-5 text-info-600" strokeWidth={2.5} />
    //                 </div>
    //                 <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-success-50 text-success-700">
    //                   <Plus className="w-3 h-3" />
    //                   <span>{stats.customers.change}</span>
    //                 </div>
    //               </div>
    //               <div className="space-y-1">
    //                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Active Customers</p>
    //                 <p className="text-2xl font-bold tracking-tight">{stats.customers.value.toLocaleString()}</p>
    //                 <p className="text-xs text-muted-foreground">new this week</p>
    //               </div>
    //             </div>

    //             {/* Invoices Card */}
    //             <div className="rounded-xl bg-card border border-border p-5 hover:shadow-md transition-shadow group">
    //               <div className="flex items-start justify-between mb-3">
    //                 <div className="p-2 rounded-lg bg-gradient-to-br from-warning-50 to-warning-100 group-hover:from-warning-100 group-hover:to-warning-200 transition-colors">
    //                   <FileText className="w-5 h-5 text-warning-600" strokeWidth={2.5} />
    //                 </div>
    //               </div>
    //               <div className="space-y-1">
    //                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Invoices (Dec)</p>
    //                 <p className="text-2xl font-bold tracking-tight">{stats.invoices.value}</p>
    //                 <p className="text-xs text-muted-foreground">{stats.invoices.total} total</p>
    //               </div>
    //             </div>

    //             {/* Usage Card */}
    //             <div className="rounded-xl bg-card border border-border p-5 hover:shadow-md transition-shadow group">
    //               <div className="flex items-start justify-between mb-3">
    //                 <div className="p-2 rounded-lg bg-gradient-to-br from-success-50 to-success-100 group-hover:from-success-100 group-hover:to-success-200 transition-colors">
    //                   <Activity className="w-5 h-5 text-success-600" strokeWidth={2.5} />
    //                 </div>
    //               </div>
    //               <div className="space-y-1">
    //                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Usage This Month</p>
    //                 <p className="text-2xl font-bold tracking-tight">{stats.usage.value}</p>
    //                 <p className="text-xs text-muted-foreground">{stats.usage.unit}</p>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Bottom Grid */}
    //           <div className="grid lg:grid-cols-3 gap-6">
    //             {/* Recent Invoices */}
    //             <div className="lg:col-span-2 rounded-xl bg-card border border-border shadow-sm">
    //               <div className="flex items-center justify-between p-6 border-b border-border">
    //                 <div>
    //                   <h2 className="text-base font-semibold">Recent Invoices</h2>
    //                   <p className="text-xs text-muted-foreground mt-0.5">Latest billing activity</p>
    //                 </div>
    //                 <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium">
    //                   View all
    //                   <ArrowUpRight className="w-4 h-4" />
    //                 </button>
    //               </div>
    //               <div className="p-4 space-y-2">
    //                 {recentInvoices.length > 0 ? recentInvoices.map((invoice: any) => (
    //                   <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer group">
    //                     <div className="flex items-center gap-3 flex-1">
    //                       <div className="p-2 rounded-md bg-muted group-hover:bg-muted/50 transition-colors">
    //                         <FileText className="w-4 h-4 text-muted-foreground" />
    //                       </div>
    //                       <div>
    //                         <div className="font-medium text-sm">{invoice.id}</div>
    //                         <div className="text-xs text-muted-foreground">{invoice.customer}</div>
    //                       </div>
    //                     </div>
    //                     <div className="flex items-center gap-3">
    //                       <div className="text-right">
    //                         <div className="font-semibold text-sm">{invoice.amount}</div>
    //                         <div className="text-xs text-muted-foreground">{invoice.date}</div>
    //                       </div>
    //                       <div className={`px-2 py-1 rounded-md text-xs font-semibold ${
    //                         invoice.status === "paid" 
    //                           ? "bg-success-50 text-success-700" 
    //                           : "bg-warning-50 text-warning-700"
    //                       }`}>
    //                         {invoice.status}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 )) : (
    //                   <div className="text-center py-8 text-sm text-muted-foreground">
    //                     No recent invoices
    //                   </div>
    //                 )}
    //               </div>
    //             </div>

    //             {/* Quick Actions */}
    //             <div className="rounded-xl bg-card border border-border shadow-sm">
    //               <div className="p-6 border-b border-border">
    //                 <h2 className="text-base font-semibold">Quick Actions</h2>
    //                 <p className="text-xs text-muted-foreground mt-0.5">Common tasks</p>
    //               </div>
    //               <div className="p-4 space-y-2">
    //                 <button className="w-full p-3.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
    //                   <div className="flex items-center gap-3">
    //                     <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
    //                       <Users className="w-5 h-5" strokeWidth={2.5} />
    //                     </div>
    //                     <div>
    //                       <div className="font-medium text-sm">Create Customer</div>
    //                       <div className="text-xs text-muted-foreground">Add new account</div>
    //                     </div>
    //                   </div>
    //                 </button>
    //                 <button className="w-full p-3.5 rounded-lg border border-border hover:border-success-500 hover:bg-success-50 transition-all text-left group">
    //                   <div className="flex items-center gap-3">
    //                     <div className="p-2 rounded-lg bg-success-100 text-success-700 group-hover:bg-success-600 group-hover:text-white transition-colors">
    //                       <Repeat className="w-5 h-5" strokeWidth={2.5} />
    //                     </div>
    //                     <div>
    //                       <div className="font-medium text-sm">New Subscription</div>
    //                       <div className="text-xs text-muted-foreground">Start subscription</div>
    //                     </div>
    //                   </div>
    //                 </button>
    //                 <button className="w-full p-3.5 rounded-lg border border-border hover:border-info-500 hover:bg-info-50 transition-all text-left group">
    //                   <div className="flex items-center gap-3">
    //                     <div className="p-2 rounded-lg bg-info-100 text-info-700 group-hover:bg-info-600 group-hover:text-white transition-colors">
    //                       <Activity className="w-5 h-5" strokeWidth={2.5} />
    //                     </div>
    //                     <div>
    //                       <div className="font-medium text-sm">Record Usage</div>
    //                       <div className="text-xs text-muted-foreground">Submit events</div>
    //                     </div>
    //                   </div>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>

    //           {/* API Keys */}
    //           <div className="rounded-xl bg-card border border-border shadow-sm">
    //             <div className="flex items-center justify-between p-6 border-b border-border">
    //               <div className="flex items-center gap-2">
    //                 <Key className="w-5 h-5 text-muted-foreground" />
    //                 <h2 className="text-base font-semibold">API Keys</h2>
    //               </div>
    //               <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
    //                 <Plus className="w-4 h-4" />
    //                 Create Key
    //               </button>
    //             </div>
    //             <div className="p-4">
    //               <div className="p-4 rounded-lg border border-border flex items-center justify-between hover:bg-muted/30 transition-colors">
    //                 <div className="flex items-center gap-4">
    //                   <div className="p-2 rounded-md bg-muted">
    //                     <Shield className="w-5 h-5 text-muted-foreground" />
    //                   </div>
    //                   <div>
    //                     <div className="flex items-center gap-2.5">
    //                       <code className="font-mono text-sm bg-muted px-2.5 py-1 rounded font-medium">sb_live_abc123...</code>
    //                       <span className="text-xs px-2 py-1 rounded-full bg-success-50 text-success-700 font-semibold">Active</span>
    //                     </div>
    //                     <div className="text-xs text-muted-foreground mt-1.5">Production Key · Created Dec 1, 2024</div>
    //                   </div>
    //                 </div>
    //                 <div className="flex items-center gap-2">
    //                   <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Download">
    //                     <Download className="w-4 h-4 text-muted-foreground" />
    //                   </button>
    //                   <button className="text-sm text-error-600 hover:text-error-700 font-medium transition-colors px-3 py-1.5">
    //                     Revoke
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Placeholder for other tabs */}
    //       {!isLoading && activeTab !== "overview" && activeTab !== "products" && activeTab !== "meters" && (
    //         <div className="rounded-xl bg-card border border-border shadow-sm p-12 text-center">
    //           <div className="max-w-md mx-auto">
    //             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
    //               {tabs.find(t => t.id === activeTab)?.icon && 
    //                 React.createElement(tabs.find(t => t.id === activeTab).icon, {
    //                   className: "w-8 h-8 text-primary",
    //                   strokeWidth: 2
    //                 })
    //               }
    //             </div>
    //             <h2 className="text-2xl font-bold mb-2">{tabs.find(t => t.id === activeTab)?.label}</h2>
    //             <p className="text-muted-foreground mb-6">
    //               This section is under development
    //             </p>
    //             <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
    //               Coming Soon
    //             </button>
    //           </div>
    //         </div>
    //       )}

    //       {/* Products & Prices Tab */}
    //       {!isLoading && activeTab === "products" && (
    //         <div className="space-y-6">
    //           {/* Products Section */}
    //           <div className="rounded-xl bg-card border border-border shadow-sm">
    //             <div className="flex items-center justify-between p-6 border-b border-border">
    //               <div>
    //                 <h2 className="text-base font-semibold">Products</h2>
    //                 <p className="text-xs text-muted-foreground mt-0.5">Define your sellable products</p>
    //               </div>
    //               <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
    //                 <Plus className="w-4 h-4" />
    //                 Create Product
    //               </button>
    //             </div>
    //             <div className="p-4 space-y-2">
    //               {/* Mock Products */}
    //               {[
    //                 { id: "prod_1", name: "API Access", code: "api-access", active: true, prices: 3 },
    //                 { id: "prod_2", name: "Storage", code: "storage", active: true, prices: 2 },
    //                 { id: "prod_3", name: "Support Plan", code: "support", active: false, prices: 1 },
    //               ].map((product) => (
    //                 <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
    //                   <div className="flex items-center gap-4">
    //                     <div className="p-2 rounded-lg bg-primary/10">
    //                       <Package className="w-5 h-5 text-primary" />
    //                     </div>
    //                     <div>
    //                       <div className="font-medium text-sm">{product.name}</div>
    //                       <div className="text-xs text-muted-foreground">Code: {product.code} · {product.prices} price(s)</div>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center gap-3">
    //                     <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
    //                       product.active 
    //                         ? "bg-success-50 text-success-700" 
    //                         : "bg-muted text-muted-foreground"
    //                     }`}>
    //                       {product.active ? "Active" : "Inactive"}
    //                     </div>
    //                     <button className="p-2 hover:bg-muted rounded-lg transition-colors">
    //                       <Edit className="w-4 h-4 text-muted-foreground" />
    //                     </button>
    //                     <button className="p-2 hover:bg-error-50 rounded-lg transition-colors">
    //                       <Trash2 className="w-4 h-4 text-error-600" />
    //                     </button>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>

    //           {/* Prices Section */}
    //           <div className="rounded-xl bg-card border border-border shadow-sm">
    //             <div className="flex items-center justify-between p-6 border-b border-border">
    //               <div>
    //                 <h2 className="text-base font-semibold">Prices</h2>
    //                 <p className="text-xs text-muted-foreground mt-0.5">Configure pricing models and tiers</p>
    //               </div>
    //               <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
    //                 <Plus className="w-4 h-4" />
    //                 Create Price
    //               </button>
    //             </div>
    //             <div className="p-4 space-y-2">
    //               {/* Mock Prices */}
    //               {[
    //                 { id: "price_1", product: "API Access", type: "Flat", amount: "$99", interval: "month", tiers: 0 },
    //                 { id: "price_2", product: "API Access", type: "Tiered", amount: "Usage-based", interval: "month", tiers: 3 },
    //                 { id: "price_3", product: "Storage", type: "Per Unit", amount: "$0.10/GB", interval: "month", tiers: 0 },
    //                 { id: "price_4", product: "Support Plan", type: "Flat", amount: "$499", interval: "year", tiers: 0 },
    //               ].map((price) => (
    //                 <div key={price.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
    //                   <div className="flex items-center gap-4 flex-1">
    //                     <div className="p-2 rounded-lg bg-stripe-50">
    //                       <DollarSign className="w-5 h-5 text-stripe-600" />
    //                     </div>
    //                     <div className="flex-1 grid grid-cols-4 gap-4">
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Product</div>
    //                         <div className="font-medium text-sm">{price.product}</div>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Model</div>
    //                         <div className="font-medium text-sm">{price.type}</div>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Amount</div>
    //                         <div className="font-medium text-sm">{price.amount}</div>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Billing</div>
    //                         <div className="font-medium text-sm capitalize">{price.interval}</div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center gap-3">
    //                     {price.tiers > 0 && (
    //                       <span className="text-xs px-2 py-1 rounded-full bg-info-50 text-info-700 font-semibold">
    //                         {price.tiers} tier(s)
    //                       </span>
    //                     )}
    //                     <button className="p-2 hover:bg-muted rounded-lg transition-colors">
    //                       <Edit className="w-4 h-4 text-muted-foreground" />
    //                     </button>
    //                     <button className="p-2 hover:bg-error-50 rounded-lg transition-colors">
    //                       <Trash2 className="w-4 h-4 text-error-600" />
    //                     </button>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Meters Tab */}
    //       {!isLoading && activeTab === "meters" && (
    //         <div className="space-y-6">
    //           <div className="rounded-xl bg-card border border-border shadow-sm">
    //             <div className="flex items-center justify-between p-6 border-b border-border">
    //               <div>
    //                 <h2 className="text-base font-semibold">Usage Meters</h2>
    //                 <p className="text-xs text-muted-foreground mt-0.5">Define how usage is measured and aggregated</p>
    //               </div>
    //               <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
    //                 <Plus className="w-4 h-4" />
    //                 Create Meter
    //               </button>
    //             </div>
    //             <div className="p-4 space-y-2">
    //               {/* Mock Meters */}
    //               {[
    //                 { id: "meter_1", code: "api_calls", name: "API Calls", aggregation: "SUM", unit: "requests" },
    //                 { id: "meter_2", code: "storage_gb", name: "Storage Usage", aggregation: "MAX", unit: "gigabytes" },
    //                 { id: "meter_3", code: "active_users", name: "Active Users", aggregation: "UNIQUE", unit: "users" },
    //                 { id: "meter_4", code: "compute_hours", name: "Compute Hours", aggregation: "SUM", unit: "hours" },
    //               ].map((meter) => (
    //                 <div key={meter.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
    //                   <div className="flex items-center gap-4 flex-1">
    //                     <div className="p-2 rounded-lg bg-success-50">
    //                       <Gauge className="w-5 h-5 text-success-600" />
    //                     </div>
    //                     <div className="flex-1 grid grid-cols-4 gap-4">
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Meter Code</div>
    //                         <code className="font-mono text-sm font-medium bg-muted px-2 py-0.5 rounded">{meter.code}</code>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Name</div>
    //                         <div className="font-medium text-sm">{meter.name}</div>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Aggregation</div>
    //                         <div className="font-medium text-sm">{meter.aggregation}</div>
    //                       </div>
    //                       <div>
    //                         <div className="text-xs text-muted-foreground mb-0.5">Unit</div>
    //                         <div className="font-medium text-sm">{meter.unit}</div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center gap-2">
    //                     <button className="p-2 hover:bg-muted rounded-lg transition-colors">
    //                       <Edit className="w-4 h-4 text-muted-foreground" />
    //                     </button>
    //                     <button className="p-2 hover:bg-error-50 rounded-lg transition-colors">
    //                       <Trash2 className="w-4 h-4 text-error-600" />
    //                     </button>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>

    //           {/* Meter Info Card */}
    //           <div className="rounded-xl bg-info-50 border border-info-200 p-6">
    //             <div className="flex items-start gap-3">
    //               <div className="p-2 rounded-lg bg-info-100">
    //                 <Activity className="w-5 h-5 text-info-700" />
    //               </div>
    //               <div>
    //                 <h3 className="font-semibold text-sm text-info-900 mb-1">About Usage Meters</h3>
    //                 <p className="text-sm text-info-700 leading-relaxed">
    //                   Meters track customer usage in real-time. Use SUM for cumulative values (API calls), MAX for peak usage (storage), 
    //                   or UNIQUE for distinct counts (active users). Each meter can be linked to pricing tiers for usage-based billing.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </main>
    // </div>
    <></>
  );
}