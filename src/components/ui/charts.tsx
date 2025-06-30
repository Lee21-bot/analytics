/**
 * Chart Components
 * Beautiful, reusable charts using Recharts with Podia-inspired design
 */

'use client'

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
} from 'recharts'

// Custom chart colors matching our design system
const CHART_COLORS = {
  primary: '#4C6FFF',
  success: '#00D4AA',
  warning: '#FF9F43',
  error: '#FF5B5B',
  muted: '#64748B',
  gradient: {
    primary: '#4C6FFF',
    primaryLight: '#8B9CFF',
  }
}

interface BaseChartProps {
  data: any[]
  height?: number
  className?: string
}

interface MetricChartProps extends BaseChartProps {
  dataKey: string
  title?: string
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
}

interface MultiLineChartProps extends BaseChartProps {
  lines: {
    dataKey: string
    stroke: string
    name: string
  }[]
  title?: string
}

/**
 * Revenue Chart - Line chart with gradient fill
 */
export function RevenueChart({ data, height = 300, className }: MetricChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }}
          />
          <YAxis 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Enrollment Chart - Bar chart showing daily enrollments
 */
export function EnrollmentChart({ data, height = 300, className }: MetricChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }}
          />
          <YAxis 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            formatter={(value: number) => [value, 'Enrollments']}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })
            }}
          />
          <Bar 
            dataKey="enrollments" 
            fill={CHART_COLORS.success}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Trend Line Chart - Simple line chart for trends
 */
export function TrendChart({ data, dataKey, height = 200, className }: MetricChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: CHART_COLORS.primary }}
          />
          <XAxis hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Multi-Line Chart - Multiple data series
 */
export function MultiLineChart({ data, lines, height = 300, className, title }: MultiLineChartProps) {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }}
          />
          <YAxis 
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickLine={{ stroke: '#E2E8F0' }}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            formatter={(value: number, name: string) => [value, name]}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })
            }}
          />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: line.stroke }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * Donut Chart - For completion rates and percentages
 */
export function DonutChart({ 
  data, 
  centerText, 
  centerValue, 
  height = 200, 
  className 
}: {
  data: { name: string; value: number; color: string }[]
  centerText?: string
  centerValue?: string
  height?: number
  className?: string
}) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            formatter={(value: number) => [`${value}%`, 'Percentage']}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerText && centerValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{centerValue}</div>
            <div className="text-sm text-gray-500">{centerText}</div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Metric Card with Trend - Shows a single metric with optional trend chart
 */
export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  trendData,
  className
}: {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: number
  trendData?: any[]
  className?: string
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
  const trendIcon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {trendData && (
          <div className="w-20 h-12">
            <TrendChart data={trendData} dataKey="value" height={48} />
          </div>
        )}
      </div>
      {trend && trendValue !== undefined && (
        <div className={`flex items-center mt-4 text-sm ${trendColor}`}>
          <span className="mr-1">{trendIcon}</span>
          <span className="font-medium">{Math.abs(trendValue)}%</span>
          <span className="ml-1 text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  )
} 