export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-4 flex min-h-svh flex-1 flex-col sm:-mx-6">
      {children}
    </div>
  );
}
