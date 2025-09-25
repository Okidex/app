{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red38\green59\blue169;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;\cssrgb\c81569\c47059\c14902;}
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
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ onAuthStateChanged, User \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'firebase/auth'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ auth \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 '@/lib/firebase'\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 setUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 User\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf7 \strokec7 null\cf2 \strokec2 >(\cf7 \strokec7 null\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf7 \strokec7 loading\cf2 \strokec2 , \cf7 \strokec7 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf7 \strokec7 true\cf2 \strokec2 );\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf7 \strokec7 unsubscribe\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 onAuthStateChanged\cf2 \strokec2 (auth, (\cf8 \strokec8 user\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4       \cf6 \strokec6 setUser\cf2 \strokec2 (user);\cb1 \
\cb4       \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf7 \strokec7 false\cf2 \strokec2 );\cb1 \
\cb4     \});\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 unsubscribe\cf2 \strokec2 ();\cb1 \
\cb4   \}, []);\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  \{ user, loading \};\cb1 \
\cb4 \}\cb1 \
\
}