{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;\red93\green93\blue93;
}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;\cssrgb\c43922\c43922\c43922;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use client"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useState, useRef, useMemo, useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile, UserRole \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Check, DollarSign, MessageCircle, TrendingUp, X, Briefcase, BrainCircuit, UserCheck \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Image \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/image"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Badge \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/badge"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Tabs, TabsList, TabsTrigger \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/tabs"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, getDocs, query, where \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 formatCurrency\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 value\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 number\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 if\cf2 \strokec2  (value \cf5 \strokec5 >=\cf2 \strokec2  \cf8 \strokec8 1000000\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 `$$\{(\cf2 \strokec2 value\cf3 \strokec3  \cf5 \strokec5 /\cf3 \strokec3  \cf8 \strokec8 1000000\cf3 \strokec3 ).\cf6 \strokec6 toFixed\cf3 \strokec3 (\cf8 \strokec8 1\cf3 \strokec3 )\}M`\cf2 \strokec2 ;\cb1 \
\cb4     \}\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (value \cf5 \strokec5 >=\cf2 \strokec2  \cf8 \strokec8 1000\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 `$$\{(\cf2 \strokec2 value\cf3 \strokec3  \cf5 \strokec5 /\cf3 \strokec3  \cf8 \strokec8 1000\cf3 \strokec3 ).\cf6 \strokec6 toFixed\cf3 \strokec3 (\cf8 \strokec8 0\cf3 \strokec3 )\}k`\cf2 \strokec2 ;\cb1 \
\cb4     \}\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 `$$\{\cf2 \strokec2 value\cf3 \strokec3 \}`\cf2 \strokec2 ;\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 FounderCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 startup\cf2 \strokec2 , \cf7 \strokec7 style\cf2 \strokec2 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 startup\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 , \cf7 \strokec7 style\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 CSSProperties\cf2 \strokec2 , [\cf7 \strokec7 key\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ]\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 startup) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{style\} \{\cf5 \strokec5 ...\cf2 \strokec2 props\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2 >Startup not found.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{style\} \{\cf5 \strokec5 ...\cf2 \strokec2 props\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center text-center p-6 border-b"\cf2 \strokec2 >\cb1 \
\cb4                  <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 96\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 96\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "rounded-full border-4 border-background bg-background mb-4"\cf2 \strokec2  \cf6 \strokec6 data-ai-hint\cf5 \strokec5 =\cf3 \strokec3 "logo"\cf2 \strokec2  />\cb1 \
\cb4                  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h3\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold"\cf2 \strokec2 >\{startup.companyName\}</\cf3 \strokec3 h3\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-md text-muted-foreground whitespace-normal"\cf2 \strokec2 >\{startup.tagline\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                  </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 flex flex-col justify-between p-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                      <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-center gap-2 mb-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{startup.industry\}</\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\{startup.stage\}</\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground mb-4 line-clamp-3 text-center"\cf2 \strokec2 >\cb1 \
\cb4                         \{startup.description\}\cb1 \
\cb4                     </\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-2 gap-4 text-sm"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 DollarSign\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-bold"\cf2 \strokec2 >\{\cf6 \strokec6 formatCurrency\cf2 \strokec2 (startup.financials.revenue)\}</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xs text-muted-foreground"\cf2 \strokec2 >Revenue (Ann.)</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 TrendingUp\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-bold"\cf2 \strokec2 >\{\cf6 \strokec6 formatCurrency\cf2 \strokec2 (startup.financials.monthlyRecurringRevenue)\}</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xs text-muted-foreground"\cf2 \strokec2 >MRR</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                  <\cf8 \strokec8 CardFooter\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-0 mt-4"\cf2 \strokec2 >\cb1 \
\cb4                      <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-3 w-full p-3 bg-secondary/50 rounded-lg"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-12 h-12"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-semibold"\cf2 \strokec2 >\{user.name\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >\{profile.title\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 CardFooter\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4     )\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 GenericUserCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 style\cf2 \strokec2 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 style\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 CSSProperties\cf2 \strokec2 , [\cf7 \strokec7 key\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ]\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getProfileInfo\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ;\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4                 title: \cf3 \strokec3 'Investor'\cf2 \strokec2 ,\cb1 \
\cb4                 badges: profile.investmentInterests.\cf6 \strokec6 slice\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 , \cf8 \strokec8 2\cf2 \strokec2 ),\cb1 \
\cb4                 description: profile.thesis,\cb1 \
\cb4                 icon: DollarSign\cb1 \
\cb4             \};\cb1 \
\cb4         \}\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isCoFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  profile.isSeekingCoFounder;\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4                 title: isCoFounder \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 'Seeking Co-founder Role'\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 'Talent for Hire'\cf2 \strokec2 ,\cb1 \
\cb4                 badges: profile.skills?.\cf6 \strokec6 slice\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 , \cf8 \strokec8 2\cf2 \strokec2 ) \cf5 \strokec5 ||\cf2 \strokec2  [],\cb1 \
\cb4                 description: profile.experience,\cb1 \
\cb4                 icon: isCoFounder \cf5 \strokec5 ?\cf2 \strokec2  UserCheck \cf5 \strokec5 :\cf2 \strokec2  Briefcase\cb1 \
\cb4             \};\cb1 \
\cb4         \}\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ title: \cf3 \strokec3 'User'\cf2 \strokec2 , badges: [], description: \cf3 \strokec3 ''\cf2 \strokec2 , icon: BrainCircuit \};\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 title\cf2 \strokec2 , \cf8 \strokec8 badges\cf2 \strokec2 , \cf8 \strokec8 description\cf2 \strokec2 , \cf7 \strokec7 icon\cf2 \strokec2 : \cf8 \strokec8 Icon\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 getProfileInfo\cf2 \strokec2 (user);\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{style\} \{\cf5 \strokec5 ...\cf2 \strokec2 props\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute overflow-hidden rounded-2xl shadow-lg flex flex-col h-[550px] w-full max-w-sm touch-none"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center text-center p-6 border-b"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-24 h-24 rounded-full border-4 border-background bg-background mb-4"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h3\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold"\cf2 \strokec2 >\{user.name\}</\cf3 \strokec3 h3\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-md text-muted-foreground capitalize"\cf2 \strokec2 >\{user.role\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 flex flex-col justify-center p-6 text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-center gap-2 mb-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{badges.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 badge\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{badge\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{badge\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                      <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground mb-4 line-clamp-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{description\}\cb1 \
\cb4                     </\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4              <\cf8 \strokec8 CardFooter\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-6 pt-0"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2 w-full p-3 bg-secondary/50 rounded-lg justify-center text-sm"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Icon\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >\{title\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardFooter\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 MatchesPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 allMatches\cf2 \strokec2 , \cf8 \strokec8 setAllMatches\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 startups\cf2 \strokec2 , \cf8 \strokec8 setStartups\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Startup\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchInitialData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4                 \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \cb1 \strokec2 \
\cb4             \};\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ();\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 userProfile) \{\cb1 \
\cb4                 \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4             \}\cb1 \
\cb4             \cf6 \strokec6 setCurrentUser\cf2 \strokec2 (userProfile);\cb1 \
\
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 ).\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.id \cf5 \strokec5 !==\cf2 \strokec2  userProfile.id);\cb1 \
\cb4             \cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "startups"\cf2 \strokec2 ));\cb1 \
\cb4             \cf6 \strokec6 setStartups\cf2 \strokec2 (startupsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 ));\cb1 \
\
\cb4             \cf6 \strokec6 setAllMatches\cf2 \strokec2 (\cf6 \strokec6 getMatchableUsers\cf2 \strokec2 (userProfile, allUsers));\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchInitialData\cf2 \strokec2 ();\cb1 \
\cb4     \}, [authUser]);\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getMatchableUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 currentUser\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 allUsers\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 [])\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 [] \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 switch\cf2 \strokec2  (currentUser.role) \{\cb1 \
\cb4             \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 :\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2  allUsers.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cb1 \
\cb4                     u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2  \cf5 \strokec5 ||\cf2 \strokec2  \cb1 \
\cb4                     u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 ||\cf2 \cb1 \strokec2 \
\cb4                     (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isPremium)\cb1 \
\cb4                 );\cb1 \
\cb4             \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 :\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 founderProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2  allUsers.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ) \{\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 talentProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4                         \cf5 \strokec5 if\cf2 \strokec2  (founderProfile.isSeekingCoFounder) \{\cb1 \
\cb4                             \cf5 \strokec5 return\cf2 \strokec2  talentProfile.isSeekingCoFounder;\cb1 \
\cb4                         \}\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 talentProfile.isSeekingCoFounder;\cb1 \
\cb4                     \}\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  founderProfile.isSeekingCoFounder) \{\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isSeekingCoFounder;\cb1 \
\cb4                     \}\cb1 \
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  \cf8 \strokec8 false\cf2 \strokec2 ;\cb1 \
\cb4                 \});\cb1 \
\cb4             \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 :\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 talentProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2  allUsers.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4                          \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 founderProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\cb4                         \cf5 \strokec5 if\cf2 \strokec2 (talentProfile.isSeekingCoFounder) \{\cb1 \
\cb4                             \cf5 \strokec5 return\cf2 \strokec2  founderProfile.isSeekingCoFounder;\cb1 \
\cb4                         \}\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  \cf8 \strokec8 true\cf2 \strokec2 ;\cb1 \
\cb4                     \}\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  talentProfile.isSeekingCoFounder) \{\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).isSeekingCoFounder;\cb1 \
\cb4                     \}\cb1 \
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  \cf8 \strokec8 false\cf2 \strokec2 ;\cb1 \
\cb4                 \});\cb1 \
\cb4             \cf5 \strokec5 default\cf2 \strokec2 :\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2  [];\cb1 \
\cb4         \}\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 filter\cf2 \strokec2 , \cf8 \strokec8 setFilter\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 UserRole\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'all'\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 >(\cf3 \strokec3 'all'\cf2 \strokec2 );\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 matches\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useMemo\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (filter \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'all'\cf2 \strokec2 ) \cf5 \strokec5 return\cf2 \strokec2  allMatches;\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (filter \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ) \{\cb1 \
\cb4              \cf5 \strokec5 return\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \cb1 \strokec2 \
\cb4                 (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isSeekingCoFounder) \cf5 \strokec5 ||\cf2 \cb1 \strokec2 \
\cb4                 (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).isSeekingCoFounder)\cb1 \
\cb4             );\cb1 \
\cb4         \}\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.role \cf5 \strokec5 ===\cf2 \strokec2  filter);\cb1 \
\cb4     \}, [allMatches, filter]);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentIndex\cf2 \strokec2 , \cf8 \strokec8 setCurrentIndex\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 position\cf2 \strokec2 , \cf8 \strokec8 setPosition\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\{ x: \cf8 \strokec8 0\cf2 \strokec2 , y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 isDragging\cf2 \strokec2 , \cf8 \strokec8 setIsDragging\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 cardRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useRef\cf2 \strokec2 <\cf6 \strokec6 HTMLDivElement\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startPos\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useRef\cf2 \strokec2 (\{ x: \cf8 \strokec8 0\cf2 \strokec2 , y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleSwipe\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 direction\cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 'left'\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'right'\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'message'\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (direction \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'message'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf9 \strokec9 // handle message logic\cf2 \cb1 \strokec2 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4             \cf6 \strokec6 setCurrentIndex\cf2 \strokec2 (\cf7 \strokec7 prev\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  prev \cf5 \strokec5 +\cf2 \strokec2  \cf8 \strokec8 1\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4         \cf6 \strokec6 setPosition\cf2 \strokec2 (\{ x: \cf8 \strokec8 0\cf2 \strokec2 , y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 onPointerDown\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 e\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 PointerEvent\cf2 \strokec2 <\cf6 \strokec6 HTMLDivElement\cf2 \strokec2 >) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         e.\cf6 \strokec6 preventDefault\cf2 \strokec2 ();\cb1 \
\cb4         \cf6 \strokec6 setIsDragging\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4         startPos.current \cf5 \strokec5 =\cf2 \strokec2  \{ x: e.clientX, y: e.clientY \};\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 onPointerMove\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 e\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 PointerEvent\cf2 \strokec2 <\cf6 \strokec6 HTMLDivElement\cf2 \strokec2 >) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isDragging \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 cardRef.current) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 currentX\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  e.clientX;\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 deltaX\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentX \cf5 \strokec5 -\cf2 \strokec2  startPos.current.x;\cb1 \
\cb4         \cf6 \strokec6 setPosition\cf2 \strokec2 (\{ x: deltaX, y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 onPointerUp\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 e\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 PointerEvent\cf2 \strokec2 <\cf6 \strokec6 HTMLDivElement\cf2 \strokec2 >) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isDragging) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \cf6 \strokec6 setIsDragging\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 swipeThreshold\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf8 \strokec8 100\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (position.x \cf5 \strokec5 >\cf2 \strokec2  swipeThreshold) \{\cb1 \
\cb4             \cf6 \strokec6 handleSwipe\cf2 \strokec2 (\cf3 \strokec3 'right'\cf2 \strokec2 );\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (position.x \cf5 \strokec5 <\cf2 \strokec2  \cf5 \strokec5 -\cf2 \strokec2 swipeThreshold) \{\cb1 \
\cb4             \cf6 \strokec6 handleSwipe\cf2 \strokec2 (\cf3 \strokec3 'left'\cf2 \strokec2 );\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4             \cf6 \strokec6 setPosition\cf2 \strokec2 (\{ x: \cf8 \strokec8 0\cf2 \strokec2 , y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\cb4         \}\cb1 \
\cb4     \};\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleFilterChange\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 value\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 UserRole\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'all'\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf6 \strokec6 setFilter\cf2 \strokec2 (value);\cb1 \
\cb4         \cf6 \strokec6 setCurrentIndex\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 );\cb1 \
\cb4         \cf6 \strokec6 setPosition\cf2 \strokec2 (\{ x: \cf8 \strokec8 0\cf2 \strokec2 , y: \cf8 \strokec8 0\cf2 \strokec2  \});\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 founderCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useMemo\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isSeekingCoFounder).\cf8 \strokec8 length\cf2 \strokec2 , [allMatches]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 investorCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useMemo\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ).\cf8 \strokec8 length\cf2 \strokec2 , [allMatches]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 talentCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useMemo\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).isSeekingCoFounder).\cf8 \strokec8 length\cf2 \strokec2 , [allMatches]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 cofounderCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useMemo\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  allMatches.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isSeekingCoFounder) \cf5 \strokec5 ||\cf2 \strokec2  (u.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (u.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).isSeekingCoFounder)).\cf8 \strokec8 length\cf2 \strokec2 , [allMatches]);\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full p-4 overflow-hidden"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-80 mb-6"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-[550px] w-full max-w-sm rounded-2xl"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-center items-center gap-4 mt-6"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-20 h-20 rounded-full"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-16 h-16 rounded-full"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-20 h-20 rounded-full"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2 (matches.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 ===\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  filter \cf5 \strokec5 !==\cf2 \strokec2  \cf3 \strokec3 'all'\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >No Profiles to Match</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >There are currently no new profiles that match your criteria. Check back later!</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2 (allMatches.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 ===\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >No Profiles to Match</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >There are currently no new profiles that match your criteria. Check back later!</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2 (currentIndex \cf5 \strokec5 >=\cf2 \strokec2  matches.\cf8 \strokec8 length\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >No More Profiles</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >You've seen all available profiles in this category. Try a different filter or check back later!</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getCardStyle\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 dragX\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 number\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 rotation\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  dragX \cf5 \strokec5 /\cf2 \strokec2  \cf8 \strokec8 20\cf2 \strokec2 ; \cf9 \strokec9 // Control rotation angle\cf2 \cb1 \strokec2 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4             transform: \cf3 \strokec3 `translateX($\{\cf2 \strokec2 dragX\cf3 \strokec3 \}px) rotate($\{\cf2 \strokec2 rotation\cf3 \strokec3 \}deg)`\cf2 \strokec2 ,\cb1 \
\cb4             transition: isDragging \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 'none'\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 'transform 0.3s ease-out'\cf2 \strokec2 ,\cb1 \
\cb4         \};\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full p-4 overflow-hidden"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mb-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Tabs\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{filter\} \cf6 \strokec6 onValueChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 value\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleFilterChange\cf2 \strokec2 (value \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 UserRole\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'all'\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 )\}>\cb1 \
\cb4                     <\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "all"\cf2 \strokec2 >All</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\cb1 \
\cb4                         \{founderCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "founder"\cf2 \strokec2 >Founders</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\}\cb1 \
\cb4                         \{investorCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "investor"\cf2 \strokec2 >Investors</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\}\cb1 \
\cb4                         \{talentCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "talent"\cf2 \strokec2 >Talent</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\}\cb1 \
\cb4                         \{cofounderCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "co-founder"\cf2 \strokec2 >Co-founders</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\}\cb1 \
\cb4                     </\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Tabs\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "relative w-full max-w-sm mx-auto h-[550px] flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                 \{matches.\cf6 \strokec6 slice\cf2 \strokec2 (currentIndex, currentIndex \cf5 \strokec5 +\cf2 \strokec2  \cf8 \strokec8 2\cf2 \strokec2 ).\cf6 \strokec6 reverse\cf2 \strokec2 ().\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 index\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isTopCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  index \cf5 \strokec5 ===\cf2 \strokec2  \cf8 \strokec8 1\cf2 \strokec2 ;\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 style\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isTopCard\cb1 \
\cb4                         \cf5 \strokec5 ?\cf2 \strokec2  \cf6 \strokec6 getCardStyle\cf2 \strokec2 (position.x)\cb1 \
\cb4                         \cf5 \strokec5 :\cf2 \strokec2  \{ transform: \cf3 \strokec3 `scale($\{\cf8 \strokec8 1\cf3 \strokec3  \cf5 \strokec5 -\cf3 \strokec3  \cf8 \strokec8 0.05\cf3 \strokec3  \cf5 \strokec5 *\cf3 \strokec3  (\cf8 \strokec8 1\cf3 \strokec3  \cf5 \strokec5 -\cf3 \strokec3  \cf2 \strokec2 index\cf3 \strokec3 )\}) translateY($\{\cf5 \strokec5 -\cf8 \strokec8 10\cf3 \strokec3  \cf5 \strokec5 *\cf3 \strokec3  (\cf8 \strokec8 1\cf5 \strokec5 -\cf2 \strokec2 index\cf3 \strokec3 )\}px)`\cf2 \strokec2 , transition: \cf3 \strokec3 'transform 0.3s ease-out'\cf2 \strokec2  \};\cb1 \
\
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 cardProps\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isTopCard \cf5 \strokec5 ?\cf2 \strokec2  \{\cb1 \
\cb4                         ref: cardRef,\cb1 \
\cb4                         onPointerDown: onPointerDown,\cb1 \
\cb4                         onPointerMove: onPointerMove,\cb1 \
\cb4                         onPointerUp: onPointerUp,\cb1 \
\cb4                         onPointerLeave: onPointerUp,\cb1 \
\cb4                     \} \cf5 \strokec5 :\cf2 \strokec2  \{\};\cb1 \
\
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startups.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 s\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  s.id \cf5 \strokec5 ===\cf2 \strokec2  (user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).companyId);\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 FounderCard\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{user.id\} \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} \cf6 \strokec6 startup\cf5 \strokec5 =\cf2 \strokec2 \{startup\} \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{style\} \{\cf5 \strokec5 ...\cf2 \strokec2 cardProps\} />\cb1 \
\cb4                     \}\cb1 \
\
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 GenericUserCard\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{user.id\} \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{style\} \{\cf5 \strokec5 ...\cf2 \strokec2 cardProps\} />;\cb1 \
\cb4                 \})\}\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-center items-center gap-4 mt-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-20 h-20 rounded-full border-red-500 text-red-500 hover:bg-red-500/10"\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleSwipe\cf2 \strokec2 (\cf3 \strokec3 'left'\cf2 \strokec2 )\}>\cb1 \
\cb4                     <\cf8 \strokec8 X\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-10 h-10"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-16 h-16 rounded-full border-blue-500 text-blue-500 hover:bg-blue-500/10"\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleSwipe\cf2 \strokec2 (\cf3 \strokec3 'message'\cf2 \strokec2 )\}>\cb1 \
\cb4                      <\cf8 \strokec8 MessageCircle\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-20 h-20 rounded-full border-green-500 text-green-500 hover:bg-green-500/10"\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleSwipe\cf2 \strokec2 (\cf3 \strokec3 'right'\cf2 \strokec2 )\}>\cb1 \
\cb4                     <\cf8 \strokec8 Check\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-10 h-10"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}\cb1 \
\
}