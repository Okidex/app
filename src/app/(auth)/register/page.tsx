
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join the premier platform for innovation. Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground">
          Okidex is in early access! We value your participation and feedback as you explore. The product is ever-evolving to best suit the dynamic needs of the startup community.
        </p>
      </CardFooter>
    </Card>
  );
}
