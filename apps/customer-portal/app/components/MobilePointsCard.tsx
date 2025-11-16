import { TrendingUp, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

export function MobilePointsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-3xl" />
        
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-white/80">Available Points</span>
          </div>

          <div className="mb-6">
            <div className="mb-2 tracking-tight" style={{ fontSize: '48px', lineHeight: '1' }}>
              12,450
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <TrendingUp className="h-4 w-4" />
              <span>+850 earned this month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-white/80 mb-1">Current Tier</div>
              <div className="tracking-tight">Platinum</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-white/80 mb-1">Next Reward</div>
              <div className="tracking-tight">3,550 pts</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
