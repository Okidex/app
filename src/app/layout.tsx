{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red181\green26\blue70;\red255\green255\blue255;\red31\green31\blue31;
\red14\green106\blue57;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c0\c48235\c28627;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \cf2 \strokec2 type\cf4 \strokec4  \{ Metadata \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "next"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ Inter \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "next/font/google"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \cf5 \strokec5 "./globals.css"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ Toaster \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/components/ui/toaster"\cf4 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 inter\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  \cf7 \strokec7 Inter\cf4 \strokec4 (\{ subsets: [\cf5 \strokec5 "latin"\cf4 \strokec4 ] \});\cb1 \
\
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 metadata\cf2 \strokec2 :\cf4 \strokec4  \cf7 \strokec7 Metadata\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   title: \cf5 \strokec5 "Okidex"\cf4 \strokec4 ,\cb1 \
\cb3   description: \cf5 \strokec5 "The Nexus for Innovation and Investment"\cf4 \strokec4 ,\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf2 \strokec2 function\cf4 \strokec4  \cf7 \strokec7 RootLayout\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf8 \strokec8 children\cf4 \strokec4 ,\cb1 \
\cb3 \}\cf2 \strokec2 :\cf4 \strokec4  \cf7 \strokec7 Readonly\cf4 \strokec4 <\{\cb1 \
\cb3   \cf8 \strokec8 children\cf2 \strokec2 :\cf4 \strokec4  \cf7 \strokec7 React\cf4 \strokec4 .\cf7 \strokec7 ReactNode\cf4 \strokec4 ;\cb1 \
\cb3 \}>) \{\cb1 \
\cb3   \cf2 \strokec2 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf5 \strokec5 html\cf4 \strokec4  \cf7 \strokec7 lang\cf2 \strokec2 =\cf5 \strokec5 "en"\cf4 \strokec4 >\cb1 \
\cb3       <\cf5 \strokec5 body\cf4 \strokec4  \cf7 \strokec7 className\cf2 \strokec2 =\cf4 \strokec4 \{inter.className\}>\cb1 \
\cb3         \{children\}\cb1 \
\cb3         <\cf6 \strokec6 Toaster\cf4 \strokec4  />\cb1 \
\cb3       </\cf5 \strokec5 body\cf4 \strokec4 >\cb1 \
\cb3     </\cf5 \strokec5 html\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}