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
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
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
              "radial-gradient(circle at 25% 25%, rgba(29, 161, 242, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
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
          {/* Name */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
            }}
          >
            Thant Hein Thwin
          </h1>

          {/* Title */}
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#1da1f2",
              margin: "0 0 24px 0",
              lineHeight: 1.3,
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
                    background: "rgba(29, 161, 242, 0.2)",
                    color: "#1da1f2",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "18px",
                    fontWeight: "500",
                    border: "1px solid rgba(29, 161, 242, 0.3)",
                  }}
                >
                  {skill}
                </span>
              )
            )}
          </div>

          {/* Twitter indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              background: "rgba(29, 161, 242, 0.2)",
              color: "#1da1f2",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(29, 161, 242, 0.3)",
            }}
          >
            #Portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
