'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CRTMonitor from '../components/CRTMonitor/CRTMonitor';

// Dynamically import heavy/interactive components with SSR disabled
const AeroWindow = dynamic(() => import('../components/Windows7/AeroWindow'), { ssr: false });
const Notepad = dynamic(() => import('../components/Apps/Notepad'), { ssr: false });
const Calculator = dynamic(() => import('../components/Apps/Calculator'), { ssr: false });
const Word = dynamic(() => import('../components/Apps/Word'), { ssr: false });
const MusicPlayer = dynamic(() => import('../components/Apps/MusicPlayer'), { ssr: false });
const FileManager = dynamic(() => import('../components/Apps/FileManager'), { ssr: false });
const Paint = dynamic(() => import('../components/Apps/Paint'), { ssr: false });
const Gallery = dynamic(() => import('../components/Apps/Gallery'), { ssr: false });
const StartMenu = dynamic(() => import('../components/Windows7/StartMenu'), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [windows, setWindows] = useState([
    { id: 'word', title: 'Microsoft Word', isOpen: false, isMinimized: false, isMaximized: true, x: 100, y: 30, w: '800px', h: '600px', props: {} },
    { id: 'notepad', title: 'Notepad', isOpen: false, isMinimized: false, isMaximized: false, x: 60, y: 50, w: '500px', h: '350px', props: {} },
    { id: 'calculator', title: 'Calculator', isOpen: false, isMinimized: false, isMaximized: false, x: 400, y: 100, w: '250px', h: '350px', props: {} },
    { id: 'music', title: 'Windows Media Player', isOpen: false, isMinimized: false, isMaximized: true, x: 150, y: 80, w: '700px', h: '500px', props: {} },
    { id: 'explorer', title: 'Computer', isOpen: false, isMinimized: false, isMaximized: true, x: 80, y: 40, w: '800px', h: '550px', props: {} },
    { id: 'paint', title: 'Paint', isOpen: false, isMinimized: false, isMaximized: true, x: 120, y: 60, w: '800px', h: '600px', props: {} },
    { id: 'gallery', title: "Ayang's Gallery", isOpen: false, isMinimized: false, isMaximized: false, x: 100, y: 20, w: '600px', h: '500px', props: {} },
  ]);
  const [activeWindow, setActiveWindow] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [time, setTime] = useState('');
  const [showShutdownPrompt, setShowShutdownPrompt] = useState(false);
  const [isSystemOff, setIsSystemOff] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const resizeWindow = (id: string, w: string, h: string, isMaximized?: boolean) => {
    setWindows(prev => prev.map(win => win.id === id ? { 
      ...win, 
      w, 
      h, 
      isMaximized: isMaximized !== undefined ? isMaximized : win.isMaximized 
    } : win));
  };

  const appComponents: Record<string, any> = useMemo(() => ({
    word: Word,
    notepad: Notepad,
    calculator: Calculator,
    music: MusicPlayer,
    explorer: FileManager,
    paint: Paint,
    gallery: Gallery,
  }), []); 

  const closeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
  };

  const openWindow = (id: string, props: any = {}) => {
    setWindows(prev => prev.map(w => w.id === id ? { 
      ...w, 
      isOpen: true, 
      isMinimized: false, 
      isMaximized: id === 'gallery' ? false : true, 
      props: { ...w.props, ...props } 
    } : w));
    setActiveWindow(id);
    setIsStartOpen(false);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    const nextWindow = windows.find(w => w.isOpen && !w.isMinimized && w.id !== id);
    if (nextWindow) setActiveWindow(nextWindow.id);
    else setActiveWindow('');
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w));
    setActiveWindow(id);
  };

  const handleTaskbarClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      setActiveWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      setActiveWindow(id);
      if (win.isMinimized) setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    }
  };

  const handleShutdownClick = () => {
    setShowShutdownPrompt(true);
    setIsStartOpen(false);
  };

  const confirmShutdown = () => {
    setIsSystemOff(true);
    setShowShutdownPrompt(false);
  };

  if (!isMounted) {
    return (
      <main>
        <div style={{ background: '#000', width: '100vw', height: '100vh' }}></div>
      </main>
    );
  }

  return (
    <main>
      <CRTMonitor forceOff={isSystemOff} onPowerChange={(state) => {
        if (state === 'off') setIsSystemOff(true);
        if (state === 'on') setIsSystemOff(false);
      }}>
        <div className="desktop" onClick={() => setIsStartOpen(false)}>
          {windows.map(win => {
            const Component = appComponents[win.id];
            if (!win.isOpen || !Component) return null;
            
            return (
              <AeroWindow 
                key={win.id}
                title={win.title}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                initialX={win.x}
                initialY={win.y}
                width={win.w}
                height={win.h}
                isActive={activeWindow === win.id}
                isMinimized={win.isMinimized}
                isMaximized={win.isMaximized}
                onFocus={() => {
                  setActiveWindow(win.id);
                  setIsStartOpen(false);
                }}
              >
                <Component 
                  {...win.props} 
                  onResize={win.id === 'explorer' ? (w: string, h: string, max?: boolean) => resizeWindow('explorer', w, h, max) : undefined} 
                />
              </AeroWindow>
            );
          })}

          <div className="desktop-icons" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '100%', width: 'fit-content', gap: '20px' }}>
            <div className="icon" onDoubleClick={() => openWindow('explorer')} style={{ textAlign: 'center', width: '60px', cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.3)', margin: '0 auto', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>🖥️</div>
              <div style={{ color: 'white', fontSize: '11px', marginTop: '4px', textShadow: '0 1px 2px black' }}>Computer</div>
            </div>
            <div className="icon" onDoubleClick={() => openWindow('music')} style={{ textAlign: 'center', width: '60px', cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.3)', margin: '0 auto', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>🎵</div>
              <div style={{ color: 'white', fontSize: '11px', marginTop: '4px', textShadow: '0 1px 2px black' }}>Music</div>
            </div>
            <div className="icon" onDoubleClick={() => openWindow('gallery')} style={{ textAlign: 'center', width: '60px', cursor: 'pointer' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,105,180,0.4)', margin: '0 auto', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>❤️</div>
              <div style={{ color: 'white', fontSize: '11px', marginTop: '4px', textShadow: '0 1px 2px black' }}>For You</div>
            </div>
          </div>

          {isStartOpen && <StartMenu onOpenApp={(id, props) => openWindow(id, props)} onShutdown={handleShutdownClick} />}

          {showShutdownPrompt && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000
            }}>
              <div style={{
                background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ccc',
                boxShadow: '0 5px 20px rgba(0,0,0,0.3)', textAlign: 'center', width: '300px'
              }}>
                <div style={{ fontSize: '16px', marginBottom: '20px', color: '#333' }}>Apakah anda bahagia denganku?</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <button 
                    onClick={confirmShutdown}
                    style={{ padding: '8px 25px', background: '#3a7ebf', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >Ya</button>
                  <button 
                    onClick={() => setShowShutdownPrompt(false)}
                    style={{ padding: '8px 25px', background: '#eee', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                  >Tidak</button>
                </div>
              </div>
            </div>
          )}

          <div className="taskbar" onClick={(e) => e.stopPropagation()}>
            <div className="start-orb" onClick={() => setIsStartOpen(!isStartOpen)}>
              <div style={{ width: '24px', height: '24px', background: 'radial-gradient(circle, #fff, #4e95d4)', borderRadius: '50%', boxShadow: '0 0 5px white' }}></div>
            </div>
            <div className="taskbar-apps" style={{ display: 'flex', gap: '5px' }}>
              {windows.map(win => win.isOpen && (
                <div 
                  key={win.id}
                  onClick={() => handleTaskbarClick(win.id)}
                  style={{
                    padding: '0 15px',
                    height: '34px',
                    background: (activeWindow === win.id && !win.isMinimized) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    boxShadow: (activeWindow === win.id && !win.isMinimized) ? 'inset 0 0 10px rgba(255,255,255,0.2)' : 'none'
                  }}
                >
                  {win.title}
                </div>
              ))}
            </div>
            <div className="system-tray" style={{ marginLeft: 'auto', color: 'white', fontSize: '11px', paddingRight: '10px' }}>
              {time}
            </div>
          </div>
        </div>
      </CRTMonitor>
    </main>
  );
}
