import { useRouteError, isRouteErrorResponse } from "react-router-dom";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <main className="app-main">
      <div className="error-card">
        <p className="error-title">Something went wrong</p>
        <p className="error-message">{error.message}</p>
        <button className="btn-primary" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </main>
  );
}