/**
 * Enhanced Metric Card Component
 * Beautiful metric cards with animations, gradients, and improved UX
 */

'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnhancedMetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
  trendLabel?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-50 via-blue-50/50 to-indigo-100/50',
    border: 'border-blue-200/60',
    icon: 'text-blue-600',
    trend: {
      up: 'text-blue-600 bg-blue-50',
      down: 'text-blue-600 bg-blue-50',
      neutral: 'text-blue-600 bg-blue-50'
    }
  },
  green: {
    gradient: 'from-emerald-50 via-green-50/50 to-teal-100/50',
    border: 'border-emerald-200/60',
    icon: 'text-emerald-600',
    trend: {
      up: 'text-emerald-600 bg-emerald-50',
      down: 'text-emerald-600 bg-emerald-50',
      neutral: 'text-emerald-600 bg-emerald-50'
    }
  },
  purple: {
    gradient: 'from-purple-50 via-violet-50/50 to-fuchsia-100/50',
    border: 'border-purple-200/60',
    icon: 'text-purple-600',
    trend: {
      up: 'text-purple-600 bg-purple-50',
      down: 'text-purple-600 bg-purple-50',
      neutral: 'text-purple-600 bg-purple-50'
    }
  },
  orange: {
    gradient: 'from-orange-50 via-amber-50/50 to-yellow-100/50',
    border: 'border-orange-200/60',
    icon: 'text-orange-600',
    trend: {
      up: 'text-orange-600 bg-orange-50',
      down: 'text-orange-600 bg-orange-50',
      neutral: 'text-orange-600 bg-orange-50'
    }
  },
  red: {
    gradient: 'from-red-50 via-rose-50/50 to-pink-100/50',
    border: 'border-red-200/60',
    icon: 'text-red-600',
    trend: {
      up: 'text-red-600 bg-red-50',
      down: 'text-red-600 bg-red-50',
      neutral: 'text-red-600 bg-red-50'
    }
  },
  indigo: {
    gradient: 'from-indigo-50 via-blue-50/50 to-purple-100/50',
    border: 'border-indigo-200/60',
    icon: 'text-indigo-600',
    trend: {
      up: 'text-indigo-600 bg-indigo-50',
      down: 'text-indigo-600 bg-indigo-50',
      neutral: 'text-indigo-600 bg-indigo-50'
    }
  }
}

const sizeVariants = {
  sm: {
    card: 'p-4',
    icon: 'h-4 w-4',
    title: 'text-xs',
    value: 'text-lg',
    subtitle: 'text-xs'
  },
  md: {
    card: 'p-6',
    icon: 'h-5 w-5',
    title: 'text-sm',
    value: 'text-2xl',
    subtitle: 'text-sm'
  },
  lg: {
    card: 'p-8',
    icon: 'h-6 w-6',
    title: 'text-base',
    value: 'text-3xl',
    subtitle: 'text-base'
  }
}

export function EnhancedMetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  trendLabel = 'vs last month',
  icon,
  color = 'blue',
  className,
  size = 'md',
  isLoading = false
}: EnhancedMetricCardProps) {
  const colors = colorVariants[color]
  const sizes = sizeVariants[size]
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-3 w-3" />
      case 'down':
        return <ArrowDownRight className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50'
      case 'down':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (isLoading) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br",
        colors.gradient,
        colors.border,
        sizes.card,
        className
      )}>
        <div className="animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className={cn("rounded-lg bg-gray-200", sizes.icon)} />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className={cn("bg-gray-200 rounded mb-2", 
            size === 'lg' ? 'h-8 w-32' : size === 'md' ? 'h-6 w-28' : 'h-5 w-24'
          )} />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm",
        "shadow-sm hover:shadow-xl transition-all duration-300",
        "group cursor-pointer",
        colors.gradient,
        colors.border,
        sizes.card,
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[length:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "flex items-center justify-center rounded-lg p-2 transition-transform duration-200 group-hover:scale-110",
            colors.trend.neutral
          )}>
            {icon}
          </div>
          
          {trend && trendValue !== undefined && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                getTrendColor()
              )}
            >
              {getTrendIcon()}
              <span>{Math.abs(trendValue)}%</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className={cn(
            "font-medium text-gray-600 tracking-wide",
            sizes.title
          )}>
            {title}
          </p>
          
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={cn(
              "font-bold text-gray-900 tracking-tight",
              sizes.value
            )}
          >
            {value}
          </motion.p>
          
          {subtitle && (
            <p className={cn(
              "text-gray-500 font-medium",
              sizes.subtitle
            )}>
              {subtitle}
            </p>
          )}

          {trend && trendValue !== undefined && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-xs text-gray-500 font-medium"
            >
              {trendLabel}
            </motion.p>
          )}
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <motion.div
        className="absolute inset-0 -top-full bg-gradient-to-b from-white/20 to-transparent"
        animate={{
          top: ["-100%", "100%"]
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          repeat: 0,
        }}
        style={{ 
          transformOrigin: "center",
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)"
        }}
        initial={false}
        whileHover={{
          top: ["100%", "-100%"]
        }}
      />
    </motion.div>
  )
}

// Grid Background Pattern CSS (add to global CSS)
export const gridStyles = `
  .bg-grid-white {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  }
` 