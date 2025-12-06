import { useState } from "react";
import { Card } from "@smallbiznis/ui";
import { Button } from "@smallbiznis/ui";
import { Badge } from "@smallbiznis/ui";
import { Gift, Sparkles, Trophy, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const prizes = [
  { id: 1, label: "50 pts", value: 50, color: "from-indigo-500 to-indigo-600" },
  { id: 2, label: "100 pts", value: 100, color: "from-violet-500 to-violet-600" },
  { id: 3, label: "200 pts", value: 200, color: "from-sky-500 to-sky-600" },
  { id: 4, label: "15% Off", value: "15off", color: "from-purple-500 to-purple-600" },
  { id: 5, label: "500 pts", value: 500, color: "from-indigo-500 to-indigo-600" },
  { id: 6, label: "Free Item", value: "free", color: "from-amber-500 to-amber-600" },
];

export function DailySpinWheel() {
  const [hasSpun, setHasSpun] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof prizes[0] | null>(null);

  const handleSpin = () => {
    if (hasSpun || spinning) return;

    setSpinning(true);

    // Simulate spin animation
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setWonPrize(randomPrize);
      setSpinning(false);
      setHasSpun(true);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="tracking-tight text-gray-900 mb-1">Daily Lucky Spin</div>
        <div className="text-gray-600">Spin once every day for rewards</div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="tracking-tight">Today&rsquo;s Spin</span>
              </div>
              {!hasSpun && (
                <Badge className="bg-amber-500 text-white border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Available
                </Badge>
              )}
            </div>

            {/* Spin Wheel Visualization */}
            <div className="flex justify-center my-8">
              <motion.div
                animate={spinning ? { rotate: 720 } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full border-8 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {prizes.slice(0, 6).map((prize, index) => (
                      <div
                        key={prize.id}
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${prize.color} flex items-center justify-center text-white text-xs`}
                      >
                        {prize.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Center button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Gift className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {!hasSpun && !spinning && (
                <motion.div
                  key="spin-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    onClick={handleSpin}
                    className="w-full bg-white text-indigo-600 hover:bg-white/90"
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Spin Now!
                  </Button>
                </motion.div>
              )}

              {spinning && (
                <motion.div
                  key="spinning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="text-white/80">Spinning...</div>
                </motion.div>
              )}

              {hasSpun && wonPrize && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="text-center">
                    <div className="text-white/80 mb-2">🎉 Congratulations!</div>
                    <div className="tracking-tight mb-1" style={{ fontSize: '32px' }}>
                      {wonPrize.label}
                    </div>
                    <div className="text-white/80">Added to your account</div>
                  </div>
                  <div className="text-center text-white/60 text-sm">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Next spin available in 18 hours
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Recent Winners */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-indigo-600" />
          <span className="text-gray-900">Recent Winners</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Alex M.", prize: "500 pts", time: "2 mins ago" },
            { name: "Sarah K.", prize: "Free Item", time: "5 mins ago" },
            { name: "John D.", prize: "200 pts", time: "12 mins ago" },
          ].map((winner, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">
                  {winner.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">{winner.name}</div>
                  <div className="text-gray-500 text-xs">{winner.time}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-indigo-600 border-indigo-600">
                {winner.prize}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
