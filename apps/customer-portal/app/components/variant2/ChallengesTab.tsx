import { Card } from "@smallbiznis/ui";
import { Progress } from "@smallbiznis/ui";
import { Badge } from "@smallbiznis/ui";
import { Target, Zap, Gift, TrendingUp, Clock, Trophy } from "lucide-react";
import { motion } from "motion/react";

const challenges = [
  {
    id: 1,
    title: "Weekly Shopper",
    description: "Make 3 purchases this week",
    reward: 500,
    progress: 2,
    total: 3,
    expiresIn: "3 days",
    type: "weekly",
    icon: Target,
    color: "indigo",
  },
  {
    id: 2,
    title: "Big Spender",
    description: "Spend $100 in one transaction",
    reward: 1000,
    progress: 75,
    total: 100,
    expiresIn: "7 days",
    type: "spending",
    icon: TrendingUp,
    color: "violet",
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Shop before 10 AM 5 times",
    reward: 300,
    progress: 3,
    total: 5,
    expiresIn: "5 days",
    type: "daily",
    icon: Zap,
    color: "sky",
  },
  {
    id: 4,
    title: "Social Butterfly",
    description: "Refer 2 friends this month",
    reward: 800,
    progress: 1,
    total: 2,
    expiresIn: "12 days",
    type: "social",
    icon: Gift,
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; text: string; progress: string }> = {
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", progress: "bg-indigo-600" },
  violet: { bg: "bg-violet-100", text: "text-violet-600", progress: "bg-violet-600" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", progress: "bg-sky-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", progress: "bg-purple-600" },
};

export function ChallengesTab() {
  return (
    <div className="space-y-5">
      <div>
        <div className="tracking-tight text-gray-900 mb-1">Active Challenges</div>
        <div className="text-gray-600">Complete missions to earn bonus points</div>
      </div>

      {/* Challenge Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-5 bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span className="tracking-tight">This Week</span>
            </div>
            <Badge className="bg-white/20 text-white border-0">2/4 Completed</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-white/80 mb-1">Earned</div>
              <div className="tracking-tight">1,300 pts</div>
            </div>
            <div>
              <div className="text-white/80 mb-1">Potential</div>
              <div className="tracking-tight">2,600 pts</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Challenges List */}
      <div className="space-y-3">
        {challenges.map((challenge, index) => {
          const colors = colorMap[challenge.color];
          const Icon = challenge.icon;
          const progressPercent = (challenge.progress / challenge.total) * 100;
          const isAlmostComplete = progressPercent >= 60 && progressPercent < 100;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-4 relative overflow-hidden">
                {isAlmostComplete && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500 text-white border-0 text-xs">
                      🔥 Almost there!
                    </Badge>
                  </div>
                )}

                <div className="flex gap-3 mb-3">
                  <div className={`p-3 ${colors.bg} rounded-xl shrink-0 h-fit`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>

                  <div className="flex-1">
                    <div className="tracking-tight text-gray-900 mb-1">{challenge.title}</div>
                    <div className="text-gray-600 mb-2">{challenge.description}</div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-indigo-600">
                        <Zap className="h-3 w-3 fill-indigo-600" />
                        <span className="text-sm">+{challenge.reward} pts</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{challenge.expiresIn}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">
                          {challenge.type === 'spending' 
                            ? `$${challenge.progress}/$${challenge.total}`
                            : `${challenge.progress}/${challenge.total} completed`
                          }
                        </span>
                        <span className={colors.text}>
                          {Math.round(progressPercent)}%
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
