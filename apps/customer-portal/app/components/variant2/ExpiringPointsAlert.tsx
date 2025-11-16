import { Card, Button } from '@smallbiznis/ui/components'
import { AlertCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

export function ExpiringPointsAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 bg-linear-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-900">Points Expiring Soon!</span>
            </div>
            <div className="text-gray-600 mb-2">
              <span className="text-amber-600">1,250 points</span> will expire in 7 days
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Use Points Now
              </Button>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Clock className="h-3 w-3" />
                <span>Expires Jan 31</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
