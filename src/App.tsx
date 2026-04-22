import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "./components/Navbar";
import ErrorFallback from "./components/ErrorFallback";
import { useScrollToTop } from "./hooks/useScrollToTop";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddJob    = lazy(() => import("./pages/AddJob"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Explore   = lazy(() => import("./pages/Explore"));

function PageSkeleton() {
  return (
    <main className="app-main">
      <div className="skeleton-bar" style={{ width: "40%", marginBottom: "12px" }} />
      <div className="skeleton-bar" style={{ width: "100%", marginBottom: "8px" }} />
      <div className="skeleton-bar" style={{ width: "100%", marginBottom: "8px" }} />
      <div className="skeleton-bar" style={{ width: "70%" }} />
    </main>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[location.pathname]}
    >
      <Suspense fallback={<PageSkeleton />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  // Runs on every route change — no return value, just a side effect
  useScrollToTop();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/jobs/:id"  element={<PageWrapper><JobDetail /></PageWrapper>} />
        <Route path="/add"       element={<PageWrapper><AddJob /></PageWrapper>} />
        <Route path="/explore"   element={<PageWrapper><Explore /></PageWrapper>} />
      </Routes>
    </>
  );
}