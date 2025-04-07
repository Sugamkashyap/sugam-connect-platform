import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { BrowserRouter } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient();

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MessageProvider>
          <AppointmentProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </TooltipProvider>
          </AppointmentProvider>
        </MessageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};