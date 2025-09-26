{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red181\green26\blue70;\red255\green255\blue255;
\red14\green106\blue57;\red91\green47\blue214;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf2 \strokec2  Link \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'next/link'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ Button \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/components/ui/button'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/components/ui/card'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ ArrowRight, Briefcase, Lightbulb, Users \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'lucide-react'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  Logo \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/components/logo'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ getCurrentUser \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/lib/data'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ redirect \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'next/navigation'\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 export\cf2 \strokec2  \cf3 \strokec3 default\cf2 \strokec2  \cf3 \strokec3 async\cf2 \strokec2  \cf3 \strokec3 function\cf2 \strokec2  \cf6 \strokec6 HomePage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 user\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf3 \strokec3 await\cf2 \strokec2  \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ();\cb1 \
\cb4   \cf3 \strokec3 if\cf2 \strokec2  (user) \{\cb1 \
\cb4     \cf6 \strokec6 redirect\cf2 \strokec2 (\cf5 \strokec5 '/dashboard'\cf2 \strokec2 );\cb1 \
\cb4   \}\cb1 \
\cb4   \cb1 \
\cb4   \cf3 \strokec3 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "flex flex-col min-h-screen bg-background"\cf2 \strokec2 >\cb1 \
\cb4       <\cf5 \strokec5 header\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"\cf2 \strokec2 >\cb1 \
\cb4         <\cf7 \strokec7 Logo\cf2 \strokec2  />\cb1 \
\cb4         <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "flex items-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4           <\cf7 \strokec7 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf3 \strokec3 =\cf5 \strokec5 "ghost"\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4             <\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf3 \strokec3 =\cf5 \strokec5 "/login"\cf2 \strokec2 >Log In</\cf7 \strokec7 Link\cf2 \strokec2 >\cb1 \
\cb4           </\cf7 \strokec7 Button\cf2 \strokec2 >\cb1 \
\cb4           <\cf7 \strokec7 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4             <\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf3 \strokec3 =\cf5 \strokec5 "/register"\cf2 \strokec2 >Sign Up</\cf7 \strokec7 Link\cf2 \strokec2 >\cb1 \
\cb4           </\cf7 \strokec7 Button\cf2 \strokec2 >\cb1 \
\cb4         </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 header\cf2 \strokec2 >\cb1 \
\cb4       <\cf5 \strokec5 main\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 section\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28"\cf2 \strokec2 >\cb1 \
\cb4           <\cf5 \strokec5 h1\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline"\cf2 \strokec2 >\cb1 \
\cb4             The Nexus for Innovation and Investment\cb1 \
\cb4           </\cf5 \strokec5 h1\cf2 \strokec2 >\cb1 \
\cb4           <\cf5 \strokec5 p\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"\cf2 \strokec2 >\cb1 \
\cb4             Okidex is the premier platform where visionary founders, astute investors, and exceptional talent converge to build the future.\cb1 \
\cb4           </\cf5 \strokec5 p\cf2 \strokec2 >\cb1 \
\cb4         </\cf5 \strokec5 section\cf2 \strokec2 >\cb1 \
\
\cb4         <\cf5 \strokec5 section\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "bg-secondary/50 py-20 md:py-28"\cf2 \strokec2 >\cb1 \
\cb4             <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "container mx-auto px-4 sm:px-6 lg:px-8"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf5 \strokec5 h2\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-3xl md:text-4xl font-bold text-center mb-6 font-headline"\cf2 \strokec2 >Where Ideas Connect</\cf5 \strokec5 h2\cf2 \strokec2 >\cb1 \
\cb4                 <\cf5 \strokec5 p\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12"\cf2 \strokec2 >\cb1 \
\cb4                 Whether you're building, investing, or contributing, Okidex is your launchpad.\cb1 \
\cb4                 </\cf5 \strokec5 p\cf2 \strokec2 >\cb1 \
\cb4                 <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "grid grid-cols-1 md:grid-cols-3 gap-8"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 Card\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-center"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf7 \strokec7 Lightbulb\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardTitle\cf2 \strokec2 >For Startup Founders</\cf7 \strokec7 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                         Connect with top-tier talent to build your team and engage with investors to secure the capital you need to grow.\cb1 \
\cb4                     </\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf7 \strokec7 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 Card\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-center"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf7 \strokec7 Users\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardTitle\cf2 \strokec2 >For Private Investors</\cf7 \strokec7 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                         Discover exciting startups to deploy funding, expand your GP/LP network, create your own fund, and hire specialized talent.\cb1 \
\cb4                     </\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf7 \strokec7 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 Card\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-center"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf7 \strokec7 Briefcase\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardTitle\cf2 \strokec2 >For Talent & Vendors</\cf7 \strokec7 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                         Join the startup ecosystem as a fractional leader, find a co-founder for your next big idea, or offer your services to innovative startups and investors.\cb1 \
\cb4                     </\cf7 \strokec7 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf7 \strokec7 Card\cf2 \strokec2 >\cb1 \
\cb4                 </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf5 \strokec5 div\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "text-center mt-12"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf7 \strokec7 Button\cf2 \strokec2  \cf6 \strokec6 size\cf3 \strokec3 =\cf5 \strokec5 "lg"\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                         <\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf3 \strokec3 =\cf5 \strokec5 "/register"\cf2 \strokec2 >\cb1 \
\cb4                         Join Okidex <\cf7 \strokec7 ArrowRight\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "ml-2"\cf2 \strokec2  />\cb1 \
\cb4                         </\cf7 \strokec7 Link\cf2 \strokec2 >\cb1 \
\cb4                     </\cf7 \strokec7 Button\cf2 \strokec2 >\cb1 \
\cb4                 </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf5 \strokec5 section\cf2 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 main\cf2 \strokec2 >\cb1 \
\cb4       <\cf5 \strokec5 footer\cf2 \strokec2  \cf6 \strokec6 className\cf3 \strokec3 =\cf5 \strokec5 "container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground"\cf2 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 p\cf2 \strokec2 >\cf7 \strokec7 &copy;\cf2 \strokec2  \{\cf3 \strokec3 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 ().\cf6 \strokec6 getFullYear\cf2 \strokec2 ()\} Okidex. All rights reserved.</\cf5 \strokec5 p\cf2 \strokec2 >\cb1 \
\cb4       </\cf5 \strokec5 footer\cf2 \strokec2 >\cb1 \
\cb4     </\cf5 \strokec5 div\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}