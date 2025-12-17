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
import { DateInput } from '@/components/ui/date-input'; // Import the new component

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

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value; // Format: YYYY-MM-DD
        setDetails(prev => ({ ...prev, incorporationDate: dateValue }));
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
                                        <SelectItem value="Private Limited">Private Limited</SelectItem>
                                        <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                                        <SelectItem value="Charity">Charity</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                {/* Fixed: Replaced Popover/Calendar with manual DateInput */}
                                <DateInput 
                                    label="Date of Incorporation"
                                    id="incorporation-date"
                                    value={details.incorporationDate?.split('T')[0] || ''} 
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="space-y-2">
                                Unique Entity Number (UEN)</Label>
                                 setDetails({ ...details, entityNumber: e.target.value })} placeholder="e.g., 123456789" />
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
