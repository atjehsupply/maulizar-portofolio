"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CameraState = "idle" | "requesting" | "active" | "denied" | "error";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setState("idle");
  }, []);

  const start = useCallback(async () => {
    setState("requesting");
    setError(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState("error");
        setError("Browser tidak mendukung akses kamera.");
        return;
      }

      // Stop stream lama dulu
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState("active");
    } catch (err: unknown) {
      const e = err as { name?: string; message?: string };
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setState("denied");
        setError("Izin kamera ditolak. Aktifkan di pengaturan browser.");
      } else if (e.name === "NotFoundError") {
        setState("error");
        setError("Kamera tidak ditemukan di perangkat ini.");
      } else {
        setState("error");
        setError(e.message || "Gagal mengakses kamera.");
      }
    }
  }, [facingMode]);

  const switchCamera = useCallback(async () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Restart stream saat facingMode berubah
  useEffect(() => {
    if (state === "active") {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || state !== "active") return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Mirror kalau pakai kamera depan
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [state, facingMode]);

  return {
    videoRef,
    state,
    error,
    facingMode,
    start,
    stop,
    capture,
    switchCamera,
  };
}