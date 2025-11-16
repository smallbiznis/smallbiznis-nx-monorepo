import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

const transactions = [
  {
    id: 1,
    type: "earned",
    description: "Purchase at Main Store",
    points: 180,
    date: "1 hour ago",
    status: "completed",
  },
  {
    id: 2,
    type: "redeemed",
    description: "15% Off Coupon",
    points: -750,
    date: "Yesterday",
    status: "completed",
  },
  {
    id: 3,
    type: "earned",
    description: "Birthday Reward",
    points: 500,
    date: "2 days ago",
    status: "completed",
  },
  {
    id: 4,
    type: "earned",
    description: "Friend Referral Bonus",
    points: 300,
    date: "3 days ago",
    status: "completed",
  },
  {
    id: 5,
    type: "redeemed",
    description: "Free Coffee & Pastry",
    points: -500,
    date: "4 days ago",
    status: "completed",
  },
  {
    id: 6,
    type: "earned",
    description: "Weekly Visit Streak",
    points: 200,
    date: "5 days ago",
    status: "completed",
  },
  {
    id: 7,
    type: "pending",
    description: "Online Order",
    points: 125,
    date: "1 week ago",
    status: "pending",
  },
];

export function TenantTransactions() {
  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border"
        >
          <div
            className={`p-2 rounded-lg shrink-0 ${
              transaction.type === "earned"
                ? "bg-emerald-100"
                : transaction.type === "redeemed"
                ? "bg-teal-100"
                : "bg-amber-100"
            }`}
          >
            {transaction.type === "earned" ? (
              <ArrowDownRight className="h-4 w-4 text-emerald-600" />
            ) : transaction.type === "redeemed" ? (
              <ArrowUpRight className="h-4 w-4 text-teal-600" />
            ) : (
              <Clock className="h-4 w-4 text-amber-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-gray-900 truncate">{transaction.description}</div>
            <div className="text-gray-500">{transaction.date}</div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className={`${
                transaction.points > 0 ? "text-emerald-600" : "text-gray-900"
              }`}
            >
              {transaction.points > 0 ? "+" : ""}
              {transaction.points.toLocaleString()}
            </span>
            {transaction.status === "pending" && (
              <Badge variant="outline" className="text-amber-600 border-amber-600 text-xs">
                Pending
              </Badge>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
