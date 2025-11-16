import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Trophy, Crown, Gem, Star, Check } from "lucide-react";
import { motion } from "motion/react";

const tiers = [
  { name: "Bronze", points: 0, icon: Star, reached: true },
  { name: "Silver", points: 2500, icon: Star, reached: true },
  { name: "Gold", points: 7500, icon: Trophy, reached: true, current: true },
  { name: "Platinum", points: 15000, icon: Crown, reached: false },
  { name: "Diamond", points: 25000, icon: Gem, reached: false },
];

export function TenantTierProgress() {
  const currentPoints = 8750;
  const currentTierIndex = tiers.findIndex(t => t.current);
  const nextTier = tiers[currentTierIndex + 1];
  const progressPercent = nextTier
    ? ((currentPoints - tiers[currentTierIndex].points) / (nextTier.points - tiers[currentTierIndex].points)) * 100
    : 100;

  return (
    <Card className="p-5">
      <div className="mb-5">
        <div className="text-gray-500 mb-3">Membership Progress</div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-900">Progress to Platinum</span>
          <span className="text-emerald-600">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2 mb-2" />
        <div className="text-gray-500">
          {nextTier ? `${(nextTier.points - currentPoints).toLocaleString()} points to unlock` : "Maximum tier!"}
        </div>
      </div>

      <div className="space-y-2">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                tier.current
                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200"
                  : tier.reached
                  ? "bg-gray-50"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    tier.reached ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${
                    tier.current 
                      ? "text-emerald-600" 
                      : tier.reached 
                      ? "text-gray-700" 
                      : "text-gray-400"
                  }`} />
                </div>
                <div>
                  <div className="text-gray-900">{tier.name}</div>
                  <div className="text-gray-500">{tier.points.toLocaleString()} pts</div>
                </div>
              </div>

              {tier.reached && (
                <div className={`p-1 rounded-full ${tier.current ? "bg-emerald-600" : "bg-teal-600"}`}>
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
