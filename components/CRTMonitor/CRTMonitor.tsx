'use client';

import React, { useState, useEffect } from "react";
import "../../styles/crt.css";

interface CRTMonitorProps {
  children: React.ReactNode;
  forceOff?: boolean;
  onPowerChange?: (state: 'on' | 'off') => void;
}

const CRTMonitor: React.FC<CRTMonitorProps> = ({ children, forceOff, onPowerChange }) => {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [shutdownMessageIndex, setShutdownMessageIndex] = useState(0);

  const shutdownMessages = [
    "Menyimpan semua kenangan indah kita...",
    "Mengunci janji setia di dalam sistem...",
    "Terima kasih sudah bahagia bersamaku...",
    "Selamat Ulang Tahun, Maftukah ❤️",
    "Sampai jumpa di mimpi indahmu, Ayang..."
  ];

  // React to forceOff prop from parent (Home component)
  useEffect(() => {
    if (forceOff && isPowerOn && !isShuttingDown) {
      console.log("Starting shutdown sequence...");
      startShutdownSequence();
    }
  }, [forceOff, isPowerOn, isShuttingDown]);

  const startShutdownSequence = () => {
    if (isShuttingDown) return;
    setIsShuttingDown(true);
    setShutdownMessageIndex(0);
    
    // Cycle through messages during shutdown
    const msgInterval = setInterval(() => {
      setShutdownMessageIndex(prev => {
        if (prev < shutdownMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 1600);

    setTimeout(() => {
      clearInterval(msgInterval);
      setIsShuttingDown(false);
      setIsPowerOn(false);
      if (onPowerChange) onPowerChange('off');
    }, 8500);
  };

  const handlePowerClick = () => {
    if (!isPowerOn && !isBooting && !isLoading && !isWelcome && !isShuttingDown) {
      setIsBooting(true);
      if (onPowerChange) onPowerChange('on');
      setTimeout(() => {
        setIsBooting(false);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setIsWelcome(true);
          setTimeout(() => {
            setIsWelcome(false);
            setIsPowerOn(true);
          }, 2500);
        }, 3000);
      }, 800);
    } else {
      setIsPowerOn(false);
      setIsLoading(false);
      setIsWelcome(false);
      setIsBooting(false);
      setIsShuttingDown(false);
      if (onPowerChange) onPowerChange('off');
    }
  };

  return (
    <div className="crt-container">
      <div className="crt-bezel">
        <div className={`crt-screen-container ${(!isPowerOn && !isLoading && !isBooting && !isWelcome && !isShuttingDown) ? "screen-off" : ""}`}>
          <div className="crt-screen">
            {isPowerOn && (
              <>
                <div className="scanlines"></div>
                <div className="crt-overlay"></div>
                {children}
              </>
            )}

            {isLoading && (
              <div className="boot-loader" style={{ zIndex: 10000 }}>
                <div className="boot-logo">
                  <div className="boot-logo-text" style={{ color: '#ffb7c5', textShadow: '0 0 10px rgba(255,183,197,0.5)' }}>Sistem Cinta</div>
                  <div className="boot-logo-sub">sistem cinta sedang dibuat</div>
                </div>
                <div className="loading-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="scanlines"></div>
                <div className="crt-overlay"></div>
              </div>
            )}

            {isWelcome && (
              <div className="welcome-screen" style={{ zIndex: 10000 }}>
                <div className="welcome-text">Welcome Maftukah</div>
                <div className="progress-container">
                  <div className="progress-bar"></div>
                </div>
                <div className="scanlines"></div>
                <div className="crt-overlay"></div>
              </div>
            )}

            {isShuttingDown && (
              <div className="shutdown-screen" style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                background: '#000', display: 'flex', flexDirection: 'column', 
                justifyContent: 'center', alignItems: 'center', color: '#ffb7c5',
                textAlign: 'center', padding: '20px', zIndex: 10000
              }}>
                <div style={{ fontSize: '18px', marginBottom: '25px', minHeight: '30px', transition: 'all 0.5s' }}>
                  {shutdownMessages[shutdownMessageIndex]}
                </div>
                
                <div className="progress-container" style={{ width: '250px', marginBottom: '15px' }}>
                  <div className="progress-bar" style={{ animationDuration: '8.5s' }}></div>
                </div>

                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '10px' }}>
                  Sistem Cinta sedang memproses perpisahan...
                </div>

                <div className="scanlines"></div>
                <div className="crt-overlay"></div>
              </div>
            )}

            {isBooting && <div className="screen-boot" style={{ zIndex: 11000 }}></div>}
          </div>
        </div>
        <div className="monitor-brand">Bengkel_Coding</div>
        <div className={`power-light ${(isPowerOn || isLoading || isBooting || isWelcome || isShuttingDown) ? "on" : "off"}`}></div>
        <button className="power-button" onClick={handlePowerClick}>
          <div style={{ width: '8px', height: '8px', border: '1.5px solid #888', borderRadius: '50%', borderTopColor: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)', width: '1.5px', height: '5px', background: '#888' }}></div>
          </div>
        </button>
      </div>
      <div
        className="monitor-base"
        style={{
          position: "absolute",
          bottom: "5vmin",
          width: "40vmin",
          height: "10vmin",
          background: "#2c2c2c",
          borderRadius: "50% 50% 0 0",
          zIndex: -1,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      ></div>
    </div>
  );
};

export default CRTMonitor;
