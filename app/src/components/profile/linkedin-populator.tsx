
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfileFromLinkedIn } from "@/lib/actions";
import { Loader2, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LinkedInPopulator() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePopulate = async () => {
    if (!linkedinUrl) {
      toast({
        title: "LinkedIn URL required",
        description: "Please enter your LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const profileData = await getProfileFromLinkedIn({linkedinUrl});
      toast({
        title: "Profile Data Fetched",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(profileData, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Could not fetch profile data from LinkedIn. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="linkedin-url" className="sr-only">LinkedIn Profile URL</Label>
          <Input
            id="linkedin-url"
            placeholder="https://www.linkedin.com/in/your-profile"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>
        <Button onClick={handlePopulate} disabled={isLoading} className="mt-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Linkedin className="mr-2 h-4 w-4" />
          )}
          Populate Profile
        </Button>
      </div>
  );
}
