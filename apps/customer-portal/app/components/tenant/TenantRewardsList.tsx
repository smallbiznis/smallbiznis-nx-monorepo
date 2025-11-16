import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Coffee, Gift, ShoppingBag, Percent, Star, Utensils, Shirt } from "lucide-react";
import { motion } from "motion/react";

const rewards = [
  {
    id: 1,
    title: "15% Off Next Purchase",
    points: 750,
    icon: Percent,
    color: "emerald",
    available: 50,
  },
  {
    id: 2,
    title: "Free Coffee & Pastry",
    points: 500,
    icon: Coffee,
    color: "teal",
    available: 85,
  },
  {
    id: 3,
    title: "Exclusive Gift Item",
    points: 2000,
    icon: Gift,
    color: "amber",
    available: 12,
  },
  {
    id: 4,
    title: "$25 Store Credit",
    points: 3500,
    icon: ShoppingBag,
    color: "orange",
    available: 30,
  },
  {
    id: 5,
    title: "Free Lunch Combo",
    points: 1200,
    icon: Utensils,
    color: "emerald",
    available: 45,
  },
  {
    id: 6,
    title: "Premium Merchandise",
    points: 5000,
    icon: Shirt,
    color: "teal",
    available: 8,
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
};

export function TenantRewardsList() {
  return (
    <div className="space-y-3">
      {rewards.map((reward, index) => {
        const colors = colorMap[reward.color];
        const Icon = reward.icon;

        return (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="p-4 active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${colors.bg} rounded-xl shrink-0`}>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="tracking-tight text-gray-900 mb-0.5">{reward.title}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span className="text-gray-900">{reward.points.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.available} left
                    </Badge>
                  </div>
                </div>

                <Button size="sm" className="shrink-0 bg-emerald-600 hover:bg-emerald-700">
                  Redeem
                </Button>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
