import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import { useState, useEffect } from "react";

// Simplified version for demo purposes
export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  // For demo purposes, we're assuming the user is always authenticated
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate a loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  // Always allow access to the component for demo purposes
  return <Route path={path} component={Component} />;
}
