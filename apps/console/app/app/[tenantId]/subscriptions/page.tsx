interface SubscriptionPageProps {
  params: { tenantId: string }
}

export default async function SubscriptionsPage({ params }: SubscriptionPageProps) {
  const { tenantId } = params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage subscriptions for your customers.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm text-muted-foreground">
          <span className="rounded-full border px-3 py-1">Tenant: {tenantId}</span>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subscriptions</p>
            <h2 className="text-xl font-semibold mt-1">Create offers and plans</h2>
            <p className="text-sm text-muted-foreground mt-2">Build subscription products tailored for your customers.</p>
          </div>
          <div className="text-sm text-muted-foreground text-right">
            <div>Tenant ID</div>
            <div className="font-mono text-foreground">{tenantId}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
