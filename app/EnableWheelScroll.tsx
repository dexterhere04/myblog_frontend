"use client"

import { useEffect } from "react"

export default function EnableWheelScroll() {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      try {
        const tgt = e.target as HTMLElement | null

        if (tgt) {
          const tag = tgt.tagName
          if (["INPUT", "SELECT"].includes(tag)) {
            window.scrollBy({ top: e.deltaY, left: 0 })
            e.preventDefault()
            return
          }

          if (tag === "TEXTAREA") {
            const textarea = tgt as HTMLTextAreaElement
            const canScrollDown = e.deltaY > 0 && textarea.scrollTop + textarea.clientHeight < textarea.scrollHeight
            const canScrollUp = e.deltaY < 0 && textarea.scrollTop > 0
            if (canScrollDown || canScrollUp) return
          }
        }

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
