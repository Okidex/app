{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red181\green26\blue70;\red255\green255\blue255;\red31\green31\blue31;
\red14\green106\blue57;\red91\green47\blue214;\red38\green59\blue169;\red93\green93\blue93;}
{\*\expandedcolortbl;;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;\cssrgb\c43922\c43922\c43922;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \{ getCurrentUser \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/lib/data"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ redirect \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "next/navigation"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ doc, getDoc \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 'firebase/firestore'\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ db \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 '@/lib/firebase'\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ auth \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 '@/lib/firebase'\cf4 \strokec4 ;\cb1 \
\
\
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  \cf2 \strokec2 function\cf4 \strokec4  \cf6 \strokec6 ProfilePage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf2 \strokec2 const\cf4 \strokec4  \cf7 \strokec7 firebaseUser\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  auth.currentUser;\cb1 \
\
\cb3     \cf2 \strokec2 if\cf4 \strokec4  (\cf2 \strokec2 !\cf4 \strokec4 firebaseUser) \{\cb1 \
\cb3         \cf6 \strokec6 redirect\cf4 \strokec4 (\cf5 \strokec5 '/login'\cf4 \strokec4 );\cb1 \
\cb3     \}\cb1 \
\
\cb3     \cf2 \strokec2 const\cf4 \strokec4  \cf7 \strokec7 userDocRef\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  \cf6 \strokec6 doc\cf4 \strokec4 (db, \cf5 \strokec5 "users"\cf4 \strokec4 , firebaseUser.uid);\cb1 \
\cb3     \cf2 \strokec2 const\cf4 \strokec4  \cf7 \strokec7 userDocSnap\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 getDoc\cf4 \strokec4 (userDocRef);\cb1 \
\
\cb3     \cf2 \strokec2 if\cf4 \strokec4  (userDocSnap.\cf6 \strokec6 exists\cf4 \strokec4 ()) \{\cb1 \
\cb3         \cf6 \strokec6 redirect\cf4 \strokec4 (\cf5 \strokec5 `/users/$\{\cf4 \strokec4 firebaseUser\cf5 \strokec5 .\cf4 \strokec4 uid\cf5 \strokec5 \}`\cf4 \strokec4 );\cb1 \
\cb3     \} \cf2 \strokec2 else\cf4 \strokec4  \{\cb1 \
\cb3         \cf8 \strokec8 // This case might happen if there's a delay or error in profile creation after signup.\cf4 \cb1 \strokec4 \
\cb3         \cf8 \strokec8 // Or if a user is authenticated but doesn't have a profile document.\cf4 \cb1 \strokec4 \
\cb3         console.\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 "User is authenticated but no profile document found."\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 redirect\cf4 \strokec4 (\cf5 \strokec5 '/login'\cf4 \strokec4 );\cb1 \
\cb3     \}\cb1 \
\cb3 \}\cb1 \
\
}