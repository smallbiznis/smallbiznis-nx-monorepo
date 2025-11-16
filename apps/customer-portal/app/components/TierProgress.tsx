import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, Crown, Gem, Star } from "lucide-react";
import { motion } from "motion/react";

const tiers = [
  { name: "Bronze", points: 0, icon: Star, color: "text-orange-700", reached: true },
  { name: "Silver", points: 5000, icon: Star, color: "text-gray-400", reached: true },
  { name: "Gold", points: 15000, icon: Trophy, color: "text-yellow-600", reached: true },
  { name: "Platinum", points: 30000, icon: Crown, color: "text-purple-600", reached: true, current: true },
  { name: "Diamond", points: 50000, icon: Gem, color: "text-blue-600", reached: false },
];

export function TierProgress() {
  const currentPoints = 45280;
  const currentTierIndex = tiers.findIndex(t => t.current);
  const nextTier = tiers[currentTierIndex + 1];
  const progressPercent = nextTier
    ? ((currentPoints - tiers[currentTierIndex].points) / (nextTier.points - tiers[currentTierIndex].points)) * 100
    : 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="tracking-tight text-gray-900 mb-1">Loyalty Tier Status</div>
        <div className="text-gray-500">Track your progress to the next level</div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Progress to Diamond</span>
          <span className="text-purple-600">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-3 mb-2" />
        <div className="text-gray-500">
          {nextTier ? `${(nextTier.points - currentPoints).toLocaleString()} points to next tier` : "Maximum tier reached!"}
        </div>
      </div>

      <div className="space-y-3">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                tier.current
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                  : tier.reached
                  ? "bg-gray-50"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    tier.reached ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${tier.reached ? tier.color : "text-gray-400"}`} />
                </div>
                <div>
                  <div className="text-gray-900">{tier.name}</div>
                  <div className="text-gray-500">{tier.points.toLocaleString()} points</div>
                </div>
              </div>

              {tier.current && (
                <Badge className="bg-purple-600">Current Tier</Badge>
              )}
              {tier.reached && !tier.current && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Achieved
                </Badge>
              )}
              {!tier.reached && (
                <Badge variant="outline" className="text-gray-400 border-gray-300">
                  Locked
                </Badge>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
