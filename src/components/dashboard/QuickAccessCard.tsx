
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickAction {
  title: string;
  description: string;
  onClick: () => void;
}

interface QuickAccessCardProps {
  actions: QuickAction[];
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ actions }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            {actions.map((action, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="justify-start text-left h-auto py-3 px-4 mt-2 first:mt-0" 
                onClick={action.onClick}
              >
                <div>
                  <h4 className="font-medium leading-none mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
