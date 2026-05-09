'use client';

import React, { useState, useRef, useEffect } from 'react';
import '../../styles/aero.css';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: string;
  height?: string;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  onFocus: () => void;
}

const AeroWindow: React.FC<WindowProps> = ({ 
  title, 
  onClose, 
  onMinimize,
  onMaximize,
  children, 
  initialX = 50, 
  initialY = 50, 
  width = '800px',
  height = '600px',
  isActive, 
  isMinimized,
  isMaximized,
  onFocus 
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMinimized || isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      setPos({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const windowStyle: React.CSSProperties = isMaximized 
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: 'calc(100% - 40px)',
        zIndex: isActive ? 1000 : 100,
        opacity: isMinimized ? 0 : 1,
        transform: isMinimized ? 'translateY(100vh) scale(0.1)' : 'none',
        borderRadius: 0,
        transition: 'all 0.4s cubic-bezier(0.1, 0.9, 0.2, 1)',
        pointerEvents: isMinimized ? 'none' : 'auto'
      }
    : {
        left: pos.x,
        top: pos.y,
        width: width,
        height: height,
        zIndex: isActive ? 1000 : 100,
        opacity: isMinimized ? 0 : (isActive ? 1 : 0.95),
        transform: isMinimized 
          ? `translateY(100vh) scale(0.1)` 
          : (isActive ? 'scale(1)' : 'scale(0.98)'),
        transition: 'transform 0.4s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.3s, width 0.3s, height 0.3s, left 0.3s, top 0.3s',
        pointerEvents: isMinimized ? 'none' : 'auto',
        borderRadius: '8px 8px 0 0',
      };

  return (
    <div 
      className="aero-window" 
      style={windowStyle}
      onMouseDown={() => !isMinimized && onFocus()}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown} onDoubleClick={onMaximize}>
        <div className="title-text">{title}</div>
        <div className="window-controls">
          <div className="control-btn btn-min" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>_</div>
          <div className="control-btn btn-max" onClick={(e) => { e.stopPropagation(); onMaximize(); }}>□</div>
          <div className="control-btn btn-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</div>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default AeroWindow;
