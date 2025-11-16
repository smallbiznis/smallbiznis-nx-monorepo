'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
