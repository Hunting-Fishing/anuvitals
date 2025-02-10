
import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class BloodWorkErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BloodWork Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Blood Work Processing Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-sm mb-4">
              {this.state.error?.message || 'An error occurred while processing your blood work results'}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
