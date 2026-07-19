import { Tweet } from "react-tweet";

/**
 * Live tweet embed for MDX posts. Fetches and renders on the server.
 *
 * ```mdx
 * <TweetEmbed id="2078727284865827140" />
 * ```
 */
export function TweetEmbed({ id }: { id: string }) {
  return (
    <div className="not-prose my-8 flex w-full justify-center [&_.react-tweet-theme]:mx-auto">
      <Tweet id={id} />
    </div>
  );
}
