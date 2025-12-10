import "./global.css"

import type { ReactNode } from "react"

export const metadata = {
  title: "SmallBiznis Tenant Console",
  description: "SmallBiznis tenant console",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
