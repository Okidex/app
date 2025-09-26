{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;\red93\green93\blue93;
}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;\cssrgb\c43922\c43922\c43922;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState, useEffect \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ getCurrentUser \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/data"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Tabs, TabsContent, TabsList, TabsTrigger \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/tabs"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ FullUserProfile, Interest, FounderProfile, Job, InvestmentThesis \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/types"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  Link \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/link"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  UserAvatar \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/shared/user-avatar"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ formatDistanceToNow \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "date-fns"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Lock \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ collection, query, where, getDocs \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "firebase/firestore"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ db \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/firebase"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  useAuth \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/hooks/use-auth"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Skeleton \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/skeleton"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 type\cf4 \strokec4  \cf6 \strokec6 ApplicantItem\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 Interest\cf4 \strokec4  \cf5 \strokec5 &\cf4 \strokec4  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 FullUserProfile\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 undefined\cf4 \strokec4 ; \cf7 \strokec7 targetName\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4  \};\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 ApplicantList\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\{ \cf7 \strokec7 title\cf4 \strokec4 , \cf7 \strokec7 items\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \{ \cf7 \strokec7 title\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 ; \cf7 \strokec7 items\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 ApplicantItem\cf4 \strokec4 [] \}) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 h2\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-xl font-semibold mb-4"\cf4 \strokec4 >\{title\}</\cf2 \strokec2 h2\cf4 \strokec4 >\cb1 \
\cb3             \{items.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4  \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-4"\cf4 \strokec4 >\cb1 \
\cb3                     \{items.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 interest\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Card\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{interest.id\}>\cb1 \
\cb3                             <\cf8 \strokec8 CardContent\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "p-4 flex items-center justify-between"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center gap-4"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf8 \strokec8 UserAvatar\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf4 \strokec4 \{interest.user?.name \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 ''\cf4 \strokec4 \} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf4 \strokec4 \{interest.user?.avatarUrl \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 ''\cf4 \strokec4 \} />\cb1 \
\cb3                                     <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf2 \strokec2 p\cf4 \strokec4 ><\cf2 \strokec2 span\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "font-semibold"\cf4 \strokec4 >\{interest.user?.name\}</\cf2 \strokec2 span\cf4 \strokec4 > expressed interest in <\cf2 \strokec2 span\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "font-semibold"\cf4 \strokec4 >\{interest.targetName\}</\cf2 \strokec2 span\cf4 \strokec4 ></\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-sm text-muted-foreground"\cf4 \strokec4 >\{\cf6 \strokec6 formatDistanceToNow\cf4 \strokec4 (\cf5 \strokec5 new\cf4 \strokec4  \cf6 \strokec6 Date\cf4 \strokec4 (interest.timestamp), \{ addSuffix: \cf8 \strokec8 true\cf4 \strokec4  \})\}</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3                                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 asChild\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "outline"\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf8 \strokec8 Link\cf4 \strokec4  \cf6 \strokec6 href\cf5 \strokec5 =\cf4 \strokec4 \{\cf2 \strokec2 `/users/$\{\cf4 \strokec4 interest\cf2 \strokec2 .\cf4 \strokec4 userId\cf2 \strokec2 \}`\cf4 \strokec4 \}>View Profile</\cf8 \strokec8 Link\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                             </\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3                     ))\}\cb1 \
\cb3                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                 <\cf8 \strokec8 Card\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-center p-8"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >No applicants for this category yet.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3                 </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3             )\}\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     )\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 InvestorApplicantsView\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\{ \cf7 \strokec7 currentUser\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \{ \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 FullUserProfile\cf4 \strokec4  \}) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 thesisInterests\cf4 \strokec4 , \cf8 \strokec8 setThesisInterests\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 ApplicantItem\cf4 \strokec4 []>([]);\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 jobInterests\cf4 \strokec4 , \cf8 \strokec8 setJobInterests\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 ApplicantItem\cf4 \strokec4 []>([]);\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 loading\cf4 \strokec4 , \cf8 \strokec8 setLoading\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\
\cb3     \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 fetchInterests\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3             \cf9 \strokec9 // Fetch theses created by investor\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 thesesQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "theses"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "investorId"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , currentUser.id));\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 thesesSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (thesesQuery);\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 myTheses\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  thesesSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{ id: doc.id, \cf5 \strokec5 ...\cf4 \strokec4 doc.\cf6 \strokec6 data\cf4 \strokec4 () \} \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 InvestmentThesis\cf4 \strokec4 ));\cb1 \
\
\cb3             \cf9 \strokec9 // Fetch jobs created by investor\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobsQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "jobs"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "founderId"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , currentUser.id));\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobsSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (jobsQuery);\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 myJobs\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  jobsSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{ id: doc.id, \cf5 \strokec5 ...\cf4 \strokec4 doc.\cf6 \strokec6 data\cf4 \strokec4 () \} \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Job\cf4 \strokec4 ));\cb1 \
\
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 allUserIds\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 [] \cf5 \strokec5 =\cf4 \strokec4  [];\cb1 \
\
\cb3             \cf9 \strokec9 // Fetch interests for theses\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 if\cf4 \strokec4  (myTheses.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \{\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 thesisInterestsQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "interests"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetType"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , \cf2 \strokec2 "thesis"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetId"\cf4 \strokec4 , \cf2 \strokec2 "in"\cf4 \strokec4 , myTheses.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 t\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  t.id)));\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 thesisInterestsSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (thesisInterestsQuery);\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 interestsData\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  thesisInterestsSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  doc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Interest\cf4 \strokec4 );\cb1 \
\cb3                 \cf6 \strokec6 setThesisInterests\cf4 \strokec4 (interestsData.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 i\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3                     \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 allUserIds.\cf6 \strokec6 includes\cf4 \strokec4 (i.userId)) allUserIds.\cf6 \strokec6 push\cf4 \strokec4 (i.userId);\cb1 \
\cb3                     \cf5 \strokec5 return\cf4 \strokec4  \{\cb1 \
\cb3                         \cf5 \strokec5 ...\cf4 \strokec4 i,\cb1 \
\cb3                         user: \cf8 \strokec8 undefined\cf4 \strokec4 ,\cb1 \
\cb3                         targetName: myTheses.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 t\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  t.id \cf5 \strokec5 ===\cf4 \strokec4  i.targetId)?.title \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 'a thesis'\cf4 \cb1 \strokec4 \
\cb3                     \}\cb1 \
\cb3                 \}));\cb1 \
\cb3             \}\cb1 \
\
\cb3             \cf9 \strokec9 // Fetch interests for jobs\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 if\cf4 \strokec4  (myJobs.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \{\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobInterestsQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "interests"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetType"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , \cf2 \strokec2 "job"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetId"\cf4 \strokec4 , \cf2 \strokec2 "in"\cf4 \strokec4 , myJobs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 j\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  j.id)));\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobInterestsSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (jobInterestsQuery);\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 interestsData\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  jobInterestsSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  doc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Interest\cf4 \strokec4 );\cb1 \
\cb3                 \cf6 \strokec6 setJobInterests\cf4 \strokec4 (interestsData.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 i\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3                     \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 allUserIds.\cf6 \strokec6 includes\cf4 \strokec4 (i.userId)) allUserIds.\cf6 \strokec6 push\cf4 \strokec4 (i.userId);\cb1 \
\cb3                     \cf5 \strokec5 return\cf4 \strokec4  \{\cb1 \
\cb3                         \cf5 \strokec5 ...\cf4 \strokec4 i,\cb1 \
\cb3                         user: \cf8 \strokec8 undefined\cf4 \strokec4 ,\cb1 \
\cb3                         targetName: myJobs.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 j\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  j.id \cf5 \strokec5 ===\cf4 \strokec4  i.targetId)?.title \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 'a job'\cf4 \cb1 \strokec4 \
\cb3                     \}\cb1 \
\cb3                 \}));\cb1 \
\cb3             \}\cb1 \
\cb3             \cb1 \
\cb3             \cf9 \strokec9 // Fetch user profiles for all interests\cf4 \cb1 \strokec4 \
\cb3             \cf5 \strokec5 if\cf4 \strokec4 (allUserIds.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \{\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 usersQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "users"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "id"\cf4 \strokec4 , \cf2 \strokec2 "in"\cf4 \strokec4 , allUserIds));\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 usersSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (usersQuery);\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 users\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  usersSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  doc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FullUserProfile\cf4 \strokec4 );\cb1 \
\
\cb3                 \cf6 \strokec6 setThesisInterests\cf4 \strokec4 (\cf7 \strokec7 prev\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  prev.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 item\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{\cf5 \strokec5 ...\cf4 \strokec4 item, user: users.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 u\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  u.id \cf5 \strokec5 ===\cf4 \strokec4  item.userId)\})));\cb1 \
\cb3                 \cf6 \strokec6 setJobInterests\cf4 \strokec4 (\cf7 \strokec7 prev\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  prev.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 item\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{\cf5 \strokec5 ...\cf4 \strokec4 item, user: users.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 u\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  u.id \cf5 \strokec5 ===\cf4 \strokec4  item.userId)\})));\cb1 \
\cb3             \}\cb1 \
\cb3             \cb1 \
\cb3             \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3         \};\cb1 \
\cb3         \cf6 \strokec6 fetchInterests\cf4 \strokec4 ();\cb1 \
\cb3     \}, [currentUser.id]);\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (loading) \cf5 \strokec5 return\cf4 \strokec4  <\cf2 \strokec2 div\cf4 \strokec4 ><\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-10 w-64 mb-4"\cf4 \strokec4  /><\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-32 w-full"\cf4 \strokec4  /></\cf2 \strokec2 div\cf4 \strokec4 >;\cb1 \
\
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf8 \strokec8 Tabs\cf4 \strokec4  \cf6 \strokec6 defaultValue\cf5 \strokec5 =\cf2 \strokec2 "theses"\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 TabsList\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 TabsTrigger\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "theses"\cf4 \strokec4 >Thesis Interests (\{thesisInterests.\cf8 \strokec8 length\cf4 \strokec4 \})</\cf8 \strokec8 TabsTrigger\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 TabsTrigger\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "jobs"\cf4 \strokec4 >Job Applicants (\{jobInterests.\cf8 \strokec8 length\cf4 \strokec4 \})</\cf8 \strokec8 TabsTrigger\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 TabsList\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 TabsContent\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "theses"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "pt-4"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 ApplicantList\cf4 \strokec4  \cf6 \strokec6 title\cf5 \strokec5 =\cf2 \strokec2 "Investment Thesis Interests"\cf4 \strokec4  \cf6 \strokec6 items\cf5 \strokec5 =\cf4 \strokec4 \{thesisInterests\} />\cb1 \
\cb3             </\cf8 \strokec8 TabsContent\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 TabsContent\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 "jobs"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "pt-4"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 ApplicantList\cf4 \strokec4  \cf6 \strokec6 title\cf5 \strokec5 =\cf2 \strokec2 "Job Applicants"\cf4 \strokec4  \cf6 \strokec6 items\cf5 \strokec5 =\cf4 \strokec4 \{jobInterests\} />\cb1 \
\cb3             </\cf8 \strokec8 TabsContent\cf4 \strokec4 >\cb1 \
\cb3         </\cf8 \strokec8 Tabs\cf4 \strokec4 >\cb1 \
\cb3     );\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 FounderApplicantsView\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\{ \cf7 \strokec7 currentUser\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \{ \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 FullUserProfile\cf4 \strokec4  \}) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 jobInterests\cf4 \strokec4 , \cf8 \strokec8 setJobInterests\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 ApplicantItem\cf4 \strokec4 []>([]);\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 loading\cf4 \strokec4 , \cf8 \strokec8 setLoading\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\
\cb3     \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 fetchInterests\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobsQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "jobs"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "founderId"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , currentUser.id));\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 jobsSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (jobsQuery);\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 myJobs\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  jobsSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{ id: doc.id, \cf5 \strokec5 ...\cf4 \strokec4 doc.\cf6 \strokec6 data\cf4 \strokec4 () \} \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Job\cf4 \strokec4 ));\cb1 \
\
\cb3             \cf5 \strokec5 if\cf4 \strokec4  (myJobs.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \{\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 interestsQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "interests"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetType"\cf4 \strokec4 , \cf2 \strokec2 "=="\cf4 \strokec4 , \cf2 \strokec2 "job"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "targetId"\cf4 \strokec4 , \cf2 \strokec2 "in"\cf4 \strokec4 , myJobs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 j\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  j.id)));\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 interestsSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (interestsQuery);\cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 interestsData\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  interestsSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  doc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 Interest\cf4 \strokec4 );\cb1 \
\cb3                 \cb1 \
\cb3                 \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 userIds\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  interestsData.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 i\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  i.userId);\cb1 \
\cb3                 \cb1 \
\cb3                 \cf5 \strokec5 if\cf4 \strokec4  (userIds.\cf8 \strokec8 length\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \{\cb1 \
\cb3                     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 usersQuery\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 query\cf4 \strokec4 (\cf6 \strokec6 collection\cf4 \strokec4 (db, \cf2 \strokec2 "users"\cf4 \strokec4 ), \cf6 \strokec6 where\cf4 \strokec4 (\cf2 \strokec2 "id"\cf4 \strokec4 , \cf2 \strokec2 "in"\cf4 \strokec4 , userIds));\cb1 \
\cb3                     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 usersSnap\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 getDocs\cf4 \strokec4 (usersQuery);\cb1 \
\cb3                     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 users\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  usersSnap.docs.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 doc\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  doc.\cf6 \strokec6 data\cf4 \strokec4 () \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FullUserProfile\cf4 \strokec4 );\cb1 \
\
\cb3                     \cf6 \strokec6 setJobInterests\cf4 \strokec4 (interestsData.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 i\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\{\cb1 \
\cb3                         \cf5 \strokec5 ...\cf4 \strokec4 i,\cb1 \
\cb3                         user: users.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 u\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  u.id \cf5 \strokec5 ===\cf4 \strokec4  i.userId),\cb1 \
\cb3                         targetName: myJobs.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 j\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  j.id \cf5 \strokec5 ===\cf4 \strokec4  i.targetId)?.title \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 'a job'\cf4 \cb1 \strokec4 \
\cb3                     \})));\cb1 \
\cb3                 \}\cb1 \
\cb3             \}\cb1 \
\cb3             \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3         \};\cb1 \
\cb3         \cf6 \strokec6 fetchInterests\cf4 \strokec4 ();\cb1 \
\cb3     \}, [currentUser.id]);\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (loading) \cf5 \strokec5 return\cf4 \strokec4  <\cf2 \strokec2 div\cf4 \strokec4 ><\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-10 w-64 mb-4"\cf4 \strokec4  /><\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-32 w-full"\cf4 \strokec4  /></\cf2 \strokec2 div\cf4 \strokec4 >;\cb1 \
\
\cb3     \cf5 \strokec5 return\cf4 \strokec4  <\cf8 \strokec8 ApplicantList\cf4 \strokec4  \cf6 \strokec6 title\cf5 \strokec5 =\cf2 \strokec2 "Job Applicants"\cf4 \strokec4  \cf6 \strokec6 items\cf5 \strokec5 =\cf4 \strokec4 \{jobInterests\} />;\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 ApplicantsPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf5 \strokec5 const\cf4 \strokec4  \{ \cf7 \strokec7 user\cf4 \strokec4 : \cf8 \strokec8 authUser\cf4 \strokec4 , \cf7 \strokec7 loading\cf4 \strokec4 : \cf8 \strokec8 authLoading\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useAuth\cf4 \strokec4 ();\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 currentUser\cf4 \strokec4 , \cf8 \strokec8 setCurrentUser\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 FullUserProfile\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 >(\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 loading\cf4 \strokec4 , \cf8 \strokec8 setLoading\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\
\
\cb3     \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 authLoading \cf5 \strokec5 &&\cf4 \strokec4  authUser) \{\cb1 \
\cb3             \cf6 \strokec6 getCurrentUser\cf4 \strokec4 ().\cf6 \strokec6 then\cf4 \strokec4 (\cf7 \strokec7 user\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3                 \cf6 \strokec6 setCurrentUser\cf4 \strokec4 (user);\cb1 \
\cb3                 \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3             \});\cb1 \
\cb3         \} \cf5 \strokec5 else\cf4 \strokec4  \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 authLoading \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 authUser) \{\cb1 \
\cb3             \cf6 \strokec6 setLoading\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3         \}\cb1 \
\cb3     \}, [authUser, authLoading]);\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (loading) \{\cb1 \
\cb3         \cf5 \strokec5 return\cf4 \strokec4  <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8 w-48 mb-2"\cf4 \strokec4 />\cb1 \
\cb3                 <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-4 w-72"\cf4 \strokec4 />\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-48 w-full"\cf4 \strokec4 />\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     \}\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 currentUser) \{\cb1 \
\cb3         \cf9 \strokec9 // This can be a redirect or a login prompt\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 return\cf4 \strokec4  <\cf2 \strokec2 div\cf4 \strokec4 >Please log in to view applicants.</\cf2 \strokec2 div\cf4 \strokec4 >;\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 isInvestor\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  currentUser.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'investor'\cf4 \strokec4 ;\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 isFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  currentUser.role \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'founder'\cf4 \strokec4 ;\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 isPremiumFounder\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isFounder \cf5 \strokec5 &&\cf4 \strokec4  (currentUser.profile \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 FounderProfile\cf4 \strokec4 ).isPremium;\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (isFounder \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 isPremiumFounder) \{\cb1 \
\cb3         \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-col items-center justify-center h-full text-center"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Card\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-full max-w-md p-8"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 Lock\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-8 h-8"\cf4 \strokec4  />\cb1 \
\cb3                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardTitle\cf4 \strokec4 >Upgrade to Oki+</\cf8 \strokec8 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardDescription\cf4 \strokec4 >This feature is available exclusively for Oki+ members. Upgrade your plan to view and manage job applicants.</\cf8 \strokec8 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 asChild\cf4 \strokec4  \cf6 \strokec6 size\cf5 \strokec5 =\cf2 \strokec2 "lg"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 Link\cf4 \strokec4  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 "/settings/billing"\cf4 \strokec4 >Upgrade to Oki+</\cf8 \strokec8 Link\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                     </\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         )\cb1 \
\cb3     \}\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 isInvestor \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 isPremiumFounder) \{\cb1 \
\cb3          \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3              <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-col items-center justify-center h-full text-center"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Card\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-full max-w-md p-8"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardTitle\cf4 \strokec4 >Access Denied</\cf8 \strokec8 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardDescription\cf4 \strokec4 >This page is only available to Investors and Oki+ Founders.</\cf8 \strokec8 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         )\cb1 \
\cb3     \}\cb1 \
\
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                 <\cf2 \strokec2 h1\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-2xl font-bold font-headline"\cf4 \strokec4 >Applicants</\cf2 \strokec2 h1\cf4 \strokec4 >\cb1 \
\cb3                 <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-muted-foreground"\cf4 \strokec4 >See who has expressed interest in your content.</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             \{isInvestor \cf5 \strokec5 ?\cf4 \strokec4  <\cf8 \strokec8 InvestorApplicantsView\cf4 \strokec4  \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf4 \strokec4 \{currentUser\} /> \cf5 \strokec5 :\cf4 \strokec4  <\cf8 \strokec8 FounderApplicantsView\cf4 \strokec4  \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf4 \strokec4 \{currentUser\} />\}\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     );\cb1 \
\cb3 \}\cb1 \
\
}