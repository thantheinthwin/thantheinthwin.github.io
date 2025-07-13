import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Thant Hein Thwin - Full Stack Software Engineer";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 300,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
      style={{
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid #27272a",
        borderRadius: "16px",
        justifyContent: "space-between",
        padding: "48px 64px",
        boxSizing: "border-box",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* ProfileSection */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* Avatar */}
        <img
          src={"/profile.webp"}
          width={90}
          height={90}
          style={{
            borderRadius: "50%",
            border: "4px solid #27272a",
            objectFit: "cover",
            background: "#232326",
          }}
          alt="Profile"
        />
        {/* Name, Title, Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Thant Hein Thwin
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#a1a1aa",
              lineHeight: 1.2,
            }}
          >
            Full Stack Software Engineer
          </span>
          <span
            style={{
              fontSize: 18,
              color: "#60a5fa",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              fontWeight: 500,
            }}
          >
            thantheinthwin.dev@gmail.com
          </span>
        </div>
      </div>
      {/* StatusSection */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#22c55e",
              marginRight: 6,
            }}
          />
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}>
            Available for work
          </span>
        </div>
        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 18,
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700 }}>Links</span>
          <span>
            Github <span style={{ fontSize: 18 }}>↗</span>
          </span>
          <span>
            LinkedIn <span style={{ fontSize: 18 }}>↗</span>
          </span>
        </div>
      </div>
    </div>
    ),
    {
      ...size,
    }
  );
}
