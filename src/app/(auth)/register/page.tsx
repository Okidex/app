{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red181\green26\blue70;\red255\green255\blue255;\red31\green31\blue31;
\red14\green106\blue57;\red91\green47\blue214;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  RegisterForm \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/components/auth/register-form"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  Link \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "next/link"\cf4 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf2 \strokec2 function\cf4 \strokec4  \cf6 \strokec6 RegisterPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf2 \strokec2 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf7 \strokec7 Card\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "w-full max-w-md"\cf4 \strokec4 >\cb1 \
\cb3       <\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 CardTitle\cf4 \strokec4 >Create your account</\cf7 \strokec7 CardTitle\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3           Join the premier platform for innovation. Already have an account?\{\cf5 \strokec5 ' '\cf4 \strokec4 \}\cb1 \
\cb3           <\cf7 \strokec7 Link\cf4 \strokec4  \cf6 \strokec6 href\cf2 \strokec2 =\cf5 \strokec5 "/login"\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-primary hover:underline"\cf4 \strokec4 >\cb1 \
\cb3             Log in\cb1 \
\cb3           </\cf7 \strokec7 Link\cf4 \strokec4 >\cb1 \
\cb3         </\cf7 \strokec7 CardDescription\cf4 \strokec4 >\cb1 \
\cb3       </\cf7 \strokec7 CardHeader\cf4 \strokec4 >\cb1 \
\cb3       <\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3         <\cf7 \strokec7 RegisterForm\cf4 \strokec4  />\cb1 \
\cb3       </\cf7 \strokec7 CardContent\cf4 \strokec4 >\cb1 \
\cb3     </\cf7 \strokec7 Card\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}