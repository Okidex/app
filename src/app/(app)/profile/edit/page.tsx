{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red91\green47\blue214;\red38\green59\blue169;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 'use client'\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ getCurrentUser \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/data"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Label \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/label"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Input \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/input"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Textarea \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/textarea"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Separator \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/separator"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  ProfilePictureUploader \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/profile-picture-uploader"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  MonthlyFinancialsForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/monthly-financials-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ FounderProfile, InvestorProfile, Startup, InvestmentStage, TalentProfile \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/types"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  LinkedInPopulator \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/linkedin-populator"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  BusinessLogoUploader \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/business-logo-uploader"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  CapTableForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/cap-table-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  FoundersForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/founders-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  IncorporationDetailsForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/incorporation-details-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Badge \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/badge"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ X \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Checkbox \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/checkbox"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Select, SelectContent, SelectItem, SelectTrigger, SelectValue \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/select"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Switch \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/switch"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useToast \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/hooks/use-toast"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useRouter \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/navigation"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState, useEffect \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ updateUserProfile \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/actions"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  PortfolioForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/portfolio-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  ExitsForm \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/profile/exits-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ getDoc, doc \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "firebase/firestore"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ db \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/firebase"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ investmentStages \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/data"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Skeleton \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/skeleton"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 ProfileEditPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 user\cf4 \strokec4 , \cf7 \strokec7 setUser\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf7 \strokec7 any\cf4 \strokec4 >(\cf7 \strokec7 null\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 loading\cf4 \strokec4 , \cf7 \strokec7 setLoading\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 true\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \{ \cf7 \strokec7 toast\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useToast\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 router\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useRouter\cf4 \strokec4 ();\cb1 \
\
\cb3   \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 getCurrentUser\cf4 \strokec4 ().\cf6 \strokec6 then\cf4 \strokec4 ((\cf8 \strokec8 user\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3       \cf6 \strokec6 setUser\cf4 \strokec4 (user);\cb1 \
\cb3     \});\cb1 \
\cb3   \}, []);\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 startup\cf4 \strokec4 , \cf7 \strokec7 setStartup\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 Startup\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf7 \strokec7 undefined\cf4 \strokec4 >(\cf7 \strokec7 undefined\cf4 \strokec4 );\cb1 \
\cb3   \cb1 \
\cb3   \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (user \cf5 \strokec5 &&\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ) \{\cb1 \
\cb3       \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 profile\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FounderProfile\cf4 \strokec4 ;\cb1 \
\cb3       \cf5 \strokec5 if\cf4 \strokec4  (profile.companyId) \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 fetchStartup\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3           \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 startupDoc\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDoc\cf4 \strokec4 (\cf6 \strokec6 doc\cf4 \strokec4 (db, \cf2 \strokec2 'startups'\cf4 \strokec4 , profile.companyId\cf5 \strokec5 !\cf4 \strokec4 ));\cb1 \
\cb3           \cf5 \strokec5 if\cf4 \strokec4  (startupDoc.\cf6 \strokec6 exists\cf4 \strokec4 ()) \{\cb1 \
\cb3             \cf6 \strokec6 setStartup\cf4 \strokec4 (startupDoc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Startup\cf4 \strokec4 );\cb1 \
\cb3           \}\cb1 \
\cb3            \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3         \};\cb1 \
\cb3         \cf6 \strokec6 fetchStartup\cf4 \strokec4 ();\cb1 \
\cb3       \} \cf5 \strokec5 else\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3       \}\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (user) \{\cb1 \
\cb3       \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3     \}\cb1 \
\cb3   \}, [user]);\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 isSeekingCoFounder\cf4 \strokec4 , \cf7 \strokec7 setIsSeekingCoFounder\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 isVendor\cf4 \strokec4 , \cf7 \strokec7 setIsVendor\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf7 \strokec7 isFractionalLeader\cf4 \strokec4 , \cf7 \strokec7 setIsFractionalLeader\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\
\cb3   \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (user) \{\cb1 \
\cb3       \cf5 \strokec5 if\cf4 \strokec4  (user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'talent'\cf4 \strokec4 ) \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 talentProfile\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 TalentProfile\cf4 \strokec4 ;\cb1 \
\cb3         \cf6 \strokec6 setIsSeekingCoFounder\cf4 \strokec4 (talentProfile?.isSeekingCoFounder \cf5 \strokec5 ??\cf4 \strokec4  \cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setIsVendor\cf4 \strokec4 (talentProfile?.subRole \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'vendor'\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setIsFractionalLeader\cf4 \strokec4 (talentProfile?.subRole \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'fractional-leader'\cf4 \strokec4 );\cb1 \
\cb3       \} \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ) \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 founderProfile\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FounderProfile\cf4 \strokec4 ;\cb1 \
\cb3         \cf6 \strokec6 setIsSeekingCoFounder\cf4 \strokec4 (founderProfile?.isSeekingCoFounder \cf5 \strokec5 ??\cf4 \strokec4  \cf7 \strokec7 false\cf4 \strokec4 );\cb1 \
\cb3       \}\cb1 \
\cb3     \}\cb1 \
\cb3   \}, [user]);\cb1 \
\
\cb3   \cf5 \strokec5 if\cf4 \strokec4  (loading \cf5 \strokec5 ||\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 user) \{\cb1 \
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3           <\cf7 \strokec7 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8 w-48 mb-2"\cf4 \strokec4 />\cb1 \
\cb3           <\cf7 \strokec7 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-4 w-96"\cf4 \strokec4 />\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-1 md:grid-cols-3 gap-8"\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "md:col-span-1 space-y-8"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-48 w-full"\cf4 \strokec4 />\cb1 \
\cb3                 <\cf7 \strokec7 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-48 w-full"\cf4 \strokec4 />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "md:col-span-2"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-[500px] w-full"\cf4 \strokec4 />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     )\cb1 \
\cb3   \}\cb1 \
\cb3   \cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isInvestor\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'investor'\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isTalent\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  user.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'talent'\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 investorProfile\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isInvestor \cf5 \strokec5 ?\cf4 \strokec4  user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 InvestorProfile\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 undefined\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 talentProfile\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isTalent \cf5 \strokec5 ?\cf4 \strokec4  user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 TalentProfile\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 undefined\cf4 \strokec4 ;\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 isIncorporated\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  startup?.incorporationDetails.isIncorporated \cf5 \strokec5 ??\cf4 \strokec4  \cf7 \strokec7 false\cf4 \strokec4 ;\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleSaveChanges\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  (\cf8 \strokec8 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 FormEvent\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     e.\cf6 \strokec6 preventDefault\cf4 \strokec4 ();\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 let\cf4 \strokec4  profileUpdateData\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 Partial\cf4 \strokec4 <\cf6 \strokec6 FounderProfile\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf6 \strokec6 TalentProfile\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf6 \strokec6 InvestorProfile\cf4 \strokec4 > \cf5 \strokec5 =\cf4 \strokec4  \{\};\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 formData\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 new\cf4 \strokec4  \cf6 \strokec6 FormData\cf4 \strokec4 (e.currentTarget \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 HTMLFormElement\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 data\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 Record\cf4 \strokec4 <\cf7 \strokec7 string\cf4 \strokec4 ,\cf7 \strokec7 any\cf4 \strokec4 > \cf5 \strokec5 =\cf4 \strokec4  Object.\cf6 \strokec6 fromEntries\cf4 \strokec4 (formData.\cf6 \strokec6 entries\cf4 \strokec4 ());\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (isTalent \cf5 \strokec5 &&\cf4 \strokec4  talentProfile) \{\cb1 \
\cb3       \cf5 \strokec5 let\cf4 \strokec4  subRole \cf5 \strokec5 =\cf4 \strokec4  talentProfile.subRole;\cb1 \
\cb3       \cf5 \strokec5 if\cf4 \strokec4  (isVendor) subRole \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 'vendor'\cf4 \strokec4 ;\cb1 \
\cb3       \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (isFractionalLeader) subRole \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 'fractional-leader'\cf4 \strokec4 ;\cb1 \
\cb3       \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (subRole \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'vendor'\cf4 \strokec4  \cf5 \strokec5 ||\cf4 \strokec4  subRole \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'fractional-leader'\cf4 \strokec4 ) \{\cb1 \
\cb3         subRole \cf5 \strokec5 =\cf4 \strokec4  isSeekingCoFounder \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 'co-founder'\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 'employee'\cf4 \strokec4 ;\cb1 \
\cb3       \}\cb1 \
\cb3       \cb1 \
\cb3       profileUpdateData \cf5 \strokec5 =\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 ...\cf4 \strokec4 talentProfile,\cb1 \
\cb3         headline: data.headline,\cb1 \
\cb3         about: data.about,\cb1 \
\cb3         skills: data.skills.\cf6 \strokec6 split\cf4 \strokec4 (\cf2 \strokec2 ','\cf4 \strokec4 ).\cf6 \strokec6 map\cf4 \strokec4 ((\cf8 \strokec8 s\cf5 \strokec5 :\cf7 \strokec7 string\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  s.\cf6 \strokec6 trim\cf4 \strokec4 ()),\cb1 \
\cb3         organization: data.organization,\cb1 \
\cb3         experience: data.experience,\cb1 \
\cb3         education: data.education,\cb1 \
\cb3         isSeekingCoFounder,\cb1 \
\cb3         subRole,\cb1 \
\cb3       \};\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (isFounder) \{\cb1 \
\cb3        profileUpdateData \cf5 \strokec5 =\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 ...\cf4 \strokec4 (user.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FounderProfile\cf4 \strokec4 ),\cb1 \
\cb3         isSeekingCoFounder,\cb1 \
\cb3       \};\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (isInvestor \cf5 \strokec5 &&\cf4 \strokec4  investorProfile) \{\cb1 \
\cb3         profileUpdateData \cf5 \strokec5 =\cf4 \strokec4  \{\cb1 \
\cb3             \cf5 \strokec5 ...\cf4 \strokec4 investorProfile,\cb1 \
\cb3             companyName: data.investorCompanyName,\cb1 \
\cb3             companyUrl: data.investorCompanyUrl,\cb1 \
\cb3             investorType: data.investorType,\cb1 \
\cb3             about: data.about,\cb1 \
\cb3         \}\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \{ \cf7 \strokec7 success\cf4 \strokec4 , \cf7 \strokec7 error\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 updateUserProfile\cf4 \strokec4 (user.id, profileUpdateData);\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (success) \{\cb1 \
\cb3       \cf6 \strokec6 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Profile Saved"\cf4 \strokec4 ,\cb1 \
\cb3         description: \cf2 \strokec2 "Your general information has been updated."\cf4 \strokec4 ,\cb1 \
\cb3       \});\cb1 \
\cb3       router.\cf6 \strokec6 push\cf4 \strokec4 (\cf2 \strokec2 '/profile'\cf4 \strokec4 );\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \{\cb1 \
\cb3       \cf6 \strokec6 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Error"\cf4 \strokec4 ,\cb1 \
\cb3         description: error \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 "Failed to update profile."\cf4 \strokec4 ,\cb1 \
\cb3         variant: \cf2 \strokec2 "destructive"\cf4 \strokec4 ,\cb1 \
\cb3       \});\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 h1\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-2xl font-bold font-headline"\cf4 \strokec4 >Edit Profile</\cf2 \strokec2 h1\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >This is how others will see you on the site. Update your information to attract the right connections.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\
\cb3       <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-1 md:grid-cols-3 gap-8"\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "md:col-span-1 space-y-8"\cf4 \strokec4 >\cb1 \
\cb3           \{isFounder \cf5 \strokec5 &&\cf4 \strokec4  startup \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3             <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Business Logo</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 CardDescription\cf4 \strokec4 >Upload a logo for your company.</\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 BusinessLogoUploader\cf4 \strokec4  \cf6 \strokec6 initialLogoUrl\cf5 \strokec5 =\cf4 \strokec4 \{startup.companyLogoUrl\} \cf6 \strokec6 initialName\cf5 \strokec5 =\cf4 \strokec4 \{startup.companyName\} />\cb1 \
\cb3                 </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3           )\}\cb1 \
\cb3           <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Profile Picture</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardDescription\cf4 \strokec4 >Upload a picture for your profile.</\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 ProfilePictureUploader\cf4 \strokec4  \cf6 \strokec6 initialAvatarUrl\cf5 \strokec5 =\cf4 \strokec4 \{user.avatarUrl\} \cf6 \strokec6 initialName\cf5 \strokec5 =\cf4 \strokec4 \{user.name\} />\cb1 \
\cb3             </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3           </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\
\cb3         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "md:col-span-2 space-y-6"\cf4 \strokec4 >\cb1 \
\cb3           <\cf2 \strokec2 form\cf4 \strokec4  \cf6 \strokec6 onSubmit\cf5 \strokec5 =\cf4 \strokec4 \{handleSaveChanges\}>\cb1 \
\cb3             <\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3                  <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 CardTitle\cf4 \strokec4 >General Information</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                     <\cf7 \strokec7 CardDescription\cf4 \strokec4 >Update your personal and company details, or populate from your LinkedIn profile.</\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                      <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "pt-4"\cf4 \strokec4 >\cb1 \
\cb3                         <\cf7 \strokec7 LinkedInPopulator\cf4 \strokec4  />\cb1 \
\cb3                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardContent\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-4"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-2 gap-4"\cf4 \strokec4 >\cb1 \
\cb3                         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "name"\cf4 \strokec4 >Name</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "name"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "name"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{user.name\} />\cb1 \
\cb3                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                          <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \strokec4 >Email</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{user.email\} \cf6 \strokec6 disabled\cf4 \strokec4  />\cb1 \
\cb3                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                      \{isFounder \cf5 \strokec5 &&\cf4 \strokec4  startup \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3                         <>\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "companyName"\cf4 \strokec4 >Company Name</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "companyName"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "companyName"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.companyName\} />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "tagline"\cf4 \strokec4 >Company Tagline</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "tagline"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "tagline"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.tagline\} />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-2 gap-4"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "industry"\cf4 \strokec4 >Industry</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "industry"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "industry"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.industry\} />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "stage"\cf4 \strokec4 >Stage</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Select\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "stage"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.stage\}>\cb1 \
\cb3                                         <\cf7 \strokec7 SelectTrigger\cf4 \strokec4 >\cb1 \
\cb3                                             <\cf7 \strokec7 SelectValue\cf4 \strokec4  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Select your startup's stage"\cf4 \strokec4  />\cb1 \
\cb3                                         </\cf7 \strokec7 SelectTrigger\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf7 \strokec7 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                                             \{investmentStages.\cf6 \strokec6 map\cf4 \strokec4 (\cf8 \strokec8 stage\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                                                 <\cf7 \strokec7 SelectItem\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{stage\} \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{stage\}>\{stage\}</\cf7 \strokec7 SelectItem\cf4 \strokec4 >\cb1 \
\cb3                                             ))\}\cb1 \
\cb3                                         </\cf7 \strokec7 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                                     </\cf7 \strokec7 Select\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "website"\cf4 \strokec4 >Website</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "website"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "website"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.website\} />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "description"\cf4 \strokec4 >Company Description</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Textarea\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "description"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "description"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{startup.description\} />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center space-x-2 pt-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Switch\cf4 \cb1 \strokec4 \
\cb3                                     \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "is-seeking-cofounder"\cf4 \cb1 \strokec4 \
\cb3                                     \cf6 \strokec6 checked\cf5 \strokec5 =\cf4 \strokec4 \{isSeekingCoFounder\}\cb1 \
\cb3                                     \cf6 \strokec6 onCheckedChange\cf5 \strokec5 =\cf4 \strokec4 \{setIsSeekingCoFounder\}\cb1 \
\cb3                                 />\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "is-seeking-cofounder"\cf4 \strokec4 >Open to Co-founder Opportunities</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         </>\cb1 \
\cb3                     )\}\cb1 \
\cb3                     \{isInvestor \cf5 \strokec5 &&\cf4 \strokec4  investorProfile \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3                         <>\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-2 gap-4"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyName"\cf4 \strokec4 >Company Name</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyName"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyName"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.companyName\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "e.g. Smith Ventures"\cf4 \strokec4 />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyUrl"\cf4 \strokec4 >Company URL</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyUrl"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "investorCompanyUrl"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.companyUrl\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "https://smith.ventures"\cf4 \strokec4  />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "investorType"\cf4 \strokec4 >Investor Type</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Select\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "investorType"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.investorType\}>\cb1 \
\cb3                                     <\cf7 \strokec7 SelectTrigger\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf7 \strokec7 SelectValue\cf4 \strokec4  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Select your investor type"\cf4 \strokec4  />\cb1 \
\cb3                                     </\cf7 \strokec7 SelectTrigger\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf7 \strokec7 SelectItem\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "GP"\cf4 \strokec4 >General Partner (GP)</\cf7 \strokec7 SelectItem\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf7 \strokec7 SelectItem\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "LP"\cf4 \strokec4 >Limited Partner (LP)</\cf7 \strokec7 SelectItem\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf7 \strokec7 SelectItem\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "Family Office Administrator"\cf4 \strokec4 >Family Office Administrator</\cf7 \strokec7 SelectItem\cf4 \strokec4 >\cb1 \
\cb3                                     </\cf7 \strokec7 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf7 \strokec7 Select\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4 >About Me</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Textarea\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.about\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Write a brief professional bio..."\cf4 \strokec4 />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4 >Investment Interests</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-wrap gap-2"\cf4 \strokec4 >\cb1 \
\cb3                                     \{investorProfile.investmentInterests.\cf6 \strokec6 map\cf4 \strokec4 (\cf8 \strokec8 interest\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                                         <\cf7 \strokec7 Badge\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{interest\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "secondary"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "gap-1.5 pr-1.5"\cf4 \strokec4 >\cb1 \
\cb3                                             \{interest\}\cb1 \
\cb3                                             <\cf2 \strokec2 button\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "rounded-full hover:bg-background/50"\cf4 \strokec4 >\cb1 \
\cb3                                                 <\cf7 \strokec7 X\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-3 w-3"\cf4 \strokec4 />\cb1 \
\cb3                                             </\cf2 \strokec2 button\cf4 \strokec4 >\cb1 \
\cb3                                         </\cf7 \strokec7 Badge\cf4 \strokec4 >\cb1 \
\cb3                                     ))\}\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Add interest..."\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8 w-auto flex-1"\cf4 \strokec4 />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4 >Investment Stages</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-wrap gap-4"\cf4 \strokec4 >\cb1 \
\cb3                                     \{investmentStages.\cf6 \strokec6 map\cf4 \strokec4 (\cf8 \strokec8 stage\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                                         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{stage\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center space-x-2"\cf4 \strokec4 >\cb1 \
\cb3                                             <\cf7 \strokec7 Checkbox\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf4 \strokec4 \{\cf2 \strokec2 `stage-$\{\cf4 \strokec4 stage\cf2 \strokec2 \}`\cf4 \strokec4 \} \cf6 \strokec6 defaultChecked\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.investmentStages?.\cf6 \strokec6 includes\cf4 \strokec4 (stage)\} />\cb1 \
\cb3                                             <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf4 \strokec4 \{\cf2 \strokec2 `stage-$\{\cf4 \strokec4 stage\cf2 \strokec2 \}`\cf4 \strokec4 \}>\{stage\}</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                     ))\}\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4 >Actively Seeking</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-wrap gap-2"\cf4 \strokec4 >\cb1 \
\cb3                                     \{investorProfile.seeking?.\cf6 \strokec6 map\cf4 \strokec4 (\cf8 \strokec8 item\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                                         <\cf7 \strokec7 Badge\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{item\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "secondary"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "gap-1.5 pr-1.5"\cf4 \strokec4 >\cb1 \
\cb3                                             \{item\}\cb1 \
\cb3                                             <\cf2 \strokec2 button\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "rounded-full hover:bg-background/50"\cf4 \strokec4 >\cb1 \
\cb3                                                 <\cf7 \strokec7 X\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-3 w-3"\cf4 \strokec4 />\cb1 \
\cb3                                             </\cf2 \strokec2 button\cf4 \strokec4 >\cb1 \
\cb3                                         </\cf7 \strokec7 Badge\cf4 \strokec4 >\cb1 \
\cb3                                     ))\}\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Add label (e.g., Open to Mentoring)..."\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8 w-auto flex-1"\cf4 \strokec4 />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         </>\cb1 \
\cb3                     )\}\cb1 \
\cb3                     \{isTalent \cf5 \strokec5 &&\cf4 \strokec4  talentProfile \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3                         <>\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "headline"\cf4 \strokec4 >Headline</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "headline"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "headline"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.headline\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "e.g., Fractional Marketing Leader"\cf4 \strokec4  />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4 >About Me</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Textarea\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "about"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.about\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "A brief bio..."\cf4 \strokec4  />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "grid grid-cols-2 gap-4"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4 >Skills</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "skills"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.skills?.\cf6 \strokec6 join\cf4 \strokec4 (\cf2 \strokec2 ', '\cf4 \strokec4 )\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "e.g., React, Node.js"\cf4 \strokec4  />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "organization"\cf4 \strokec4 >Current/Latest Organization</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf7 \strokec7 Input\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "organization"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "organization"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.organization\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "e.g., Acme Inc."\cf4 \strokec4  />\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "experience"\cf4 \strokec4 >Experience</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Textarea\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "experience"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "experience"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.experience\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Summarize your professional experience..."\cf4 \strokec4  />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "education"\cf4 \strokec4 >Education & Certifications</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Textarea\cf4 \strokec4  \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "education"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "education"\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf4 \strokec4 \{talentProfile.education\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "e.g., B.S. in Computer Science..."\cf4 \strokec4  />\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center space-x-2 pt-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Switch\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "is-seeking-cofounder"\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 checked\cf5 \strokec5 =\cf4 \strokec4 \{isSeekingCoFounder\}\cb1 \
\cb3                                     \cf6 \strokec6 onCheckedChange\cf5 \strokec5 =\cf4 \strokec4 \{setIsSeekingCoFounder\}\cb1 \
\cb3                                 />\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "is-seeking-cofounder"\cf4 \strokec4 >Open to Co-founder Opportunities</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center space-x-2 pt-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Switch\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "is-vendor"\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 checked\cf5 \strokec5 =\cf4 \strokec4 \{isVendor\}\cb1 \
\cb3                                     \cf6 \strokec6 onCheckedChange\cf5 \strokec5 =\cf4 \strokec4 \{setIsVendor\}\cb1 \
\cb3                                 />\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "is-vendor"\cf4 \strokec4 >Promote my services as a Vendor</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center space-x-2 pt-2"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf7 \strokec7 Switch\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 id\cf5 \strokec5 =\cf2 \strokec2 "is-fractional-leader"\cf4 \strokec4  \cb1 \
\cb3                                     \cf6 \strokec6 checked\cf5 \strokec5 =\cf4 \strokec4 \{isFractionalLeader\}\cb1 \
\cb3                                     \cf6 \strokec6 onCheckedChange\cf5 \strokec5 =\cf4 \strokec4 \{setIsFractionalLeader\}\cb1 \
\cb3                                 />\cb1 \
\cb3                                 <\cf7 \strokec7 Label\cf4 \strokec4  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf2 \strokec2 "is-fractional-leader"\cf4 \strokec4 >Promote my services as a Fractional Leader</\cf7 \strokec7 Label\cf4 \strokec4 >\cb1 \
\cb3                             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         </>\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf7 \strokec7 CardFooter\cf4 \strokec4 >\cb1 \
\cb3                   <\cf7 \strokec7 Button\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "submit"\cf4 \strokec4 >Save Changes</\cf7 \strokec7 Button\cf4 \strokec4 >\cb1 \
\cb3                 </\cf7 \strokec7 CardFooter\cf4 \strokec4 >\cb1 \
\cb3             </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3           </\cf2 \strokec2 form\cf4 \strokec4 >\cb1 \
\cb3             \{isFounder \cf5 \strokec5 &&\cf4 \strokec4  startup \cf5 \strokec5 &&\cf4 \strokec4  <\cf7 \strokec7 IncorporationDetailsForm\cf4 \strokec4  \cf6 \strokec6 initialData\cf5 \strokec5 =\cf4 \strokec4 \{startup.incorporationDetails\} />\}\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       \cb1 \
\cb3       \{isFounder \cf5 \strokec5 &&\cf4 \strokec4  startup \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3         <>\cb1 \
\cb3             <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3             <\cf7 \strokec7 FoundersForm\cf4 \strokec4  \cf6 \strokec6 startup\cf5 \strokec5 =\cf4 \strokec4 \{startup\} />\cb1 \
\cb3             \{isIncorporated \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3                 <>\cb1 \
\cb3                     <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3                     <\cf7 \strokec7 MonthlyFinancialsForm\cf4 \strokec4  \cf6 \strokec6 initialData\cf5 \strokec5 =\cf4 \strokec4 \{startup.monthlyFinancials\} />\cb1 \
\cb3                     <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3                     <\cf7 \strokec7 CapTableForm\cf4 \strokec4  \cf6 \strokec6 initialData\cf5 \strokec5 =\cf4 \strokec4 \{startup.capTable\} \cf6 \strokec6 startupStage\cf5 \strokec5 =\cf4 \strokec4 \{startup.stage\} />\cb1 \
\cb3                 </>\cb1 \
\cb3             )\}\cb1 \
\cb3         </>\cb1 \
\cb3       )\}\cb1 \
\
\cb3       \{isInvestor \cf5 \strokec5 &&\cf4 \strokec4  investorProfile \cf5 \strokec5 &&\cf4 \strokec4  (\cb1 \
\cb3         <>\cb1 \
\cb3             <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3             <\cf7 \strokec7 PortfolioForm\cf4 \strokec4  \cf6 \strokec6 initialData\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.portfolio\} />\cb1 \
\cb3             <\cf7 \strokec7 Separator\cf4 \strokec4  />\cb1 \
\cb3             <\cf7 \strokec7 ExitsForm\cf4 \strokec4  \cf6 \strokec6 initialData\cf5 \strokec5 =\cf4 \strokec4 \{investorProfile.exits\} />\cb1 \
\cb3         </>\cb1 \
\cb3       )\}\cb1 \
\cb3     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}