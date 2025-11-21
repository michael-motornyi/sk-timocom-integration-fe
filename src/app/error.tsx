'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TIMOCOM Integration Dashboard</h1>
          <p className="text-xl text-gray-600">Freight and Vehicle Space Management</p>
        </div>

        <Card className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl">
          <div className="absolute inset-0 bg-linear-to-br from-red-50/20 via-transparent to-orange-50/20"></div>
          <CardHeader className="relative text-center">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-center gap-3">
              <div className="p-3 bg-linear-to-br from-red-500 to-orange-600 rounded-lg shadow-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="relative text-center space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                We encountered an error while loading the TIMOCOM data.
              </p>

              {error.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium mb-2">Error Details:</p>
                  <p className="text-red-700 text-sm font-mono bg-red-100 p-2 rounded">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-red-600 text-xs mt-2">Error ID: {error.digest}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={reset}
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Reload Page
                </Button>
              </div>

              <div className="text-sm text-gray-500 space-y-2">
                <p>This error might be caused by:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Network connectivity issues</li>
                  <li>TIMOCOM API service unavailability</li>
                  <li>Authentication or permission problems</li>
                  <li>Server configuration issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
