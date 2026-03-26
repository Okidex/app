
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyContent() {
    return (
        <>
            <CardHeader>
                <CardTitle>Okidex Privacy Policy</CardTitle>
                <CardDescription>Last Updated: December 4, 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-muted-foreground pt-4 max-h-[70vh] overflow-y-auto pr-6">
                <p>
                  At Okidex, we are committed to connecting founders with private investors and talent in a secure, transparent, and respectful manner. This Privacy Policy ("Policy") describes how Okidex, Inc. ("Okidex," "we," "us," or "our") collects, uses, shares, and protects your personal information when you use our mobile application, website (okidex.com), and related services (collectively, the "Services"). We respect your privacy and are dedicated to protecting your data in accordance with applicable laws, including Singapore’s Personal Data Protection Act 2012 (PDPA), as amended by the Personal Data Protection (Amendment) Act 2020, the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other relevant privacy regulations. In Singapore, we comply with the guidelines issued by the Personal Data Protection Commission (PDPC).
                </p>
                <p>
                  By using our Services, you consent to the practices described in this Policy. If you do not agree, please do not access or use the Services. We may update this Policy from time to time, and we will notify you of material changes via email, in-app notification, or by posting the updated Policy on our website with the new effective date. Your continued use of the Services after such changes constitutes your acceptance of the revised Policy.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1. Information We Collect</h3>
                  <p>
                    We collect information to provide, improve, and personalize our Services, facilitate matchmaking between founders, investors, and talent, and ensure a safe environment. Under the PDPA, personal data is defined as data about an individual who can be identified from that data or in combination with other information we have or are likely to have access to. We act as the data controller for your personal data under applicable laws like the PDPA and GDPR.
                  </p>
                  <h4 className="text-lg font-medium text-foreground pt-2">Information You Provide to Us</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Registration and Profile Data:</strong> When you create an account, we collect your name, email address, phone number, professional title, location, and other details you provide, such as your role (e.g., founder, investor, or talent). For verification purposes, we may collect government-issued ID, selfies, or other identity documents through third-party providers to confirm your identity and prevent fraud. You are responsible for the accuracy and appropriateness of the data you choose to share or publish on your profile, including any personal or sensitive information you make publicly visible. Under the PDPA, we ensure you are notified of the purposes for collecting this data and obtain your consent where required.</li>
                    <li><strong>Professional and Business Information:</strong> Founders may upload business plans, pitch decks, financial projections, resumes, or other business-related documents. Investors and talent may provide investment criteria, professional experience, skills, endorsements, or financial preferences. You can choose to include sensitive information, but we advise against posting unnecessary personal details publicly. You are responsible for any data, including business plans or financial details, that you choose to share or publish on your profile or with other users. We obtain explicit consent for processing sensitive personal data, such as financial details, as required by the PDPA.</li>
                    <li><strong>Financial Information:</strong> If you link payment methods for premium features or transactions (e.g., subscription fees), we collect payment details such as credit/debit card numbers, bank account information, billing address, and transaction history. For matchmaking involving investments, we may collect or infer financial data with your explicit consent, such as investment history or funding requirements, in compliance with the PDPA’s Consent Obligation.</li>
                    <li><strong>Communications and Content:</strong> Messages, connection requests, feedback, and any content you post or share through the Services, including in matches, chats, or forums. You are responsible for the content you share or publish in these interactions.</li>
                    <li><strong>Linked Accounts:</strong> If you connect third-party accounts (e.g., LinkedIn, Google, or financial apps), we collect data like profile information, contacts, or professional networks, subject to your authorization and PDPA’s Notification Obligation.</li>
                  </ul>

                  <h4 className="text-lg font-medium text-foreground pt-2">Information We Collect Automatically</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Device information (e.g., IP address, browser type, operating system), log data (e.g., pages viewed, time spent), and interaction data (e.g., matches made, searches performed).</li>
                    <li><strong>Location Data:</strong> Approximate or precise location (via GPS, IP, or device settings) to facilitate local matchmaking, with options to control this in your device settings. Under the PDPA, we notify you of location data collection purposes and obtain consent where required.</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We use cookies, pixels, web beacons, and other tracking technologies to recognize you across devices, analyze usage, and personalize content. For details, see our Cookie Policy below, which complies with the PDPA’s transparency requirements.</li>
                  </ul>

                   <h4 className="text-lg font-medium text-foreground pt-2">Information from Others</h4>
                   <ul className="list-disc pl-6 space-y-2">
                      <li>Data from matches or connections (e.g., endorsements, referrals, or shared business plans).</li>
                      <li>Aggregated or anonymized data from partners for analytics, ensuring compliance with the PDPA’s Protection Obligation.</li>
                   </ul>
                   <p>We do not collect information from children under 18, and our Services are not intended for them (see Section 8). The PDPA does not apply to business contact information (e.g., name, business title, business email) or data of deceased individuals (for over 10 years), and we align our practices accordingly.</p>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h3>
                    <p>We use your information to operate and enhance our Services, based on legal grounds such as your consent, contractual necessity, legitimate interests (e.g., fraud prevention), or legal obligations, as permitted under the PDPA, GDPR, and other laws.</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Providing and Personalizing Services:</strong> To create profiles, suggest matches (e.g., connecting founders with compatible investors or talent based on profiles, location, and algorithms), facilitate communications, and enable features like virtual meetings or document sharing, in line with the PDPA’s Purpose Limitation Obligation.</li>
                        <li><strong>Matchmaking and Networking:</strong> Analyze professional data, business plans, and financial preferences to predict compatibility and recommend opportunities, with your explicit consent for sharing sensitive details like financial information or business plans during matches, as required by the PDPA’s Consent Obligation.</li>
                        <li><strong>Safety and Security:</strong> Verify identities, monitor for violations of our terms, detect fraud (e.g., using transaction patterns or automated systems), and prevent unauthorized access, fulfilling the PDPA’s Protection Obligation.</li>
                        <li><strong>Payments and Financial Services:</strong> Process transactions, manage subscriptions, and, with explicit consent, facilitate investment-related disclosures (e.g., sharing funding needs with investors).</li>
                        <li><strong>Communications:</strong> Send service updates, security alerts, and promotional messages (e.g., about new features or events), with opt-out options for marketing in compliance with the PDPA’s Do Not Call (DNC) Registry provisions.</li>
                        <li><strong>Analytics and Improvement:</strong> Conduct research, develop insights (e.g., workforce trends in startups), and improve algorithms, using aggregated data where possible, as permitted under the PDPA’s Accountability Obligation.</li>
                        <li><strong>Advertising and Marketing:</strong> Target ads based on your interests and usage, without sharing personal data with advertisers except in hashed form or with consent, ensuring compliance with the PDPA’s Notification Obligation.</li>
                        <li><strong>Compliance and Legal Purposes:</strong> Fulfill legal requirements, such as anti-money laundering (AML) checks, tax reporting, or responding to authorities, as required by the PDPA and other laws.</li>
                    </ul>
                    <p>For sensitive data like financial information or business plans, we require your explicit consent before processing or sharing, which you can withdraw at any time via account settings, as supported by the PDPA’s consent withdrawal provisions.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3. Sharing Your Information</h3>
                  <p>We share your information only as necessary and with safeguards in place, such as contracts requiring data protection, in compliance with the PDPA’s Transfer Limitation Obligation.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>With Other Users:</strong> In matches, we share profile details, business plans, or financial information you consent to disclose (e.g., a founder sharing a pitch deck with an investor). You control visibility through privacy settings. You are responsible for the data you choose to share with other users, including in profiles, messages, or matchmaking interactions. We ensure compliance with the PDPA’s Consent and Notification Obligations before sharing.</li>
                    <li><strong>Service Providers:</strong> With third-party vendors (data intermediaries under the PDPA) for functions like payment processing (e.g., Stripe), identity verification, cloud storage, analytics, or customer support. These providers are bound by strict confidentiality and data protection agreements, meeting the PDPA’s requirements for data intermediaries.</li>
                    <li><strong>Affiliates and Partners:</strong> Within our corporate group or with financial partners for fraud prevention or service enhancement, ensuring equivalent privacy protections as required by the PDPA.</li>
                    <li><strong>For Legal Reasons:</strong> To comply with laws, prevent harm, enforce terms, or in response to subpoenas, with discretion to disclose if we believe it’s necessary, as permitted under the PDPA.</li>
                    <li><strong>Business Transfers:</strong> In mergers, acquisitions, or asset sales, your data may be transferred, with notice provided, in line with PDPA guidelines.</li>
                    <li><strong>Aggregated Data:</strong> Non-identifiable insights shared for research or marketing, ensuring no personal data is disclosed.</li>
                  </ul>
                  <p>We do not sell your personal data. For financial information, sharing requires your explicit consent, and we use mechanisms like standard contractual clauses for international transfers to ensure a comparable level of protection as required by the PDPA’s Transfer Limitation Obligation.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4. Cookie Policy</h3>
                  <p>We use cookies and similar technologies (e.g., web beacons, pixels, and device identifiers) to enhance your experience, analyze usage, and deliver personalized content. This Cookie Policy, aligned with PDPA guidelines, explains how we use these technologies and your choices.</p>
                   <h4 className="text-lg font-medium text-foreground pt-2">Types of Cookies We Use</h4>
                   <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Essential Cookies:</strong> Necessary for the Services to function, such as maintaining your login session, securing your account, and enabling core features like matchmaking. These cannot be disabled, as they are critical to service delivery.</li>
                      <li><strong>Performance Cookies:</strong> Collect anonymized data on how you use our Services (e.g., pages visited, time spent) to improve performance and user experience. Examples include Google Analytics cookies.</li>
                      <li><strong>Functionality Cookies:</strong> Enable enhanced features, like remembering your preferences (e.g., language or location settings) or customizing your interface.</li>
                      <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads and track ad performance. We may share hashed, non-identifiable data with ad partners to personalize ads across devices, with your consent.</li>
                      <li><strong>Social Media Cookies:</strong> Allow integration with platforms like LinkedIn for account linking or sharing, subject to your consent and the third party’s privacy policy.</li>
                   </ul>
                   <h4 className="text-lg font-medium text-foreground pt-2">How We Use Cookies</h4>
                   <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Authentication:</strong> Recognize you when you log in and ensure secure access.</li>
                      <li><strong>Personalization:</strong> Tailor match suggestions and content based on your interactions and profile.</li>
                      <li><strong>Analytics:</strong> Measure traffic, identify popular features, and optimize Services.</li>
                      <li><strong>Advertising:</strong> Show targeted ads on and off our Services, ensuring relevance without sharing personal data directly with advertisers.</li>
                   </ul>
                   <h4 className="text-lg font-medium text-foreground pt-2">Managing Cookies</h4>
                   <p>Under the PDPA, we notify you of cookie usage purposes and obtain consent for non-essential cookies. You can control cookies through:</p>
                   <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Cookie Consent Banner:</strong> On your first visit, choose which non-essential cookies to allow. Update preferences anytime via the "Manage Cookies" link at okidex.com/cookies.</li>
                      <li><strong>Browser Settings:</strong> Block or delete cookies, though this may affect functionality (e.g., logging you out). Instructions are available for browsers like Chrome, Firefox, or Safari.</li>
                      <li><strong>Device Settings:</strong> Adjust tracking settings (e.g., “Limit Ad Tracking” on iOS or “Opt Out of Ads Personalization” on Android).</li>
                      <li><strong>Third-Party Opt-Outs:</strong> Visit sites like youronlinechoices.eu (EU) or optout.networkadvertising.org (US) for ad network opt-outs.</li>
                   </ul>
                   <h4 className="text-lg font-medium text-foreground pt-2">Third-Party Cookies</h4>
                   <p>Some cookies are set by partners (e.g., analytics or ad providers). These are governed by their privacy policies, and we ensure they meet PDPA standards. For example, Google Analytics uses anonymized data, and we do not share identifiable information with ad partners without consent.</p>
                   <p>We retain cookie data for up to 13 months, unless required for legal purposes or deleted earlier at your request, in line with the PDPA’s Retention Limitation Obligation. For more details, contact us at wilfred@okidex.com.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5. Data Security and Retention</h3>
                  <p>We implement reasonable security measures, including encryption, firewalls, and access controls, to protect against unauthorized access, loss, or misuse, fulfilling the PDPA’s Protection Obligation. However, no system is completely secure, so we cannot guarantee absolute security.</p>
                  <p>We retain data as needed for the purposes described, in compliance with the PDPA’s Retention Limitation Obligation:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Profile data:</strong> Until account deletion, plus up to 28 days for restoration.</li>
                    <li><strong>Financial and transaction data:</strong> For audit, tax, or legal purposes (e.g., 7 years).</li>
                    <li><strong>Verification data:</strong> Up to 3 years for fraud prevention.</li>
                    <li><strong>Cookie data:</strong> Up to 13 months, as noted above.</li>
                  </ul>
                  <p>Upon account deletion, we anonymize or delete data, though shared content may remain visible to others. You can request deletion via settings, as supported by the PDPA’s Access and Correction Obligation.</p>
                  <p>In the event of a data breach likely to result in significant harm or affecting a significant number of individuals, we will notify the PDPC and affected individuals within 3 calendar days of assessment, as required by the PDPA’s Data Breach Notification Obligation.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6. Your Rights and Choices</h3>
                  <p>We empower you to control your data, in line with the PDPA, GDPR, and CCPA:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access and Correction:</strong> View, edit, or export your information via account settings. Under the PDPA, you can request access to your personal data and information about its use or disclosure within the past year, and request corrections to errors or omissions.</li>
                    <li><strong>Deletion:</strong> Request data deletion, subject to legal retention requirements, as supported by the PDPA.</li>
                    <li><strong>Opt-Outs:</strong> Withdraw consent for marketing, location sharing, cookies, or data processing (e.g., for matching algorithms) at any time, with notification of consequences as required by the PDPA.</li>
                    <li><strong>Do Not Sell/Share:</strong> Under CCPA, opt out of data sales (though we do not sell data).</li>
                    <li><strong>GDPR and PDPA Rights:</strong> If in the EU/EEA/UK or Singapore, exercise rights to access, rectify, erase, restrict, or object to processing, or data portability. For Singapore residents, contact the PDPC for complaints about data misuse.</li>
                    <li><strong>Cookie Controls:</strong> Manage via the Cookie Consent Banner, browser settings, or our Cookie Policy page.</li>
                    <li><strong>Financial Consent:</strong> Specifically revoke consent for sharing financial info or business plans.</li>
                    <li><strong>DNC Registry:</strong> Opt out of telemarketing by registering your Singapore telephone number with the PDPA’s Do Not Call Registry.</li>
                  </ul>
                  <p>To exercise rights, contact our Data Protection Officer (DPO), as required by the PDPA’s Accountability Obligation, at wilfred@okidex.com. We respond within applicable timeframes (e.g., 30 days under CCPA and PDPA). For complaints, Singapore residents can contact the PDPC at 10 Pasir Panjang Road, #03-01, Mapletree Business City, Singapore 117438.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7. International Data Transfers</h3>
                  <p>We operate globally and may transfer data to countries outside your residence, including the US. For transfers outside Singapore, we ensure the recipient provides a comparable level of protection as required by the PDPA’s Transfer Limitation Obligation, using mechanisms like standard contractual clauses or binding corporate rules, which also align with GDPR requirements.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">8. Children's Privacy</h3>
                  <p>Our Services are for users 18 and older. We do not knowingly collect data from children under 18. If we learn of such collection, we will delete it promptly, in line with the PDPA. Parents can contact us for assistance.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">9. Changes to This Policy</h3>
                  <p>We may update this Policy to reflect changes in our practices or laws. We will notify you of significant changes via email, in-app notification, or by posting the updated Policy, as required by the PDPA’s Accountability Obligation.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">10. Contact Us</h3>
                  <p>For questions or concerns, contact our Data Protection Officer, as mandated by the PDPA, at:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email:</strong> wilfred@okidex.com</li>
                    <li><strong>Mail:</strong> Okidex, Inc., [Address], USA</li>
                  </ul>
                  <p>For Singapore residents, you may also contact the Personal Data Protection Commission at:</p>
                   <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Address:</strong> 10 Pasir Panjang Road, #03-01, Mapletree Business City, Singapore 117438</li>
                    <li><strong>Website:</strong> www.pdpc.gov.sg</li>
                  </ul>
                  <p>Thank you for trusting Okidex with your information. We are committed to your privacy as we build meaningful connections in the startup ecosystem, in full compliance with the PDPA and other applicable laws.</p>
                </div>
            </CardContent>
        </>
    );
}
