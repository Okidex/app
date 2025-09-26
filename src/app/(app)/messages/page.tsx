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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Input \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/input"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Send \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ cn \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/utils"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Conversation, FullUserProfile, Message \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, query, where, getDocs, onSnapshot \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 MessagesPage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 conversations\cf2 \strokec2 , \cf8 \strokec8 setConversations\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Conversation\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 activeConversationId\cf2 \strokec2 , \cf8 \strokec8 setActiveConversationId\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf8 \strokec8 string\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  authUser) \{\cb1 \
\cb4             \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ().\cf6 \strokec6 then\cf2 \strokec2 (setCurrentUser);\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authLoading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 authUser) \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4     \}, [authUser, authLoading]);\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\
\cb4         \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 q\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "conversations"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "participantIds"\cf2 \strokec2 , \cf3 \strokec3 "array-contains"\cf2 \strokec2 , currentUser.id));\cb1 \
\cb4         \cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 unsubscribe\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 onSnapshot\cf2 \strokec2 (q, \cf5 \strokec5 async\cf2 \strokec2  (\cf7 \strokec7 snapshot\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 convos\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  snapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Conversation\cf2 \strokec2 ));\cb1 \
\cb4             \cb1 \
\cb4             \cf9 \strokec9 // Get all other participant IDs to fetch their user data\cf2 \cb1 \strokec2 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 otherParticipantIds\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  convos.\cf6 \strokec6 flatMap\cf2 \strokec2 (\cf7 \strokec7 c\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  c.participantIds).\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 id\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  id \cf5 \strokec5 !==\cf2 \strokec2  currentUser.id);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 uniqueParticipantIds\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cf5 \strokec5 ...new\cf2 \strokec2  \cf6 \strokec6 Set\cf2 \strokec2 (otherParticipantIds)];\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (uniqueParticipantIds.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "id"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , uniqueParticipantIds));\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (usersQuery);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersSnap.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\cb4                 \cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 populatedConvos\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  convos.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 convo\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 otherParticipant\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersData.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  convo.participantIds.\cf6 \strokec6 includes\cf2 \strokec2 (u.id) \cf5 \strokec5 &&\cf2 \strokec2  u.id \cf5 \strokec5 !==\cf2 \strokec2  currentUser.id);\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 participants\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [currentUser, otherParticipant].\cf6 \strokec6 filter\cf2 \strokec2 (Boolean) \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 [];\cb1 \
\cb4                     \cf5 \strokec5 return\cf2 \strokec2  \{ \cf5 \strokec5 ...\cf2 \strokec2 convo, participants \};\cb1 \
\cb4                 \});\cb1 \
\cb4                 \cb1 \
\cb4                 \cf6 \strokec6 setConversations\cf2 \strokec2 (populatedConvos);\cb1 \
\
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (populatedConvos.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 activeConversationId) \{\cb1 \
\cb4                     \cf6 \strokec6 setActiveConversationId\cf2 \strokec2 (populatedConvos[\cf8 \strokec8 0\cf2 \strokec2 ].id);\cb1 \
\cb4                 \}\cb1 \
\cb4             \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4                  \cf6 \strokec6 setConversations\cf2 \strokec2 ([]);\cb1 \
\cb4             \}\cb1 \
\cb4             \cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \});\cb1 \
\
\cb4         \cf5 \strokec5 return\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 unsubscribe\cf2 \strokec2 ();\cb1 \
\cb4     \}, [currentUser, activeConversationId]);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  loading) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-[calc(100vh-10rem)] flex"\cf2 \strokec2 >\cb1 \
\cb4                  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-1/3 border-r pr-4 flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-40 mb-4"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-16 w-full mb-2"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-16 w-full mb-2"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-16 w-full"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-2/3 pl-4 flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-6 w-48 mb-4 border-b pb-2"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 space-y-4 p-4"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-3/4"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-3/4 ml-auto"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-12 w-3/4"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mt-4 flex gap-2"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 flex-1"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-10 w-10"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 currentUser) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center justify-center h-full"\cf2 \strokec2 >Please log in to view your messages.</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 activeConversation\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  conversations.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 c\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  c.id \cf5 \strokec5 ===\cf2 \strokec2  activeConversationId);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 activeConversation) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center justify-center h-full"\cf2 \strokec2 >No conversations yet. Start a new one!</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 otherParticipant\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (activeConversation.participants \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 []).\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 p\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  p.id \cf5 \strokec5 !==\cf2 \strokec2  currentUser.id)\cf5 \strokec5 !\cf2 \strokec2 ;\cb1 \
\
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-[calc(100vh-10rem)] flex"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-1/3 border-r pr-4 flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline mb-4"\cf2 \strokec2 >Messages</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 overflow-y-auto space-y-2"\cf2 \strokec2 >\cb1 \
\cb4                     \{conversations.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 convo\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 otherUser\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (convo.participants \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 []).\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 p\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  p.id \cf5 \strokec5 !==\cf2 \strokec2  currentUser\cf5 \strokec5 !\cf2 \strokec2 .id)\cf5 \strokec5 !\cf2 \strokec2 ;\cb1 \
\cb4                         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 otherUser) \cf5 \strokec5 return\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 ;\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 lastMessage\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  convo.messages[convo.messages.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 -\cf2 \strokec2  \cf8 \strokec8 1\cf2 \strokec2 ];\cb1 \
\
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4                             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "#"\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{convo.id\} \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setActiveConversationId\cf2 \strokec2 (convo.id)\}>\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 cn\cf2 \strokec2 (\cb1 \
\cb4                                     \cf3 \strokec3 "p-3 rounded-lg flex gap-3 items-start"\cf2 \strokec2 ,\cb1 \
\cb4                                     convo.id \cf5 \strokec5 ===\cf2 \strokec2  activeConversationId \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "bg-accent"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "hover:bg-accent/50"\cf2 \cb1 \strokec2 \
\cb4                                 )\}>\cb1 \
\cb4                                     <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{otherUser.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{otherUser.avatarUrl\} />\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 overflow-hidden"\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-semibold truncate"\cf2 \strokec2 >\{otherUser.name\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground truncate"\cf2 \strokec2 >\{lastMessage.text\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                         )\cb1 \
\cb4                     \})\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-2/3 pl-4 flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "border-b pb-2 mb-4"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 h2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xl font-semibold"\cf2 \strokec2 >\{otherParticipant.name\}</\cf3 \strokec3 h2\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 overflow-y-auto space-y-4 p-4 bg-background rounded-md"\cf2 \strokec2 >\cb1 \
\cb4                     \{activeConversation.messages.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 message\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{message.id\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 cn\cf2 \strokec2 (\cb1 \
\cb4                             \cf3 \strokec3 "flex gap-3"\cf2 \strokec2 ,\cb1 \
\cb4                             message.senderId \cf5 \strokec5 ===\cf2 \strokec2  currentUser\cf5 \strokec5 !\cf2 \strokec2 .id \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "justify-end"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "justify-start"\cf2 \cb1 \strokec2 \
\cb4                         )\}>\cb1 \
\cb4                             \{message.senderId \cf5 \strokec5 !==\cf2 \strokec2  currentUser\cf5 \strokec5 !\cf2 \strokec2 .id \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{otherParticipant.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{otherParticipant.avatarUrl\} />\cb1 \
\cb4                             )\}\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 cn\cf2 \strokec2 (\cb1 \
\cb4                                 \cf3 \strokec3 "p-3 rounded-lg max-w-xs lg:max-w-md"\cf2 \strokec2 ,\cb1 \
\cb4                                 message.senderId \cf5 \strokec5 ===\cf2 \strokec2  currentUser\cf5 \strokec5 !\cf2 \strokec2 .id \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "bg-primary text-primary-foreground"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "bg-muted"\cf2 \cb1 \strokec2 \
\cb4                             )\}>\cb1 \
\cb4                                 <\cf3 \strokec3 p\cf2 \strokec2 >\{message.text\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             \{message.senderId \cf5 \strokec5 ===\cf2 \strokec2  currentUser\cf5 \strokec5 !\cf2 \strokec2 .id \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\cf5 \strokec5 !\cf2 \strokec2 .name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\cf5 \strokec5 !\cf2 \strokec2 .avatarUrl\} />\cb1 \
\cb4                             )\}\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     ))\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mt-4 flex gap-2"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Input\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Type a message..."\cf2 \strokec2  />\cb1 \
\cb4                     <\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Send\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "sr-only"\cf2 \strokec2 >Send</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \}\cb1 \
}