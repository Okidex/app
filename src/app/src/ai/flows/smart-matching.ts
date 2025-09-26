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
import\cf4  \cf2 type\cf4  \{ Metadata \} \cf2 from\cf4  \cf5 "next"\cf4 ;\cb1 \
\cf2 \cb3 import\cf4  \{ Inter \} \cf2 from\cf4  \cf5 "next/font/google"\cf4 ;\cb1 \
\cf2 \cb3 import\cf4  \cf5 "./globals.css"\cf4 ;\cb1 \
\cf2 \cb3 import\cf4  \{ Toaster \} \cf2 from\cf4  \cf5 "@/components/ui/toaster"\cf4 ;\cb1 \
\
\cf2 \cb3 const\cf4  \cf6 inter\cf4  \cf2 =\cf4  \cf7 Inter\cf4 (\{ subsets: [\cf5 "latin"\cf4 ] \});\cb1 \
\
\cf2 \cb3 export\cf4  \cf2 const\cf4  \cf6 metadata\cf2 :\cf4  \cf7 Metadata\cf4  \cf2 =\cf4  \{\cb1 \
\cb3   title: \cf5 "Okidex"\cf4 ,\cb1 \
\cb3   description: \cf5 "The Nexus for Innovation and Investment"\cf4 ,\cb1 \
\cb3 \};\cb1 \
\
\cf2 \cb3 export\cf4  \cf2 default\cf4  \cf2 function\cf4  \cf7 RootLayout\cf4 (\{\cb1 \
\cb3   \cf8 children\cf4 ,\cb1 \
\cb3 \}\cf2 :\cf4  \cf7 Readonly\cf4 <\{\cb1 \
\cb3   \cf8 children\cf2 :\cf4  \cf7 React\cf4 .\cf7 ReactNode\cf4 ;\cb1 \
\cb3 \}>) \{\cb1 \
\cb3   \cf2 return\cf4  (\cb1 \
\cb3     <\cf5 html\cf4  \cf7 lang\cf2 =\cf5 "en"\cf4 >\cb1 \
\cb3       <\cf5 body\cf4  \cf7 className\cf2 =\cf4 \{inter.className\}>\cb1 \
\cb3         \{children\}\cb1 \
\cb3         <\cf6 Toaster\cf4  />\cb1 \
\cb3       </\cf5 body\cf4 >\cb1 \
\cb3     </\cf5 html\cf4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}