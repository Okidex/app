{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red181\green26\blue70;\red255\green255\blue255;
\red14\green106\blue57;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;
\cssrgb\c0\c48235\c28627;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \cf3 \strokec3 type\cf2 \strokec2  \{ Metadata \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 'next'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \cf5 \strokec5 './globals.css'\cf2 \strokec2 ;\cb1 \
\cf3 \cb4 \strokec3 import\cf2 \strokec2  \{ Toaster \} \cf3 \strokec3 from\cf2 \strokec2  \cf5 \strokec5 "@/components/ui/toaster"\cf2 \strokec2 ;\cb1 \
\
\cf3 \cb4 \strokec3 export\cf2 \strokec2  \cf3 \strokec3 const\cf2 \strokec2  \cf6 \strokec6 metadata\cf3 \strokec3 :\cf2 \strokec2  \cf7 \strokec7 Metadata\cf2 \strokec2  \cf3 \strokec3 =\cf2 \strokec2  \{\cb1 \
\cb4   title: \cf5 \strokec5 'Okidex: Where ideas connect.'\cf2 \strokec2 ,\cb1 \
\cb4   description: \cf5 \strokec5 'AI-powered personalized matching for investors, talent, and founders.'\cf2 \strokec2 ,\cb1 \
\cb4 \};\cb1 \
\
\cf3 \cb4 \strokec3 export\cf2 \strokec2  \cf3 \strokec3 default\cf2 \strokec2  \cf3 \strokec3 function\cf2 \strokec2  \cf7 \strokec7 RootLayout\cf2 \strokec2 (\{\cb1 \
\cb4   \cf8 \strokec8 children\cf2 \strokec2 ,\cb1 \
\cb4 \}\cf3 \strokec3 :\cf2 \strokec2  \cf7 \strokec7 Readonly\cf2 \strokec2 <\{\cb1 \
\cb4   \cf8 \strokec8 children\cf3 \strokec3 :\cf2 \strokec2  \cf7 \strokec7 React\cf2 \strokec2 .\cf7 \strokec7 ReactNode\cf2 \strokec2 ;\cb1 \
\cb4 \}>) \{\cb1 \
\cb4   \cf3 \strokec3 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf5 \strokec5 html\cf2 \strokec2  \cf7 \strokec7 lang\cf3 \strokec3 =\cf5 \strokec5 "en"\cf2 \strokec2  \cf7 \strokec7 suppressHydrationWarning\cf2 \strokec2 >\cb1 \
\cb4       <\cf5 \strokec5 head\cf2 \strokec2 >\cb1 \
\cb4         <\cf5 \strokec5 link\cf2 \strokec2  \cf7 \strokec7 rel\cf3 \strokec3 =\cf5 \strokec5 "preconnect"\cf2 \strokec2  \cf7 \strokec7 href\cf3 \strokec3 =\cf5 \strokec5 "https://fonts.googleapis.com"\cf2 \strokec2  />\cb1 \
\cb4         <\cf5 \strokec5 link\cf2 \strokec2  \cf7 \strokec7 rel\cf3 \strokec3 =\cf5 \strokec5 "preconnect"\cf2 \strokec2  \cf7 \strokec7 href\cf3 \strokec3 =\cf5 \strokec5 "https://fonts.gstatic.com"\cf2 \strokec2  \cf7 \strokec7 crossOrigin\cf3 \strokec3 =\cf5 \strokec5 "anonymous"\cf2 \strokec2  />\cb1 \
\cb4         <\cf5 \strokec5 link\cf2 \strokec2  \cf7 \strokec7 href\cf3 \strokec3 =\cf5 \strokec5 "https://fonts.googleapis.com/css2?family=Inter&display=swap"\cf2 \strokec2  \cf7 \strokec7 rel\cf3 \strokec3 =\cf5 \strokec5 "stylesheet"\cf2 \strokec2  />\cb1 \
\cb4       </\cf5 \strokec5 head\cf2 \strokec2 >\cb1 \
\cb4       <\cf5 \strokec5 body\cf2 \strokec2  \cf7 \strokec7 className\cf3 \strokec3 =\cf5 \strokec5 "font-sans antialiased"\cf2 \strokec2 >\cb1 \
\cb4         \{children\}\cb1 \
\cb4         <\cf6 \strokec6 Toaster\cf2 \strokec2  />\cb1 \
\cb4       </\cf5 \strokec5 body\cf2 \strokec2 >\cb1 \
\cb4     </\cf5 \strokec5 html\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}