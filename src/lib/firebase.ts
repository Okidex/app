{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red181\green26\blue70;\red255\green255\blue255;
\red14\green106\blue57;\red91\green47\blue214;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ initializeApp, getApps, getApp, FirebaseApp \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'firebase/app'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ getAuth, Auth \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'firebase/auth'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ getFirestore, Firestore \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'firebase/firestore'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ getStorage, FirebaseStorage \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'firebase/storage'\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 let\cf2 \strokec2  app\cf3 \strokec3 :\cf2 \strokec2  \cf6 \strokec6 FirebaseApp\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 let\cf2 \strokec2  auth\cf3 \strokec3 :\cf2 \strokec2  \cf6 \strokec6 Auth\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 let\cf2 \strokec2  db\cf3 \strokec3 :\cf2 \strokec2  \cf6 \strokec6 Firestore\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 let\cf2 \strokec2  storage\cf3 \strokec3 :\cf2 \strokec2  \cf6 \strokec6 FirebaseStorage\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 const\cf2 \strokec2  \cf7 \strokec7 firebaseConfig\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   apiKey: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_API_KEY\cf2 \strokec2 ,\cb1 \
\cb4   authDomain: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\cf2 \strokec2 ,\cb1 \
\cb4   projectId: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_PROJECT_ID\cf2 \strokec2 ,\cb1 \
\cb4   storageBucket: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\cf2 \strokec2 ,\cb1 \
\cb4   messagingSenderId: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\cf2 \strokec2 ,\cb1 \
\cb4   appId: process.env.\cf7 \strokec7 NEXT_PUBLIC_FIREBASE_APP_ID\cf2 \strokec2 ,\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 if\cf2 \strokec2  (\cf6 \strokec6 getApps\cf2 \strokec2 ().\cf7 \strokec7 length\cf2 \strokec2  \cf3 \strokec3 ===\cf2 \strokec2  \cf7 \strokec7 0\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   app \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 initializeApp\cf2 \strokec2 (firebaseConfig);\cb1 \
\cb4 \} \cf3 \strokec3 else\cf2 \strokec2  \{\cb1 \
\cb4   app \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 getApp\cf2 \strokec2 ();\cb1 \
\cb4 \}\cb1 \
\
\cb4 auth \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 getAuth\cf2 \strokec2 (app);\cb1 \
\cb4 db \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 getFirestore\cf2 \strokec2 (app);\cb1 \
\cb4 storage \cf3 \strokec3 =\cf2 \strokec2  \cf6 \strokec6 getStorage\cf2 \strokec2 (app);\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 export\cf2 \strokec2  \{ app, db, storage, auth \};\cb1 \
\
}