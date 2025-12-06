import './global.css';

export const metadata = {
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
      <body className="console-body">
        {children}
      </body>
    </html>
  );
}
