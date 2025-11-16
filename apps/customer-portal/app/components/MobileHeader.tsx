import { Bell, Gift } from "lucide-react";
import { Button } from "@smallbiznis/ui/components";
import { Badge } from "@smallbiznis/ui/components";
import { Avatar, AvatarFallback } from "@smallbiznis/ui/components";

export function MobileHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <span className="tracking-tight">LoyaltyHub</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-pink-600 text-[10px]">
                3
              </Badge>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs">
                SJ
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
