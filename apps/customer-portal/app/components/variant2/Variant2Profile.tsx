import { Card } from "@smallbiznis/ui/components";
import { Button } from "@smallbiznis/ui/components";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "@smallbiznis/ui/components";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  ChevronRight,
  Edit,
  Gem
} from "lucide-react";
import { motion } from "motion/react";

export function Variant2Profile() {
  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-linear-to-br from-indigo-600 to-violet-600 text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16 border-2 border-white/30">
                  <AvatarFallback className="bg-white/20 text-white tracking-tight backdrop-blur-sm" style={{ fontSize: '24px' }}>
                    MK
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="tracking-tight mb-1">Maria Kim</div>
                  <div className="text-white/80">Member since Feb 2024</div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Gem className="h-5 w-5 text-sky-300" />
              <div>
                <div className="text-white/80">Elite Status</div>
                <div className="tracking-tight">Platinum Member</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="tracking-tight text-gray-900 mb-3">Personal Information</div>
        <Card className="divide-y">
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Mail className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Email</div>
              <div className="text-gray-900">maria.kim@email.com</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Phone className="h-4 w-4 text-violet-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Phone</div>
              <div className="text-gray-900">+1 (555) 234-5678</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-sky-100 rounded-lg">
              <MapPin className="h-4 w-4 text-sky-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Location</div>
              <div className="text-gray-900">Los Angeles, CA</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="tracking-tight text-gray-900 mb-3">Your Stats</div>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Redeemed</div>
            <div className="tracking-tight text-gray-900">32</div>
            <div className="text-gray-400 text-xs">Rewards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Referred</div>
            <div className="tracking-tight text-gray-900">15</div>
            <div className="text-gray-400 text-xs">Friends</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Earned</div>
            <div className="tracking-tight text-gray-900">38K</div>
            <div className="text-gray-400 text-xs">Points</div>
          </Card>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="tracking-tight text-gray-900 mb-3">Preferences</div>
        <Card className="divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-gray-900">Push Notifications</div>
                <div className="text-gray-500">Reward updates</div>
              </div>
            </div>
            {/* <Switch defaultChecked /> */}
            <Switch />
          </div>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CreditCard className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900">Payment Methods</div>
              <div className="text-gray-500">Manage cards</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Shield className="h-4 w-4 text-violet-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900">Privacy & Security</div>
              <div className="text-gray-500">Your data protection</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>
      </motion.div>

      {/* Sign Out */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </motion.div>

      <div className="text-center text-gray-400 pb-2">
        YourApp v1.0.0
      </div>
    </div>
  );
}
