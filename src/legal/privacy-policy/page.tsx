
import LegalLayout from "@/components/legal/layout";
import { Card } from "@/components/ui/card";
import PrivacyPolicyContent from "@/components/legal/privacy-policy-content";

export default function PrivacyPolicyPage() {
    return (
       <LegalLayout>
         <Card>
            <PrivacyPolicyContent />
        </Card>
       </LegalLayout>
    );
}

