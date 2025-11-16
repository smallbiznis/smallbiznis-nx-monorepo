import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Coffee, Gift, ShoppingBag, Percent, Star } from "lucide-react";
import { motion } from "motion/react";

const rewards = [
  {
    id: 1,
    title: "$10 Off Purchase",
    points: 1000,
    icon: Percent,
    color: "purple",
    available: 45,
  },
  {
    id: 2,
    title: "Free Coffee Voucher",
    points: 500,
    icon: Coffee,
    color: "orange",
    available: 120,
  },
  {
    id: 3,
    title: "Premium Gift Box",
    points: 2500,
    icon: Gift,
    color: "pink",
    available: 8,
  },
  {
    id: 4,
    title: "$50 Shopping Credit",
    points: 5000,
    icon: ShoppingBag,
    color: "blue",
    available: 25,
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
};

export function MobileRewardsList() {
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
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-900">{reward.points.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.available} left
                    </Badge>
                  </div>
                </div>

                <Button size="sm" className="shrink-0 bg-purple-600 hover:bg-purple-700">
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
