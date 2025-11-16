import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

const transactions = [
  {
    id: 1,
    type: "earned",
    description: "Purchase at Online Store",
    points: 250,
    date: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "redeemed",
    description: "Free Coffee Voucher",
    points: -500,
    date: "1 day ago",
    status: "completed",
  },
  {
    id: 3,
    type: "earned",
    description: "Birthday Bonus",
    points: 1000,
    date: "3 days ago",
    status: "completed",
  },
  {
    id: 4,
    type: "earned",
    description: "Friend Referral",
    points: 500,
    date: "5 days ago",
    status: "completed",
  },
  {
    id: 5,
    type: "pending",
    description: "Purchase at Partner Store",
    points: 150,
    date: "1 week ago",
    status: "pending",
  },
];

export function MobileTransactions() {
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
                ? "bg-green-100"
                : transaction.type === "redeemed"
                ? "bg-purple-100"
                : "bg-orange-100"
            }`}
          >
            {transaction.type === "earned" ? (
              <ArrowDownRight className="h-4 w-4 text-green-600" />
            ) : transaction.type === "redeemed" ? (
              <ArrowUpRight className="h-4 w-4 text-purple-600" />
            ) : (
              <Clock className="h-4 w-4 text-orange-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-gray-900 truncate">{transaction.description}</div>
            <div className="text-gray-500">{transaction.date}</div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className={`${
                transaction.points > 0 ? "text-green-600" : "text-gray-900"
              }`}
            >
              {transaction.points > 0 ? "+" : ""}
              {transaction.points.toLocaleString()}
            </span>
            {transaction.status === "pending" && (
              <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">
                Pending
              </Badge>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
