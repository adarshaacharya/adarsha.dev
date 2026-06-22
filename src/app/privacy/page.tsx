import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Separator } from "@/components/ui/separator";
import { generatePageMetadata } from "../seo";

export const metadata = generatePageMetadata({
    title: "Privacy Policy",
    description:
        "How adarsha.dev collects, uses, and protects your information when you visit this website.",
});

export default function PrivacyPolicy() {
    return (
        <article className="prose prose-neutral dark:prose-invert prose-quoteless max-w-none space-y-8">
            <header className="space-y-4 not-prose">
                <h1 className="text-4xl font-bold tracking-tight">
                    <Balancer>Privacy Policy</Balancer>
                </h1>
                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        <strong className="text-foreground">Effective Date:</strong> June
                        22, 2026
                    </p>
                    <p>
                        <strong className="text-foreground">Last Updated:</strong> June 22,
                        2026
                    </p>
                </div>
            </header>

            <Separator className="not-prose" />

            <p>
                Welcome to <strong>adarsha.dev</strong> (&quot;the Site&quot;), operated
                by Adarsha Acharya. This Privacy Policy explains how information is
                collected, used, and disclosed when you visit this website.
            </p>

            <p>
                By using this Site, you agree to the practices described in this
                policy.
            </p>

            <section>
                <h2>1. Information We Collect</h2>

                <h3>a. Automatically Collected Information</h3>
                <p>
                    When you visit the Site, certain information is collected
                    automatically, including:
                </p>
                <ul>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring URL (the page you came from)</li>
                    <li>Date and time of your visit</li>
                </ul>
                <p>
                    This information is collected through cookies and third-party analytics
                    tools (see Section 3).
                </p>

                <h3>b. Information You Provide Voluntarily</h3>
                <p>
                    If you contact me via email (
                    <a href="mailto:hi@adarsha.dev">hi@adarsha.dev</a>), I may collect:
                </p>
                <ul>
                    <li>Your name</li>
                    <li>Your email address</li>
                    <li>Any information you include in your message</li>
                </ul>
                <p>
                    This information is used solely to respond to your inquiry and is
                    never shared with third parties.
                </p>
            </section>

            <section>
                <h2>2. Cookies</h2>
                <p>
                    This Site uses cookies — small text files stored on your device — to
                    improve your browsing experience and to enable advertising and
                    analytics features.
                </p>
                <p>
                    <strong>Types of cookies used:</strong>
                </p>
                <div className="not-prose overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-2 pr-4 text-left font-semibold">
                                    Cookie Type
                                </th>
                                <th className="py-2 text-left font-semibold">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border">
                                <td className="py-2 pr-4">Analytics cookies</td>
                                <td className="py-2">
                                    Understand how visitors interact with the Site
                                </td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-2 pr-4">Advertising cookies</td>
                                <td className="py-2">Serve relevant ads via Google AdSense</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4">Functional cookies</td>
                                <td className="py-2">
                                    Remember your preferences (e.g., light/dark theme)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    You can control or disable cookies through your browser settings.
                    Please note that disabling cookies may affect certain features of the
                    Site.
                </p>
            </section>

            <section>
                <h2>3. Third-Party Services</h2>

                <h3>Google AdSense</h3>
                <p>
                    This Site uses <strong>Google AdSense</strong> to display
                    advertisements. Google uses cookies to serve ads based on your prior
                    visits to this Site and other sites on the internet.
                </p>
                <ul>
                    <li>
                        Google&apos;s use of advertising cookies enables it and its partners
                        to serve ads based on your visit to this Site and/or other sites on
                        the internet.
                    </li>
                    <li>
                        You may opt out of personalized advertising by visiting{" "}
                        <a
                            href="https://www.google.com/settings/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Ads Settings
                        </a>{" "}
                        or{" "}
                        <a
                            href="http://www.aboutads.info/choices/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            aboutads.info
                        </a>
                        .
                    </li>
                    <li>
                        For more information on how Google collects and uses data, visit{" "}
                        <a
                            href="https://policies.google.com/technologies/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google&apos;s Privacy &amp; Terms
                        </a>
                        .
                    </li>
                </ul>

                <h3>Google Analytics</h3>
                <p>
                    This Site uses <strong>Google Analytics</strong> to analyze website
                    traffic and usage patterns. Google Analytics collects data such as
                    pages visited, time on site, and geographic location (at the
                    country/city level).
                </p>
                <ul>
                    <li>
                        This data is processed by Google in accordance with{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google&apos;s Privacy Policy
                        </a>
                        .
                    </li>
                    <li>
                        You can opt out of Google Analytics tracking by installing the{" "}
                        <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Analytics Opt-out Browser Add-on
                        </a>
                        .
                    </li>
                </ul>
            </section>

            <section>
                <h2>4. How We Use Your Information</h2>
                <p>The information collected is used to:</p>
                <ul>
                    <li>Analyze and improve the performance of the Site</li>
                    <li>Display relevant advertisements via Google AdSense</li>
                    <li>Respond to inquiries submitted via email</li>
                    <li>Ensure the technical functionality and security of the Site</li>
                </ul>
            </section>

            <section>
                <h2>5. Data Sharing</h2>
                <p>
                    I do not sell, trade, or rent your personal information to third
                    parties. Information may be shared with:
                </p>
                <ul>
                    <li>
                        <strong>Google</strong> — for analytics and advertising purposes, as
                        described above
                    </li>
                    <li>
                        <strong>Law enforcement</strong> — if required by applicable law or
                        legal process
                    </li>
                </ul>
            </section>

            <section>
                <h2>6. Data Retention</h2>
                <p>
                    Email correspondence is retained only as long as necessary to respond
                    to your inquiry. Analytics and advertising data is retained according
                    to the respective third-party service&apos;s data retention policies.
                </p>
            </section>

            <section>
                <h2>7. Your Rights</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul>
                    <li>
                        <strong>Access</strong> — Request a copy of data held about you
                    </li>
                    <li>
                        <strong>Correction</strong> — Request correction of inaccurate
                        information
                    </li>
                    <li>
                        <strong>Deletion</strong> — Request deletion of your personal data
                    </li>
                    <li>
                        <strong>Opt-out</strong> — Opt out of personalized advertising (see
                        Section 3)
                    </li>
                </ul>
                <p>
                    To exercise any of these rights, please contact me at{" "}
                    <a href="mailto:hi@adarsha.dev">
                        <strong>hi@adarsha.dev</strong>
                    </a>
                    .
                </p>
            </section>

            <section>
                <h2>8. Children&apos;s Privacy</h2>
                <p>
                    This Site is not directed at children under the age of 13. I do not
                    knowingly collect personal information from children. If you believe a
                    child has provided personal information, please contact me and I will
                    delete it promptly.
                </p>
            </section>

            <section>
                <h2>9. External Links</h2>
                <p>
                    This Site may contain links to external websites. I am not responsible
                    for the privacy practices or content of those sites and encourage you
                    to review their privacy policies independently.
                </p>
            </section>

            <section>
                <h2>10. Changes to This Policy</h2>
                <p>
                    This Privacy Policy may be updated from time to time. Any changes will
                    be reflected on this page with an updated &quot;Last Updated&quot;
                    date. Continued use of the Site after changes constitutes acceptance of
                    the updated policy.
                </p>
            </section>

            <section>
                <h2>11. Contact</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy,
                    please contact:
                </p>
                <p>
                    <strong>Adarsha Acharya</strong>
                    <br />
                    <a href="mailto:hi@adarsha.dev">hi@adarsha.dev</a>
                    <br />
                    <Link href="https://www.adarsha.dev">adarsha.dev</Link>
                </p>
            </section>
        </article>
    );
}
