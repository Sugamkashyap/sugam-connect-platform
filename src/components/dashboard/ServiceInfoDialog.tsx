
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ServiceInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckConnection: () => void;
  title: string;
  description: React.ReactNode;
}

const ServiceInfoDialog: React.FC<ServiceInfoDialogProps> = ({
  open,
  onOpenChange,
  onCheckConnection,
  title,
  description
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          {description}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
          <Button variant="outline" onClick={onCheckConnection}>Check Connection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInfoDialog;
