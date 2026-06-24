import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const postTitle = searchParams.get("title")?.slice(0, 100) ?? "Blog";

    const [groteskRegular, instrumentSerifRegular] = await Promise.all([
      readFile(join(process.cwd(), "public/_static/fonts/SpaceGrotesk-Regular.ttf")),
      readFile(join(process.cwd(), "public/_static/fonts/InstrumentSerif-Regular.ttf")),
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            backgroundColor: "#111620",
            fontFamily: "SpaceGrotesk",
          }}
        >
          {/* Amber accent line */}
          <div
            style={{
              width: 48,
              height: 3,
              backgroundColor: "#E8A020",
              borderRadius: 2,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontFamily: "InstrumentSerif",
              fontWeight: 400,
              color: "#E8EBF0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              maxWidth: 920,
            }}
          >
            {postTitle}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#E8A020",
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: "#7B89A0",
                letterSpacing: "0.05em",
              }}
            >
              adarsha.dev
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "SpaceGrotesk",
            data: groteskRegular,
            style: "normal",
          },
          {
            name: "InstrumentSerif",
            data: instrumentSerifRegular,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
