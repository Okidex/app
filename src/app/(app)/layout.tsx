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
\cf3 \cb4 \strokec3 "use client"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ SidebarProvider, SidebarInset \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/sidebar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ AppSidebar \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/layout/app-sidebar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  AppHeader \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/layout/app-header"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useRouter \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/navigation"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 AppLayout\cf2 \strokec2 (\{ \cf7 \strokec7 children\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 children\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 React\cf2 \strokec2 .\cf6 \strokec6 ReactNode\cf2 \strokec2  \}) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 user\cf2 \strokec2 , \cf8 \strokec8 loading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 router\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useRouter\cf2 \strokec2 ();\cb1 \
\
\cb4   \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 loading \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 user) \{\cb1 \
\cb4       router.\cf6 \strokec6 push\cf2 \strokec2 (\cf3 \strokec3 '/login'\cf2 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4   \}, [user, loading, router]);\cb1 \
\
\cb4   \cf5 \strokec5 if\cf2 \strokec2  (loading \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 user) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex min-h-screen"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "hidden md:block w-64 h-screen"\cf2 \strokec2  />\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 flex flex-col"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-16 w-full"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 p-8"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-full h-64"\cf2 \strokec2  />\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf8 \strokec8 SidebarProvider\cf2 \strokec2 >\cb1 \
\cb4       <\cf8 \strokec8 AppSidebar\cf2 \strokec2  />\cb1 \
\cb4       <\cf8 \strokec8 SidebarInset\cf2 \strokec2 >\cb1 \
\cb4         <\cf8 \strokec8 AppHeader\cf2 \strokec2  />\cb1 \
\cb4         <\cf3 \strokec3 main\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50"\cf2 \strokec2 >\cb1 \
\cb4           \{children\}\cb1 \
\cb4         </\cf3 \strokec3 main\cf2 \strokec2 >\cb1 \
\cb4       </\cf8 \strokec8 SidebarInset\cf2 \strokec2 >\cb1 \
\cb4     </\cf8 \strokec8 SidebarProvider\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}