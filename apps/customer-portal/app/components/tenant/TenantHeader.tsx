import { Bell, Gift } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function TenantHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-lg">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <span className="tracking-tight">SmallBiznis</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-amber-500 text-[10px]">
                2
              </Badge>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-xs">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
