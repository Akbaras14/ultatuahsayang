// components/Apps/FileManager.tsx
import React, { useState } from "react";

interface FileManagerProps {
  onResize?: (width: string, height: string, isMaximized?: boolean) => void;
  initialPath?: string;
}

const FileManager: React.FC<FileManagerProps> = ({ onResize, initialPath = 'Computer' }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedMedia, setSelectedMedia] = useState<{
    name: string;
    type: "image" | "video";
  } | null>(null);

  const folderContents: Record<
    string,
    {
      name: string;
      icon: string;
      type: "image" | "video" | "folder";
      src: string;
    }[]
  > = {
    Pictures: [
      { name: "ayang1.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang1.jpeg" },
      { name: "ayang2.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang2.jpeg" },
      { name: "ayang3.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang3.jpeg" },
      { name: "ayang4.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang4.jpeg" },
      { name: "ayang5.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang5.jpeg" },
      { name: "ayang7.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang7.jpeg" },
      { name: "ayang8.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang8.jpeg" },
      { name: "ayang9.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang9.jpeg" },
      { name: "ayang10.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang10.jpeg" },
      { name: "ayang11.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang11.jpeg" },
      { name: "ayang12.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang12.jpeg" },
      { name: "ayang13.jpeg", icon: "🖼️", type: "image", src: "/assets/pictures/ayang13.jpeg" },
    ],
    Videos: [
      { name: "ayang1.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang1.mp4" },
      { name: "ayang2.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang2.mp4" },
      { name: "ayang3.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang3.mp4" },
      { name: "ayang4.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang4.mp4" },
      { name: "ayang5.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang5.mp4" },
      { name: "ayang6.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang6.mp4" },
      { name: "ayang7.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang7.mp4" },
      { name: "ayang8.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang8.mp4" },
      { name: "ayang9.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang9.mp4" },
      { name: "ayang10.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang10.mp4" },
      { name: "ayang11.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang11.mp4" },
      { name: "ayang12.mp4", icon: "🎥", type: "video", src: "/assets/videos/ayang12.mp4" },
    ],
    Documents: [
      { name: "Report.docx", icon: "📄", type: "folder", src: "" },
      { name: "Invoice.pdf", icon: "📄", type: "folder", src: "" },
    ],
    Music: [
      { name: "Ghea Indrawari - 1000X.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Ghea Indrawari - 1000X  [Mix Lirik] - Sesi Potret, Tapi Tahukah Kamu_, Hatimu Milik Dia.mp3" },
      { name: "Ali Gatie - It's You.mp3", icon: "🎵", type: "folder", src: "/assets/musik/It's You - Ali Gatie (Lyrics)  Bruno Mars, Ed Sheeran,.mp3" },
      { name: "Justin Bieber - Favorite Girl.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Justin Bieber - Favorite Girl (Lyrics) (Loop Video).mp3" },
      { name: "Keenan Te - Forgot About Us.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Keenan Te - Forgot About Us (Lyric Video).mp3" },
      { name: "Keenan Te - Scars.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Keenan Te - Scars (Lyric Video).mp3" },
      { name: "Keenan Te - Unlearn You.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Keenan Te - Unlearn You (Lyric Video).mp3" },
      { name: "James Arthur - Rewrite The Stars.mp3", icon: "🎵", type: "folder", src: "/assets/musik/Rewrite The Stars - James Arthur ft. Anne-Marie (Lyrics)  Ghost, Justin Bieber... Mix.mp3" },
      { name: "The 1975 - About You.mp3", icon: "🎵", type: "folder", src: "/assets/musik/The 1975 - About You (Lyrics).mp3" },
    ],
    Downloads: [{ name: "Setup.exe", icon: "📦", type: "folder", src: "" }],
  };

  const rootFolders = [
    { name: "Documents", icon: "📁" },
    { name: "Downloads", icon: "📥" },
    { name: "Music", icon: "🎵" },
    { name: "Pictures", icon: "🖼️" },
    { name: "Videos", icon: "🎥" },
  ];

  const sidebarLinks = [
    "Favorites",
    "Desktop",
    "Downloads",
    "Recent Places",
    "Libraries",
    "Documents",
    "Music",
    "Pictures",
    "Videos",
    "Computer",
    "Local Disk (C:)",
    "Network",
  ];

  const closePreview = () => {
    setSelectedMedia(null);
  };

  const goBack = () => {
    if (selectedMedia) closePreview();
    else setCurrentPath("Computer");
  };

  const handleFileClick = (file: {
    name: string;
    type: "image" | "video" | "folder";
    src?: string;
  }) => {
    if (file.type === "image" || file.type === "video") {
      setSelectedMedia({
        name: file.name,
        type: file.type as "image" | "video",
      });
    }
  };

  const currentFile = selectedMedia
    ? folderContents[currentPath]?.find((f) => f.name === selectedMedia.name)
    : null;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        color: "#000",
        fontFamily: '"Segoe UI", sans-serif',
      }}
    >
      {/* Explorer Header */}
      <div
        style={{
          padding: "5px 10px",
          background: "#f5f6f7",
          borderBottom: "1px solid #d1d1d1",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          <button
            onClick={goBack}
            disabled={currentPath === "Computer" && !selectedMedia}
            style={{
              width: "30px",
              height: "24px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              background: "white",
              cursor:
                currentPath === "Computer" && !selectedMedia
                  ? "default"
                  : "pointer",
              opacity: currentPath === "Computer" && !selectedMedia ? 0.5 : 1,
            }}
          >
            ←
          </button>
          <button
            style={{
              width: "30px",
              height: "24px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              background: "white",
              opacity: 0.5,
            }}
          >
            →
          </button>
        </div>
        <div
          style={{
            flexGrow: 1,
            height: "24px",
            border: "1px solid #ccc",
            background: "white",
            borderRadius: "2px",
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            fontSize: "11px",
          }}
        >
          <span
            onClick={() => {
              setCurrentPath("Computer");
              setSelectedMedia(null);
            }}
            style={{ cursor: "pointer" }}
          >
            🏠
          </span>{" "}
          &gt; {currentPath} {selectedMedia && ` > ${selectedMedia.name}`}
        </div>
        <div
          style={{
            width: "150px",
            height: "24px",
            border: "1px solid #ccc",
            background: "white",
            borderRadius: "2px",
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            fontSize: "11px",
            color: "#888",
          }}
        >
          Search {currentPath}
        </div>
      </div>

      {/* Explorer Main */}
      <div style={{ flexGrow: 1, display: "flex", minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            width: "180px",
            borderRight: "1px solid #d1d1d1",
            background: "#f5f6f7",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          {sidebarLinks.map((link) => (
            <div
              key={link}
              onClick={() => {
                setSelectedMedia(null);
                if (rootFolders.some((f) => f.name === link))
                  setCurrentPath(link);
                else if (link === "Computer") setCurrentPath("Computer");
              }}
              style={{
                padding: "3px 8px",
                fontSize: "11px",
                cursor: "pointer",
                background:
                  currentPath === link && !selectedMedia
                    ? "#e5f3ff"
                    : "transparent",
                fontWeight: ["Favorites", "Libraries", "Computer"].includes(
                  link
                )
                  ? "bold"
                  : "normal",
                marginTop: ["Libraries", "Computer"].includes(link)
                  ? "10px"
                  : "0",
              }}
            >
              {link === "Desktop"
                ? "🖥️ "
                : link === "Documents"
                ? "📁 "
                : link === "Pictures"
                ? "🖼️ "
                : link === "Videos"
                ? "🎥 "
                : ""}
              {link}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            gap: "25px",
            overflowY: "auto",
            background: selectedMedia ? "#222" : "#fff",
          }}
        >
          {selectedMedia && currentFile ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                  background: "rgba(0,0,0,0.5)",
                  padding: "2px 10px",
                  borderRadius: "10px",
                }}
              >
                {selectedMedia.name}
              </div>

              <div
                style={{
                  maxWidth: "95%",
                  maxHeight: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                  background: "#000",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {selectedMedia.type === "image" ? (
                  <img
                    src={currentFile.src}
                    alt={selectedMedia.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      // Fallback if file doesn't exist
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=Please+add+file+to+public/assets/pictures";
                    }}
                  />
                ) : (
                  <video
                    src={currentFile.src}
                    controls
                    autoPlay
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      outline: "none",
                    }}
                    onError={(e) => {
                      // Fallback display if video not found
                      console.log("Video load error");
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <button
                onClick={closePreview}
                style={{
                  marginTop: "20px",
                  padding: "6px 25px",
                  background: "linear-gradient(to bottom, #555, #333)",
                  color: "white",
                  border: "1px solid #111",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Close Preview
              </button>
            </div>
          ) : currentPath === "Computer" ? (
            rootFolders.map((f) => (
              <div
                key={f.name}
                onDoubleClick={() => setCurrentPath(f.name)}
                style={{
                  width: "80px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "5px" }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: "11px" }}>{f.name}</div>
              </div>
            ))
          ) : (
            folderContents[currentPath]?.map((file) => (
              <div
                key={file.name}
                onDoubleClick={() => handleFileClick(file)}
                style={{
                  width: "80px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "3px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#f0f0f0",
                    border: "1px solid #ccc",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  {file.type === "image" ? (
                    <img
                      src={file.src}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  ) : file.type === "video" ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <video
                        src={file.src}
                        preload="metadata"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', color: 'rgba(255,255,255,0.8)', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}>▶️</div>
                    </div>
                  ) : (
                    file.icon
                  )}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    marginTop: "5px",
                    wordBreak: "break-all",
                  }}
                >
                  {file.name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          height: "25px",
          background: "linear-gradient(to bottom, #f5f6f7, #e6eaf0)",
          borderTop: "1px solid #d1d1d1",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          fontSize: "11px",
          color: "#666",
        }}
      >
        {selectedMedia
          ? "Previewing " + selectedMedia.name
          : (currentPath === "Computer"
              ? rootFolders.length
              : folderContents[currentPath]?.length || 0) + " items"}
      </div>
    </div>
  );
};

export default FileManager;
