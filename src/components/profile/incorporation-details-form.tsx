
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IncorporationDetails } from "@/lib/types";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

interface IncorporationDetailsFormProps {
    initialData: IncorporationDetails;
}

export default function IncorporationDetailsForm({ initialData }: IncorporationDetailsFormProps) {
    const [isIncorporated, setIsIncorporated] = useState(initialData.isIncorporated);
    const [details, setDetails] = useState(initialData);
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Incorporation Details Saved",
            description: "Your startup's legal information has been updated.",
        });
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setDetails(prev => ({ ...prev, incorporationDate: date.toISOString() }));
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Incorporation Details</CardTitle>
                <CardDescription>Provide legal information about your business entity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="is-incorporated"
                        checked={isIncorporated}
                        onCheckedChange={setIsIncorporated}
                    />
                    <Label htmlFor="is-incorporated">Is your startup incorporated?</Label>
                </div>

                {isIncorporated && (
                    <div className="space-y-4 pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country of Incorporation</Label>
                                <Input id="country" value={details.country || ''} onChange={e => setDetails({ ...details, country: e.target.value })} placeholder="e.g., USA" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="incorporation-type">Incorporation Type</Label>
                                <Select value={details.incorporationType || ''} onValueChange={value => setDetails({ ...details, incorporationType: value as IncorporationDetails['incorporationType'] })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="C-Corp">C-Corp</SelectItem>
                                        <SelectItem value="S-Corp">S-Corp</SelectItem>
                                        <SelectItem value="LLC">LLC</SelectItem>
                                        <SelectItem value="PLT">PLT</SelectItem>
                                        <SelectItem value="PLC">PLC</SelectItem>
                                        <SelectItem value="OPC">OPC</SelectItem>
                                        <SelectItem value="LLPs">LLPs</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="incorporation-date">Date of Incorporation</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !details.incorporationDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {details.incorporationDate ? format(parseISO(details.incorporationDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={details.incorporationDate ? parseISO(details.incorporationDate) : undefined}
                                            onSelect={handleDateSelect}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="entity-number">Unique Entity Number (UEN)</Label>
                                <Input id="entity-number" value={details.entityNumber || ''} onChange={e => setDetails({ ...details, entityNumber: e.target.value })} placeholder="e.g., 123456789" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tax-id">Business Tax ID / EIN</Label>
                            <Input id="tax-id" value={details.taxId || ''} onChange={e => setDetails({ ...details, taxId: e.target.value })} placeholder="e.g., 98-7654321" />
                        </div>
                    </div>
                )}
                <Button onClick={handleSave}>Save Incorporation Details</Button>
            </CardContent>
        </Card>
    );
}
