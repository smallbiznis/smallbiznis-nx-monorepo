import { Gift, QrCode, Share2, Star } from "lucide-react";
import { motion } from "motion/react";

const actions = [
  { icon: QrCode, label: "Scan", gradient: "from-indigo-500 to-indigo-600" },
  { icon: Gift, label: "Rewards", gradient: "from-violet-500 to-violet-600" },
  { icon: Star, label: "Exclusive", gradient: "from-sky-500 to-sky-600" },
  { icon: Share2, label: "Share", gradient: "from-purple-500 to-purple-600" },
];

export function Variant2QuickActions() {
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
            <div className={`p-3 bg-gradient-to-br ${action.gradient} rounded-xl`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
