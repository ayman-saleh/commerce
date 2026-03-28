import { ImageResponse } from "next/og";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME || "ByteGear",
    },
    ...props,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#ffffff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
              color: "#000000",
            }}
          >
            BG
          </div>
          <span style={{ fontSize: "28px", fontWeight: 800 }}>ByteGear</span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#a1a1aa",
            marginTop: "20px",
          }}
        >
          Premium developer hardware. Keyboards, headphones, and more.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
