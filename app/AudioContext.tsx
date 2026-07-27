"use client"
import { createContext, useContext, useState, useCallback } from "react"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
}

const AudioCtx = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
})

export function useAudio() {
  return useContext(AudioCtx)
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioCtx.Provider>
  )
}
