export default function BlogPostLoading() {
  return (
    <article className="space-y-8 animate-pulse" aria-busy="true" aria-label="Loading post">
      <div className="h-9 w-24 rounded-md bg-muted" />
      <div className="space-y-5">
        <div className="h-12 max-w-3xl rounded-md bg-muted sm:h-14" />
        <div className="h-16 max-w-2xl rounded-md bg-muted" />
        <div className="h-5 w-72 rounded-md bg-muted" />
      </div>
      <div className="h-px bg-border" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
      </div>
    </article>
  );
}
