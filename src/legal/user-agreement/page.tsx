
import LegalLayout from "@/components/legal/layout";
import { Card } from "@/components/ui/card";
import UserAgreementContent from "@/components/legal/user-agreement-content";

export default function UserAgreementPage() {
    return (
       <LegalLayout>
         <Card>
            <UserAgreementContent />
        </Card>
       </LegalLayout>
    );
}

