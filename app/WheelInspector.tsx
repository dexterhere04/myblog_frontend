"use client"

import React, { useEffect, useState } from "react"

export default function WheelInspector() {
  const [captureInfo, setCaptureInfo] = useState<string>("no-event")
  const [bubbleInfo, setBubbleInfo] = useState<string>("no-event")

  useEffect(() => {
    const onCapture = (e: WheelEvent) => {
      const t = (e.target as HTMLElement)?.tagName || "unknown"
      const before = window.scrollY
      requestAnimationFrame(() => {
        const after = window.scrollY
        const doc = document.documentElement
        const body = document.body
        const scrollHeight = doc.scrollHeight
        const clientHeight = doc.clientHeight
        const htmlOverflow = getComputedStyle(doc).overflowY
        const bodyOverflow = getComputedStyle(body).overflowY
        setCaptureInfo(
          `tag:${t} deltaY:${e.deltaY} defaulted:${e.defaultPrevented} before:${before} after:${after} docH:${scrollHeight} clientH:${clientHeight} htmlOverflow:${htmlOverflow} bodyOverflow:${bodyOverflow}`
        )
      })
    }
    const onBubble = (e: WheelEvent) => {
      const t = (e.target as HTMLElement)?.tagName || "unknown"
      const se = document.scrollingElement ? (document.scrollingElement as HTMLElement).tagName : 'none'
      // find nearest scrollable ancestor
      const findScrollable = (el: Element | null) => {
        while (el && el !== document.documentElement) {
          const cs = getComputedStyle(el as Element)
          const overflowY = cs.overflowY
          const canScroll = (overflowY === 'auto' || overflowY === 'scroll') && (el as HTMLElement).scrollHeight > (el as HTMLElement).clientHeight
          if (canScroll) return `${(el as HTMLElement).tagName} overflowY:${overflowY}`
          el = el.parentElement
        }
        return 'none'
      }
      const scrollable = findScrollable(e.target as Element)
      setBubbleInfo(`tag:${t} deltaY:${e.deltaY} defaulted:${e.defaultPrevented} scrollEl:${se} nearestScrollable:${scrollable}`)
    }

    window.addEventListener("wheel", onCapture, { capture: true })
    window.addEventListener("wheel", onBubble)

    return () => {
      window.removeEventListener("wheel", onCapture, { capture: true } as any)
      window.removeEventListener("wheel", onBubble)
    }
  }, [])

  return (
    <div style={{ position: "fixed", right: 12, bottom: 12, zIndex: 9999, pointerEvents: "none", background: "rgba(0,0,0,0.6)", color: "white", padding: 8, borderRadius: 6, fontSize: 12 }}>
      <div style={{ marginBottom: 4 }}>WheelInspector</div>
      <div style={{ whiteSpace: "nowrap" }}>Capture: {captureInfo}</div>
      <div style={{ whiteSpace: "nowrap" }}>Bubble: {bubbleInfo}</div>
    </div>
  )
}
