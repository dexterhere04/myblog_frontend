"use client"

import dynamic from "next/dynamic"
import { useDeviceCapability } from "./useDeviceCapability"

const WaterfallBackground = dynamic(() => import("./WaterfallBackground"), { ssr: false })

export default function WaterfallWrapper() {
  const quality = useDeviceCapability()
  return <WaterfallBackground quality={quality} />
}
