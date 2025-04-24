import { Loader2 } from "lucide-react";
import { Route, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  // For demo purposes, always render the component
  // We'll later add proper authentication checks
  return <Route path={path} component={Component} />;
}
