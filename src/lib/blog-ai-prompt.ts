export function buildAiPrompt({
  title,
  markdown,
  markdownUrl,
  postUrl,
  maxChars = 24000,
}: {
  title: string;
  markdown: string;
  markdownUrl: string;
  postUrl: string;
  maxChars?: number;
}) {
  const truncated =
    markdown.length > maxChars
      ? `${markdown.slice(0, maxChars).trimEnd()}\n\n...[truncated]`
      : markdown;

  return `Please read and help me understand this article titled "${title}".

${truncated}

Full markdown: ${markdownUrl}
Original post: ${postUrl}`;
}
