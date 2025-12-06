import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Badge } from "@smallbiznis/ui";
import { motion } from "motion/react";

const transactions = [
  {
    id: 1,
    type: "earned",
    description: "Premium Purchase",
    points: 320,
    date: "30 mins ago",
    status: "completed",
  },
  {
    id: 2,
    type: "redeemed",
    description: "20% Discount Voucher",
    points: -1200,
    date: "Yesterday",
    status: "completed",
  },
  {
    id: 3,
    type: "earned",
    description: "VIP Bonus Points",
    points: 750,
    date: "2 days ago",
    status: "completed",
  },
  {
    id: 4,
    type: "earned",
    description: "Referral Success",
    points: 500,
    date: "3 days ago",
    status: "completed",
  },
  {
    id: 5,
    type: "redeemed",
    description: "Coffee Bundle",
    points: -800,
    date: "5 days ago",
    status: "completed",
  },
  {
    id: 6,
    type: "earned",
    description: "Loyalty Milestone",
    points: 400,
    date: "1 week ago",
    status: "completed",
  },
  {
    id: 7,
    type: "pending",
    description: "Member Purchase",
    points: 280,
    date: "1 week ago",
    status: "pending",
  },
];

export function Variant2Transactions() {
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
                ? "bg-indigo-100"
                : transaction.type === "redeemed"
                ? "bg-violet-100"
                : "bg-sky-100"
            }`}
          >
            {transaction.type === "earned" ? (
              <ArrowDownRight className="h-4 w-4 text-indigo-600" />
            ) : transaction.type === "redeemed" ? (
              <ArrowUpRight className="h-4 w-4 text-violet-600" />
            ) : (
              <Clock className="h-4 w-4 text-sky-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-gray-900 truncate">{transaction.description}</div>
            <div className="text-gray-500">{transaction.date}</div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className={`${
                transaction.points > 0 ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              {transaction.points > 0 ? "+" : ""}
              {transaction.points.toLocaleString()}
            </span>
            {transaction.status === "pending" && (
              <Badge variant="outline" className="text-sky-600 border-sky-600 text-xs">
                Pending
              </Badge>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
