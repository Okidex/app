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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useState, useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, Job, Startup, InvestmentThesis, FounderProfile, TalentProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, getDocs, query, where, limit \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  StatsCard \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/dashboard/stats-card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Activity, Briefcase, CheckCheck, DollarSign, FileText, Mail, Star, UserCheck, Users \cf5 \strokec5 as\cf2 \strokec2  UsersIcon, X \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  SearchBar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/search-bar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Image \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/image"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \strokec2 ;\cb1 \
\
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 DashboardPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 isUpgradeCardVisible\cf2 \strokec2 , \cf8 \strokec8 setIsUpgradeCardVisible\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 dashboardData\cf2 \strokec2 , \cf8 \strokec8 setDashboardData\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf8 \strokec8 any\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (authLoading) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ();\cb1 \
\cb4             \cf6 \strokec6 setCurrentUser\cf2 \strokec2 (userProfile);\cb1 \
\cb4             \cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 userProfile) \{\cb1 \
\cb4                 \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4             \}\cb1 \
\
\cb4             \cf5 \strokec5 let\cf2 \strokec2  data\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \{\};\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (userProfile.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 q\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "role"\cf2 \strokec2 , \cf3 \strokec3 "!="\cf2 \strokec2 , \cf3 \strokec3 "founder"\cf2 \strokec2 ), \cf6 \strokec6 limit\cf2 \strokec2 (\cf8 \strokec8 3\cf2 \strokec2 ));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 querySnapshot\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (q);\cb1 \
\cb4                 data.matches \cf5 \strokec5 =\cf2 \strokec2  querySnapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\cb4             \}\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (userProfile.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "theses"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "investorId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , userProfile.id));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myThesesSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (thesesQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myTheses\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  myThesesSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestmentThesis\cf2 \strokec2 );\cb1 \
\cb4                 data.myThesesCount \cf5 \strokec5 =\cf2 \strokec2  myTheses.\cf8 \strokec8 length\cf2 \strokec2 ;\cb1 \
\
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myJobsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "jobs"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "founderId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , userProfile.id));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myJobsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (myJobsQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 myJobs\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  myJobsSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 );\cb1 \
\
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (myTheses.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesisInterestsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "interests"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetType"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf3 \strokec3 "thesis"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetId"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , myTheses.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 t\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  t.id)));\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesisInterestsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (thesisInterestsQuery);\cb1 \
\cb4                     data.thesisInterestsCount \cf5 \strokec5 =\cf2 \strokec2  thesisInterestsSnap.size;\cb1 \
\cb4                 \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4                     data.thesisInterestsCount \cf5 \strokec5 =\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ;\cb1 \
\cb4                 \}\cb1 \
\
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (myJobs.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobInterestsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "interests"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetType"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf3 \strokec3 "job"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "targetId"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , myJobs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 j\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  j.id)));\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobInterestsSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobInterestsQuery);\cb1 \
\cb4                     data.jobInterestsCount \cf5 \strokec5 =\cf2 \strokec2  jobInterestsSnap.size;\cb1 \
\cb4                 \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4                      data.jobInterestsCount \cf5 \strokec5 =\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ;\cb1 \
\cb4                 \}\cb1 \
\cb4             \}\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (userProfile.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "jobs"\cf2 \strokec2 ), \cf6 \strokec6 limit\cf2 \strokec2 (\cf8 \strokec8 3\cf2 \strokec2 ));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 jobsSnapshot\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (jobsQuery);\cb1 \
\cb4                 data.recommendedJobs \cf5 \strokec5 =\cf2 \strokec2  jobsSnapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 );\cb1 \
\cb4             \}\cb1 \
\
\cb4             \cf6 \strokec6 setDashboardData\cf2 \strokec2 (data);\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\
\cb4         \cf6 \strokec6 fetchData\cf2 \strokec2 ();\cb1 \
\
\cb4     \}, [authUser, authLoading]);\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 currentUser \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 dashboardData) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col gap-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-64"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-full max-w-sm"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid gap-4 md:grid-cols-2 lg:grid-cols-4"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-28"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-28"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-28"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-28"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-64"\cf2 \strokec2  />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isPremiumFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isFounder \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isPremium;\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 renderFounderDashboard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4         <>\cb1 \
\cb4              \{\cf5 \strokec5 !\cf2 \strokec2 isPremiumFounder \cf5 \strokec5 &&\cf2 \strokec2  isUpgradeCardVisible \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "bg-primary/5 border-primary/20 relative"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Button\cf2 \strokec2  \cb1 \
\cb4                         \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "ghost"\cf2 \strokec2  \cb1 \
\cb4                         \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cb1 \
\cb4                         \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute top-2 right-2 h-6 w-6 text-muted-foreground"\cf2 \cb1 \strokec2 \
\cb4                         \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setIsUpgradeCardVisible\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 )\}\cb1 \
\cb4                     >\cb1 \
\cb4                         <\cf8 \strokec8 X\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-4 w-4"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "sr-only"\cf2 \strokec2 >Close</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-row items-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Star\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-6 h-6"\cf2 \strokec2  />\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Unlock Your Full Potential with Oki+</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardDescription\cf2 \strokec2 >Showcase your profile to investors, post jobs, and view exclusive investment theses.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/settings/billing"\cf2 \strokec2 >Upgrade to Oki+</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             )\}\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid gap-4 md:grid-cols-2 lg:grid-cols-4"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Profile Views"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "1,204"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{UsersIcon\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "+20.1% from last month"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/matches"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Active Matches"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "12"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{CheckCheck\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "+180.1% from last month"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/applicants"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Job Applicants"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "32"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{Briefcase\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "+19% from last month"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/applicants"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Investor Interest"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "4"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{DollarSign\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "From top-tier VCs"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid gap-4"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >New Matches</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                             New potential investors and talent.\cb1 \
\cb4                         </\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{dashboardData.matches.\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 match\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{match.id\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{match.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{match.avatarUrl\} />\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-medium"\cf2 \strokec2 >\{match.name\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground capitalize"\cf2 \strokec2 >\{match.role\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "sm"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `/users/$\{\cf2 \strokec2 match\cf3 \strokec3 .\cf2 \strokec2 id\cf3 \strokec3 \}`\cf2 \strokec2 \}>View</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         ))\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </>\cb1 \
\cb4     );\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 renderInvestorDashboard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid gap-4 md:grid-cols-2 lg:grid-cols-3"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/theses"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Theses Posted"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{dashboardData.myThesesCount.\cf6 \strokec6 toString\cf2 \strokec2 ()\} \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{FileText\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "Share your focus"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/applicants"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Thesis Applicants"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{dashboardData.thesisInterestsCount.\cf6 \strokec6 toString\cf2 \strokec2 ()\} \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{UsersIcon\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "Interest in your theses"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/applicants"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Job Applicants"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{dashboardData.jobInterestsCount.\cf6 \strokec6 toString\cf2 \strokec2 ()\} \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{Briefcase\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "Interest in your jobs"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Startups Viewed"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "89"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{Activity\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "+15 from last week"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/matches"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Active Matches"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "5"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{CheckCheck\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "Ready for outreach"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/search"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "New Opportunities"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "18"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{DollarSign\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "In your target industries"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         );\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 RecommendedJobCard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 job\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 job\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-start gap-4"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{job.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{job.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 40\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 40\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "rounded-full border"\cf2 \strokec2  \cf6 \strokec6 data-ai-hint\cf5 \strokec5 =\cf3 \strokec3 "logo"\cf2 \strokec2  />\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-semibold"\cf2 \strokec2 >\{job.title\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >\{job.companyName\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground mt-1 line-clamp-2"\cf2 \strokec2 >\{job.description\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "sm"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/jobs"\cf2 \strokec2 >View</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 renderTalentDashboard\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isCoFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).subRole \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ;\cb1 \
\cb4         \cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-1 lg:grid-cols-3 gap-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "lg:col-span-2 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Job Matches (\{dashboardData.recommendedJobs.\cf8 \strokec8 length\cf2 \strokec2 \})</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardDescription\cf2 \strokec2 >Recommended jobs that match your profile and skills.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                             \{dashboardData.recommendedJobs.\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 job\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Job\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 RecommendedJobCard\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{job.id\} \cf6 \strokec6 job\cf5 \strokec5 =\cf2 \strokec2 \{job\} />)\}\cb1 \
\cb4                         </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "lg:col-span-1 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                      <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid gap-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Profile Views"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "350"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{UsersIcon\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "+32 from last week"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/jobs"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Applications"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "3"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{FileText\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "2 viewed, 1 pending"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                         \{isCoFounder \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/matches"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Co-founder Matches"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "8"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{UserCheck\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "Potential co-founders"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\}\cb1 \
\cb4                         <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/messages"\cf2 \strokec2 ><\cf8 \strokec8 StatsCard\cf2 \strokec2  \cf6 \strokec6 title\cf5 \strokec5 =\cf3 \strokec3 "Messages"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "1"\cf2 \strokec2  \cf6 \strokec6 icon\cf5 \strokec5 =\cf2 \strokec2 \{Mail\} \cf6 \strokec6 description\cf5 \strokec5 =\cf3 \strokec3 "From InnovateAI"\cf2 \strokec2  /></\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         );\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col gap-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >Welcome back, \{currentUser.name.\cf6 \strokec6 split\cf2 \strokec2 (\cf3 \strokec3 ' '\cf2 \strokec2 )[\cf8 \strokec8 0\cf2 \strokec2 ]\}!</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-sm"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 SearchBar\cf2 \strokec2  \cf6 \strokec6 userRole\cf5 \strokec5 =\cf2 \strokec2 \{currentUser.role\} />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             \{currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf6 \strokec6 renderFounderDashboard\cf2 \strokec2 ()\}\cb1 \
\cb4             \{currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf6 \strokec6 renderInvestorDashboard\cf2 \strokec2 ()\}\cb1 \
\cb4             \{currentUser.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf6 \strokec6 renderTalentDashboard\cf2 \strokec2 ()\}\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}}