import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Gift, Coffee, ShoppingBag, Plane, Percent } from "lucide-react";

const rewards = [
  {
    id: 1,
    title: "$10 Off Purchase",
    points: 1000,
    icon: Percent,
    color: "purple",
    category: "Discount",
    available: 45,
  },
  {
    id: 2,
    title: "Free Coffee Voucher",
    points: 500,
    icon: Coffee,
    color: "orange",
    category: "Food & Drink",
    available: 120,
  },
  {
    id: 3,
    title: "Premium Gift Box",
    points: 2500,
    icon: Gift,
    color: "pink",
    category: "Physical",
    available: 8,
  },
  {
    id: 4,
    title: "$50 Shopping Credit",
    points: 5000,
    icon: ShoppingBag,
    color: "blue",
    category: "Shopping",
    available: 25,
  },
  {
    id: 5,
    title: "Travel Discount 20%",
    points: 3500,
    icon: Plane,
    color: "green",
    category: "Travel",
    available: 15,
  },
  {
    id: 6,
    title: "VIP Experience",
    points: 8000,
    icon: Star,
    color: "yellow",
    category: "Experience",
    available: 3,
  },
];

const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "hover:bg-purple-50" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", hover: "hover:bg-orange-50" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", hover: "hover:bg-pink-50" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", hover: "hover:bg-blue-50" },
  green: { bg: "bg-green-100", text: "text-green-600", hover: "hover:bg-green-50" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", hover: "hover:bg-yellow-50" },
};

export function RewardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.map((reward, index) => {
        const colors = colorMap[reward.color];
        const Icon = reward.icon;

        return (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${colors.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {reward.available} left
                </Badge>
              </div>

              <div className="mb-1 tracking-tight text-gray-900">{reward.title}</div>
              <div className="mb-4 text-gray-500">{reward.category}</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-900">{reward.points.toLocaleString()}</span>
                </div>
                <Button size="sm" variant="outline" className="group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-colors">
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
