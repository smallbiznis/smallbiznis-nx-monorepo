
import { Card, Button, Badge } from "@smallbiznis/ui";
import { Coffee, Gift, ShoppingBag, Percent, Star, Headphones, Smartphone } from "lucide-react";
import { motion } from "motion/react";

const rewards = [
  {
    id: 1,
    title: "20% Premium Discount",
    points: 1200,
    icon: Percent,
    color: "indigo",
    available: 35,
  },
  {
    id: 2,
    title: "Premium Coffee Bundle",
    points: 800,
    icon: Coffee,
    color: "violet",
    available: 60,
  },
  {
    id: 3,
    title: "VIP Gift Package",
    points: 3000,
    icon: Gift,
    color: "sky",
    available: 15,
  },
  {
    id: 4,
    title: "$40 Shopping Voucher",
    points: 4500,
    icon: ShoppingBag,
    color: "purple",
    available: 22,
  },
  {
    id: 5,
    title: "Tech Accessory",
    points: 2500,
    icon: Headphones,
    color: "indigo",
    available: 18,
  },
  {
    id: 6,
    title: "Smart Device Offer",
    points: 8000,
    icon: Smartphone,
    color: "violet",
    available: 5,
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  violet: { bg: "bg-violet-100", text: "text-violet-600" },
  sky: { bg: "bg-sky-100", text: "text-sky-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
};

export function Variant2RewardsList() {
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
                      <Star className="h-3 w-3 text-sky-500 fill-sky-500" />
                      <span className="text-gray-900">{reward.points.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs p-1">
                      {reward.available} left
                    </Badge>
                  </div>
                </div>

                <Button variant={'outline'} size="sm" className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
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
