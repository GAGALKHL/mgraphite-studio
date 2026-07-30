export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-12" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-sakura-400 border-t-transparent" />
    </div>
  );
}
