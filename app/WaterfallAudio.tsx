"use client"
import { useEffect, useRef } from "react"
import { useAudio } from "./AudioContext"

export default function WaterfallAudio() {
  const { isMuted } = useAudio()
  const ctxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!ctxRef.current || !masterGainRef.current) return

    if (isMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(
        0,
        ctxRef.current.currentTime + 0.8,
      )
    } else {
      ctxRef.current.resume()
      masterGainRef.current.gain.linearRampToValueAtTime(
        0.45,
        ctxRef.current.currentTime + 0.8,
      )
    }
  }, [isMuted])

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const ctx = new AudioContext()
    ctxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
    masterGainRef.current = masterGain

    fetch("/audio/waterfall.mp3")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        if (!ctxRef.current) return

        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.loop = true
        source.connect(masterGain)
        source.start()
        sourceRef.current = source

        if (!isMuted) {
          ctx.resume()
          masterGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.8)
        }
      })
      .catch(() => {})

    return () => {
      ctx.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
