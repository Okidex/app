"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface OkiPlusPromoDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function OkiPlusPromoDialog({ isOpen, onOpenChange }: OkiPlusPromoDialogProps) {
    const router = useRouter();

    const handleUpgrade = () => {
        onOpenChange(false);
        router.push("/settings/billing");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md overflow-hidden border-none bg-background/95 backdrop-blur-md shadow-2xl p-0">
                <div className="h-2 bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500" />
                <div className="p-6 space-y-6">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 gap-1 font-semibold">
                                <Sparkles className="w-3.5 h-3.5 animate-pulse text-violet-500" />
                                Oki+ Premium
                            </Badge>
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-foreground bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                            Accelerate Your Fundraising
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground pt-1">
                            Upgrade to Oki+ to showcase your fundraising goals and unlock direct visibility to our exclusive network of active investors.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 rounded-xl bg-muted/40 p-4 border border-border/50">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Oki+ Benefits:</h4>
                        
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                            <div>
                                <h5 className="text-sm font-semibold text-foreground">Featured Fundraising Goals</h5>
                                <p className="text-xs text-muted-foreground">Make your fundraising goals and progress bar fully visible to investors on your profile.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                            <div>
                                <h5 className="text-sm font-semibold text-foreground">Priority Investor Matching</h5>
                                <p className="text-xs text-muted-foreground">Gain direct access to verified investors actively searching for startups in your industry.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h5 className="text-sm font-semibold text-foreground">Direct Uncapped Messaging</h5>
                                <p className="text-xs text-muted-foreground">Instantly message and pitching connections without monthly limit restrictions.</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button 
                            onClick={handleUpgrade} 
                            className="w-full sm:flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 shadow-md shadow-violet-500/20"
                        >
                            <Sparkles className="w-4 h-4 mr-2" /> Upgrade to Oki+
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => onOpenChange(false)} 
                            className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
                        >
                            Maybe Later
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
