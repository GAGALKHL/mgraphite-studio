export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-graphite-950" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
    </div>
  );
}
