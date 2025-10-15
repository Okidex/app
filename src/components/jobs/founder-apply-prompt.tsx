'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FounderApplyPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FounderApplyPrompt({
  open,
  onOpenChange,
}: FounderApplyPromptProps) {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('/register/talent');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Talent Profile to Apply</DialogTitle>
          <DialogDescription>
            To apply for jobs and showcase your skills to startups, you need a
            separate Talent Profile.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Your Founder profile is for managing your startup. A Talent profile
            lets you present your individual skills and experience to potential
            employers. You can easily switch between profiles after creation.
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button type="button" onClick={handleCreateAccount}>
            Create Talent Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
