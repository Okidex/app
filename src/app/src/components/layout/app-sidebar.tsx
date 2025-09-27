{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use client"\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \cf6 \strokec6 *\cf2 \strokec2  \cf5 \strokec5 as\cf2 \strokec2  React \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ usePathname, useRouter \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/navigation"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   Sidebar,\cb1 \
\cb4   SidebarHeader,\cb1 \
\cb4   SidebarMenu,\cb1 \
\cb4   SidebarMenuItem,\cb1 \
\cb4   SidebarMenuButton,\cb1 \
\cb4   SidebarFooter,\cb1 \
\cb4   SidebarMenuBadge,\cb1 \
\cb4   SidebarSeparator,\cb1 \
\cb4 \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/sidebar"\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   LayoutDashboard,\cb1 \
\cb4   User,\cb1 \
\cb4   MessageSquare,\cb1 \
\cb4   Briefcase,\cb1 \
\cb4   FileText,\cb1 \
\cb4   Settings,\cb1 \
\cb4   LogOut,\cb1 \
\cb4   Smartphone,\cb1 \
\cb4   Plus,\cb1 \
\cb4   Search,\cb1 \
\cb4   Users \cf5 \strokec5 as\cf2 \strokec2  UsersIcon,\cb1 \
\cb4 \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Logo \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "../logo"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, FounderProfile, TalentProfile, Notification \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useIsMobile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-mobile"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ logout \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/auth"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, query, where, onSnapshot \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \cb1 \strokec2 \
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 menuItemsFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \{ href: \cf3 \strokec3 "/dashboard"\cf2 \strokec2 , label: \cf3 \strokec3 "Dashboard"\cf2 \strokec2 , icon: LayoutDashboard \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/matches"\cf2 \strokec2 , label: \cf3 \strokec3 "Mobile"\cf2 \strokec2 , icon: Smartphone, notificationType: \cf3 \strokec3 'match'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/search"\cf2 \strokec2 , label: \cf3 \strokec3 "Search"\cf2 \strokec2 , icon: Search \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/profile"\cf2 \strokec2 , label: \cf3 \strokec3 "Profile"\cf2 \strokec2 , icon: User \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/messages"\cf2 \strokec2 , label: \cf3 \strokec3 "Messages"\cf2 \strokec2 , icon: MessageSquare, notificationType: \cf3 \strokec3 'message'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/jobs"\cf2 \strokec2 , label: \cf3 \strokec3 "Jobs"\cf2 \strokec2 , icon: Briefcase, premium: \cf6 \strokec6 true\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/theses"\cf2 \strokec2 , label: \cf3 \strokec3 "Theses"\cf2 \strokec2 , icon: FileText, premium: \cf6 \strokec6 true\cf2 \strokec2  \},\cb1 \
\cb4 ]\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 menuItemsInvestor\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \{ href: \cf3 \strokec3 "/dashboard"\cf2 \strokec2 , label: \cf3 \strokec3 "Dashboard"\cf2 \strokec2 , icon: LayoutDashboard \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/matches"\cf2 \strokec2 , label: \cf3 \strokec3 "Mobile"\cf2 \strokec2 , icon: Smartphone, notificationType: \cf3 \strokec3 'match'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/search"\cf2 \strokec2 , label: \cf3 \strokec3 "Search"\cf2 \strokec2 , icon: Search \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/profile"\cf2 \strokec2 , label: \cf3 \strokec3 "Profile"\cf2 \strokec2 , icon: User \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/messages"\cf2 \strokec2 , label: \cf3 \strokec3 "Messages"\cf2 \strokec2 , icon: MessageSquare, notificationType: \cf3 \strokec3 'message'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/jobs"\cf2 \strokec2 , label: \cf3 \strokec3 "Jobs"\cf2 \strokec2 , icon: Briefcase \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/applicants"\cf2 \strokec2 , label: \cf3 \strokec3 "Applicants"\cf2 \strokec2 , icon: UsersIcon, notificationType: \cf3 \strokec3 'applicant'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/theses"\cf2 \strokec2 , label: \cf3 \strokec3 "Theses"\cf2 \strokec2 , icon: FileText \},\cb1 \
\cb4 ]\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 menuItemsTalent\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \{ href: \cf3 \strokec3 "/dashboard"\cf2 \strokec2 , label: \cf3 \strokec3 "Dashboard"\cf2 \strokec2 , icon: LayoutDashboard \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/matches"\cf2 \strokec2 , label: \cf3 \strokec3 "Mobile"\cf2 \strokec2 , icon: Smartphone, notificationType: \cf3 \strokec3 'match'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/search"\cf2 \strokec2 , label: \cf3 \strokec3 "Search"\cf2 \strokec2 , icon: Search \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/profile"\cf2 \strokec2 , label: \cf3 \strokec3 "Profile"\cf2 \strokec2 , icon: User \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/messages"\cf2 \strokec2 , label: \cf3 \strokec3 "Messages"\cf2 \strokec2 , icon: MessageSquare, notificationType: \cf3 \strokec3 'message'\cf2 \strokec2  \},\cb1 \
\cb4   \{ href: \cf3 \strokec3 "/jobs"\cf2 \strokec2 , label: \cf3 \strokec3 "Jobs"\cf2 \strokec2 , icon: Briefcase \},\cb1 \
\cb4 ]\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf7 \strokec7 AppSidebar\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 pathname\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 usePathname\cf2 \strokec2 ()\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 router\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 useRouter\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 user\cf2 \strokec2 : \cf6 \strokec6 authUser\cf2 \strokec2 , \cf8 \strokec8 loading\cf2 \strokec2 : \cf6 \strokec6 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 useAuth\cf2 \strokec2 ();\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf6 \strokec6 user\cf2 \strokec2 , \cf6 \strokec6 setUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  React.\cf7 \strokec7 useState\cf2 \strokec2 <\cf7 \strokec7 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf6 \strokec6 null\cf2 \strokec2 >(\cf6 \strokec6 null\cf2 \strokec2 );\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  [\cf6 \strokec6 notifications\cf2 \strokec2 , \cf6 \strokec6 setNotifications\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  React.\cf7 \strokec7 useState\cf2 \strokec2 <\cf7 \strokec7 Notification\cf2 \strokec2 []>([]);\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 isMobile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 useIsMobile\cf2 \strokec2 ();\cb1 \
\
\cb4   React.\cf7 \strokec7 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (authUser) \{\cb1 \
\cb4       \cf7 \strokec7 getCurrentUser\cf2 \strokec2 ().\cf7 \strokec7 then\cf2 \strokec2 (setUser);\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4       \cf7 \strokec7 setUser\cf2 \strokec2 (\cf6 \strokec6 null\cf2 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4   \}, [authUser]);\cb1 \
\
\cb4   React.\cf7 \strokec7 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 user) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 q\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 query\cf2 \strokec2 (\cf7 \strokec7 collection\cf2 \strokec2 (db, \cf3 \strokec3 "notifications"\cf2 \strokec2 ), \cf7 \strokec7 where\cf2 \strokec2 (\cf3 \strokec3 "userId"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , user.id), \cf7 \strokec7 where\cf2 \strokec2 (\cf3 \strokec3 "isRead"\cf2 \strokec2 , \cf3 \strokec3 "=="\cf2 \strokec2 , \cf6 \strokec6 false\cf2 \strokec2 ));\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 unsubscribe\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 onSnapshot\cf2 \strokec2 (q, (\cf8 \strokec8 snapshot\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4       \cf7 \strokec7 setNotifications\cf2 \strokec2 (snapshot.docs.\cf7 \strokec7 map\cf2 \strokec2 (\cf8 \strokec8 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf7 \strokec7 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf7 \strokec7 Notification\cf2 \strokec2 ));\cb1 \
\cb4     \});\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \cf7 \strokec7 unsubscribe\cf2 \strokec2 ();\cb1 \
\cb4   \}, [user]);\cb1 \
\
\cb4   \cf5 \strokec5 if\cf2 \strokec2  (authLoading \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 user) \{\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \cf6 \strokec6 null\cf2 \strokec2 ;\cb1 \
\cb4   \}\cb1 \
\cb4   \cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf7 \strokec7 handleLogout\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 await\cf2 \strokec2  \cf7 \strokec7 logout\cf2 \strokec2 ();\cb1 \
\cb4     router.\cf7 \strokec7 push\cf2 \strokec2 (\cf3 \strokec3 "/"\cf2 \strokec2 );\cb1 \
\cb4   \};\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 isFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 isTalent\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ;\cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 isSeekingCoFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  isTalent \cf5 \strokec5 &&\cf2 \strokec2  (user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf7 \strokec7 TalentProfile\cf2 \strokec2 ).isSeekingCoFounder;\cb1 \
\cb4   \cb1 \
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf7 \strokec7 getMenuItems\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 let\cf2 \strokec2  baseItems;\cb1 \
\cb4     \cf5 \strokec5 switch\cf2 \strokec2  (user.role) \{\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 : \cb1 \
\cb4         baseItems \cf5 \strokec5 =\cf2 \strokec2  menuItemsFounder;\cb1 \
\cb4         \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 : \cb1 \
\cb4         baseItems \cf5 \strokec5 =\cf2 \strokec2  menuItemsInvestor;\cb1 \
\cb4         \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4       \cf5 \strokec5 case\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 : \cb1 \
\cb4         \cf5 \strokec5 let\cf2 \strokec2  talentItems \cf5 \strokec5 =\cf2 \strokec2  [\cf5 \strokec5 ...\cf2 \strokec2 menuItemsTalent];\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isSeekingCoFounder) \{\cb1 \
\cb4           talentItems \cf5 \strokec5 =\cf2 \strokec2  talentItems.\cf7 \strokec7 filter\cf2 \strokec2 (\cf8 \strokec8 item\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  item.href \cf5 \strokec5 !==\cf2 \strokec2  \cf3 \strokec3 '/matches'\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  ((user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf7 \strokec7 TalentProfile\cf2 \strokec2 ).subRole \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ) \{\cb1 \
\cb4           talentItems.\cf7 \strokec7 push\cf2 \strokec2 (\{ href: \cf3 \strokec3 "/theses"\cf2 \strokec2 , label: \cf3 \strokec3 "Theses"\cf2 \strokec2 , icon: FileText \});\cb1 \
\cb4         \}\cb1 \
\cb4         baseItems \cf5 \strokec5 =\cf2 \strokec2  talentItems;\cb1 \
\cb4         \cf5 \strokec5 break\cf2 \strokec2 ;\cb1 \
\cb4       \cf5 \strokec5 default\cf2 \strokec2 : \cb1 \
\cb4         baseItems \cf5 \strokec5 =\cf2 \strokec2  [];\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 isMobile) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  baseItems.\cf7 \strokec7 filter\cf2 \strokec2 (\cf8 \strokec8 item\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  item.href \cf5 \strokec5 !==\cf2 \strokec2  \cf3 \strokec3 '/matches'\cf2 \strokec2 );\cb1 \
\cb4     \}\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  baseItems;\cb1 \
\cb4   \}\cb1 \
\
\cb4   \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 menuItems\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf7 \strokec7 getMenuItems\cf2 \strokec2 ();\cb1 \
\
\cb4   \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4     <\cf6 \strokec6 Sidebar\cf2 \strokec2 >\cb1 \
\cb4       <\cf6 \strokec6 SidebarHeader\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "hidden md:flex"\cf2 \strokec2 >\cb1 \
\cb4         <\cf6 \strokec6 Logo\cf2 \strokec2  />\cb1 \
\cb4       </\cf6 \strokec6 SidebarHeader\cf2 \strokec2 >\cb1 \
\cb4       <\cf6 \strokec6 SidebarHeader\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "flex md:hidden items-center justify-center p-6"\cf2 \strokec2 >\cb1 \
\cb4         <\cf6 \strokec6 Logo\cf2 \strokec2  />\cb1 \
\cb4       </\cf6 \strokec6 SidebarHeader\cf2 \strokec2 >\cb1 \
\cb4       <\cf6 \strokec6 SidebarMenu\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "p-2 flex-1"\cf2 \strokec2 >\cb1 \
\cb4         \{menuItems.\cf7 \strokec7 map\cf2 \strokec2 ((\{ \cf8 \strokec8 href\cf2 \strokec2 , \cf8 \strokec8 label\cf2 \strokec2 , \cf8 \strokec8 icon\cf2 \strokec2 , \cf8 \strokec8 premium\cf2 \strokec2 , \cf8 \strokec8 notificationType\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4           \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 notificationCount\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  notifications.\cf7 \strokec7 filter\cf2 \strokec2 (\cf8 \strokec8 n\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  n.type \cf5 \strokec5 ===\cf2 \strokec2  notificationType).\cf6 \strokec6 length\cf2 \strokec2 ;\cb1 \
\
\cb4           \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2  \cf7 \strokec7 key\cf5 \strokec5 =\cf2 \strokec2 \{href\}>\cb1 \
\cb4               <\cf6 \strokec6 SidebarMenuButton\cf2 \cb1 \strokec2 \
\cb4                 \cf7 \strokec7 asChild\cf2 \cb1 \strokec2 \
\cb4                 \cf7 \strokec7 isActive\cf5 \strokec5 =\cf2 \strokec2 \{pathname.\cf7 \strokec7 startsWith\cf2 \strokec2 (href) \cf5 \strokec5 &&\cf2 \strokec2  (href \cf5 \strokec5 !==\cf2 \strokec2  \cf3 \strokec3 '/profile'\cf2 \strokec2  \cf5 \strokec5 ||\cf2 \strokec2  pathname \cf5 \strokec5 ===\cf2 \strokec2  href)\}\cb1 \
\cb4                 \cf7 \strokec7 tooltip\cf5 \strokec5 =\cf2 \strokec2 \{label\}\cb1 \
\cb4               >\cb1 \
\cb4                 <\cf6 \strokec6 Link\cf2 \strokec2  \cf7 \strokec7 href\cf5 \strokec5 =\cf2 \strokec2 \{href\}>\cb1 \
\cb4                   <\cf3 \strokec3 div\cf2 \strokec2  \cf7 \strokec7 style\cf5 \strokec5 =\cf2 \strokec2 \{\{ display: \cf3 \strokec3 'contents'\cf2 \strokec2  \}\}>\cb1 \
\cb4                     \{React.\cf7 \strokec7 createElement\cf2 \strokec2 (icon)\}\cb1 \
\cb4                     <\cf3 \strokec3 span\cf2 \strokec2 >\{label\}</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                     \{notificationCount \cf5 \strokec5 >\cf2 \strokec2  \cf6 \strokec6 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf6 \strokec6 SidebarMenuBadge\cf2 \strokec2 >\{notificationCount\}</\cf6 \strokec6 SidebarMenuBadge\cf2 \strokec2 >\}\cb1 \
\cb4                     \{isFounder \cf5 \strokec5 &&\cf2 \strokec2  premium \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 notificationCount \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                       <\cf6 \strokec6 SidebarMenuBadge\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center justify-center w-5 h-5 p-0 text-xs"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf6 \strokec6 Plus\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "w-3 h-3"\cf2 \strokec2  />\cb1 \
\cb4                       </\cf6 \strokec6 SidebarMenuBadge\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                   </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf6 \strokec6 Link\cf2 \strokec2 >\cb1 \
\cb4               </\cf6 \strokec6 SidebarMenuButton\cf2 \strokec2 >\cb1 \
\cb4             </\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2 >\cb1 \
\cb4           )\cb1 \
\cb4         \})\}\cb1 \
\cb4       </\cf6 \strokec6 SidebarMenu\cf2 \strokec2 >\cb1 \
\cb4       <\cf6 \strokec6 SidebarSeparator\cf2 \strokec2  />\cb1 \
\cb4       <\cf6 \strokec6 SidebarFooter\cf2 \strokec2  \cf7 \strokec7 className\cf5 \strokec5 =\cf3 \strokec3 "p-2"\cf2 \strokec2 >\cb1 \
\cb4         <\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2 >\cb1 \
\cb4             <\cf6 \strokec6 SidebarMenuButton\cf2 \strokec2  \cf7 \strokec7 asChild\cf2 \strokec2  \cf7 \strokec7 tooltip\cf5 \strokec5 =\cf3 \strokec3 "Settings"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf6 \strokec6 Link\cf2 \strokec2  \cf7 \strokec7 href\cf5 \strokec5 =\cf3 \strokec3 "/settings"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf6 \strokec6 Settings\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 span\cf2 \strokec2 >Settings</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                 </\cf6 \strokec6 Link\cf2 \strokec2 >\cb1 \
\cb4             </\cf6 \strokec6 SidebarMenuButton\cf2 \strokec2 >\cb1 \
\cb4         </\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2 >\cb1 \
\cb4         <\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2 >\cb1 \
\cb4             <\cf6 \strokec6 SidebarMenuButton\cf2 \strokec2  \cf7 \strokec7 onClick\cf5 \strokec5 =\cf2 \strokec2 \{handleLogout\} \cf7 \strokec7 tooltip\cf5 \strokec5 =\cf3 \strokec3 "Logout"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf6 \strokec6 LogOut\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 span\cf2 \strokec2 >Logout</\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4             </\cf6 \strokec6 SidebarMenuButton\cf2 \strokec2 >\cb1 \
\cb4         </\cf6 \strokec6 SidebarMenuItem\cf2 \strokec2 >\cb1 \
\cb4       </\cf6 \strokec6 SidebarFooter\cf2 \strokec2 >\cb1 \
\cb4     </\cf6 \strokec6 Sidebar\cf2 \strokec2 >\cb1 \
\cb4   )\cb1 \
\cb4 \}\cb1 \
\
}