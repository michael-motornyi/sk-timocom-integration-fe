import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TIMOCOM Integration Dashboard</h1>
          <p className="text-xl text-gray-600">Freight and Vehicle Space Management</p>
        </div>

        <Card className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl">
          <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-transparent to-purple-50/20"></div>
          <CardHeader className="relative text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-3">
              <div className="p-3 bg-linear-to-br from-gray-400 to-gray-600 rounded-lg shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="relative text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-6xl font-bold text-gray-300">404</h2>

              <p className="text-gray-600 text-lg">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Go Back
                </Button>
              </div>

              <div className="text-sm text-gray-500 space-y-2 pt-4">
                <p>You might want to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check the URL for typos</li>
                  <li>Return to the dashboard home</li>
                  <li>Contact support if you believe this is an error</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
