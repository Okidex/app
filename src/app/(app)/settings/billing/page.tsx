{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'react'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/components/ui/button'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/components/ui/card'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ cn \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/lib/utils'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Check, Star \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'lucide-react'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useToast \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/hooks/use-toast'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Badge \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/components/ui/badge'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  Link \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'next/link'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ getCurrentUser \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/lib/data'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ FounderProfile \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/lib/types'\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 features\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf2 \strokec2 "Showcase your startup's profile to investors, start conversations, and fundraise."\cf4 \strokec4 ,\cb1 \
\cb3   \cf2 \strokec2 "Post unlimited job openings."\cf4 \strokec4 ,\cb1 \
\cb3   \cf2 \strokec2 "Access exclusive investment theses."\cf4 \strokec4 ,\cb1 \
\cb3   \cf2 \strokec2 "Priority support."\cf4 \strokec4 ,\cb1 \
\cb3 ];\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf7 \strokec7 BillingPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf6 \strokec6 selectedPlan\cf4 \strokec4 , \cf6 \strokec6 setSelectedPlan\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useState\cf4 \strokec4 <\cf2 \strokec2 'monthly'\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf2 \strokec2 'yearly'\cf4 \strokec4 >(\cf2 \strokec2 'yearly'\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \{ \cf6 \strokec6 toast\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useToast\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 user\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 getCurrentUser\cf4 \strokec4 ()\cf5 \strokec5 !\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 isFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 isPremiumFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isFounder \cf5 \strokec5 &&\cf4 \strokec4  (user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf7 \strokec7 FounderProfile\cf4 \strokec4 ).isPremium;\cb1 \
\
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 handleSubscribe\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf8 \strokec8 plan\cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 'monthly'\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf2 \strokec2 'yearly'\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf7 \strokec7 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Subscription Confirmed!"\cf4 \strokec4 ,\cb1 \
\cb3         description: \cf2 \strokec2 `You have successfully subscribed to the $\{\cf4 \strokec4 plan\cf2 \strokec2 \} Oki+ plan.`\cf4 \cb1 \strokec4 \
\cb3     \});\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 monthlyPrice\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 10\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 yearlyPrice\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 99\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 yearlyMonthlyPrice\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  yearlyPrice \cf5 \strokec5 /\cf4 \strokec4  \cf6 \strokec6 12\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 discount\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  Math.\cf7 \strokec7 round\cf4 \strokec4 ((\cf6 \strokec6 1\cf4 \strokec4  \cf5 \strokec5 -\cf4 \strokec4  (yearlyPrice \cf5 \strokec5 /\cf4 \strokec4  \cf6 \strokec6 12\cf4 \strokec4 ) \cf5 \strokec5 /\cf4 \strokec4  monthlyPrice) \cf5 \strokec5 *\cf4 \strokec4  \cf6 \strokec6 100\cf4 \strokec4 );\cb1 \
\
\cb3   \cf5 \strokec5 if\cf4 \strokec4  (isPremiumFounder) \{\cb1 \
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3           <\cf2 \strokec2 h1\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-2xl font-bold font-headline"\cf4 \strokec4 >Billing</\cf2 \strokec2 h1\cf4 \strokec4 >\cb1 \
\cb3           <\cf2 \strokec2 p\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >You are an Oki+ member. Manage your subscription and payment details.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         \cb1 \
\cb3         <\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3             <\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "flex justify-between items-center"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         <\cf6 \strokec6 CardTitle\cf4 \strokec4 >Your Oki+ Subscription</\cf6 \strokec6 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf6 \strokec6 CardDescription\cf4 \strokec4 >Your current plan is the <\cf2 \strokec2 span\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 'font-bold'\cf4 \strokec4 >Yearly Plan</\cf2 \strokec2 span\cf4 \strokec4 >. It will renew on July 21, 2025.</\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                      <\cf6 \strokec6 Badge\cf4 \strokec4 >Active</\cf6 \strokec6 Badge\cf4 \strokec4 >\cb1 \
\cb3                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             </\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf2 \strokec2 p\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 'text-sm text-muted-foreground'\cf4 \strokec4 >Manage your subscription, view invoices, and update your payment method through our secure payment provider, Stripe.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3             </\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3             <\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                  <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 asChild\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 Link\cf4 \strokec4  \cf7 \strokec7 href\cf5 \strokec5 =\cf2 \strokec2 "https://billing.stripe.com/p/login/test_7sI5m4bZJg0V8EMcMM"\cf4 \strokec4  \cf7 \strokec7 target\cf5 \strokec5 =\cf2 \strokec2 "_blank"\cf4 \strokec4 >Manage Subscription in Stripe</\cf6 \strokec6 Link\cf4 \strokec4 >\cb1 \
\cb3                 </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3             </\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3         </\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     )\cb1 \
\cb3   \}\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 h1\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-2xl font-bold font-headline"\cf4 \strokec4 >Billing</\cf2 \strokec2 h1\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 p\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >Manage your subscription and payment details.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       \cb1 \
\cb3       <\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 CardHeader\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-center"\cf4 \strokec4 >\cb1 \
\cb3               <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "mx-auto bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-4"\cf4 \strokec4 >\cb1 \
\cb3                   <\cf6 \strokec6 Star\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-6 h-6"\cf4 \strokec4  />\cb1 \
\cb3               </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3               <\cf6 \strokec6 CardTitle\cf4 \strokec4 >Oki+ Subscription</\cf6 \strokec6 CardTitle\cf4 \strokec4 >\cb1 \
\cb3               <\cf6 \strokec6 CardDescription\cf4 \strokec4 >Unlock premium features to accelerate your startup's growth.</\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 CardContent\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-8 max-w-2xl mx-auto"\cf4 \strokec4 >\cb1 \
\cb3                <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "border bg-secondary/50 rounded-lg p-6"\cf4 \strokec4 >\cb1 \
\cb3                   <\cf2 \strokec2 h3\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-lg font-semibold mb-4"\cf4 \strokec4 >Oki+ Features</\cf2 \strokec2 h3\cf4 \strokec4 >\cb1 \
\cb3                   <\cf2 \strokec2 ul\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-3"\cf4 \strokec4 >\cb1 \
\cb3                       \{features.\cf7 \strokec7 map\cf4 \strokec4 ((\cf8 \strokec8 feature\cf4 \strokec4 , \cf8 \strokec8 i\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                           <\cf2 \strokec2 li\cf4 \strokec4  \cf7 \strokec7 key\cf5 \strokec5 =\cf4 \strokec4 \{i\} \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-start"\cf4 \strokec4 >\cb1 \
\cb3                               <\cf6 \strokec6 Check\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"\cf4 \strokec4  />\cb1 \
\cb3                               <\cf2 \strokec2 span\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-sm text-muted-foreground"\cf4 \strokec4 >\{feature\}</\cf2 \strokec2 span\cf4 \strokec4 >\cb1 \
\cb3                           </\cf2 \strokec2 li\cf4 \strokec4 >\cb1 \
\cb3                       ))\}\cb1 \
\cb3                   </\cf2 \strokec2 ul\cf4 \strokec4 >\cb1 \
\cb3               </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3               \cb1 \
\cb3               <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-1 md:grid-cols-2 gap-6"\cf4 \strokec4 >\cb1 \
\cb3                   <\cf6 \strokec6 Card\cf4 \strokec4  \cb1 \
\cb3                     \cf7 \strokec7 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf7 \strokec7 cn\cf4 \strokec4 (\cf2 \strokec2 "relative cursor-pointer"\cf4 \strokec4 , selectedPlan \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'monthly'\cf4 \strokec4  \cf5 \strokec5 &&\cf4 \strokec4  \cf2 \strokec2 "border-primary ring-2 ring-primary"\cf4 \strokec4 )\}\cb1 \
\cb3                     \cf7 \strokec7 onClick\cf5 \strokec5 =\cf4 \strokec4 \{() \cf5 \strokec5 =>\cf4 \strokec4  \cf7 \strokec7 setSelectedPlan\cf4 \strokec4 (\cf2 \strokec2 'monthly'\cf4 \strokec4 )\}\cb1 \
\cb3                   >\cb1 \
\cb3                       <\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                           <\cf6 \strokec6 CardTitle\cf4 \strokec4 >Monthly Plan</\cf6 \strokec6 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                           <\cf6 \strokec6 CardDescription\cf4 \strokec4 >Flexibility for short-term needs.</\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3                           <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-4xl font-bold"\cf4 \strokec4 >$\{monthlyPrice\}<\cf2 \strokec2 span\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-lg font-normal text-muted-foreground"\cf4 \strokec4 >/month</\cf2 \strokec2 span\cf4 \strokec4 ></\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                           <\cf2 \strokec2 p\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-sm text-muted-foreground"\cf4 \strokec4 >billed monthly, $120 a year</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                           <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-full"\cf4 \strokec4  \cf7 \strokec7 asChild\cf4 \strokec4  \cf7 \strokec7 disabled\cf5 \strokec5 =\cf4 \strokec4 \{selectedPlan \cf5 \strokec5 !==\cf4 \strokec4  \cf2 \strokec2 'monthly'\cf4 \strokec4 \}>\cb1 \
\cb3                             <\cf6 \strokec6 Link\cf4 \strokec4  \cf7 \strokec7 href\cf5 \strokec5 =\cf2 \strokec2 "https://buy.stripe.com/eVq8wOcAI8hsf1R36P8AE01"\cf4 \strokec4 >Choose Monthly</\cf6 \strokec6 Link\cf4 \strokec4 >\cb1 \
\cb3                           </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                   </\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3                   <\cf6 \strokec6 Card\cf4 \strokec4  \cb1 \
\cb3                     \cf7 \strokec7 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf7 \strokec7 cn\cf4 \strokec4 (\cf2 \strokec2 "relative cursor-pointer"\cf4 \strokec4 , selectedPlan \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'yearly'\cf4 \strokec4  \cf5 \strokec5 &&\cf4 \strokec4  \cf2 \strokec2 "border-primary ring-2 ring-primary"\cf4 \strokec4 )\}\cb1 \
\cb3                     \cf7 \strokec7 onClick\cf5 \strokec5 =\cf4 \strokec4 \{() \cf5 \strokec5 =>\cf4 \strokec4  \cf7 \strokec7 setSelectedPlan\cf4 \strokec4 (\cf2 \strokec2 'yearly'\cf4 \strokec4 )\}\cb1 \
\cb3                   >\cb1 \
\cb3                       <\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                           <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "flex justify-between items-center"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf6 \strokec6 CardTitle\cf4 \strokec4 >Yearly Plan</\cf6 \strokec6 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf6 \strokec6 CardDescription\cf4 \strokec4 >Best value for long-term growth.</\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf6 \strokec6 Badge\cf4 \strokec4  \cf7 \strokec7 variant\cf5 \strokec5 =\cf2 \strokec2 "destructive"\cf4 \strokec4 >Save \{discount\}%</\cf6 \strokec6 Badge\cf4 \strokec4 >\cb1 \
\cb3                           </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3                           <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-4xl font-bold"\cf4 \strokec4 >$\{yearlyMonthlyPrice.\cf7 \strokec7 toFixed\cf4 \strokec4 (\cf6 \strokec6 2\cf4 \strokec4 )\}<\cf2 \strokec2 span\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-lg font-normal text-muted-foreground"\cf4 \strokec4 >/month</\cf2 \strokec2 span\cf4 \strokec4 ></\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                           <\cf2 \strokec2 p\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-sm text-muted-foreground"\cf4 \strokec4 >Billed as $\{yearlyPrice\} per year.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                           <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-full"\cf4 \strokec4  \cf7 \strokec7 asChild\cf4 \strokec4  \cf7 \strokec7 disabled\cf5 \strokec5 =\cf4 \strokec4 \{selectedPlan \cf5 \strokec5 !==\cf4 \strokec4  \cf2 \strokec2 'yearly'\cf4 \strokec4 \}>\cb1 \
\cb3                               <\cf6 \strokec6 Link\cf4 \strokec4  \cf7 \strokec7 href\cf5 \strokec5 =\cf2 \strokec2 "https://buy.stripe.com/cNi9ASeIQbtE7zp36P8AE02"\cf4 \strokec4 >Choose Yearly</\cf6 \strokec6 Link\cf4 \strokec4 >\cb1 \
\cb3                           </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3                       </\cf6 \strokec6 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                   </\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3               </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3       </\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}