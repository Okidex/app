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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Tabs, TabsContent, TabsList, TabsTrigger \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/tabs"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, Interest, FounderProfile, Job, InvestmentThesis \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ formatDistanceToNow \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "date-fns"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Lock \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, query, where, getDocs \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 type\cf2 \strokec2  \cf6 \strokec6 ApplicantItem\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 Interest\cf2 \strokec2  \cf5 \strokec5 &\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 undefined\cf2 \strokec2 ; \cf7 \strokec7 targetName\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2  \};\cb1 \
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 ApplicantList\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 title\cf2 \strokec2 , \cf7 \strokec7 items\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 title\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ; \cf7 \strokec7 items\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 ApplicantItem\cf2 \strokec2 [] \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 h2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xl font-semibold mb-4"\cf2 \strokec2 >\{title\}</\cf3 \strokec3 h2\cf2 \strokec2 >\cb1 \
\cb4             \{items.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                     \{items.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 interest\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                         <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{interest.id\}>\cb1 \
\cb4                             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-4 flex items-center justify-between"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{interest.user?.name \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 ''\cf2 \strokec2 \} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{interest.user?.avatarUrl \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 ''\cf2 \strokec2 \} />\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2 ><\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-semibold"\cf2 \strokec2 >\{interest.user?.name\}</\cf3 \strokec3 span\cf2 \strokec2 > expressed interest in <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-semibold"\cf2 \strokec2 >\{interest.targetName\}</\cf3 \strokec3 span\cf2 \strokec2 ></\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >\{\cf6 \strokec6 formatDistanceToNow\cf2 \strokec2 (\cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 (interest.timestamp), \{ addSuffix: \cf8 \strokec8 true\cf2 \strokec2  \})\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `/users/$\{\cf2 \strokec2 interest\cf3 \strokec3 .\cf2 \strokec2 userId\cf3 \strokec3 \}`\cf2 \strokec2 \}>View Profile</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     ))\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             ) \cf5 \strokec5 :\cf2 \strokec2  (\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-center p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >No applicants for this category yet.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             )\}\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     )\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 InvestorApplicantsView\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 currentUser\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 thesisInterests\cf2 \strokec2 , \cf8 \strokec8 setThesisInterests\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 ApplicantItem\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 jobInterests\cf2 \strokec2 , \cf8 \strokec8 setJobInterests\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 ApplicantItem\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchInterests\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf9 \strokec9 // Fetch theses created by investor\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "theses"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "investorId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , currentUser.id));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (thesesQuery);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myTheses\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  thesesSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestmentThesis\cf2 \strokec2 ));\cb1 \
\
\cb4             \cf9 \strokec9 // Fetch jobs created by investor\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "jobs"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "founderId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , currentUser.id));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobsQuery);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myJobs\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  jobsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 ));\cb1 \
\
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allUserIds\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 [] \cf5 \strokec5 =\cf2 \strokec2  [];\cb1 \
\
\cb4             \cf9 \strokec9 // Fetch interests for theses\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (myTheses.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesisInterestsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "interests"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetType"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf3 \strokec3 "thesis"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetId"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , myTheses.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 t\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  t.id)));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesisInterestsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (thesisInterestsQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 interestsData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  thesisInterestsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Interest\cf2 \strokec2 );\cb1 \
\cb4                 \cf6 \strokec6 setThesisInterests\cf2 \strokec2 (interestsData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 i\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 allUserIds.\cf6 \strokec6 includes\cf2 \strokec2 (i.userId)) allUserIds.\cf6 \strokec6 push\cf2 \strokec2 (i.userId);\cb1 \
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4                         \cf5 \strokec5 ...\cf2 \strokec2 i,\cb1 \
\cb4                         user: \cf8 \strokec8 undefined\cf2 \strokec2 ,\cb1 \
\cb4                         targetName: myTheses.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 t\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  t.id \cf5 \strokec5 ===\cf2 \strokec2  i.targetId)?.title \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'a thesis'\cf2 \cb1 \strokec2 \
\cb4                     \}\cb1 \
\cb4                 \}));\cb1 \
\cb4             \}\cb1 \
\
\cb4             \cf9 \strokec9 // Fetch interests for jobs\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (myJobs.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobInterestsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "interests"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetType"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf3 \strokec3 "job"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetId"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , myJobs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 j\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  j.id)));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobInterestsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobInterestsQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 interestsData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  jobInterestsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Interest\cf2 \strokec2 );\cb1 \
\cb4                 \cf6 \strokec6 setJobInterests\cf2 \strokec2 (interestsData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 i\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 allUserIds.\cf6 \strokec6 includes\cf2 \strokec2 (i.userId)) allUserIds.\cf6 \strokec6 push\cf2 \strokec2 (i.userId);\cb1 \
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  \{\cb1 \
\cb4                         \cf5 \strokec5 ...\cf2 \strokec2 i,\cb1 \
\cb4                         user: \cf8 \strokec8 undefined\cf2 \strokec2 ,\cb1 \
\cb4                         targetName: myJobs.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 j\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  j.id \cf5 \strokec5 ===\cf2 \strokec2  i.targetId)?.title \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'a job'\cf2 \cb1 \strokec2 \
\cb4                     \}\cb1 \
\cb4                 \}));\cb1 \
\cb4             \}\cb1 \
\cb4             \cb1 \
\cb4             \cf9 \strokec9 // Fetch user profiles for all interests\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2 (allUserIds.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "id"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , allUserIds));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (usersQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 users\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\
\cb4                 \cf6 \strokec6 setThesisInterests\cf2 \strokec2 (\cf7 \strokec7 prev\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  prev.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 item\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{\cf5 \strokec5 ...\cf2 \strokec2 item, user: users.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.id \cf5 \strokec5 ===\cf2 \strokec2  item.userId)\})));\cb1 \
\cb4                 \cf6 \strokec6 setJobInterests\cf2 \strokec2 (\cf7 \strokec7 prev\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  prev.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 item\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{\cf5 \strokec5 ...\cf2 \strokec2 item, user: users.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.id \cf5 \strokec5 ===\cf2 \strokec2  item.userId)\})));\cb1 \
\cb4             \}\cb1 \
\cb4             \cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchInterests\cf2 \strokec2 ();\cb1 \
\cb4     \}, [currentUser.id]);\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (loading) \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2 ><\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-64 mb-4"\cf2 \strokec2  /><\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-32 w-full"\cf2 \strokec2  /></\cf3 \strokec3 div\cf2 \strokec2 >;\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Tabs\cf2 \strokec2  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf3 \strokec3 "theses"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "theses"\cf2 \strokec2 >Thesis Interests (\{thesisInterests.\cf8 \strokec8 length\cf2 \strokec2 \})</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "jobs"\cf2 \strokec2 >Job Applicants (\{jobInterests.\cf8 \strokec8 length\cf2 \strokec2 \})</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 TabsContent\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "theses"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "pt-4"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 ApplicantList\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Investment Thesis Interests"\cf2 \strokec2  \cf6 \strokec6 items\cf5 \strokec5 =\cf2 \strokec2 \{thesisInterests\} />\cb1 \
\cb4             </\cf8 \strokec8 TabsContent\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 TabsContent\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "jobs"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "pt-4"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 ApplicantList\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Job Applicants"\cf2 \strokec2  \cf6 \strokec6 items\cf5 \strokec5 =\cf2 \strokec2 \{jobInterests\} />\cb1 \
\cb4             </\cf8 \strokec8 TabsContent\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Tabs\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 FounderApplicantsView\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 currentUser\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 jobInterests\cf2 \strokec2 , \cf8 \strokec8 setJobInterests\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 ApplicantItem\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchInterests\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "jobs"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "founderId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , currentUser.id));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobsQuery);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myJobs\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  jobsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 ));\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (myJobs.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 interestsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "interests"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetType"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf3 \strokec3 "job"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetId"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , myJobs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 j\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  j.id)));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 interestsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (interestsQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 interestsData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  interestsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Interest\cf2 \strokec2 );\cb1 \
\cb4                 \cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userIds\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  interestsData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 i\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  i.userId);\cb1 \
\cb4                 \cb1 \
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (userIds.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "id"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , userIds));\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (usersQuery);\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 users\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\
\cb4                     \cf6 \strokec6 setJobInterests\cf2 \strokec2 (interestsData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 i\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{\cb1 \
\cb4                         \cf5 \strokec5 ...\cf2 \strokec2 i,\cb1 \
\cb4                         user: users.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  u.id \cf5 \strokec5 ===\cf2 \strokec2  i.userId),\cb1 \
\cb4                         targetName: myJobs.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 j\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  j.id \cf5 \strokec5 ===\cf2 \strokec2  i.targetId)?.title \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 'a job'\cf2 \cb1 \strokec2 \
\cb4                     \})));\cb1 \
\cb4                 \}\cb1 \
\cb4             \}\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchInterests\cf2 \strokec2 ();\cb1 \
\cb4     \}, [currentUser.id]);\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (loading) \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2 ><\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-64 mb-4"\cf2 \strokec2  /><\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-32 w-full"\cf2 \strokec2  /></\cf3 \strokec3 div\cf2 \strokec2 >;\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 ApplicantList\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Job Applicants"\cf2 \strokec2  \cf6 \strokec6 items\cf5 \strokec5 =\cf2 \strokec2 \{jobInterests\} />;\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 ApplicantsPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  authUser) \{\cb1 \
\cb4             \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ().\cf6 \strokec6 then\cf2 \strokec2 (\cf7 \strokec7 user\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                 \cf6 \strokec6 setCurrentUser\cf2 \strokec2 (user);\cb1 \
\cb4                 \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4             \});\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4     \}, [authUser, authLoading]);\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (loading) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-48 mb-2"\cf2 \strokec2 />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-4 w-72"\cf2 \strokec2 />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-48 w-full"\cf2 \strokec2 />\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \{\cb1 \
\cb4         \cf9 \strokec9 // This can be a redirect or a login prompt\cf2 \cb1 \strokec2 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2 >Please log in to view applicants.</\cf3 \strokec3 div\cf2 \strokec2 >;\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isInvestor\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isPremiumFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isFounder \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isPremium;\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (isFounder \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 isPremiumFounder) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Lock\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Upgrade to Oki+</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >This feature is available exclusively for Oki+ members. Upgrade your plan to view and manage job applicants.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "lg"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/settings/billing"\cf2 \strokec2 >Upgrade to Oki+</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isInvestor \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 isPremiumFounder) \{\cb1 \
\cb4          \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Access Denied</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >This page is only available to Investors and Oki+ Founders.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >Applicants</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >See who has expressed interest in your content.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             \{isInvestor \cf5 \strokec5 ?\cf2 \strokec2  <\cf8 \strokec8 InvestorApplicantsView\cf2 \strokec2  \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\} /> \cf5 \strokec5 :\cf2 \strokec2  <\cf8 \strokec8 FounderApplicantsView\cf2 \strokec2  \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\} />\}\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}\cb1 \
\
}