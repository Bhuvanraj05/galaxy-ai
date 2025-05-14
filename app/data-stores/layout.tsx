export default function DataStoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#121620]">
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
} 