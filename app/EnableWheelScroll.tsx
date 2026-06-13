"use client"

import { useEffect } from "react"

export default function EnableWheelScroll() {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      try {
        // Ignore if user is interacting with a form control
        const tgt = e.target as HTMLElement | null
        const tag = tgt?.tagName
        if (tag && ["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return

        // Scroll the document by the wheel delta
        window.scrollBy({ top: e.deltaY, left: 0 })

        // Prevent default to avoid double-handling when other listeners allow it
        if (!e.defaultPrevented) e.preventDefault()
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("wheel", handler, { passive: false })
    return () => window.removeEventListener("wheel", handler as EventListener)
  }, [])

  return null
}
