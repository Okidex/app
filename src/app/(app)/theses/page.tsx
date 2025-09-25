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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Badge \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/badge"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Input \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/input"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Select, SelectContent, SelectItem, SelectTrigger, SelectValue \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/select"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ HandCoins, Lock, PlusCircle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FounderProfile, InvestmentThesis, TalentProfile, FullUserProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/dialog"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Label \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/label"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Textarea \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/textarea"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Checkbox \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/checkbox"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useToast \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-toast"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  TalentInterestPrompt \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/theses/talent-interest-prompt"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, query, getDocs, orderBy, addDoc, where \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 type\cf2 \strokec2  \cf6 \strokec6 ThesisWithAuthor\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 InvestmentThesis\cf2 \strokec2  \cf5 \strokec5 &\cf2 \strokec2  \{ \cf7 \strokec7 author\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \};\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 ThesesPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 theses\cf2 \strokec2 , \cf8 \strokec8 setTheses\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 ThesisWithAuthor\cf2 \strokec2 []>([]);\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 isPostThesisOpen\cf2 \strokec2 , \cf8 \strokec8 setIsPostThesisOpen\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 showTalentPrompt\cf2 \strokec2 , \cf8 \strokec8 setShowTalentPrompt\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 toast\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useToast\cf2 \strokec2 ();\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  authUser) \{\cb1 \
\cb4       \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ().\cf6 \strokec6 then\cf2 \strokec2 (setCurrentUser);\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4       \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4   \}, [authUser, authLoading]);\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4       \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchTheses\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4           \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "theses"\cf2 \strokec2 ), \cf6 \strokec6 orderBy\cf2 \strokec2 (\cf3 \strokec3 "postedAt"\cf2 \strokec2 , \cf3 \strokec3 "desc"\cf2 \strokec2 ));\cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 querySnapshot\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (thesesQuery);\cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  querySnapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestmentThesis\cf2 \strokec2 ));\cb1 \
\
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 authorIds\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cf5 \strokec5 ...new\cf2 \strokec2  \cf6 \strokec6 Set\cf2 \strokec2 (thesesData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 t\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  t.investorId))];\cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 authors\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 [] \cf5 \strokec5 =\cf2 \strokec2  [];\cb1 \
\cb4           \cb1 \
\cb4           \cf5 \strokec5 if\cf2 \strokec2 (authorIds.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "id"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , authorIds));\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (usersQuery);\cb1 \
\cb4             usersSnap.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4               authors.\cf6 \strokec6 push\cf2 \strokec2 (doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\cb4             \});\cb1 \
\cb4           \}\cb1 \
\cb4           \cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 thesesWithAuthors\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  thesesData.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 thesis\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{\cb1 \
\cb4               \cf5 \strokec5 ...\cf2 \strokec2 thesis,\cb1 \
\cb4               author: authors.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 a\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  a.id \cf5 \strokec5 ===\cf2 \strokec2  thesis.investorId),\cb1 \
\cb4           \}));\cb1 \
\
\cb4           \cf6 \strokec6 setTheses\cf2 \strokec2 (thesesWithAuthors);\cb1 \
\cb4           \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4       \};\cb1 \
\cb4       \cf6 \strokec6 fetchTheses\cf2 \strokec2 ();\cb1 \
\cb4   \}, []);\cb1 \
\cb4   \cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 newThesis\cf2 \strokec2 , \cf8 \strokec8 setNewThesis\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\{\cb1 \
\cb4     title: \cf3 \strokec3 ""\cf2 \strokec2 ,\cb1 \
\cb4     summary: \cf3 \strokec3 ""\cf2 \strokec2 ,\cb1 \
\cb4     isAnonymous: \cf8 \strokec8 true\cf2 \strokec2 ,\cb1 \
\cb4   \});\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handlePostThesis\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  (\cf7 \strokec7 e\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 FormEvent\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     e.\cf6 \strokec6 preventDefault\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 newThesisData\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Omit\cf2 \strokec2 <\cf6 \strokec6 InvestmentThesis\cf2 \strokec2 , \cf3 \strokec3 "id"\cf2 \strokec2 > \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4       investorId: currentUser.id,\cb1 \
\cb4       title: newThesis.title,\cb1 \
\cb4       summary: newThesis.summary,\cb1 \
\cb4       industries: [\cf3 \strokec3 'SaaS'\cf2 \strokec2 , \cf3 \strokec3 'AI'\cf2 \strokec2 ], \cf9 \cb4 \strokec9 // Placeholder\cf2 \cb1 \strokec2 \
\cb4       stages: [\cf3 \strokec3 'Seed'\cf2 \strokec2 ], \cf9 \cb4 \strokec9 // Placeholder\cf2 \cb1 \strokec2 \
\cb4       geographies: [\cf3 \strokec3 'Global'\cf2 \strokec2 ], \cf9 \cb4 \strokec9 // Placeholder\cf2 \cb1 \strokec2 \
\cb4       postedAt: \cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 ().\cf6 \strokec6 toISOString\cf2 \strokec2 (),\cb1 \
\cb4       isAnonymous: newThesis.isAnonymous,\cb1 \
\cb4     \};\cb1 \
\cb4     \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 docRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 addDoc\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'theses'\cf2 \strokec2 ), newThesisData);\cb1 \
\cb4         \cf6 \strokec6 setTheses\cf2 \strokec2 ([\{ \cf5 \strokec5 ...\cf2 \strokec2 newThesisData, id: docRef.id, author: currentUser \}, \cf5 \strokec5 ...\cf2 \strokec2 theses]);\cb1 \
\cb4         \cf6 \strokec6 setIsPostThesisOpen\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \cf6 \strokec6 setNewThesis\cf2 \strokec2 (\{ title: \cf3 \strokec3 ""\cf2 \strokec2 , summary: \cf3 \strokec3 ""\cf2 \strokec2 , isAnonymous: \cf8 \strokec8 true\cf2 \strokec2  \});\cb1 \
\cb4         \cf6 \strokec6 toast\cf2 \strokec2 (\{ title: \cf3 \strokec3 "Thesis Posted"\cf2 \strokec2 , description: \cf3 \strokec3 "Your investment thesis has been posted."\cf2 \strokec2  \});\cb1 \
\cb4     \} \cf5 \strokec5 catch\cf2 \strokec2 (e) \{\cb1 \
\cb4         \cf6 \strokec6 toast\cf2 \strokec2 (\{ title: \cf3 \strokec3 "Error"\cf2 \strokec2 , description: \cf3 \strokec3 "Could not post thesis."\cf2 \strokec2 , variant: \cf3 \strokec3 'destructive'\cf2 \strokec2 \});\cb1 \
\cb4     \}\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleExpressInterest\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 thesisTitle\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (currentUser?.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).subRole \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf6 \strokec6 setShowTalentPrompt\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf6 \strokec6 toast\cf2 \strokec2 (\{\cb1 \
\cb4         title: \cf3 \strokec3 "Interest Expressed!"\cf2 \strokec2 ,\cb1 \
\cb4         description: \cf3 \strokec3 `Your interest in "$\{\cf2 \strokec2 thesisTitle\cf3 \strokec3 \}" has been sent to the investor.`\cf2 \cb1 \strokec2 \
\cb4     \});\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-64"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-32"\cf2 \strokec2  />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-16 w-full"\cf2 \strokec2  />\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-1 md:grid-cols-2 gap-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-64"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-64"\cf2 \strokec2  />\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4   \}\cb1 \
\cb4   \cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser?.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isInvestor\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser?.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isTalent\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser?.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isPremiumFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isFounder \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isPremium;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isCoFounderTalent\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isTalent \cf5 \strokec5 &&\cf2 \strokec2  (currentUser.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ).subRole \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ;\cb1 \
\
\cb4   \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isInvestor \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 isPremiumFounder \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 isCoFounderTalent) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4       <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col items-center justify-center h-full text-center"\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full max-w-md p-8"\cf2 \strokec2 >\cb1 \
\cb4               <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                   <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Lock\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-8 h-8"\cf2 \strokec2  />\cb1 \
\cb4                   </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Access Restricted</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     \{isFounder \cf5 \strokec5 ?\cf2 \strokec2  \cb1 \
\cb4                       \cf3 \strokec3 "This feature is available exclusively for Oki+ members. Upgrade your plan to view investor theses."\cf2 \strokec2  \cf5 \strokec5 :\cf2 \cb1 \strokec2 \
\cb4                       \cf3 \strokec3 "This feature is available for talent seeking co-founder roles. Update your profile to gain access."\cf2 \cb1 \strokec2 \
\cb4                     \}\cb1 \
\cb4                   </\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4               </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4               <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "lg"\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{isFounder \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "/settings/billing"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "/profile/edit"\cf2 \strokec2 \}>\cb1 \
\cb4                         \{isFounder \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "Upgrade to Oki+"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "Update Profile"\cf2 \strokec2 \}\cb1 \
\cb4                       </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                   </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4               </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4           </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4       </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4       <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-center"\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4           <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >Investment Theses</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4           <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >Discover what investors are looking for, directly from them.</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         \{isInvestor \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setIsPostThesisOpen\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 )\}>\cb1 \
\cb4                 <\cf8 \strokec8 PlusCircle\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  /> Post a Thesis\cb1 \
\cb4             </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4         )\}\cb1 \
\cb4       </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4       \cb1 \
\cb4        <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-4 flex flex-col md:flex-row gap-4"\cf2 \strokec2 >\cb1 \
\cb4               <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Search by industry, stage, or keyword..."\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2  />\cb1 \
\cb4               <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex gap-4"\cf2 \strokec2 >\cb1 \
\cb4                    <\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 SelectTrigger\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full md:w-[180px]"\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Industry"\cf2 \strokec2  />\cb1 \
\cb4                       </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "ai"\cf2 \strokec2 >Artificial Intelligence</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "fintech"\cf2 \strokec2 >Fintech</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "saas"\cf2 \strokec2 >SaaS</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "health"\cf2 \strokec2 >Healthcare Tech</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                       </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                   </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 SelectTrigger\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full md:w-[180px]"\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Stage"\cf2 \strokec2  />\cb1 \
\cb4                       </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "pre-seed"\cf2 \strokec2 >Pre-seed</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "seed"\cf2 \strokec2 >Seed</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "series-a"\cf2 \strokec2 >Series A</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                       </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                   </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4               </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4           </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4     \cb1 \
\cb4       <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid grid-cols-1 md:grid-cols-2 gap-6"\cf2 \strokec2 >\cb1 \
\cb4         \{theses.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 thesis\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 displayAnonymous\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isTalent \cf5 \strokec5 ||\cf2 \strokec2  thesis.isAnonymous \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 thesis.author;\cb1 \
\
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{thesis.id\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-start justify-between"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardTitle\cf2 \strokec2 >\{thesis.title\}</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                     \{displayAnonymous \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >Anonymous Investor</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                     ) \cf5 \strokec5 :\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2 mt-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{thesis.author\cf5 \strokec5 !\cf2 \strokec2 .name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{thesis.author\cf5 \strokec5 !\cf2 \strokec2 .avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-8"\cf2 \strokec2  />\cb1 \
\cb4                             <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm font-medium"\cf2 \strokec2 >\{thesis.author\cf5 \strokec5 !\cf2 \strokec2 .name\}</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 HandCoins\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-8 h-8 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap gap-2 mb-4"\cf2 \strokec2 >\cb1 \
\cb4                 \{thesis.industries.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 i\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{i\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{i\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                 \{thesis.stages.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 s\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{s\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\{s\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >\{thesis.summary\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Button\cf2 \strokec2  \cb1 \
\cb4                     \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full"\cf2 \strokec2  \cb1 \
\cb4                     \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 handleExpressInterest\cf2 \strokec2 (thesis.title)\}\cb1 \
\cb4                     \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 \{isTalent \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "secondary"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "default"\cf2 \strokec2 \}\cb1 \
\cb4                 >\cb1 \
\cb4                     Express Interest\cb1 \
\cb4                 </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4         \})\}\cb1 \
\cb4     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\
\
\cb4        <\cf8 \strokec8 Dialog\cf2 \strokec2  \cf6 \strokec6 open\cf5 \strokec5 =\cf2 \strokec2 \{isPostThesisOpen\} \cf6 \strokec6 onOpenChange\cf5 \strokec5 =\cf2 \strokec2 \{setIsPostThesisOpen\}>\cb1 \
\cb4           <\cf8 \strokec8 DialogContent\cf2 \strokec2 >\cb1 \
\cb4               <\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 DialogTitle\cf2 \strokec2 >Post a New Investment Thesis</\cf8 \strokec8 DialogTitle\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 DialogDescription\cf2 \strokec2 >Share your investment focus with the community. You can choose to post anonymously.</\cf8 \strokec8 DialogDescription\cf2 \strokec2 >\cb1 \
\cb4               </\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4               <\cf3 \strokec3 form\cf2 \strokec2  \cf6 \strokec6 onSubmit\cf5 \strokec5 =\cf2 \strokec2 \{handlePostThesis\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                   <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "thesis-title"\cf2 \strokec2 >Title</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "thesis-title"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newThesis.title\} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 e\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewThesis\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newThesis, title: e.target.value \})\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "e.g., The Future of B2B SaaS"\cf2 \strokec2  \cf6 \strokec6 required\cf2 \strokec2  />\cb1 \
\cb4                   </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                   <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "thesis-summary"\cf2 \strokec2 >Summary</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Textarea\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "thesis-summary"\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{newThesis.summary\} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 e\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewThesis\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newThesis, summary: e.target.value \})\} \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Describe your investment thesis, including what you look for in startups..."\cf2 \strokec2  \cf6 \strokec6 required\cf2 \strokec2  />\cb1 \
\cb4                   </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                   <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center space-x-2"\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Checkbox\cf2 \strokec2  \cf6 \strokec6 id\cf5 \strokec5 =\cf3 \strokec3 "anonymous-post"\cf2 \strokec2  \cf6 \strokec6 checked\cf5 \strokec5 =\cf2 \strokec2 \{newThesis.isAnonymous\} \cf6 \strokec6 onCheckedChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 checked\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setNewThesis\cf2 \strokec2 (\{ \cf5 \strokec5 ...\cf2 \strokec2 newThesis, isAnonymous: \cf5 \strokec5 !!\cf2 \strokec2 checked \})\} />\cb1 \
\cb4                       <\cf8 \strokec8 Label\cf2 \strokec2  \cf6 \strokec6 htmlFor\cf5 \strokec5 =\cf3 \strokec3 "anonymous-post"\cf2 \strokec2 >Post anonymously</\cf8 \strokec8 Label\cf2 \strokec2 >\cb1 \
\cb4                   </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                   <\cf8 \strokec8 DialogFooter\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 DialogClose\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                           <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 type\cf5 \strokec5 =\cf3 \strokec3 "button"\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >Cancel</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                       </\cf8 \strokec8 DialogClose\cf2 \strokec2 >\cb1 \
\cb4                       <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 type\cf5 \strokec5 =\cf3 \strokec3 "submit"\cf2 \strokec2 >Post Thesis</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                   </\cf8 \strokec8 DialogFooter\cf2 \strokec2 >\cb1 \
\cb4               </\cf3 \strokec3 form\cf2 \strokec2 >\cb1 \
\cb4           </\cf8 \strokec8 DialogContent\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 Dialog\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 TalentInterestPrompt\cf2 \strokec2  \cf6 \strokec6 open\cf5 \strokec5 =\cf2 \strokec2 \{showTalentPrompt\} \cf6 \strokec6 onOpenChange\cf5 \strokec5 =\cf2 \strokec2 \{setShowTalentPrompt\} />\cb1 \
\cb4     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}