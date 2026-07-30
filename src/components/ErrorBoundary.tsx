import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-graphite-950 px-6 text-center text-white">
          <h1 className="font-display text-3xl font-bold text-sakura-400">Something went wrong</h1>
          <p className="mt-4 max-w-md text-sm text-white/60">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-sakura-400 px-6 py-2.5 text-sm font-medium text-graphite-950 hover:bg-sakura-300"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
