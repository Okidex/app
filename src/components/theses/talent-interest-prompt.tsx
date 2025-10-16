
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface TalentInterestPromptProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TalentInterestPrompt({ open, onOpenChange }: TalentInterestPromptProps) {
    const router = useRouter();

    const handleCreateAccount = () => {
        router.push('/register/founder');
    }
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Take the Next Step</DialogTitle>
                    <DialogDescription>
                        Your interest has been sent. To engage in conversations with investors and take the next step towards funding, you'll need a Founder account.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Creating a Founder account allows you to build a full startup profile, share your pitch deck, manage financials, and directly message investors who show interest in your vision.
                    </p>
                </div>
                <DialogFooter>
                     <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                     <Button type="button" onClick={handleCreateAccount}>
                        Create Founder Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
