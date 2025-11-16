import { Home, Gift, History, Trophy, User } from "lucide-react";
import { motion } from "motion/react";

interface TenantBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "rewards", icon: Gift, label: "Rewards" },
  { id: "history", icon: History, label: "Activity" },
  { id: "tiers", icon: Trophy, label: "Tiers" },
  { id: "profile", icon: User, label: "Profile" },
];

export function TenantBottomNav({ activeTab, onTabChange }: TenantBottomNavProps) {
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
                  layoutId="activeTenantTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-emerald-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? "text-emerald-600" : "text-gray-600"
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
