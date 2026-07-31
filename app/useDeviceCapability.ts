"use client"

import { useState } from "react"

export type QualityTier = "low" | "medium" | "high"

declare global {
  interface Navigator {
    deviceMemory?: number
  }
}

function detectTier(): QualityTier {
  if (typeof window === "undefined") return "high"

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const concurrency = navigator.hardwareConcurrency ?? 4
  const memory = navigator.deviceMemory ?? 4
  const isSmallScreen = window.innerWidth < 768

  if (isMobile || isSmallScreen || concurrency <= 4 || memory <= 4) {
    return "low"
  }

  if (concurrency <= 7 || memory <= 6) {
    return "medium"
  }

  if (isTouch && concurrency <= 8) {
    return "medium"
  }

  return "high"
}

export function useDeviceCapability(): QualityTier {
  const [tier] = useState<QualityTier>(() => detectTier())

  return tier
}
