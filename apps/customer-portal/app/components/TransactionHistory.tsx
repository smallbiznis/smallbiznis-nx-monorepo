import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
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
    type: "redeemed",
    description: "$10 Off Purchase",
    points: -1000,
    date: "1 week ago",
    status: "completed",
  },
  {
    id: 6,
    type: "earned",
    description: "Monthly Activity Bonus",
    points: 300,
    date: "1 week ago",
    status: "completed",
  },
  {
    id: 7,
    type: "pending",
    description: "Purchase at Partner Store",
    points: 150,
    date: "2 weeks ago",
    status: "pending",
  },
];

export function TransactionHistory() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="tracking-tight text-gray-900 mb-1">Recent Activity</div>
        <div className="text-gray-500">Your latest transactions</div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
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
                <div>
                  <div className="text-gray-900">{transaction.description}</div>
                  <div className="text-gray-500">{transaction.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {transaction.status === "pending" && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Pending
                  </Badge>
                )}
                <span
                  className={`${
                    transaction.points > 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {transaction.points > 0 ? "+" : ""}
                  {transaction.points.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
