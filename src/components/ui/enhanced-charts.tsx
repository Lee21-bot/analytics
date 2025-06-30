/**
 * Enhanced Chart Components
 * Beautiful, animated charts with improved visual design and interactions
 */

'use client'

import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { TrendingUp, TrendingDown, Activity, DollarSign, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// Enhanced color palette for charts
const ENHANCED_CHART_COLORS = {
  primary: {
    main: '#4C6FFF',
    light: '#8B9CFF',
    gradient: ['#4C6FFF', '#8B9CFF']
  },
  success: {
    main: '#00D4AA',
    light: '#5EEAD4',
    gradient: ['#00D4AA', '#5EEAD4']
  },
  warning: {
    main: '#FFB800',
    light: '#FCD34D',
    gradient: ['#FFB800', '#FCD34D']
  },
  error: {
    main: '#EF4444',
    light: '#FB7185',
    gradient: ['#EF4444', '#FB7185']
  },
  purple: {
    main: '#8B5CF6',
    light: '#C4B5FD',
    gradient: ['#8B5CF6', '#C4B5FD']
  }
}

interface BaseChartProps {
  data: any[]
  height?: number
  className?: string
  title?: string
  subtitle?: string
  showLegend?: boolean
  animated?: boolean
}

interface EnhancedRevenueChartProps extends BaseChartProps {
  dataKey?: string
  color?: keyof typeof ENHANCED_CHART_COLORS
}

interface EnhancedBarChartProps extends BaseChartProps {
  dataKey?: string
  color?: keyof typeof ENHANCED_CHART_COLORS
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-lg p-3 min-w-[150px]"
      >
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {formatter ? formatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </motion.div>
    )
  }
  return null
}

/**
 * Enhanced Revenue Chart with gradient and animations
 */
