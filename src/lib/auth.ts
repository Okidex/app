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
\cf3 \cb4 \strokec3 "use server"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ auth \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "./firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ sendPasswordResetEmail, signInWithEmailAndPassword, signOut \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/auth"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 login\cf2 \strokec2 (\cf7 \strokec7 email\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 , \cf7 \strokec7 password\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 )\cf5 \strokec5 :\cf6 \strokec6 Promise\cf2 \strokec2 <\{\cf7 \strokec7 success\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 boolean\cf2 \strokec2 , \cf7 \strokec7 error\cf5 \strokec5 ?:\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 \}> \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 signInWithEmailAndPassword\cf2 \strokec2 (auth, email, password);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 true\cf2 \strokec2  \};\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2 (\cf7 \strokec7 error\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 false\cf2 \strokec2 , error: error.message \};\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 logout\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 signOut\cf2 \strokec2 (auth);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 true\cf2 \strokec2  \};\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (\cf7 \strokec7 error\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 false\cf2 \strokec2 , error: error.message \};\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 sendPasswordReset\cf2 \strokec2 (\cf7 \strokec7 email\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 sendPasswordResetEmail\cf2 \strokec2 (auth, email);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 true\cf2 \strokec2  \};\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (\cf7 \strokec7 error\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 false\cf2 \strokec2 , error: error.message \};\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
}