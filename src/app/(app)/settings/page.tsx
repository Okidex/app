{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red91\green47\blue214;\red38\green59\blue169;\red196\green100\blue30;\red93\green93\blue93;
}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;\cssrgb\c81569\c47059\c14902;\cssrgb\c43922\c43922\c43922;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  Link \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/link"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button, buttonVariants \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ cn \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/utils"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ ExternalLink, Loader2, Star \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Input \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/input"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Label \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/label"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useToast \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/hooks/use-toast"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/alert-dialog"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ getCurrentUser \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/data"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ FounderProfile \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/types"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 SettingsPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  \{ \cf7 \strokec7 toast\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useToast\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 user\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 getCurrentUser\cf4 \strokec4 ()\cf5 \strokec5 !\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 isDeleting\cf4 \strokec4 , \cf7 \strokec7 setIsDeleting\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3   \cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isPremiumFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isFounder \cf5 \strokec5 &&\cf4 \strokec4  (user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FounderProfile\cf4 \strokec4 ).isPremium;\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleSaveChanges\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf8 \strokec8 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 FormEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLFormElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     e.\cf6 \strokec6 preventDefault\cf4 \strokec4 ();\cb1 \
\cb3     \cf6 \strokec6 toast\cf4 \strokec4 (\{\cb1 \
\cb3       title: \cf2 \strokec2 "Settings Saved"\cf4 \strokec4 ,\cb1 \
\cb3       description: \cf2 \strokec2 "Your login and security settings have been updated."\cf4 \strokec4 ,\cb1 \
\cb3     \});\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleDeleteAccount\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 setIsDeleting\cf4 \strokec4 (\cf7 \strokec7 true\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 await\cf4 \strokec4  \cf5 \strokec5 new\cf4 \strokec4  \cf7 \strokec7 Promise\cf4 \strokec4 (\cf8 \strokec8 resolve\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \cf6 \strokec6 setTimeout\cf4 \strokec4 (resolve, \cf7 \strokec7 2000\cf4 \strokec4 ));\cb1 \
\cb3     \cf9 \cb3 \strokec9 // In a real app, you would redirect to a logged-out state.\cf4 \cb1 \strokec4 \
\cb3     \cf9 \cb3 \strokec9 // For now, we just show a toast.\cf4 \cb1 \strokec4 \
\cb3     \cf6 \strokec6 setIsDeleting\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3     \cf6 \strokec6 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Account Deletion Initiated"\cf4 \strokec4 ,\cb1 \
\cb3         description: \cf2 \strokec2 "Your account is scheduled for deletion. You will be logged out."\cf4 \strokec4 ,\cb1 \
\cb3         variant: \cf2 \strokec2 "destructive"\cf4 \strokec4 ,\cb1 \
\cb3     \});\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3        <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 h1\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-2xl font-bold font-headline"\cf4 \strokec4 >Settings</\cf2 \strokec2 h1\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >Manage your account settings and view legal agreements.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       \cb1 \
\cb3        \{isFounder \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3          <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Oki+ Subscription</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                 \{isPremiumFounder \cb1 \
\cb3                     \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "You are an Oki+ member. Manage your subscription and payment details."\cf4 \cb1 \strokec4 \
\cb3                     \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "Upgrade to Oki+ to unlock premium features and accelerate your startup's growth."\cf4 \cb1 \strokec4 \
\cb3                 \}\cb1 \
\cb3               </\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 Button\cf4 \strokec4  \cf6 \strokec6 asChild\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 Link\cf4 \strokec4  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 "/settings/billing"\cf4 \strokec4 >\cb1 \
\cb3                         \{isPremiumFounder \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "Manage Subscription"\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "Upgrade to Oki+"\cf4 \strokec4 \}\cb1 \
\cb3                         \{\cf5 \strokec5 !\cf4 \strokec4 isPremiumFounder \cf5 \strokec5 &&\cf4 \strokec4  <\cf7 \strokec7 Star\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "ml-2 h-4 w-4"\cf4 \strokec4  />\}\cb1 \
\cb3                     </\cf7 \strokec7 Link\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 Button\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3         </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3       )\}\cb1 \
\
\
\cb3        <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 form\cf4 \strokec4  \cf6 \strokec6 onSubmit\cf5 \strokec5 =\cf4 \strokec4 \{handleSaveChanges\}>\cb1 \
\cb3           <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Login & Security</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3               Update your email and password.\cb1 \
\cb3             </\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardContent\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-4"\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \strokec4 >Email Address</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{user.email\} />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "current-password"\cf4 \strokec4 >Current Password</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "current-password"\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "password"\cf4 \strokec4  />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "new-password"\cf4 \strokec4 >New Password</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3               <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "new-password"\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "password"\cf4 \strokec4  />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardFooter\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 Button\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "submit"\cf4 \strokec4 >Save Changes</\cf7 \strokec7 Button\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 CardFooter\cf4 \strokec4 >\cb1 \
\cb3         </\cf2 \strokec2 form\cf4 \strokec4 >\cb1 \
\cb3       </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\
\cb3       <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Legal Agreements</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3             Below are the terms and policies that govern your use of Okidex.\cb1 \
\cb3           </\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3         </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 CardContent\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-4"\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 Link\cf4 \strokec4  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 "/legal/user-agreement"\cf4 \strokec4  \cf6 \strokec6 target\cf5 \strokec5 =\cf2 \strokec2 "_blank"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf6 \strokec6 cn\cf4 \strokec4 (\cf6 \strokec6 buttonVariants\cf4 \strokec4 (\{ variant: \cf2 \strokec2 "outline"\cf4 \strokec4  \}), \cf2 \strokec2 "w-full justify-between"\cf4 \strokec4 )\}>\cb1 \
\cb3                 Okidex User Agreement\cb1 \
\cb3                 <\cf7 \strokec7 ExternalLink\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-4 h-4"\cf4 \strokec4  />\cb1 \
\cb3             </\cf7 \strokec7 Link\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 Link\cf4 \strokec4  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 "/legal/privacy-policy"\cf4 \strokec4  \cf6 \strokec6 target\cf5 \strokec5 =\cf2 \strokec2 "_blank"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf6 \strokec6 cn\cf4 \strokec4 (\cf6 \strokec6 buttonVariants\cf4 \strokec4 (\{ variant: \cf2 \strokec2 "outline"\cf4 \strokec4  \}), \cf2 \strokec2 "w-full justify-between"\cf4 \strokec4 )\}>\cb1 \
\cb3                 Okidex Privacy Policy\cb1 \
\cb3                 <\cf7 \strokec7 ExternalLink\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-4 h-4"\cf4 \strokec4  />\cb1 \
\cb3             </\cf7 \strokec7 Link\cf4 \strokec4 >\cb1 \
\cb3         </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3       </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\
\cb3        <\cf7 \strokec7 Card\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "border-destructive"\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Danger Zone</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3               These actions are permanent and cannot be undone.\cb1 \
\cb3             </\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 AlertDialog\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 AlertDialogTrigger\cf4 \strokec4  \cf6 \strokec6 asChild\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 Button\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "destructive"\cf4 \strokec4 >Delete Account</\cf7 \strokec7 Button\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 AlertDialogTrigger\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 AlertDialogContent\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 AlertDialogHeader\cf4 \strokec4 >\cb1 \
\cb3                         <\cf7 \strokec7 AlertDialogTitle\cf4 \strokec4 >Are you absolutely sure?</\cf7 \strokec7 AlertDialogTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf7 \strokec7 AlertDialogDescription\cf4 \strokec4 >\cb1 \
\cb3                             This action cannot be undone. This will permanently delete your account and remove your data from our servers.\cb1 \
\cb3                         </\cf7 \strokec7 AlertDialogDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf7 \strokec7 AlertDialogHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 AlertDialogFooter\cf4 \strokec4 >\cb1 \
\cb3                         <\cf7 \strokec7 AlertDialogCancel\cf4 \strokec4  \cf6 \strokec6 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isDeleting\}>Cancel</\cf7 \strokec7 AlertDialogCancel\cf4 \strokec4 >\cb1 \
\cb3                         <\cf7 \strokec7 AlertDialogAction\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{handleDeleteAccount\} \cf6 \strokec6 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isDeleting\}>\cb1 \
\cb3                             \{isDeleting \cf5 \strokec5 &&\cf4 \strokec4  <\cf7 \strokec7 Loader2\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4 animate-spin"\cf4 \strokec4  />\}\cb1 \
\cb3                             \{isDeleting \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "Deleting..."\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "Continue"\cf4 \strokec4 \}\cb1 \
\cb3                         </\cf7 \strokec7 AlertDialogAction\cf4 \strokec4 >\cb1 \
\cb3                     </\cf7 \strokec7 AlertDialogFooter\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 AlertDialogContent\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 AlertDialog\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3       </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}