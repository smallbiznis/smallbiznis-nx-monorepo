import { Card } from "@smallbiznis/ui";
import { Button } from "@smallbiznis/ui";
import { Badge } from "@smallbiznis/ui";
import { Progress } from "@smallbiznis/ui";
import { Users, Gift, Share2, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const referrals = [
  { name: "Alex Martinez", status: "active", points: 500, date: "Jan 15, 2024" },
  { name: "Emma Wilson", status: "active", points: 500, date: "Jan 8, 2024" },
  { name: "Chris Lee", status: "pending", points: 0, date: "Jan 20, 2024" },
];

export function ReferralTracker() {
  const [copied, setCopied] = useState(false);
  const referralCode = "MARIA2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = referrals.filter(r => r.status === "active").length * 500;
  const progressToNextReward = (referrals.filter(r => r.status === "active").length % 5) * 20;

  return (
    <div className="space-y-5">
      <div>
        <div className="tracking-tight text-gray-900 mb-1">Refer & Earn</div>
        <div className="text-gray-600">Invite friends and earn rewards together</div>
      </div>

      {/* Referral Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-5 bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <span className="tracking-tight">Your Referral Stats</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white/80 mb-1">Friends Joined</div>
                <div className="tracking-tight" style={{ fontSize: '32px', lineHeight: '1' }}>
                  {referrals.filter(r => r.status === "active").length}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white/80 mb-1">Points Earned</div>
                <div className="tracking-tight" style={{ fontSize: '32px', lineHeight: '1' }}>
                  {totalEarned}
                </div>
              </div>
            </div>

            {/* Progress to Next Reward */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Next Bonus Reward</span>
                <Badge className="bg-amber-500 text-white border-0">
                  1,000 pts
                </Badge>
              </div>
              <Progress value={progressToNextReward} className="h-2 bg-white/20" />
              <div className="text-white/80 text-xs mt-1">
                {5 - (referrals.filter(r => r.status === "active").length % 5)} more referrals
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Referral Code */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-4 w-4 text-indigo-600" />
          <span className="text-gray-900">Your Referral Code</span>
        </div>
        
        <div className="bg-indigo-50 border-2 border-indigo-200 border-dashed rounded-lg p-4 mb-3">
          <div className="text-center mb-2">
            <div className="text-gray-600 mb-1">Share this code</div>
            <div className="tracking-tight text-indigo-600" style={{ fontSize: '28px' }}>
              {referralCode}
            </div>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          <Share2 className="h-4 w-4 mr-2" />
          Share with Friends
        </Button>

        <div className="mt-3 text-center text-gray-500 text-sm">
          Both you and your friend get 500 points!
        </div>
      </Card>

      {/* Referral List */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-900">Your Referrals ({referrals.length})</span>
        </div>

        <div className="space-y-2">
          {referrals.map((referral, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {referral.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">{referral.name}</div>
                  <div className="text-gray-500 text-xs">{referral.date}</div>
                </div>
              </div>

              <div className="text-right">
                {referral.status === "active" ? (
                  <>
                    <div className="text-indigo-600">+{referral.points}</div>
                    <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                      Active
                    </Badge>
                  </>
                ) : (
                  <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">
                    Pending
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
