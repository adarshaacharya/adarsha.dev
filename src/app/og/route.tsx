import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const hasTitle = searchParams.has("title");
    const postTitle = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Blog";

    const [groteskRegular, bgImage] = await Promise.all([
      readFile(
        join(process.cwd(), "public/_static/fonts/SpaceGrotesk-Regular.ttf"),
      ),
      readFile(join(process.cwd(), "public/_static/blog-og-card.png")),
    ]);
    const bgDataUrl = `data:image/png;base64,${bgImage.toString("base64")}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            color: "white",
            backgroundImage: `url(${bgDataUrl})`,
          }}
        >
          <div
            style={{
              marginLeft: 100,
              marginRight: 100,
              display: "flex",
              fontSize: 65,
              fontFamily: "SpaceGrotesk",
              fontStyle: "normal",
              color: "white",
              whiteSpace: "pre-wrap",
            }}
          >
            {postTitle}
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
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
