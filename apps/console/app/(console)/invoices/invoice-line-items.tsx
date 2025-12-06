import { Badge } from '@smallbiznis/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';

export type InvoiceLineItem = {
  description: string;
  detail: string;
  quantity: number;
  unitPrice: string;
  amount: string;
  badge?: string;
};

export function InvoiceLineItems({
  items,
  subtotal,
  tax,
  total,
}: {
  items: InvoiceLineItem[];
  subtotal: string;
  tax: string;
  total: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Line items</CardTitle>
        <CardDescription>Recurring, usage, and one-time components for this invoice</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.description}>
                  <TableCell className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{item.description}</p>
                      {item.badge ? <Badge variant="outline">{item.badge}</Badge> : null}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.unitPrice}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{item.quantity}</TableCell>
                  <TableCell className="text-right font-semibold">{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t bg-muted/40">
        <div className="flex w-full flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-foreground">{subtotal}</span>
        </div>
        <div className="flex w-full flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>Tax</span>
          <span className="font-semibold text-foreground">{tax}</span>
        </div>
        <Separator />
        <div className="flex w-full flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span className="text-base font-semibold text-foreground">Total due</span>
          <span className="text-base font-semibold text-foreground">{total}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
