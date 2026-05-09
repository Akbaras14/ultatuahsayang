// components/Apps/Gallery.tsx
import React, { useState, useEffect, useRef } from "react";

const Gallery: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hearts, setHearts] = useState<
    { id: number; left: string; duration: number; delay: number }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    // Generate hearts only on client to prevent hydration mismatch
    setHearts(
      [...Array(6)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      }))
    );

    // Cleanup function to stop music when gallery is closed
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const images = [
    "/assets/pictures/ayang1.jpeg",
    "/assets/pictures/ayang2.jpeg",
    "/assets/pictures/ayang3.jpeg",
    "/assets/pictures/ayang4.jpeg",
    "/assets/pictures/ayang5.jpeg",
    "/assets/pictures/ayang7.jpeg",
    "/assets/pictures/ayang8.jpeg",
    "/assets/pictures/ayang9.jpeg",
    "/assets/pictures/ayang10.jpeg",
    "/assets/pictures/ayang11.jpeg",
    "/assets/pictures/ayang12.jpeg",
    "/assets/pictures/ayang13.jpeg",
  ];

  const messages = [
    "Selamat Ulang Tahun, Maftukah! ❤️",
    "Semoga hari ini seindah senyummu.",
    "Terima kasih sudah menjadi bagian terindah dalam hidupku.",
    "Setiap detik bersamamu adalah anugerah.",
    "Aku ingin kita terus menua bersama, Akbar & Maftukah.",
    "Kamu adalah alasan aku tersenyum setiap hari.",
    "Semoga semua impianmu (dan impian kita) menjadi nyata. ✨",
    "I love you more than words can say. 🥰",
    "Happy Birthday to my favorite person in the world! 🎂",
    "Tetaplah menjadi sosok yang luar biasa seperti sekarang.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#000",
        color: "#fff",
        fontFamily: '"Segoe UI", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <audio
        ref={audioRef}
        src="/assets/musik/Untitled song (May 93A39 PM).mp3"
        autoPlay
        loop
      />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          position: "relative",
          minHeight: 0,
        }}
      >
        <img
          src={images[currentIndex]}
          alt="Memory"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            boxShadow: "0 0 30px rgba(255, 105, 180, 0.2)",
            borderRadius: "4px",
            transition: "opacity 0.8s ease-in-out",
            opacity: fade ? 1 : 0,
          }}
        />
      </div>

      <div
        style={{
          height: "80px",
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: "300",
            transition: "all 0.8s ease-in-out",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(10px)",
            color: "#ffb7c5",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          "{messages[currentIndex % messages.length]}"
        </p>
      </div>

      <div
        className="hearts-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={`heart heart-${heart.id}`}
            style={{
              position: "absolute",
              fontSize: "24px",
              bottom: "-50px",
              left: heart.left,
              animation: `float ${heart.duration}s linear infinite`,
              animationDelay: `${heart.delay}s`,
              opacity: 0.6,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
