import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FounderRegisterForm from "@/components/auth/founder-register-form";

export default function FounderRegisterPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup your Founder Profile</CardTitle>
        <CardDescription>
          Tell us about your startup. This information will help investors and talent find you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FounderRegisterForm />
      </CardContent>
    </Card>
  );
}
