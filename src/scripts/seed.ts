{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red181\green26\blue70;\red255\green255\blue255;
\red14\green106\blue57;\red91\green47\blue214;\red38\green59\blue169;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ config \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'dotenv'\cf2 \strokec2 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb4 \strokec6 config\cf2 \strokec2 (\{ path: \cf5 \strokec5 '.env.local'\cf2 \strokec2  \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ db \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/lib/firebase'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ collection, doc, writeBatch \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'firebase/firestore'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ users, startups, jobs, theses, conversations, notifications, interests \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 '@/lib/mock-data'\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 async\cf2 \strokec2  \cf3 \strokec3 function\cf2 \strokec2  \cf6 \strokec6 seedDatabase\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 batch\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 writeBatch\cf2 \strokec2 (db);\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding users...'\cf2 \strokec2 );\cb1 \
\cb4     users.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 user\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 userRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'users'\cf2 \strokec2 , user.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (userRef, user);\cb1 \
\cb4     \});\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding startups...'\cf2 \strokec2 );\cb1 \
\cb4     startups.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 startup\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 startupRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'startups'\cf2 \strokec2 , startup.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (startupRef, startup);\cb1 \
\cb4     \});\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding jobs...'\cf2 \strokec2 );\cb1 \
\cb4     jobs.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 job\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 jobRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'jobs'\cf2 \strokec2 , job.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (jobRef, job);\cb1 \
\cb4     \});\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding theses...'\cf2 \strokec2 );\cb1 \
\cb4     theses.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 thesis\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 thesisRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'theses'\cf2 \strokec2 , thesis.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (thesisRef, thesis);\cb1 \
\cb4     \});\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding conversations...'\cf2 \strokec2 );\cb1 \
\cb4     conversations.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 conversation\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 conversationRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'conversations'\cf2 \strokec2 , conversation.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (conversationRef, conversation);\cb1 \
\cb4     \});\cb1 \
\
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding notifications...'\cf2 \strokec2 );\cb1 \
\cb4     notifications.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 notification\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 notificationRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'notifications'\cf2 \strokec2 , notification.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (notificationRef, notification);\cb1 \
\cb4     \});\cb1 \
\cb4     \cb1 \
\cb4     console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Seeding interests...'\cf2 \strokec2 );\cb1 \
\cb4     interests.\cf6 \strokec6 forEach\cf2 \strokec2 (\cf8 \strokec8 interest\cf2 \strokec2  \cf3 \strokec3 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 interestRef\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf5 \strokec5 'interests'\cf2 \strokec2 , interest.id);\cb1 \
\cb4         batch.\cf6 \strokec6 set\cf2 \strokec2 (interestRef, interest);\cb1 \
\cb4     \});\cb1 \
\
\cb4     \cf3 \strokec3 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf3 \strokec3 await\cf2 \strokec2  batch.\cf6 \strokec6 commit\cf2 \strokec2 ();\cb1 \
\cb4         console.\cf6 \strokec6 log\cf2 \strokec2 (\cf5 \strokec5 'Database seeded successfully!'\cf2 \strokec2 );\cb1 \
\cb4     \} \cf3 \strokec3 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4         console.\cf6 \strokec6 error\cf2 \strokec2 (\cf5 \strokec5 'Error seeding database: '\cf2 \strokec2 , error);\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb4 \strokec6 seedDatabase\cf2 \strokec2 ();\cb1 \
\
}