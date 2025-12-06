import './global.css';

import type { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';
import Topbar from '../components/topbar';
import { AppSidebar, SidebarInset } from '../components/sidebar';
import { SidebarProvider } from '@smallbiznis/ui/sidebar';

export const metadata: Metadata = {
  title: 'Billing-as-a-Service Console',
  description: 'Administrative console for SmallBiznis billing tenants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset>
              <Topbar />
              <main className="flex flex-col gap-4 px-6 pb-10 pt-2">
                <Breadcrumbs />
                <div className="rounded-xl border bg-card p-4 shadow-sm">{children}</div>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
