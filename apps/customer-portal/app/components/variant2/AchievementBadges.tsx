
import { Card } from "@smallbiznis/ui";
import { Trophy, Star, Zap, Crown, Target, Users, Gift, TrendingUp, Badge } from "lucide-react";
import { motion } from "motion/react";

const achievements = [
  {
    id: 1,
    name: "First Purchase",
    description: "Made your first purchase",
    icon: Star,
    color: "amber",
    unlocked: true,
    date: "Feb 1, 2024",
  },
  {
    id: 2,
    name: "Point Collector",
    description: "Earned 10,000 points",
    icon: Zap,
    color: "indigo",
    unlocked: true,
    date: "Feb 15, 2024",
  },
  {
    id: 3,
    name: "Platinum Member",
    description: "Reached Platinum tier",
    icon: Crown,
    color: "violet",
    unlocked: true,
    date: "Mar 1, 2024",
  },
  {
    id: 4,
    name: "Social Star",
    description: "Referred 5 friends",
    icon: Users,
    color: "sky",
    unlocked: false,
    progress: 3,
    total: 5,
  },
  {
    id: 5,
    name: "Challenge Master",
    description: "Completed 10 challenges",
    icon: Target,
    color: "purple",
    unlocked: false,
    progress: 7,
    total: 10,
  },
  {
    id: 6,
    name: "Big Spender",
    description: "Spent $1,000+ total",
    icon: TrendingUp,
    color: "emerald",
    unlocked: true,
    date: "Mar 10, 2024",
  },
  {
    id: 7,
    name: "Reward Lover",
    description: "Redeemed 25 rewards",
    icon: Gift,
    color: "pink",
    unlocked: false,
    progress: 18,
    total: 25,
  },
  {
    id: 8,
    name: "Diamond Elite",
    description: "Reach Diamond tier",
    icon: Trophy,
    color: "blue",
    unlocked: false,
    progress: 0,
    total: 1,
  },
];

const colorMap: Record<string, { bg: string; text: string; locked: string }> = {
  amber: { bg: "bg-amber-100", text: "text-amber-600", locked: "bg-amber-50" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", locked: "bg-indigo-50" },
  violet: { bg: "bg-violet-100", text: "text-violet-600", locked: "bg-violet-50" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", locked: "bg-sky-50" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", locked: "bg-purple-50" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", locked: "bg-emerald-50" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", locked: "bg-pink-50" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", locked: "bg-blue-50" },
};

export function AchievementBadges() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-5">
      <div>
        <div className="tracking-tight text-gray-900 mb-1">Achievements</div>
        <div className="text-gray-600">Unlock badges as you progress</div>
      </div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-5 bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/80 mb-1">Achievements Unlocked</div>
              <div className="tracking-tight" style={{ fontSize: '36px', lineHeight: '1' }}>
                {unlockedCount}/{achievements.length}
              </div>
            </div>
            <div className="text-right">
              <Trophy className="h-12 w-12 text-white/80 mb-2" />
              <div className="text-white/80">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Unlocked Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-900">Unlocked ({unlockedCount})</span>
          <Badge className="bg-indigo-600">Recent</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements
            .filter(a => a.unlocked)
            .map((achievement, index) => {
              const colors = colorMap[achievement.color];
              const Icon = achievement.icon;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="p-4 text-center relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    
                    <div className={`w-16 h-16 mx-auto ${colors.bg} rounded-full flex items-center justify-center mb-3`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    
                    <div className="text-gray-900 mb-1">{achievement.name}</div>
                    <div className="text-gray-500 text-xs mb-2">{achievement.description}</div>
                    <div className="text-gray-400 text-xs">{achievement.date}</div>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-900">In Progress ({achievements.length - unlockedCount})</span>
        </div>

        <div className="space-y-3">
          {achievements
            .filter(a => !a.unlocked)
            .map((achievement, index) => {
              const colors = colorMap[achievement.color];
              const Icon = achievement.icon;
              const progress = achievement.progress && achievement.total 
                ? (achievement.progress / achievement.total) * 100 
                : 0;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 ${colors.locked} rounded-full flex items-center justify-center shrink-0 opacity-60`}>
                        <Icon className={`h-6 w-6 ${colors.text}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <div className="text-gray-900">{achievement.name}</div>
                            <div className="text-gray-500 text-xs">{achievement.description}</div>
                          </div>
                          <Badge className="text-xs">
                            Locked
                          </Badge>
                        </div>

                        {achievement.progress !== undefined && achievement.total && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                {achievement.progress}/{achievement.total}
                              </span>
                              <span className={colors.text}>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colors.bg} transition-all duration-300`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
