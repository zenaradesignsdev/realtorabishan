import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  href: string
  label: string
}

export interface Service {
  title: string
  description: string
  icon: LucideIcon
}

export interface ValueItem {
  index: string
  title: string
  description: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}
