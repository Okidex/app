{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use client"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useRouter \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/navigation"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   DropdownMenu,\cb1 \
\cb4   DropdownMenuContent,\cb1 \
\cb4   DropdownMenuItem,\cb1 \
\cb4   DropdownMenuLabel,\cb1 \
\cb4   DropdownMenuSeparator,\cb1 \
\cb4   DropdownMenuTrigger,\cb1 \
\cb4 \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/dropdown-menu"\cf2 \strokec2 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ SidebarTrigger \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "../ui/sidebar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Logo \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "../logo"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "../shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Notifications \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "./notifications"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ logout \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/auth"\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 AppHeader\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf7 \strokec7 router\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useRouter\cf2 \strokec2 ();\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleLogout\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 logout\cf2 \strokec2 ();\cb1 \
\cb4     router.\cf6 \strokec6 push\cf2 \strokec2 (\cf3 \strokec3 "/"\cf2 \strokec2 );\cb1 \
\cb4   \};\cb1 \
\cb4   \cb1 \
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf3 \strokec3 header\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "md:hidden"\cf2 \strokec2 >\cb1 \
\cb4             <\cf7 \strokec7 SidebarTrigger\cf2 \strokec2  />\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4       <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "hidden md:block"\cf2 \strokec2 >\cb1 \
\cb4         <\cf7 \strokec7 Logo\cf2 \strokec2  />\cb1 \
\cb4       </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4       <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"\cf2 \strokec2 >\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "ml-auto"\cf2 \strokec2 ></\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         \{user \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4           <>\cb1 \
\cb4             <\cf7 \strokec7 Notifications\cf2 \strokec2  />\cb1 \
\cb4             <\cf7 \strokec7 DropdownMenu\cf2 \strokec2 >\cb1 \
\cb4             <\cf7 \strokec7 DropdownMenuTrigger\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2  \cf6 \strokec6 size\cf5 \strokec5 =\cf3 \strokec3 "icon"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "rounded-full"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.displayName \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 ""\cf2 \strokec2 \} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.photoURL \cf5 \strokec5 ||\cf2 \strokec2  \cf3 \strokec3 ""\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-8"\cf2 \strokec2 />\cb1 \
\cb4                 <\cf3 \strokec3 span\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "sr-only"\cf2 \strokec2 >Toggle user menu</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                 </\cf7 \strokec7 Button\cf2 \strokec2 >\cb1 \
\cb4             </\cf7 \strokec7 DropdownMenuTrigger\cf2 \strokec2 >\cb1 \
\cb4             <\cf7 \strokec7 DropdownMenuContent\cf2 \strokec2  \cf6 \strokec6 align\cf5 \strokec5 =\cf3 \strokec3 "end"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuLabel\cf2 \strokec2 >My Account</\cf7 \strokec7 DropdownMenuLabel\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuSeparator\cf2 \strokec2  />\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 ><\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/profile"\cf2 \strokec2 >Profile</\cf7 \strokec7 Link\cf2 \strokec2 ></\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 ><\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/settings/billing"\cf2 \strokec2 >Oki+</\cf7 \strokec7 Link\cf2 \strokec2 ></\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 ><\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/settings"\cf2 \strokec2 >Settings</\cf7 \strokec7 Link\cf2 \strokec2 ></\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2 >\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuSeparator\cf2 \strokec2  />\cb1 \
\cb4                 <\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{handleLogout\}>Logout</\cf7 \strokec7 DropdownMenuItem\cf2 \strokec2 >\cb1 \
\cb4             </\cf7 \strokec7 DropdownMenuContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf7 \strokec7 DropdownMenu\cf2 \strokec2 >\cb1 \
\cb4           </>\cb1 \
\cb4         ) \cf5 \strokec5 :\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 loading \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4            <\cf7 \strokec7 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4               <\cf7 \strokec7 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/login"\cf2 \strokec2 >Log In</\cf7 \strokec7 Link\cf2 \strokec2 >\cb1 \
\cb4             </\cf7 \strokec7 Button\cf2 \strokec2 >\cb1 \
\cb4         )\}\cb1 \
\cb4       </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     </\cf3 \strokec3 header\cf2 \strokec2 >\cb1 \
\cb4   );\cb1 \
\cb4 \}\cb1 \
\
}