
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SiteControls from '@/components/dashboard/SiteControls';

const SiteManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Site Management</h2>
        <p className="text-muted-foreground">Control site deployment and monitor user activity</p>
      </div>

      {/* Site Controls */}
      <SiteControls />

      {/* Additional Management Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Configure advanced settings for your website. These settings will affect how your site functions and appears to users.
          </p>
          <div className="text-center p-6 border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              This section will be connected to backend functionality with Supabase integration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteManagement;
