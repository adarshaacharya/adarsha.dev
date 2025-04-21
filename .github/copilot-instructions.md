Portfolio website

## Project Overview

This is Adarsha Acharya's portfolio website, built using Next.js 15 and Contentlayer for blog section. The website showcases my skills, projects, and experience in a fullstack web development. It serves as a personal branding tool to attract potential employers and clients.
The website is fully responsive, ensuring a seamless experience across devices. It utilizes modern web technologies and best practices to deliver a fast and engaging user experience.

The webside is minimalisitc and clean so will be black and white with some color accents.

## Folder structure:

```
/public/        # Static assets
/src/
    /app/            # Next.js app directory with pages setup
    /api/         # API routes
    /components/  # Reusable components
    /styles/      # Global styles
    /lib/           # Utility functions
    /hooks/         # Custom hooks
    /content/       # Blog content in mdx
    /lib/           # External libraries and configurations
    /data/          # Static data and content

```

# Technologies used:

- Nextjs
- Tailwind css
- Shadcn/ui
- TypeScript
- Vercel as deployment
- Contentlayer for blog section (https://contentlayer.dev/docs)

## Key Features

- Blog section with markdown support
- Responsive design for mobile and desktop
- Dark mode support using next-themes
- Interactive components using shadcn/ui
- Animation using motion/react

## ROLE

You are assisting in the development of Adarsha Acharya's portfolio website built using Next.js and TailwindCSS. Your role is to provide guidance and suggestions for implementing features, fixing bugs, and improving the overall quality of the codebase. You will also help in writing tests, ensuring best practices are followed, and maintaining a clean and organized code structure.

## TECH STACK

- Next.js 15 & React 19
- App Router with Server Components by default
- TypeScript with strict mode
- Tailwind CSS with shadcn/ui
- `motion/react` for animations
- chatbot using vercel ai sdk
- Contentlayer for blog section
- Vercel for deployment

## KEY ARCHITECTURAL PRINCIPLES

1. Component Architecture:

- Use React Server Components (RSC) by default
- Add 'use client' directive only for interactive components
- Follow component composition over inheritance
- Implement proper TypeScript types for all props and functions
- Reserve function declarations for utilities and helpers
- If the component is too large, break it down into smaller components by creating a new file for each component
- Group similar components together in a folder inside `src/components`
- Ensure components are reusable and maintainable and make components smaller and generic
- all chatbot logic should so inside `src/components/chatbot` folder
- avoid using unnecessary colors pallete and use only black and white with some color accents

2. Performance:

- Leverage React Suspense boundaries
- Implement streaming where appropriate
- Use proper image optimization
- Follow proper caching strategies
- Implement proper loading states

3. Styling:

- Use Tailwind's utility-first approach
- Follow mobile-first responsive design
- Implement dark mode using next-themes
- Use shadcn/ui components consistently
- Use `motion/react` for animations and try to animate consistently

## MISCELLANEOUS

When implementing features:

1. Start with Server Components
2. Add client interactivity only when needed
3. Ensure proper TypeScript types
4. Validate all inputs
5. Handle loading and error states
6. Follow mobile-first design
7. Implement proper tests
8. Use proper TypeScript types for all functions and props and avoid use of `any` type

## Next Steps

Create beautiful chatbot that will help users navigate the website and find information quickly. The chatbot should be able to answer common questions, provide information about projects, and assist with any other inquiries users may have. The chatbot should be integrated into the website and should be easy to use and interact with.

- For chatbot we will use vercel ai sdk : https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
- make sure chatbot is beautiful with animation and mobile ready

# Important Links

- @ai-sdk/react : https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
- Build rag chatbot : https://sdk.vercel.ai/docs/guides/rag-chatbot
