'use client'
import { useState } from "react";

import { Variant2Header } from "./components/variant2/Variant2Header";
import { Variant2PointsCard } from "./components/variant2/Variant2PointsCard";
import { Variant2QuickActions } from "./components/variant2/Variant2QuickActions";
import { Variant2RewardsList } from "./components/variant2/Variant2RewardsList";
import { Variant2Transactions } from "./components/variant2/Variant2Transactions";
import { Variant2TierProgress } from "./components/variant2/Variant2TierProgress";
import { Variant2Profile } from "./components/variant2/Variant2Profile";
import { Variant2BottomNav } from "./components/variant2/Variant2BottomNav";
import { EngageTab } from "./components/variant2/EngageTab";
import { ExpiringPointsAlert } from "./components/variant2/ExpiringPointsAlert";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-violet-50 pb-20">
      <Variant2Header />

      <main className="px-4 py-5 space-y-5">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <div className="tracking-tight text-gray-900 mb-1">
                  Welcome back, Maria! 👋
                </div>
                <div className="text-gray-600">
                  You&rsquo;re on track for amazing rewards
                </div>
              </div>

              <ExpiringPointsAlert />
              <Variant2PointsCard />
              <Variant2QuickActions />

              <div>
                <div className="tracking-tight text-gray-900 mb-3">
                  Featured Rewards
                </div>
                <Variant2RewardsList />
              </div>
            </motion.div>
          )}

          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <div className="tracking-tight text-gray-900 mb-1">
                  All Rewards
                </div>
                <div className="text-gray-600">
                  Unlock exclusive benefits
                </div>
              </div>
              <Variant2RewardsList />
            </motion.div>
          )}

          {activeTab === "engage" && (
            <motion.div
              key="engage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EngageTab />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <div className="tracking-tight text-gray-900 mb-1">
                  Activity Log
                </div>
                <div className="text-gray-600">
                  Your points journey
                </div>
              </div>
              <Variant2Transactions />
            </motion.div>
          )}

          {activeTab === "tiers" && (
            <motion.div
              key="tiers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <div className="tracking-tight text-gray-900 mb-1">
                  Elite Tiers
                </div>
                <div className="text-gray-600">
                  Unlock premium status
                </div>
              </div>
              <Variant2TierProgress />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Variant2Profile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Variant2BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
