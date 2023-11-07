import assets from "@/assets";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Inlight Zambia";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    <img src={assets.officialLogo.src} />,
    // ImageResponse options
    {
      ...size,
    }
  );
}
