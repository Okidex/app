"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole, TalentSubRole } from "@/lib/types";
import { Briefcase, Lightbulb, Users, UserCheck, Store, Laptop, UserCog, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("founder");
  const [subRole, setSubRole] = useState<TalentSubRole>("co-founder");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    
    sessionStorage.setItem('registrationDetails', JSON.stringify({
      email,
      password,
      name: `${firstName} ${lastName}`,
      role,
      subRole: role === 'talent' ? subRole : undefined,
    }));
    
    router.push(`/register/${role}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" name="first-name" placeholder="Ada" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" name="last-name" placeholder="Lovelace" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="ada@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <div className="space-y-3">
        <Label>You are a...</Label>
        <RadioGroup
          value={role}
          onValueChange={(value) => setRole(value as UserRole)}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { value: "founder", label: "Founder", icon: Lightbulb },
            { value: "investor", label: "Investor", icon: Users },
            { value: "talent", label: "Talent", icon: Briefcase },
          ].map(({ value, label, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem value={value} id={value} className="sr-only" />
              <Label
                htmlFor={value}
                className={cn(
                  "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                  role === value && "border-primary"
                )}
              >
                <Icon className="mb-3 h-6 w-6" />
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {role === "talent" && (
        <div className="space-y-3 pt-2">
          <Label>You are looking to be a...</Label>
          <RadioGroup
            value={subRole}
            onValueChange={(value) => setSubRole(value as TalentSubRole)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "co-founder", label: "Co-founder", icon: UserCheck },
              { value: "employee", label: "Employee", icon: Laptop },
              { value: "vendor", label: "Vendor", icon: Store },
              { value: "fractional-leader", label: "Fractional Leader", icon: UserCog },
            ].map(({ value, label, icon: Icon }) => (
            <div key={value}>
              <RadioGroupItem value={value} id={value} className="sr-only" />
              <Label
                htmlFor={value}
                className={cn(
                  "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer text-center h-full",
                  subRole === value && "border-primary"
                )}
              >
                <Icon className="mb-3 h-6 w-6" />
                <span className="text-sm">{label}</span>
              </Label>
            </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreed} 
          onCheckedChange={(checked) => setAgreed(!!checked)}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
          By creating an account, you agree to our{' '}
          <Link href="/legal/user-agreement" className="underline hover:text-primary" target="_blank">
            User Agreement
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy-policy" className="underline hover:text-primary" target="_blank">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>


      <Button type="submit" className="w-full" disabled={!agreed || isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}
