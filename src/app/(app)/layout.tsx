{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ SidebarProvider, SidebarInset \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/sidebar"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ AppSidebar \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/layout/app-sidebar"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  AppHeader \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/layout/app-header"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  useAuth \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/hooks/use-auth"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useRouter \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/navigation"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useEffect \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Skeleton \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/skeleton"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 AppLayout\cf4 \strokec4 (\{ \cf7 \strokec7 children\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \{ \cf7 \strokec7 children\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 ReactNode\cf4 \strokec4  \}) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  \{ \cf8 \strokec8 user\cf4 \strokec4 , \cf8 \strokec8 loading\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useAuth\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 router\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useRouter\cf4 \strokec4 ();\cb1 \
\
\cb3   \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 loading \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 user) \{\cb1 \
\cb3       router.\cf6 \strokec6 push\cf4 \strokec4 (\cf2 \strokec2 '/login'\cf4 \strokec4 );\cb1 \
\cb3     \}\cb1 \
\cb3   \}, [user, loading, router]);\cb1 \
\
\cb3   \cf5 \strokec5 if\cf4 \strokec4  (loading \cf5 \strokec5 ||\cf4 \strokec4  \cf5 \strokec5 !\cf4 \strokec4 user) \{\cb1 \
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex min-h-screen"\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "hidden md:block w-64 h-screen"\cf4 \strokec4  />\cb1 \
\cb3             <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex-1 flex flex-col"\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-16 w-full"\cf4 \strokec4  />\cb1 \
\cb3                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex-1 p-8"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 Skeleton\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "w-full h-64"\cf4 \strokec4  />\cb1 \
\cb3                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     );\cb1 \
\cb3   \}\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf8 \strokec8 SidebarProvider\cf4 \strokec4 >\cb1 \
\cb3       <\cf8 \strokec8 AppSidebar\cf4 \strokec4  />\cb1 \
\cb3       <\cf8 \strokec8 SidebarInset\cf4 \strokec4 >\cb1 \
\cb3         <\cf8 \strokec8 AppHeader\cf4 \strokec4  />\cb1 \
\cb3         <\cf2 \strokec2 main\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50"\cf4 \strokec4 >\cb1 \
\cb3           \{children\}\cb1 \
\cb3         </\cf2 \strokec2 main\cf4 \strokec4 >\cb1 \
\cb3       </\cf8 \strokec8 SidebarInset\cf4 \strokec4 >\cb1 \
\cb3     </\cf8 \strokec8 SidebarProvider\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}