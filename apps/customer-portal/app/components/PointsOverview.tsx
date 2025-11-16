import { TrendingUp, Sparkles, Zap, Award } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

export function PointsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <Badge className="bg-white/20 text-white border-0">Active</Badge>
          </div>
          <div className="mb-1">Available Points</div>
          <div className="mb-2 tracking-tight">12,450</div>
          <div className="flex items-center gap-1 text-white/80">
            <TrendingUp className="h-3 w-3" />
            <span>+850 this month</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="mb-1 text-gray-600">Lifetime Earned</div>
          <div className="mb-2 tracking-tight text-gray-900">45,280</div>
          <div className="text-gray-500">Since Jan 2024</div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mb-1 text-gray-600">Current Tier</div>
          <div className="mb-2 tracking-tight text-gray-900">Platinum</div>
          <div className="text-gray-500">Top 5% of members</div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">
            <div className="p-2 bg-green-100 rounded-lg inline-block">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mb-2 text-gray-600">Next Tier Progress</div>
          <Progress value={68} className="mb-2" />
          <div className="text-gray-500">3,200 pts to Diamond</div>
        </Card>
      </motion.div>
    </div>
  );
}
