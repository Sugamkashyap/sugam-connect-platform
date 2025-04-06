
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-brand-blue">404</h1>
        <h2 className="text-3xl font-bold mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you were looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col space-y-4 items-center">
          <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 flex items-center">
            <Link to="/">
              <ArrowLeft className="mr-2" size={16} />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
