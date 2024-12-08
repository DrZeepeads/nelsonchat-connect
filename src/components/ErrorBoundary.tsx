import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** A fallback component to render when an error occurs */
  FallbackComponent?: React.ComponentType<{ error: Error }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  // Update state when an error is thrown
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Log error details for debugging
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", {
      error,
      errorInfo,
    });
  }

  // Render fallback UI if an error is caught
  public render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} />;
      }

      // Default fallback UI if no FallbackComponent is provided
      return (
        <div role="alert" className="p-4 bg-red-100 text-red-800 rounded-md">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <pre className="text-sm mt-2">{error.message}</pre>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;