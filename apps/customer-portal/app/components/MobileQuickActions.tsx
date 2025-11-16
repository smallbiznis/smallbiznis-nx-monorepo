import { Gift, History, QrCode, Share2 } from "lucide-react";
import { motion } from "motion/react";

const actions = [
  { icon: QrCode, label: "Scan", color: "from-purple-500 to-purple-600" },
  { icon: Gift, label: "Rewards", color: "from-pink-500 to-pink-600" },
  { icon: History, label: "History", color: "from-orange-500 to-orange-600" },
  { icon: Share2, label: "Refer", color: "from-blue-500 to-blue-600" },
];

export function MobileQuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white border hover:shadow-md transition-shadow active:bg-gray-50"
          >
            <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
