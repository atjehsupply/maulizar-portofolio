"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// === KONFIGURASI ===
const CANVAS_W = 360;
const CANVAS_H = 540;

const PADDLE_W = 80;
const PADDLE_H = 8;
const PADDLE_Y = CANVAS_H - 40;

const BALL_R = 6;
const BALL_SPEED_INIT = 4;
const BALL_SPEED_MAX = 9;

const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_W = (CANVAS_W - 40) / BRICK_COLS;
const BRICK_H = 18;
const BRICK_TOP = 80;
const BRICK_LEFT = 20;
const BRICK_GAP = 2;

const COLORS = ["#7C3AED", "#6D28D9", "#4A9EFF", "#3B82F6", "#2563EB"];

export type GameState = "idle" | "playing" | "paused" | "gameover" | "win";

export type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  row: number;
  alive: boolean;
};

export function useBreakout() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Game state (pakai ref supaya tidak trigger re-render tiap frame)
  const paddleX = useRef(CANVAS_W / 2 - PADDLE_W / 2);
  const ballX = useRef(CANVAS_W / 2);
  const ballY = useRef(CANVAS_H - 80);
  const ballVX = useRef(BALL_SPEED_INIT);
  const ballVY = useRef(-BALL_SPEED_INIT);
  const bricks = useRef<Brick[]>([]);
  const targetPaddleX = useRef(CANVAS_W / 2 - PADDLE_W / 2);

  // React state untuk UI
  const [state, setState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  // === INIT BRICKS ===
  const initBricks = useCallback(() => {
    const arr: Brick[] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        arr.push({
          x: BRICK_LEFT + c * BRICK_W,
          y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
          w: BRICK_W - BRICK_GAP,
          h: BRICK_H,
          row: r,
          alive: true,
        });
      }
    }
    bricks.current = arr;
  }, []);

  // === RESET BALL ===
  const resetBall = useCallback(() => {
    ballX.current = CANVAS_W / 2;
    ballY.current = CANVAS_H - 80;
    const speed = Math.min(
      BALL_SPEED_INIT + (level - 1) * 0.5,
      BALL_SPEED_MAX
    );
    ballVX.current = (Math.random() > 0.5 ? 1 : -1) * speed * 0.7;
    ballVY.current = -speed;
  }, [level]);

  // === START GAME ===
  const start = useCallback(() => {
    paddleX.current = CANVAS_W / 2 - PADDLE_W / 2;
    targetPaddleX.current = paddleX.current;
    initBricks();
    resetBall();
    setScore(0);
    setLives(3);
    setLevel(1);
    setState("playing");
  }, [initBricks, resetBall]);

  // === PAUSE / RESUME ===
  const togglePause = useCallback(() => {
    setState((s) => {
      if (s === "playing") return "paused";
      if (s === "paused") return "playing";
      return s;
    });
  }, []);

  // === UPDATE LOGIC (dipanggil tiap frame) ===
  const update = useCallback(() => {
    // Smooth paddle movement
    paddleX.current += (targetPaddleX.current - paddleX.current) * 0.25;

    // Clamp paddle
    paddleX.current = Math.max(
      0,
      Math.min(CANVAS_W - PADDLE_W, paddleX.current)
    );

    // Ball movement
    ballX.current += ballVX.current;
    ballY.current += ballVY.current;

    // Wall collision (kiri/kanan)
    if (ballX.current - BALL_R <= 0) {
      ballX.current = BALL_R;
      ballVX.current *= -1;
    }
    if (ballX.current + BALL_R >= CANVAS_W) {
      ballX.current = CANVAS_W - BALL_R;
      ballVX.current *= -1;
    }
    // Wall collision (atas)
    if (ballY.current - BALL_R <= 0) {
      ballY.current = BALL_R;
      ballVY.current *= -1;
    }

    // Paddle collision
    if (
      ballY.current + BALL_R >= PADDLE_Y &&
      ballY.current + BALL_R <= PADDLE_Y + PADDLE_H + 4 &&
      ballX.current >= paddleX.current - BALL_R &&
      ballX.current <= paddleX.current + PADDLE_W + BALL_R &&
      ballVY.current > 0
    ) {
      ballY.current = PADDLE_Y - BALL_R;
      // Hit position relative to paddle center (-1 to 1)
      const hitPos =
        (ballX.current - (paddleX.current + PADDLE_W / 2)) / (PADDLE_W / 2);
      const speed = Math.sqrt(ballVX.current ** 2 + ballVY.current ** 2);
      const angle = hitPos * (Math.PI / 3); // max 60°
      ballVX.current = speed * Math.sin(angle);
      ballVY.current = -speed * Math.cos(angle);
    }

    // Brick collision
    for (const brick of bricks.current) {
      if (!brick.alive) continue;
      if (
        ballX.current + BALL_R > brick.x &&
        ballX.current - BALL_R < brick.x + brick.w &&
        ballY.current + BALL_R > brick.y &&
        ballY.current - BALL_R < brick.y + brick.h
      ) {
        brick.alive = false;
        setScore((s) => s + 10);

        // Determine bounce direction
        const overlapLeft = ballX.current + BALL_R - brick.x;
        const overlapRight = brick.x + brick.w - (ballX.current - BALL_R);
        const overlapTop = ballY.current + BALL_R - brick.y;
        const overlapBottom = brick.y + brick.h - (ballY.current - BALL_R);

        const minOverlap = Math.min(
          overlapLeft,
          overlapRight,
          overlapTop,
          overlapBottom
        );

        if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          ballVX.current *= -1;
        } else {
          ballVY.current *= -1;
        }
        break;
      }
    }

    // Ball jatuh ke bawah
    if (ballY.current - BALL_R > CANVAS_H) {
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setState("gameover");
          return 0;
        }
        resetBall();
        return next;
      });
    }

    // Cek menang
    const anyAlive = bricks.current.some((b) => b.alive);
    if (!anyAlive) {
      setLevel((l) => l + 1);
      setState("win");
    }
  }, [resetBall]);

  // === RENDER (dipanggil tiap frame) ===
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background — nebula gradient
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, "#0F0A2E");
    grad.addColorStop(1, "#05050A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Bintang halus
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < 30; i++) {
      const x = (i * 73) % CANVAS_W;
      const y = (i * 137) % CANVAS_H;
      ctx.fillRect(x, y, 1, 1);
    }

    // Bricks
    for (const brick of bricks.current) {
      if (!brick.alive) continue;
      ctx.fillStyle = COLORS[brick.row % COLORS.length];
      ctx.shadowColor = COLORS[brick.row % COLORS.length];
      ctx.shadowBlur = 8;
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      ctx.shadowBlur = 0;
    }

    // Paddle
    ctx.fillStyle = "#4A9EFF";
    ctx.shadowColor = "#4A9EFF";
    ctx.shadowBlur = 16;
    ctx.fillRect(paddleX.current, PADDLE_Y, PADDLE_W, PADDLE_H);
    ctx.shadowBlur = 0;

    // Ball
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#4A9EFF";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(ballX.current, ballY.current, BALL_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  // === GAME LOOP ===
  useEffect(() => {
    if (state !== "playing") return;

    const loop = () => {
      update();
      render();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state, update, render]);

  // Render satu kali saat idle/paused/gameover (supaya canvas tidak blank)
  useEffect(() => {
    if (state !== "playing") {
      render();
    }
  }, [state, render]);

  // === INPUT: MOUSE ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const x = (e.clientX - rect.left) * scaleX;
      targetPaddleX.current = x - PADDLE_W / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * scaleX;
      targetPaddleX.current = x - PADDLE_W / 2;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  // Init bricks saat mount
  useEffect(() => {
    initBricks();
    render();
  }, [initBricks, render]);

  return {
    canvasRef,
    state,
    score,
    lives,
    level,
    start,
    togglePause,
    CANVAS_W,
    CANVAS_H,
  };
}