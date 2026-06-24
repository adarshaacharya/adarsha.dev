import { siteMetadata } from "@/data/siteMetadata";
import { Metadata } from "next";

interface OwnProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export function generatePageMetadata({
  title,
  description,
  image,
  ...rest
}: OwnProps): Metadata {
  const ogImage = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : [
        {
          url: `${siteMetadata.siteUrl}/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ];

  return {
    title,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: "./",
      siteName: siteMetadata.title,
      images: ogImage,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: "summary_large_image",
      images: ogImage.map((img) => img.url),
    },
    ...rest,
  };
}
