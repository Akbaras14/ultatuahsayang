// components/Windows7/StartMenu.tsx
import React from "react";

interface StartMenuProps {
  onOpenApp: (id: string, props?: any) => void;
  onShutdown?: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, onShutdown }) => {
  const leftApps = [
    { id: "gallery", name: "Special Gallery", icon: "❤️" },
    { id: "word", name: "Microsoft Word", icon: "🟦" },
    { id: "music", name: "Windows Media Player", icon: "🎵" },
    { id: "explorer", name: "Computer", icon: "🖥️" },
    { id: "notepad", name: "Notepad", icon: "📝" },
    { id: "calculator", name: "Calculator", icon: "🔢" },
    { id: "paint", name: "Paint", icon: "🎨" },
  ];

  const rightLinks = [
    { name: "Maftukah", id: "explorer", props: { initialPath: "Computer" } },
    { name: "Documents", id: "explorer", props: { initialPath: "Documents" } },
    { name: "Pictures", id: "explorer", props: { initialPath: "Pictures" } },
    { name: "Music", id: "explorer", props: { initialPath: "Music" } },
    { name: "Games", id: "explorer", props: { initialPath: "Videos" } },
    { name: "Computer", id: "explorer", props: { initialPath: "Computer" } },
    { name: "Control Panel", id: "explorer" },
    { name: "Devices and Printers", id: "explorer" },
    { name: "Default Programs", id: "explorer" },
    { name: "Help and Support", id: "explorer" },
  ];

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div
        className="user-profile"
        style={{
          overflow: "hidden",
          border: "2px solid white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="/assets/pictures/ayang18.jpeg"
          alt="User Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="start-menu-main">
        <div
          className="start-menu-left"
          style={{ background: "linear-gradient(to right, #fff, #f0f0f0)" }}
        >
          {leftApps.map((app) => (
            <div
              key={app.id}
              className="start-item"
              onClick={() => onOpenApp(app.id)}
              style={{ padding: "8px 10px" }}
            >
              <div style={{ fontSize: "24px", marginRight: "10px" }}>
                {app.icon}
              </div>
              <span style={{ fontSize: "12px", color: "#333" }}>
                {app.name}
              </span>
            </div>
          ))}
          <div
            style={{
              marginTop: "auto",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "5px",
            }}
          >
            <div className="start-item" style={{ padding: "8px 10px" }}>
              <span style={{ fontSize: "20px", marginRight: "10px" }}>📁</span>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                All Programs
              </span>
            </div>
          </div>
        </div>

        <div
          className="start-menu-right"
          style={{ background: "rgba(255,255,255,0.1)", padding: "15px 10px" }}
        >
          {rightLinks.map((link, idx) => (
            <div
              key={idx}
              className="right-item"
              onClick={() => link.id && onOpenApp(link.id, link.props)}
              style={{
                fontWeight:
                  link.name === "Computer" || link.name === "Maftukah"
                    ? "bold"
                    : "normal",
                padding: "6px 12px",
                fontSize: "11px",
                color: "#fff",
                cursor: link.id ? "pointer" : "default",
              }}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>

      <div className="start-footer">
        <input
          type="text"
          className="search-bar"
          placeholder="Search programs and files"
        />
        <div
          className="shutdown-btn"
          onClick={onShutdown}
          style={{ cursor: "pointer" }}
        >
          <span>Shut down</span>
          <span
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              paddingLeft: "5px",
            }}
          >
            ▶
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
