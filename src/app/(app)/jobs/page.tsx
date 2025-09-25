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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useState, useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Job, FounderProfile, InvestorProfile, FullUserProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Badge \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/badge"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ MapPin, Briefcase, PlusCircle, Plus \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Image \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/image"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Input \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/input"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Select, SelectContent, SelectItem, SelectTrigger, SelectValue \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/select"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/dialog"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Label \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/label"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Textarea \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/textarea"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useToast \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-toast"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  FounderApplyPrompt \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/jobs/founder-apply-prompt"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, addDoc, serverTimestamp, query, getDocs, orderBy \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 JobsPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 jobs\cf2 \strokec2 , \cf8 \strokec8 setJobs\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Job\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 isPostJobOpen\cf2 \strokec2 , \cf8 \strokec8 setIsPostJobOpen\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 showFounderPrompt\cf2 \strokec2 , \cf8 \strokec8 setShowFounderPrompt\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 toast\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useToast\cf2 \strokec2 ();\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  authUser) \{\cb1 \
\cb4             \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ().\cf6 \strokec6 then\cf2 \strokec2 (setCurrentUser);\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4     \}, [authUser, authLoading]);\cb1 \
\cb4     \cb1 \
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchJobs\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "jobs"\cf2 \strokec2 ), \cf6 \strokec6 orderBy\cf2 \strokec2 (\cf3 \strokec3 "postedAt"\cf2 \strokec2 , \cf3 \strokec3 "desc"\cf2 \strokec2 ));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 querySnapshot\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobsQuery);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  querySnapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 ));\cb1 \
\cb4             \cf6 \strokec6 setJobs\cf2 \strokec2 (jobsData);\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchJobs\cf2 \strokec2 ();\cb1 \
\cb4     \}, []);\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 newJob\cf2 \strokec2 , \cf8 \strokec8 setNewJob\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\{\cb1 \
\cb4         title: \cf3 \strokec3 ""\cf2 \strokec2 ,\cb1 \
\cb4         location: \cf3 \strokec3 "Remote"\cf2 \strokec2 ,\cb1 \
\cb4         type: \cf3 \strokec3 "Full-time"\cf2 \strokec2  \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 [\cf3 \strokec3 'type'\cf2 \strokec2 ],\cb1 \
\cb4         description: \cf3 \strokec3 ""\cf2 \strokec2 ,\cb1 \
\cb4     \});\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-full"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-40 w-full"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-40 w-full"\cf2 \strokec2  />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         );\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \{\cb1 \
\cb4         \cf9 \cb4 \strokec9 // Handle non-logged in user case\cf2 \cb1 \strokec2 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >Jobs</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >Log in to find your next role at a high-growth startup.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-8 text-center"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2 >Please <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/login"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-primary underline"\cf2 \strokec2 >log in</\cf8 \strokec8 Link\cf2 \strokec2 > to view and apply for jobs.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isInvestor\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isPremiumFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isFounder \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isPremium;\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handlePostJob\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  (\cf7 \strokec7 e\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 FormEvent\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         e.\cf6 \strokec6 preventDefault\cf2 \strokec2 ();\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\
\cb4         \cf5 \strokec5 let\cf2 \strokec2  companyName \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 "Your Company"\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 let\cf2 \strokec2  companyLogoUrl \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 `https://picsum.photos/seed/logo-default/200/200`\cf2 \strokec2 ;\cb1 \
\
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (isFounder) \{\cb1 \
\cb4             \cf9 \cb4 \strokec9 // In a real app, you would fetch the startup details\cf2 \cb1 \strokec2 \
\cb4             companyName \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 'InnovateAI'\cf2 \strokec2 ;\cb1 \
\cb4             companyLogoUrl \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 'https://picsum.photos/seed/logo1/200/200'\cf2 \strokec2 ;\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (isInvestor) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ;\cb1 \
\cb4             companyName \cf5 \strokec5 =\cf2 \strokec2  profile.companyName \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'Investor Firm'\cf2 \strokec2 ;\cb1 \
\cb4              companyLogoUrl \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 `https://picsum.photos/seed/$\{\cf2 \strokec2 companyName\cf3 \strokec3 .\cf6 \strokec6 toLowerCase\cf3 \strokec3 ().\cf6 \strokec6 replace\cf3 \strokec3 (' ', '')\}/200/200`\cf2 \cb1 \strokec2 \
\cb4         \}\cb1 \
\
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 newJobData\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Omit\cf2 \strokec2 <\cf6 \strokec6 Job\cf2 \strokec2 , \cf3 \strokec3 'id'\cf2 \strokec2 > \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4             title: newJob.title,\cb1 \
\cb4             companyName: companyName,\cb1 \
\cb4             companyLogoUrl: companyLogoUrl,\cb1 \
\cb4             founderId: currentUser.id,\cb1 \
\cb4             location: newJob.location,\cb1 \
\cb4             type: newJob.type,\cb1 \
\cb4             description: newJob.description,\cb1 \
\cb4             postedAt: \cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 ().\cf6 \strokec6 toISOString\cf2 \strokec2 (),\cb1 \
\cb4         \};\cb1 \
\
\cb4         \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 docRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 addDoc\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'jobs'\cf2 \strokec2 ), newJobData);\cb1 \
\cb4             \cf6 \strokec6 setJobs\cf2 \strokec2 ([\{ id: docRef.id, \cf5 \strokec5 ...\cf2 \strokec2 newJobData \}, \cf5 \strokec5 ...\cf2 \strokec2 jobs]);\cb1 \
\cb4             \cf6 \strokec6 setIsPostJobOpen\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4             \cf6 \strokec6 setNewJob\cf2 \strokec2 (\{ title: \cf3 \strokec3 ""\cf2 \strokec2 , location: \cf3 \strokec3 "Remote"\cf2 \strokec2 , type: \cf3 \strokec3 "Full-time"\cf2 \strokec2 , description: \cf3 \strokec3 ""\cf2 \strokec2  \});\cb1 \
\cb4             \cf6 \strokec6 toast\cf2 \strokec2 (\{ title: \cf3 \strokec3 "Job Posted"\cf2 \strokec2 , description: \cf3 \strokec3 "Your job has been successfully posted."\cf2 \strokec2  \});\cb1 \
\cb4         \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4             console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error posting job:"\cf2 \strokec2 , error);\cb1 \
\cb4             \cf6 \strokec6 toast\cf2 \strokec2 (\{ title: \cf3 \strokec3 "Error"\cf2 \strokec2 , description: \cf3 \strokec3 "Failed to post job."\cf2 \strokec2 , variant: \cf3 \strokec3 "destructive"\cf2 \strokec2  \});\cb1 \
\cb4         \}\cb1 \
\cb4     \};\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleApply\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 jobTitle\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 , \cf7 \strokec7 companyName\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf6 \strokec6 setShowFounderPrompt\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\
\cb4         \cf6 \strokec6 toast\cf2 \strokec2 (\{\cb1 \
\cb4             title: \cf3 \strokec3 "Application Sent!"\cf2 \strokec2 ,\cb1 \
\cb4             description: \cf3 \strokec3 `Your application for $\{\cf2 \strokec2 jobTitle\cf3 \strokec3 \} at $\{\cf2 \strokec2 companyName\cf3 \strokec3 \} has been submitted.`\cf2 \cb1 \strokec2 \
\cb4         \});\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >Jobs</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >Find your next role at a high-growth startup.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 \{(isInvestor \cf5 \strokec5 ||\cf2 \strokec2  (isFounder \cf5 \strokec5 &&\cf2 \strokec2  isPremiumFounder)) \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setIsPostJobOpen\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 )\}>\cb1 \
\cb4                         <\cf8 \strokec8 PlusCircle\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  /> Post a Job\cb1 \
\cb4                     </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4                 \{isFounder \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 isPremiumFounder \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/settings/billing"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Plus\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  /> Post a Job\cb1 \
\cb4                         </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             \cb1 \
\cb4             <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-4 flex flex-col md:flex-row gap-4"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Search by title, company, or keyword..."\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex gap-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 SelectTrigger\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full md:w-[180px]"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Location"\cf2 \strokec2  />\cb1 \
\cb4                             </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "remote"\cf2 \strokec2 >Remote</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "ny"\cf2 \strokec2 >New York, NY</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "sf"\cf2 \strokec2 >San Francisco, CA</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 SelectTrigger\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full md:w-[180px]"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Job Type"\cf2 \strokec2  />\cb1 \
\cb4                             </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "full-time"\cf2 \strokec2 >Full-time</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "part-time"\cf2 \strokec2 >Part-time</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "contract"\cf2 \strokec2 >Contract</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\
\cb4             \cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-1 gap-6"\cf2 \strokec2 >\cb1 \
\cb4                 \{jobs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 job\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{job.id\}>\cb1 \
\cb4                         <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-row items-start gap-4"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{job.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{job.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 56\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 56\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "rounded-full border"\cf2 \strokec2  \cf6 \strokec6 data-ai-hint\cf5 \strokec5 =\cf3 \strokec3 "logo"\cf2 \strokec2  />\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 CardTitle\cf2 \strokec2 >\{job.title\}</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 CardDescription\cf2 \strokec2 >\{job.companyName\}</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4 text-sm text-muted-foreground mt-1"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-1"\cf2 \strokec2 ><\cf8 \strokec8 MapPin\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-3.5 h-3.5"\cf2 \strokec2  />\{job.location\}</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-1"\cf2 \strokec2 ><\cf8 \strokec8 Briefcase\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-3.5 h-3.5"\cf2 \strokec2  />\{job.type\}</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleApply\cf2 \strokec2 (job.title, job.companyName)\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 \{isFounder \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 'secondary'\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 'default'\cf2 \strokec2 \}>Apply Now</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground line-clamp-2"\cf2 \strokec2 >\{job.description\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 ))\}\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             \cb1 \
\
\cb4             <\cf8 \strokec8 Dialog\cf2 \strokec2  \cf6 \strokec6 open\cf5 \strokec5 =\cf2 \strokec2 \{isPostJobOpen\} \cf6 \strokec6 onOpenChange\cf5 \strokec5 =\cf2 \strokec2 \{setIsPostJobOpen\}>\cb1 \
\cb4                 <\cf8 \strokec8 DialogContent\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 DialogTitle\cf2 \strokec2 >Post a New Job</\cf8 \strokec8 DialogTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 DialogDescription\cf2 \strokec2 >Fill out the details below to post a new job opening for your startup.</\cf8 \strokec8 DialogDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 form\cf2 \strokec2  \cf6 \strokec6 onSubmit\cf5 \strokec5 =\cf2 \strokec2 \{handlePostJob\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "job-title"\cf2 \strokec2 >Job Title</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "job-title"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newJob.title\} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 e\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewJob\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newJob, title: e.target.value \})\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "e.g., Lead Frontend Engineer"\cf2 \strokec2  \cf6 \strokec6 required\cf2 \strokec2  />\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-2 gap-4"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "job-location"\cf2 \strokec2 >Location</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "job-location"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newJob.location\} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 e\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewJob\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newJob, location: e.target.value \})\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "e.g., Remote"\cf2 \strokec2  \cf6 \strokec6 required\cf2 \strokec2  />\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "job-type"\cf2 \strokec2 >Job Type</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Select\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newJob.type\} \cf6 \strokec6 onValueChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 value\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 [\cf3 \strokec3 'type'\cf2 \strokec2 ]) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewJob\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newJob, type: value \})\}>\cb1 \
\cb4                                     <\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Select job type"\cf2 \strokec2  />\cb1 \
\cb4                                     </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "Full-time"\cf2 \strokec2 >Full-time</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "Part-time"\cf2 \strokec2 >Part-time</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "Contract"\cf2 \strokec2 >Contract</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "job-description"\cf2 \strokec2 >Description</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Textarea\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "job-description"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newJob.description\} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 e\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewJob\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newJob, description: e.target.value \})\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Describe the role, responsibilities, and requirements..."\cf2 \strokec2  \cf6 \strokec6 required\cf2 \strokec2  />\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 DialogFooter\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 DialogClose\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 type\cf5 \strokec5 =\cf3 \strokec3 "button"\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >Cancel</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 DialogClose\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 type\cf5 \strokec5 =\cf3 \strokec3 "submit"\cf2 \strokec2 >Post Job</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 DialogFooter\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 form\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 DialogContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Dialog\cf2 \strokec2 >\cb1 \
\
\cb4             <\cf8 \strokec8 FounderApplyPrompt\cf2 \strokec2  \cf6 \strokec6 open\cf5 \strokec5 =\cf2 \strokec2 \{showFounderPrompt\} \cf6 \strokec6 onOpenChange\cf5 \strokec5 =\cf2 \strokec2 \{setShowFounderPrompt\} />\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}\cb1 \
\
}