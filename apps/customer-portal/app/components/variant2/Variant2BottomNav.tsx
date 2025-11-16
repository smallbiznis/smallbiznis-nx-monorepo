import { Home, Gift, Zap, Trophy, User } from "lucide-react";
import { motion } from "motion/react";

interface Variant2BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "rewards", icon: Gift, label: "Rewards" },
  { id: "engage", icon: Zap, label: "Engage" },
  { id: "tiers", icon: Trophy, label: "Status" },
  { id: "profile", icon: User, label: "Profile" },
];

export function Variant2BottomNav({ activeTab, onTabChange }: Variant2BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 safe-area-bottom">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center gap-1 py-3 active:bg-gray-50 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeVariant2Tab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-indigo-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? "text-indigo-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
