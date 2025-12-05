import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TalentRegisterForm from "@/components/auth/talent-register-form";

export default function TalentRegisterPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup your Talent Profile</CardTitle>
        <CardDescription>
          Highlight your skills and experience to connect with innovative startups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TalentRegisterForm />
      </CardContent>
    </Card>
  );
}
