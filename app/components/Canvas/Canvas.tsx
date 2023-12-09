"use client";
import React, { useRef, useEffect, useState } from "react";

import { generateItem, Item } from "./utils";

const radius = [1, 120];
const speed = 1;
const blurSpeed = 1;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    canvas.width = windowWidth;
    canvas.height = windowHeight;
    context.globalCompositeOperation = "lighter";

    const items: Item[] = [];
    let count = 50;

    while (count--) {
      items.push(generateItem(canvas.width, canvas.height));
    }

    const changeCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((item) => {
        if (
          (item.x + item.initialXDirection * speed >= canvas.width &&
            item.initialXDirection !== 0) ||
          (item.x + item.initialXDirection * speed <= 0 &&
            item.initialXDirection !== 0)
        ) {
          item.initialXDirection = item.initialXDirection * -1;
        }
        if (
          (item.y + item.initialYDirection * speed >= canvas.height &&
            item.initialYDirection !== 0) ||
          (item.y + item.initialYDirection * speed <= 0 &&
            item.initialYDirection !== 0)
        ) {
          item.initialYDirection = item.initialYDirection * -1;
        }

        if (
          (item.blur + item.initialBlurDirection * blurSpeed >= radius[1] &&
            item.initialBlurDirection !== 0) ||
          (item.blur + item.initialBlurDirection * blurSpeed <= radius[0] &&
            item.initialBlurDirection !== 0)
        ) {
          item.initialBlurDirection *= -1;
        }

        item.x += item.initialXDirection * speed;
        item.y += item.initialYDirection * speed;
        item.blur += item.initialBlurDirection * blurSpeed;
        context.beginPath();
        context.filter = `blur(${item.blur}px)`;
        context.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        context.fillStyle = item.color;
        context.fill();
        context.closePath();
      });

      window.requestAnimationFrame(changeCanvas);
    };

    const animationId = window.requestAnimationFrame(changeCanvas);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [windowHeight, windowWidth]);

  return <canvas ref={canvasRef} style={{ backgroundColor: "black" }} />;
};

export default Canvas;
