import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../components/icons";

export const PROJECTS = [
  {
    title: "Parabol",
    tags: ["TypeScript", "React", "Node.js", "GraphQL"],
    description:
      "The Agile meeting co-pilot that delivers better meetings with less effort.",
    imgSrc: "/_static/projects/mentorlabs.png",
    link: {
      label: "github.com",
      href: "https://github.com/ParabolInc/parabol",
    },
  },
  {
    title: "Monito",
    tags: ["TypeScript", "Next.js", "Browser Extension"],
    description:
      "Browser extension that records everything happening in a web application.",
    imgSrc: "/_static/projects/mentorlabs.png",
    link: {
      label: "monito.dev",
      href: "https://monito.dev",
    },
  },
  {
    title: "Jarocki.me",
    tags: ["Next.js", "MDX"],
    description:
      "My personal website you are currently on, built with Next.js.",
    imgSrc: "/_static/projects/mentorlabs.png",
    link: {
      label: "github.com",
      href: "https://github.com/BartoszJarocki/web-jarocki-me",
    },
  },
  {
    title: "Barepapers",
    tags: ["Next.js", "Puppeteer"],
    description:
      "Generates beautiful wallpapers using random shapes and gradients.",
    imgSrc: "/_static/projects/mentorlabs.png",
    link: {
      label: "barepapers.com",
      href: "https://barepapers.com",
    },
  },
  {
    title: "Year progress",
    tags: ["TypeScript", "Next.js"],
    description: "Tracks current year progress and displays a countdown.",
    imgSrc: "/_static/projects/mentorlabs.png",
    link: {
      label: "getyearprogress.com",
      href: "https://getyearprogress.com",
    },
  },
] as const;

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/adarshaacharya",
    icon: GitHubIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/adarshaacharya",
    icon: TwitterIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarshaacharya/",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adarshaacharya/",
    icon: InstagramIcon,
  },
];
