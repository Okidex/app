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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useState, useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'react'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   Popover,\cb1 \
\cb4   PopoverContent,\cb1 \
\cb4   PopoverTrigger,\cb1 \
\cb4 \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/popover"\cf2 \strokec2 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Bell, MessageSquare, UserCheck, Users \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Notification, NotificationType, FullUserProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '@/lib/types'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '../ui/card'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'next/link'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '../shared/user-avatar'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ formatDistanceToNow \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'date-fns'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ cn \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '@/lib/utils'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Separator \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '../ui/separator'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '@/hooks/use-auth'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, query, where, onSnapshot, getDocs, doc, writeBatch, orderBy \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '@/lib/firebase'\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getIcon\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 type\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 NotificationType\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 switch\cf2 \strokec2  (type) \{\cb1 \
\cb4         \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'message'\cf2 \strokec2 :\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 MessageSquare\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-5 w-5"\cf2 \strokec2  />;\cb1 \
\cb4         \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'connection'\cf2 \strokec2 :\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 UserCheck\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-5 w-5"\cf2 \strokec2  />;\cb1 \
\cb4         \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'match'\cf2 \strokec2 :\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 Users\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-5 w-5"\cf2 \strokec2  />;\cb1 \
\cb4         \cf5 \strokec5 default\cf2 \strokec2 :\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 Bell\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-5 w-5"\cf2 \strokec2  />;\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 Notifications\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 notifications\cf2 \strokec2 , \cf8 \strokec8 setNotifications\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Notification\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 senders\cf2 \strokec2 , \cf8 \strokec8 setSenders\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Map\cf2 \strokec2 <\cf8 \strokec8 string\cf2 \strokec2 , \cf6 \strokec6 FullUserProfile\cf2 \strokec2 >>(\cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Map\cf2 \strokec2 ());\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 unreadCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  notifications.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 n\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 n.isRead).\cf8 \strokec8 length\cf2 \strokec2 ;\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authUser) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 q\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "notifications"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "userId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , authUser.uid), \cf6 \strokec6 orderBy\cf2 \strokec2 (\cf3 \strokec3 "timestamp"\cf2 \strokec2 , \cf3 \strokec3 "desc"\cf2 \strokec2 ));\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 unsubscribe\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 onSnapshot\cf2 \strokec2 (q, \cf5 \strokec5 async\cf2 \strokec2  (\cf7 \strokec7 snapshot\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 notifs\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  snapshot.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\{ id: doc.id, \cf5 \strokec5 ...\cf2 \strokec2 doc.\cf6 \strokec6 data\cf2 \strokec2 () \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Notification\cf2 \strokec2 ));\cb1 \
\cb4             \cf6 \strokec6 setNotifications\cf2 \strokec2 (notifs);\cb1 \
\
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 senderIds\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cf5 \strokec5 ...new\cf2 \strokec2  \cf6 \strokec6 Set\cf2 \strokec2 (notifs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 n\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  n.senderId).\cf6 \strokec6 filter\cf2 \strokec2 (Boolean))] \cf5 \strokec5 as\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 [];\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (senderIds.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 newSenders\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Map\cf2 \strokec2 (senders);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 idsToFetch\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  senderIds.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 id\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 newSenders.\cf6 \strokec6 has\cf2 \strokec2 (id));\cb1 \
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (idsToFetch.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \{\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 query\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 ), \cf6 \strokec6 where\cf2 \strokec2 (\cf3 \strokec3 "id"\cf2 \strokec2 , \cf3 \strokec3 "in"\cf2 \strokec2 , idsToFetch));\cb1 \
\cb4                     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (usersQuery);\cb1 \
\cb4                     usersSnap.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                         newSenders.\cf6 \strokec6 set\cf2 \strokec2 (doc.id, doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\cb4                     \});\cb1 \
\cb4                     \cf6 \strokec6 setSenders\cf2 \strokec2 (newSenders);\cb1 \
\cb4                 \}\cb1 \
\cb4             \}\cb1 \
\cb4         \});\cb1 \
\
\cb4         \cf5 \strokec5 return\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 unsubscribe\cf2 \strokec2 ();\cb1 \
\cb4     \}, [authUser, senders]);\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 markAllAsRead\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 authUser \cf5 \strokec5 ||\cf2 \strokec2  unreadCount \cf5 \strokec5 ===\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 batch\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 writeBatch\cf2 \strokec2 (db);\cb1 \
\cb4         notifications.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf7 \strokec7 n\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 n.isRead) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 notifRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "notifications"\cf2 \strokec2 , n.id);\cb1 \
\cb4                 batch.\cf6 \strokec6 update\cf2 \strokec2 (notifRef, \{ isRead: \cf8 \strokec8 true\cf2 \strokec2  \});\cb1 \
\cb4             \}\cb1 \
\cb4         \});\cb1 \
\cb4         \cf5 \strokec5 await\cf2 \strokec2  batch.\cf6 \strokec6 commit\cf2 \strokec2 ();\cb1 \
\cb4     \}\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf8 \strokec8 Popover\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 PopoverTrigger\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "relative"\cf2 \strokec2 >\cb1 \
\cb4           <\cf8 \strokec8 Bell\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-5 w-5"\cf2 \strokec2  />\cb1 \
\cb4           \{unreadCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"\cf2 \strokec2 >\cb1 \
\cb4               \{unreadCount\}\cb1 \
\cb4             </\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4           )\}\cb1 \
\cb4           <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "sr-only"\cf2 \strokec2 >Open notifications</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 PopoverTrigger\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 PopoverContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-80 md:w-96 p-0"\cf2 \strokec2  \cf6 \strokec6 align\cf5 \strokec5 =\cf3 \strokec3 "end"\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 Card\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'border-0'\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardHeader\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'flex-row items-center justify-between py-3 px-4'\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardTitle\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'text-lg'\cf2 \strokec2 >Notifications</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                 \{unreadCount \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "link"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "sm"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'p-0 h-auto'\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{markAllAsRead\}>Mark all as read</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Separator\cf2 \strokec2  />\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'p-0 max-h-96 overflow-y-auto'\cf2 \strokec2 >\cb1 \
\cb4                 \{notifications.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4                     notifications.\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 notification\cf2 \strokec2 , \cf7 \strokec7 index\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4                         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 sender\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  notification.senderId \cf5 \strokec5 ?\cf2 \strokec2  senders.\cf6 \strokec6 get\cf2 \strokec2 (notification.senderId) \cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 ;\cb1 \
\cb4                         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{notification.id\}>\cb1 \
\cb4                                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{notification.link\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 cn\cf2 \strokec2 (\cb1 \
\cb4                                     \cf3 \strokec3 "flex items-start gap-3 p-4 hover:bg-accent"\cf2 \strokec2 ,\cb1 \
\cb4                                     \cf5 \strokec5 !\cf2 \strokec2 notification.isRead \cf5 \strokec5 &&\cf2 \strokec2  \cf3 \strokec3 "bg-accent/50"\cf2 \cb1 \strokec2 \
\cb4                                 )\}>\cb1 \
\cb4                                     \{sender \cf5 \strokec5 ?\cf2 \strokec2  <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{sender.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{sender.avatarUrl\} /> \cf5 \strokec5 :\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 'p-2 bg-secondary rounded-full'\cf2 \strokec2 >\{\cf6 \strokec6 getIcon\cf2 \strokec2 (notification.type)\}</\cf3 \strokec3 div\cf2 \strokec2 >\}\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 space-y-1"\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm"\cf2 \strokec2  \cf6 \strokec6 dangerouslySetInnerHTML\cf5 \strokec5 =\cf2 \strokec2 \{\{ __html: sender \cf5 \strokec5 ?\cf2 \strokec2  notification.text.\cf6 \strokec6 replace\cf2 \strokec2 (sender.name, \cf3 \strokec3 `<strong>$\{\cf2 \strokec2 sender\cf3 \strokec3 .\cf2 \strokec2 name\cf3 \strokec3 \}</strong>`\cf2 \strokec2 ) \cf5 \strokec5 :\cf2 \strokec2  notification.text \}\}></\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-xs text-muted-foreground"\cf2 \strokec2 >\cb1 \
\cb4                                             \{\cf6 \strokec6 formatDistanceToNow\cf2 \strokec2 (\cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 (notification.timestamp), \{ addSuffix: \cf8 \strokec8 true\cf2 \strokec2  \})\}\cb1 \
\cb4                                         </\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                     \{\cf5 \strokec5 !\cf2 \strokec2 notification.isRead \cf5 \strokec5 &&\cf2 \strokec2  <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-2 h-2 rounded-full bg-primary mt-1"\cf2 \strokec2  />\}\cb1 \
\cb4                                 </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                                 \{index \cf5 \strokec5 <\cf2 \strokec2  notifications.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 -\cf2 \strokec2  \cf8 \strokec8 1\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 Separator\cf2 \strokec2  />\}\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         );\cb1 \
\cb4                     \})\cb1 \
\cb4                 ) \cf5 \strokec5 :\cf2 \strokec2  (\cb1 \
\cb4                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-4 text-center text-sm text-muted-foreground"\cf2 \strokec2 >No new notifications</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 PopoverContent\cf2 \strokec2 >\cb1 \
\cb4     </\cf8 \strokec8 Popover\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}