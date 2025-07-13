import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Thant Hein Thwin - Full Stack Software Engineer";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%), linear-gradient(225deg, rgba(59, 59, 59, 0.12) 0%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Greeting */}
          <div
            style={{
              fontSize: "24px",
              color: "#ffffff",
              margin: "0 0 8px 0",
              opacity: 0.8,
            }}
          >
            👋 Hello, I&apos;m
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "300",
              color: "#ffffff",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Thant Hein Thwin
          </h1>

          {/* Title */}
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "#ffffff",
              margin: "0 0 32px 0",
              lineHeight: 1.4,
              opacity: 0.9,
            }}
          >
            Full Stack Software Engineer
          </h2>

          {/* Skills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            {["React", "Next.js", "Node.js", "Golang", "TypeScript"].map(
              (skill) => (
                <span
                  key={skill}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "400",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>

          {/* Portfolio indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
