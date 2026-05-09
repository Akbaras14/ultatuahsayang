// components/Apps/MusicPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const tracks = [
    { name: 'Ghea Indrawari - 1000X', artist: 'Ghea Indrawari', src: '/assets/musik/Ghea Indrawari - 1000X  [Mix Lirik] - Sesi Potret, Tapi Tahukah Kamu_, Hatimu Milik Dia.mp3', duration: '4:15' },
    { name: "Ali Gatie - It's You", artist: 'Ali Gatie', src: "/assets/musik/It's You - Ali Gatie (Lyrics)  Bruno Mars, Ed Sheeran,.mp3", duration: '3:30' },
    { name: 'Justin Bieber - Favorite Girl', artist: 'Justin Bieber', src: '/assets/musik/Justin Bieber - Favorite Girl (Lyrics) (Loop Video).mp3', duration: '4:50' },
    { name: 'Keenan Te - Forgot About Us', artist: 'Keenan Te', src: '/assets/musik/Keenan Te - Forgot About Us (Lyric Video).mp3', duration: '3:50' },
    { name: 'Keenan Te - Scars', artist: 'Keenan Te', src: '/assets/musik/Keenan Te - Scars (Lyric Video).mp3', duration: '3:10' },
    { name: 'Keenan Te - Unlearn You', artist: 'Keenan Te', src: '/assets/musik/Keenan Te - Unlearn You (Lyric Video).mp3', duration: '3:40' },
    { name: 'James Arthur - Rewrite The Stars', artist: 'James Arthur ft. Anne-Marie', src: '/assets/musik/Rewrite The Stars - James Arthur ft. Anne-Marie (Lyrics)  Ghost, Justin Bieber... Mix.mp3', duration: '4:30' },
    { name: 'The 1975 - About You', artist: 'The 1975', src: '/assets/musik/The 1975 - About You (Lyrics).mp3', duration: '5:25' },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = (x / rect.width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = clickedValue;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0f3f7', fontFamily: '"Segoe UI", sans-serif', color: '#000' }}>
      <audio 
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
      
      {/* Top Header */}
      <div style={{ padding: '10px 15px', background: 'linear-gradient(to bottom, #ffffff, #e6eaf0)', borderBottom: '1px solid #c2c7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e395b' }}>Windows Media Player</div>
        <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
          <span>Library</span>
          <span style={{ fontWeight: 'bold', color: '#3a7ebf' }}>Now Playing</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: 'flex', minHeight: 0 }}>
        {/* Album Art Area */}
        <div style={{ flex: 1, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ 
            width: '200px', 
            height: '200px', 
            background: 'linear-gradient(45deg, #1e4d8c, #4e95d4)', 
            borderRadius: '10px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontSize: '80px', 
            boxShadow: '0 0 30px rgba(78, 149, 212, 0.5)',
            animation: isPlaying ? 'spin 10s linear infinite' : 'none'
          }}>
            🎵
          </div>
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)', zIndex: 2 }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentTrack.name}</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>{currentTrack.artist}</div>
          </div>
          <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: isPlaying ? 0.4 : 0.2, background: 'radial-gradient(circle, #4e95d4 0%, transparent 70%)', transition: 'opacity 0.5s' }}></div>
        </div>
        
        {/* Playlist Area */}
        <div style={{ width: '300px', borderLeft: '1px solid #c2c7d0', background: 'white', padding: '10px', overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', color: '#666' }}>PLAYLIST</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {tracks.map((track, index) => (
              <div 
                key={index} 
                onClick={() => handleTrackChange(index)}
                style={{ 
                  padding: '5px 8px', 
                  background: currentTrackIndex === index ? '#e5f3ff' : 'transparent', 
                  borderRadius: '3px', 
                  fontSize: '11px', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                  {index + 1}. {track.name}
                </span>
                <span>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{ height: '80px', background: 'linear-gradient(to bottom, #e6eaf0, #ced4dd)', borderTop: '1px solid #a0a6af', display: 'flex', flexDirection: 'column', padding: '5px 20px' }}>
        {/* Progress Bar */}
        <div 
          onClick={handleSeek}
          style={{ height: '6px', background: '#bdc3c7', borderRadius: '3px', width: '100%', marginTop: '5px', position: 'relative', cursor: 'pointer' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: `${(currentTime / duration) * 100}%`, height: '100%', background: '#3a7ebf', borderRadius: '3px' }}></div>
          <div style={{ position: 'absolute', top: '-3px', left: `${(currentTime / duration) * 100}%`, width: '12px', height: '12px', background: 'white', border: '2px solid #3a7ebf', borderRadius: '50%', transform: 'translateX(-50%)' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '2px', color: '#666' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '-5px' }}>
          <span 
            onClick={handlePrev}
            style={{ fontSize: '24px', cursor: 'pointer', userSelect: 'none' }}
          >⏮</span>
          <div 
            onClick={togglePlay}
            style={{ width: '42px', height: '42px', background: 'linear-gradient(to bottom, #7db3e8, #3a7ebf)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '20px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', userSelect: 'none' }}
          >
            {isPlaying ? '⏸' : '▶'}
          </div>
          <span 
            onClick={handleNext}
            style={{ fontSize: '24px', cursor: 'pointer', userSelect: 'none' }}
          >⏭</span>
          
          <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>{volume === 0 ? '🔇' : '🔊'}</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: '80px', cursor: 'pointer', accentColor: '#3a7ebf' }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
