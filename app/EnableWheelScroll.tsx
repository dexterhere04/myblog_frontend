"use client"

import { useEffect } from "react"

export default function EnableWheelScroll() {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      try {
        const tgt = e.target as HTMLElement | null
        const tag = tgt?.tagName
        if (tag && ["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return

        window.scrollBy({ top: e.deltaY, left: 0 })

        if (!e.defaultPrevented) e.preventDefault()
      } catch {
        // ignore
      }
    }

    window.addEventListener("wheel", handler, { passive: false })
    return () => window.removeEventListener("wheel", handler as EventListener)
  }, [])

  return null
}
