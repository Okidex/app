
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { investmentStages } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfilePhotoUploader from "./profile-photo-uploader";
import { useState } from "react";
import { Exit } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PlusCircle, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";

export default function InvestorRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [exits, setExits] = useState<Exit[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExit, setNewExit] = useState<Exit>({ companyName: '', companyUrl: '' });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleAddExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExit.companyName || !newExit.companyUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a company name and URL.",
        variant: "destructive",
      });
      return;
    }
    setExits([...exits, newExit]);
    setNewExit({ companyName: '', companyUrl: '' });
    setIsAddDialogOpen(false);
  };

  const handleRemoveExit = (companyName: string) => {
    setExits(exits.filter(p => p.companyName !== companyName));
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Label className="mb-2 block text-center">Profile Photo</Label>
                <ProfilePhotoUploader />
            </div>
            <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="investorCompanyName">Company Name</Label>
                        <Input id="investorCompanyName" placeholder="e.g. Smith Ventures"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="investorCompanyUrl">Company URL</Label>
                        <Input id="investorCompanyUrl" placeholder="https://smith.ventures" type="url" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="investorType">Investor Type</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your investor type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GP">General Partner (GP)</SelectItem>
                            <SelectItem value="LP">Limited Partner (LP)</SelectItem>
                            <SelectItem value="Family Office Administrator">Family Office Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea id="about" placeholder="Write a brief professional bio..." required/>
                </div>
                <div className="space-y-2">
                    <Label>Investment Interests</Label>
                    <Input placeholder="Add interests as comma separated values (e.g., AI, Fintech, SaaS)" />
                    <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <Label>Exits</Label>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Exit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add an Exit</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddExit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="exit-company-name">Company Name</Label>
                                        <Input id="exit-company-name" value={newExit.companyName} onChange={e => setNewExit({...newExit, companyName: e.target.value})} placeholder="e.g. Innovate Inc." required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="exit-company-url">Company URL</Label>
                                        <Input id="exit-company-url" value={newExit.companyUrl} onChange={e => setNewExit({...newExit, companyUrl: e.target.value})} placeholder="https://innovate.com" type="url" required />
                                    </div>
                                    <Button type="submit" className="w-full">Add Exit</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <Card className="p-3 space-y-2">
                         {exits.length > 0 ? (
                            exits.map((exit, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex flex-col">
                                      <span className="font-medium">{exit.companyName}</span>
                                      <span className="text-muted-foreground text-xs">{exit.companyUrl}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleRemoveExit(exit.companyName)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center">No exits added yet.</p>
                        )}
                    </Card>
                </div>
                <div className="space-y-2">
                    <Label>Investment Stages</Label>
                    <div className="flex flex-wrap gap-4 pt-2">
                        {investmentStages.map(stage => (
                            <div key={stage} className="flex items-center space-x-2">
                                <Checkbox id={`stage-${stage}`} />
                                <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      <Button type="submit" className="w-full">
        Complete
      </Button>
    </form>
  );
}
