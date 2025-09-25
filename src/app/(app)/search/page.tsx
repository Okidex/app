{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use client"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useSearchParams \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/navigation"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, Startup, FounderProfile, InvestorProfile, TalentProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Badge \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/badge"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Image \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/image"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Suspense, useEffect, useState \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getSearchResults \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/actions"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  SearchBar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/search-bar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, getDoc, doc \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 StartupResultCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 startup\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 startup\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-row items-start gap-4"\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 56\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 56\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "rounded-full border"\cf2 \strokec2  \cf6 \strokec6 data-ai-hint\cf5 \strokec5 =\cf3 \strokec3 "logo"\cf2 \strokec2  />\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 CardTitle\cf2 \strokec2 >\{startup.companyName\}</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 CardDescription\cf2 \strokec2 >\{startup.tagline\}</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4           <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2 text-sm text-muted-foreground mt-1"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{startup.industry\}</\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\{startup.stage\}</\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4           </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `/users/$\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 founderIds\cf3 \strokec3 [\cf8 \strokec8 0\cf3 \strokec3 ]\}`\cf2 \strokec2 \}>View</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground line-clamp-2"\cf2 \strokec2 >\{startup.description\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 UserResultCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 details\cf2 \strokec2 , \cf8 \strokec8 setDetails\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf3 \strokec3 ""\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getProfileDetails\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 switch\cf2 \strokec2  (user.role) \{\cb1 \
\cb4                 \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 :\cb1 \
\cb4                     \cf6 \strokec6 setDetails\cf2 \strokec2 ((user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ).investmentInterests.\cf6 \strokec6 slice\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 , \cf8 \strokec8 3\cf2 \strokec2 ).\cf6 \strokec6 join\cf2 \strokec2 (\cf3 \strokec3 ' / '\cf2 \strokec2 ));\cb1 \
\cb4                     \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4                 \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 :\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 talentProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4                     \cf6 \strokec6 setDetails\cf2 \strokec2 (talentProfile.headline \cf5 \strokec5 ||\cf2 \strokec2  talentProfile.skills?.\cf6 \strokec6 slice\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 , \cf8 \strokec8 4\cf2 \strokec2 ).\cf6 \strokec6 join\cf2 \strokec2 (\cf3 \strokec3 ' / '\cf2 \strokec2 ));\cb1 \
\cb4                     \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4                 \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 :\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 companyId\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).companyId;\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (companyId) \{\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupDoc\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDoc\cf2 \strokec2 (\cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "startups"\cf2 \strokec2 , companyId));\cb1 \
\cb4                         \cf5 \strokec5 if\cf2 \strokec2  (startupDoc.\cf6 \strokec6 exists\cf2 \strokec2 ()) \{\cb1 \
\cb4                             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startupDoc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 ;\cb1 \
\cb4                             \cf6 \strokec6 setDetails\cf2 \strokec2 (\cf3 \strokec3 `$\{(\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 profile\cf3 \strokec3  \cf5 \strokec5 as\cf3 \strokec3  \cf6 \strokec6 FounderProfile\cf3 \strokec3 ).\cf2 \strokec2 title\cf3 \strokec3 \} at $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 companyName\cf3 \strokec3 \}`\cf2 \strokec2 );\cb1 \
\cb4                         \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4                             \cf6 \strokec6 setDetails\cf2 \strokec2 ((user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).title \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'Founder'\cf2 \strokec2 );\cb1 \
\cb4                         \}\cb1 \
\cb4                     \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4                          \cf6 \strokec6 setDetails\cf2 \strokec2 ((user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).title \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'Founder'\cf2 \strokec2 );\cb1 \
\cb4                     \}\cb1 \
\cb4                     \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4                 \cf5 \strokec5 default\cf2 \strokec2 :\cb1 \
\cb4                     \cf6 \strokec6 setDetails\cf2 \strokec2 (\cf3 \strokec3 ''\cf2 \strokec2 );\cb1 \
\cb4             \}\cb1 \
\cb4         \}\cb1 \
\cb4         \cf6 \strokec6 getProfileDetails\cf2 \strokec2 ();\cb1 \
\cb4     \}, [user]);\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-row items-start gap-4"\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-14 h-14"\cf2 \strokec2  />\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 CardTitle\cf2 \strokec2 >\{user.name\}</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 CardDescription\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "capitalize"\cf2 \strokec2 >\{user.role\}</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4           <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground mt-1"\cf2 \strokec2 >\{details \cf5 \strokec5 ||\cf2 \strokec2  <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-4 w-48"\cf2 \strokec2  />\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `/users/$\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 id\cf3 \strokec3 \}`\cf2 \strokec2 \}>View Profile</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 SearchResults\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 searchParams\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useSearchParams\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 query\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  searchParams.\cf6 \strokec6 get\cf2 \strokec2 (\cf3 \strokec3 'q'\cf2 \strokec2 ) \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 ''\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 results\cf2 \strokec2 , \cf8 \strokec8 setResults\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\{ \cf7 \strokec7 startups\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 [], \cf7 \strokec7 users\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 [] \}>(\{ startups: [], users: [] \});\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  authUser) \{\cb1 \
\cb4         \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ().\cf6 \strokec6 then\cf2 \strokec2 (setCurrentUser);\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4         \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4   \},[authLoading, authUser])\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchResults\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4       \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4       \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 searchResults\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getSearchResults\cf2 \strokec2 (query);\cb1 \
\cb4       \cf6 \strokec6 setResults\cf2 \strokec2 (searchResults);\cb1 \
\cb4       \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (query) \{\cb1 \
\cb4         \cf6 \strokec6 fetchResults\cf2 \strokec2 ();\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4         \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \cf6 \strokec6 setResults\cf2 \strokec2 (\{ startups: [], users: [] \});\cb1 \
\cb4     \}\cb1 \
\cb4   \}, [query]);\cb1 \
\
\cb4   \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-8"\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center text-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-96"\cf2 \strokec2  />\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-6 w-full max-w-2xl"\cf2 \strokec2  />\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-full max-w-2xl"\cf2 \strokec2  />\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getSearchCopy\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4           headline: \cf3 \strokec3 "Search the Ecosystem"\cf2 \strokec2 ,\cb1 \
\cb4           subtext: \cf3 \strokec3 "Find your next connection on Okidex. Log in to personalize your search."\cf2 \cb1 \strokec2 \
\cb4         \};\cb1 \
\cb4     \}\cb1 \
\cb4     \cf5 \strokec5 switch\cf2 \strokec2  (currentUser.role) \{\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 :\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4           headline: \cf3 \strokec3 "Discover talent, power your business."\cf2 \strokec2 ,\cb1 \
\cb4           subtext: \cf3 \strokec3 "Use natural language to discover top-tier talent, including fractional leaders to build your team, or find investors who are excited about your industry and stage."\cf2 \cb1 \strokec2 \
\cb4         \};\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 :\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4           headline: \cf3 \strokec3 "Discover Your Next Opportunity"\cf2 \strokec2 ,\cb1 \
\cb4           subtext: \cf3 \strokec3 "Use natural language to find promising founders, hire top-tier talent like fractional leaders for your firm, or connect with other investors for your fund."\cf2 \cb1 \strokec2 \
\cb4         \};\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 :\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4           headline: \cf3 \strokec3 "Find Your Next Role"\cf2 \strokec2 ,\cb1 \
\cb4           subtext: \cf3 \strokec3 "Use natural language to discover innovative startups, find your next co-founder, or connect with other talented professionals in your field."\cf2 \cb1 \strokec2 \
\cb4         \};\cb1 \
\cb4       \cf5 \strokec5 default\cf2 \strokec2 :\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4           headline: \cf3 \strokec3 "Search the Ecosystem"\cf2 \strokec2 ,\cb1 \
\cb4           subtext: \cf3 \strokec3 "Find your next connection on Okidex."\cf2 \cb1 \strokec2 \
\cb4         \};\cb1 \
\cb4     \}\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 headline\cf2 \strokec2 , \cf8 \strokec8 subtext\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 getSearchCopy\cf2 \strokec2 ();\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-8"\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center text-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-3xl font-bold font-headline"\cf2 \strokec2 >\{headline\}</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-lg text-muted-foreground max-w-2xl"\cf2 \strokec2 >\cb1 \
\cb4                 \{subtext\}\cb1 \
\cb4             </\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-2xl"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 SearchBar\cf2 \strokec2  \cf6 \strokec6 userRole\cf5 \strokec5 =\cf2 \strokec2 \{currentUser?.role\} />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\
\
\cb4       \{query \cf5 \strokec5 &&\cf2 \strokec2  (results.startups.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 ||\cf2 \strokec2  results.users.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"\cf2 \strokec2 >\cb1 \
\cb4             \{results.startups.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xl font-semibold"\cf2 \strokec2 >Startups (\{results.startups.\cf8 \strokec8 length\cf2 \strokec2 \})</\cf3 \strokec3 h2\cf2 \strokec2 >\cb1 \
\cb4                     \{results.startups.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 startup\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 StartupResultCard\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{startup.id\} \cf6 \strokec6 startup\cf5 \strokec5 =\cf2 \strokec2 \{startup\} />)\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             )\}\cb1 \
\cb4             \{results.users.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xl font-semibold"\cf2 \strokec2 >People (\{results.users.\cf8 \strokec8 length\cf2 \strokec2 \})</\cf3 \strokec3 h2\cf2 \strokec2 >\cb1 \
\cb4                     \{results.users.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 user\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 UserResultCard\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{user.id\} \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} />)\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             )\}\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4       ) \cf5 \strokec5 :\cf2 \strokec2  query \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-center p-8 max-w-2xl mx-auto"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardTitle\cf2 \strokec2 >No Results Found</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardDescription\cf2 \strokec2 >We couldn't find anything matching your search for "\{query\}". Try a different term.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4       ) \cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 \}\cb1 \
\cb4     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 SearchPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Suspense\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 SearchResults\cf2 \strokec2  />\cb1 \
\cb4         </\cf8 \strokec8 Suspense\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}\cb1 \
\
}