export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-4 w-[calc(100%+2rem)] flex min-h-svh flex-1 flex-col sm:-mx-6 sm:w-[calc(100%+3rem)] lg:mx-0 lg:w-full">
      {children}
    </div>
  );
}
