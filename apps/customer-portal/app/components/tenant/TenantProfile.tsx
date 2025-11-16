import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
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
  Award
} from "lucide-react";
import { motion } from "motion/react";

export function TenantProfile() {
  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16 border-2 border-white/30">
                  <AvatarFallback className="bg-white/20 text-white tracking-tight backdrop-blur-sm" style={{ fontSize: '24px' }}>
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="tracking-tight mb-1">John Doe</div>
                  <div className="text-white/80">Member since Mar 2024</div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Award className="h-5 w-5 text-amber-300" />
              <div>
                <div className="text-white/80">Current Status</div>
                <div className="tracking-tight">Gold Member</div>
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
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Mail className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Email</div>
              <div className="text-gray-900">john.doe@email.com</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Phone className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Phone</div>
              <div className="text-gray-900">+1 (555) 987-6543</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPin className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-500">Location</div>
              <div className="text-gray-900">New York, NY</div>
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
        <div className="tracking-tight text-gray-900 mb-3">Your Activity</div>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Redeemed</div>
            <div className="tracking-tight text-gray-900">18</div>
            <div className="text-gray-400 text-xs">Rewards</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Referred</div>
            <div className="tracking-tight text-gray-900">7</div>
            <div className="text-gray-400 text-xs">Friends</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-gray-500 mb-1">Earned</div>
            <div className="tracking-tight text-gray-900">22K</div>
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
        <div className="tracking-tight text-gray-900 mb-3">Settings</div>
        <Card className="divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="text-gray-900">Notifications</div>
                <div className="text-gray-500">Get reward alerts</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900">Payment Methods</div>
              <div className="text-gray-500">Manage cards</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Shield className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900">Privacy & Security</div>
              <div className="text-gray-500">Manage preferences</div>
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
        SmallBiznis v1.0.0
      </div>
    </div>
  );
}
