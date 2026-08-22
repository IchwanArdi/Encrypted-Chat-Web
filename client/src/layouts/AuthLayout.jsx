export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-main)] bg-tech-grid font-sans flex flex-col justify-between selection:bg-[var(--color-accent-subtle)] selection:text-[var(--color-accent)]">
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
