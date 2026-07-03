import { generatePageMetadata } from "../seo";
import { Separator } from "@/components/ui/separator";

export const metadata = generatePageMetadata({
    title: "About",
    description:
        "Fullstack engineer based in Nepal. Work history, background, and what I'm focused on.",
});

const experience = [
    {
        company: "Mindworks Interactive",
        role: "Software Engineer L2",
        period: "June 2023 – Feb 2025",
        description:
            "Built a multi-tenant iGaming platform from scratch: admin panel, 5+ player-facing apps, and the backend services that tie them together. Owned the monorepo architecture, CI/CD, and a game sync pipeline pulling from multiple publishers. Migrated the backend from Apollo GraphQL to tRPC.",
    },
    {
        company: "Renegade Insurance",
        role: "Software Engineer I",
        period: "Nov 2021 – June 2023",
        description:
            "Worked on an insurance marketplace for agents and carriers. Built a dynamic form system, shipped a shared component library, migrated state management from Redux to RTK Query, and containerized the frontend apps. Improved public agent profile SEO. 1K+ pages indexed in the first week.",
    },
];

export default function About() {
    return (
        <div className="space-y-12">
            {/* Intro */}
            <section className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight">About</h1>
                <div className="space-y-3 text-muted-foreground leading-relaxed text-sm max-w-xl">
                    <p>
                        I&apos;m a fullstack engineer based in Kathmandu, Nepal. I&apos;ve spent the last few years building production web apps — across insurance, iGaming, and video streaming domains. Currently focused on building AI-powered products and tools.
                    </p>
                    <p>
                        Outside of work I build open source tools, contribute to projects I use, and write about things I learn. The blog started as personal notes and turned into something people actually read.
                    </p>
                </div>
            </section>

            <Separator />

            {/* Experience */}
            <section className="space-y-1">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                    Experience
                </h2>
                <div>
                    {experience.map((job, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-[2rem_1fr] gap-5 py-6 border-b border-border/40 last:border-b-0"
                        >
                            <span className="font-mono text-xs font-medium text-primary tabular-nums pt-0.5 select-none">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                            <div className="space-y-1.5">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                    <h3 className="font-semibold text-base">{job.company}</h3>
                                    <span className="text-muted-foreground text-sm">{job.role}</span>
                                </div>
                                <p className="text-xs text-muted-foreground/60 font-mono">{job.period}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* Education */}
            <section className="space-y-6">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Education
                </h2>
                <div className="grid grid-cols-[2rem_1fr] gap-5">
                    <span className="font-mono text-xs font-medium text-primary tabular-nums pt-0.5 select-none">
                        01
                    </span>
                    <div className="space-y-0.5">
                        <h3 className="font-semibold text-base">Tribhuvan University</h3>
                        <p className="text-sm text-muted-foreground">B.Sc. Computer Science and Information Technology</p>
                        <p className="text-xs text-muted-foreground/60 font-mono pt-0.5">Oct 2017 – May 2022 · Kathmandu, Nepal</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
