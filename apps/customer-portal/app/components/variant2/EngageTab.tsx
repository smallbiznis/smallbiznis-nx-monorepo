import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@smallbiznis/ui/components";
import { Target, Gift, Users, Trophy } from "lucide-react";
import { ChallengesTab } from "./ChallengesTab";
import { DailySpinWheel } from "./DailySpinWheel";
import { ReferralTracker } from "./ReferralTracker";
import { AchievementBadges } from "./AchievementBadges";

export function EngageTab() {
  const [activeSubTab, setActiveSubTab] = useState("challenges");

  return (
    <div className="space-y-4">
      <div>
        <div className="tracking-tight text-gray-900 mb-1">Engagement Hub</div>
        <div className="text-gray-600">Earn bonus points and rewards</div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="bg-white border w-full grid grid-cols-4 p-1">
          <TabsTrigger value="challenges" className="gap-1 text-xs">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="spin" className="gap-1 text-xs">
            <Gift className="h-4 w-4" />
            <span className="hidden sm:inline">Spin</span>
          </TabsTrigger>
          <TabsTrigger value="referral" className="gap-1 text-xs">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Refer</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="gap-1 text-xs">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Badges</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="mt-4">
          <ChallengesTab />
        </TabsContent>

        <TabsContent value="spin" className="mt-4">
          <DailySpinWheel />
        </TabsContent>

        <TabsContent value="referral" className="mt-4">
          <ReferralTracker />
        </TabsContent>

        <TabsContent value="badges" className="mt-4">
          <AchievementBadges />
        </TabsContent>
      </Tabs>
    </div>
  );
}