export function EnhancedRevenueChart({ 
  data, 
  height = 320, 
  className, 
  title = "Revenue Trend",
  subtitle,
  dataKey = "revenue",
  color = "primary",
  animated = true
}: EnhancedRevenueChartProps) {
  const colors = ENHANCED_CHART_COLORS[color]
  
  return (
    <motion.div 
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`${color}Gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.main} stopOpacity={0.4} />
                <stop offset="50%" stopColor={colors.light} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors.main} stopOpacity={0.05} />
              </linearGradient>
              <filter id={`${color}Glow`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              strokeOpacity={0.5}
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }}
            />
            
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            
            <Tooltip 
              content={<CustomTooltip formatter={(value: number) => `$${value.toLocaleString()}`} />}
            />
            
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.main}
              strokeWidth={3}
              fill={`url(#${color}Gradient)`}
              filter={`url(#${color}Glow)`}
              animationDuration={animated ? 1500 : 0}
              animationBegin={animated ? 200 : 0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

/**
 * Enhanced Bar Chart with animations and gradients
 */
export function EnhancedBarChart({ 
  data, 
  height = 320, 
  className, 
  title = "Daily Enrollments",
  subtitle,
  dataKey = "enrollments",
  color = "success",
  animated = true
}: EnhancedBarChartProps) {
  const colors = ENHANCED_CHART_COLORS[color]
  
  return (
    <motion.div 
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className={cn("w-full", className)}
    >
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-100">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`${color}BarGradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.main} />
                <stop offset="100%" stopColor={colors.light} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              strokeOpacity={0.5}
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }}
            />
            
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
            />
            
            <Bar 
              dataKey={dataKey} 
              fill={`url(#${color}BarGradient)`}
              radius={[6, 6, 0, 0]}
              animationDuration={animated ? 1200 : 0}
              animationBegin={animated ? 400 : 0}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

/**
 * Enhanced Mini Chart for cards
 */
export function EnhancedMiniChart({ 
  data, 
  dataKey, 
  height = 60, 
  className,
  color = "primary",
  type = "line"
}: {
  data: any[]
  dataKey: string
  height?: number
  className?: string
  color?: keyof typeof ENHANCED_CHART_COLORS
  type?: 'line' | 'area'
}) {
  const colors = ENHANCED_CHART_COLORS[color]
  
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`mini${color}Gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.main} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.main}
              strokeWidth={2}
              fill={`url(#mini${color}Gradient)`}
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors.main}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: colors.main }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Enhanced Donut Chart with animations
 */
export function EnhancedDonutChart({ 
  data, 
  height = 240, 
  className,
  title,
  centerText,
  centerValue,
  animated = true
}: {
  data: { name: string; value: number; color: string }[]
  height?: number
  className?: string
  title?: string
  centerText?: string
  centerValue?: string
  animated?: boolean
}) {
  return (
    <motion.div 
      initial={animated ? { opacity: 0, scale: 0.9 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className={cn("w-full relative", className)}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              animationDuration={animated ? 1000 : 0}
              animationBegin={animated ? 600 : 0}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip formatter={(value: number) => `${value}%`} />}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {centerText && centerValue && (
          <motion.div 
            initial={animated ? { opacity: 0, scale: 0.8 } : false}
            animate={animated ? { opacity: 1, scale: 1 } : false}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{centerValue}</div>
              <div className="text-sm text-gray-600">{centerText}</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Enhanced Stats Card with trend visualization
 */
export function EnhancedStatsCard({
  title,
  value,
  change,
  trend,
  trendData,
  icon: Icon,
  color = "primary",
  className
}: {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  trendData?: any[]
  icon?: React.ComponentType<any>
  color?: keyof typeof ENHANCED_CHART_COLORS
  className?: string
}) {
  const colors = ENHANCED_CHART_COLORS[color]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white border border-gray-100",
        "shadow-sm hover:shadow-lg transition-all duration-300 p-6",
        "group cursor-pointer",
        className
      )}
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-5 transform rotate-12"
        style={{ 
          background: `linear-gradient(135deg, ${colors.main}, ${colors.light})` 
        }}
      />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          {Icon && (
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${colors.main}10` }}
            >
              <Icon className="h-5 w-5" style={{ color: colors.main }} />
            </div>
          )}
          
          {trendData && (
            <div className="w-16 h-8">
              <EnhancedMiniChart 
                data={trendData} 
                dataKey="value" 
                height={32}
                color={color}
                type="area"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-red-600" />
              ) : (
                <Activity className="h-3 w-3 text-gray-400" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' ? "text-green-600" : 
                trend === 'down' ? "text-red-600" : "text-gray-600"
              )}>
                {Math.abs(change)}% vs last month
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Unified EnhancedCharts Component
 * A flexible wrapper that can render different chart types based on props
 */
export function EnhancedCharts({
  data,
  type = 'line',
  xAxisKey = 'x',
  yAxisKey = 'y',
  title,
  color = '#3b82f6',
  height = 300,
  className,
  animated = true
}: {
  data: any[]
  type?: 'line' | 'area' | 'bar' | 'pie'
  xAxisKey?: string
  yAxisKey?: string
  title?: string
  color?: string
  height?: number
  className?: string
  animated?: boolean
}) {
  
  // Convert hex color to our color system
  const getColorKey = (colorHex: string): keyof typeof ENHANCED_CHART_COLORS => {
    if (colorHex.includes('3b82f6') || colorHex.includes('blue')) return 'primary'
    if (colorHex.includes('10b981') || colorHex.includes('green')) return 'success'
    if (colorHex.includes('f59e0b') || colorHex.includes('yellow')) return 'warning'
    if (colorHex.includes('ef4444') || colorHex.includes('red')) return 'error'
    return 'primary'
  }

  const colorKey = getColorKey(color)
  const colors = ENHANCED_CHART_COLORS[colorKey]

  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      if (yAxisKey.includes('amount') || yAxisKey.includes('revenue')) {
        return `$${value.toLocaleString()}`
      }
      return value.toString()
    }
    return value
  }

  const formatAxisValue = (value: any) => {
    if (xAxisKey === 'date') {
      const date = new Date(value)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
    return value
  }

  return (
    <motion.div 
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' ? (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatAxisValue}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => 
                yAxisKey.includes('amount') || yAxisKey.includes('revenue') 
                  ? `$${(value / 1000).toFixed(0)}k` 
                  : value
              }
            />
            <Tooltip 
              content={<CustomTooltip formatter={formatValue} />}
            />
            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke={colors.main}
              strokeWidth={2}
              dot={{ fill: colors.main, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.main }}
              animationDuration={animated ? 1000 : 0}
            />
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorGradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.main} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colors.main} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={formatAxisValue}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip formatter={formatValue} />} />
            <Area
              type="monotone"
              dataKey={yAxisKey}
              stroke={colors.main}
              fillOpacity={1}
              fill="url(#colorGradient)"
              animationDuration={animated ? 1000 : 0}
            />
          </AreaChart>
        ) : type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={formatAxisValue}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip formatter={formatValue} />} />
            <Bar
              dataKey={yAxisKey}
              fill={colors.main}
              radius={[4, 4, 0, 0]}
              animationDuration={animated ? 1000 : 0}
            />
          </BarChart>
        ) : (
          // Default to line chart for unsupported types
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatAxisValue}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              content={<CustomTooltip formatter={formatValue} />}
            />
            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke={colors.main}
              strokeWidth={2}
              dot={{ fill: colors.main, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.main }}
              animationDuration={animated ? 1000 : 0}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
} 