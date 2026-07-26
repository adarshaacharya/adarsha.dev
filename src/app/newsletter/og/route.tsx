import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";


export async function GET() {
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
          backgroundColor: "#11141A",
          color: "#EDF0F5",
          fontFamily: "SpaceGrotesk",
        }}
      >
        <div
          style={{
            width: "68%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "62px 70px",
            borderRight: "1px solid #29303A",
          }}
        >
          <span style={{ color: "#E8A020", fontSize: 22 }}>
            adarsha.dev / newsletter
          </span>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#93A0B5",
                fontSize: 21,
                marginBottom: 22,
              }}
            >
              Newsletter
            </span>
            <span
              style={{
                fontFamily: "InstrumentSerif",
                fontSize: 78,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                maxWidth: 650,
              }}
            >
              I write about building software.
            </span>
          </div>

          <span style={{ color: "#93A0B5", fontSize: 21 }}>
            New articles and occasional notes
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "58px",
            backgroundColor: "#171B22",
          }}
        >
          <span
            style={{
              fontFamily: "InstrumentSerif",
              fontSize: 38,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Want the next one?
          </span>
          <span
            style={{
              borderTop: "1px solid #29303A",
              color: "#93A0B5",
              fontSize: 19,
              lineHeight: 1.45,
              paddingTop: 20,
            }}
          >
            No spam. Unsubscribe whenever you want.
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
}
