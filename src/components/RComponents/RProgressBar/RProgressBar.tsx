"use client"

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import "./progressStyle.css";

const RProgressBar: React.FC = () => {

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      easing: 'ease',
      speed: 800,
    });

    // Start progress bar on route change start
    const handleStart = () => NProgress.start();
    // Complete progress bar on route change complete
    const handleComplete = () => NProgress.done();

    // Add event listeners
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      // Remove event listeners
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  return null;
};

export default RProgressBar;
