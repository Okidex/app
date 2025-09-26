{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;\red93\green93\blue93;
}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;\cssrgb\c43922\c43922\c43922;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use client"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getUserById, getCurrentUser \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/data"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ notFound, useParams \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/navigation"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  UserAvatar \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/shared/user-avatar"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Button \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/button"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Briefcase, Building, ExternalLink, Github, Linkedin, Mail, MapPin, User, Star, Pencil, Loader2, ShieldCheck, ShieldAlert, Lock, Link \cf5 \strokec5 as\cf2 \strokec2  LinkIcon, Twitter, HandCoins, BarChart2, Lightbulb, UserCheck \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "lucide-react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, FounderProfile, InvestorProfile, TalentProfile, Startup, MonthlyFinancials \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Badge \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/badge"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Link \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/link"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   ChartConfig,\cb1 \
\cb4   ChartContainer,\cb1 \
\cb4   ChartTooltip,\cb1 \
\cb4   ChartTooltipContent,\cb1 \
\cb4 \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/chart"\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "recharts"\cf2 \cb1 \strokec2 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  Image \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "next/image"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ useState, useEffect \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "react"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ getFinancialBreakdown \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/actions"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/dialog"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Tabs, TabsList, TabsTrigger \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/tabs"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Select, SelectContent, SelectItem, SelectTrigger, SelectValue \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/select"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ format, subMonths, getMonth, getYear \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'date-fns'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  CapTableCard \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/profile/cap-table-card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  LockedFinancialsCard \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/profile/locked-financials-card"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ doc, getDoc \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "firebase/firestore"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/lib/firebase"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  useAuth \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/hooks/use-auth"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ Skeleton \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/components/ui/skeleton"\cf2 \strokec2 ;\cb1 \
\
\
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 FounderProfileView\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 currentUser\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 startup\cf2 \strokec2 , \cf8 \strokec8 setStartup\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Startup\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchStartup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (profile.companyId) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "startups"\cf2 \strokec2 , profile.companyId);\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDoc\cf2 \strokec2 (startupRef);\cb1 \
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (startupSnap.\cf6 \strokec6 exists\cf2 \strokec2 ()) \{\cb1 \
\cb4                     \cf6 \strokec6 setStartup\cf2 \strokec2 (startupSnap.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 );\cb1 \
\cb4                 \}\cb1 \
\cb4             \}\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchStartup\cf2 \strokec2 ();\cb1 \
\cb4     \}, [profile.companyId]);\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 selectedMetric\cf2 \strokec2 , \cf8 \strokec8 setSelectedMetric\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf8 \strokec8 string\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 breakdown\cf2 \strokec2 , \cf8 \strokec8 setBreakdown\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf8 \strokec8 string\cf2 \strokec2 >(\cf3 \strokec3 ""\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 isLoadingBreakdown\cf2 \strokec2 , \cf8 \strokec8 setIsLoadingBreakdown\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 timeframe\cf2 \strokec2 , \cf8 \strokec8 setTimeframe\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf3 \strokec3 "annual"\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 "monthly"\cf2 \strokec2 >(\cf3 \strokec3 "annual"\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 selectedMonth\cf2 \strokec2 , \cf8 \strokec8 setSelectedMonth\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 0\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 founders\cf2 \strokec2 , \cf8 \strokec8 setFounders\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2 []>([]);\cb1 \
\cb4     \cb1 \
\cb4     \cf9 \strokec9 // Simulate connection status.\cf2 \cb1 \strokec2 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isConnected\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf8 \strokec8 false\cf2 \strokec2 ; \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 showFinancials\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser?.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (isConnected \cf5 \strokec5 ||\cf2 \strokec2  currentUser?.id \cf5 \strokec5 ===\cf2 \strokec2  user.id);\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchFounders\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2 (startup) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 founderProfiles\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf8 \strokec8 Promise\cf2 \strokec2 .\cf6 \strokec6 all\cf2 \strokec2 (startup.founderIds.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 id\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 getUserById\cf2 \strokec2 (id)));\cb1 \
\cb4                 \cf6 \strokec6 setFounders\cf2 \strokec2 (founderProfiles.\cf6 \strokec6 filter\cf2 \strokec2 (Boolean) \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 []);\cb1 \
\cb4             \}\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchFounders\cf2 \strokec2 ();\cb1 \
\cb4     \}, [startup]);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (loading) \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-96 w-full"\cf2 \strokec2  />;\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 startup) \cf5 \strokec5 return\cf2 \strokec2  <\cf3 \strokec3 p\cf2 \strokec2 >Startup not found.</\cf3 \strokec3 p\cf2 \strokec2 >;\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 getChartData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 period\cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "annual"\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 "monthly"\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (period \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'annual'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  [\cb1 \
\cb4                 \{ metric: \cf3 \strokec3 "Revenue"\cf2 \strokec2 , value: startup.financials.revenue, fill: \cf3 \strokec3 "hsl(var(--chart-1))"\cf2 \strokec2  \},\cb1 \
\cb4                 \{ metric: \cf3 \strokec3 "Expenses"\cf2 \strokec2 , value: startup.financials.expenses, fill: \cf3 \strokec3 "hsl(var(--chart-2))"\cf2 \strokec2  \},\cb1 \
\cb4                 \{ metric: \cf3 \strokec3 "Net Income"\cf2 \strokec2 , value: startup.financials.netIncome, fill: \cf3 \strokec3 "hsl(var(--chart-3))"\cf2 \strokec2  \},\cb1 \
\cb4                 \{ metric: \cf3 \strokec3 "MRR"\cf2 \strokec2 , value: startup.financials.monthlyRecurringRevenue \cf5 \strokec5 *\cf2 \strokec2  \cf8 \strokec8 12\cf2 \strokec2 , fill: \cf3 \strokec3 "hsl(var(--chart-4))"\cf2 \strokec2  \},\cb1 \
\cb4             ];\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 targetMonthDate\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 subMonths\cf2 \strokec2 (\cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 (), selectedMonth);\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 targetMonthStr\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 format\cf2 \strokec2 (targetMonthDate, \cf3 \strokec3 'yyyy-MM'\cf2 \strokec2 );\cb1 \
\cb4             \cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 monthlyData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startup.monthlyFinancials.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 d\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  d.month \cf5 \strokec5 ===\cf2 \strokec2  targetMonthStr);\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (monthlyData) \{\cb1 \
\cb4                  \cf5 \strokec5 return\cf2 \strokec2  [\cb1 \
\cb4                     \{ metric: \cf3 \strokec3 "Revenue"\cf2 \strokec2 , value: monthlyData.revenue, fill: \cf3 \strokec3 "hsl(var(--chart-1))"\cf2 \strokec2  \},\cb1 \
\cb4                     \{ metric: \cf3 \strokec3 "Expenses"\cf2 \strokec2 , value: monthlyData.expenses, fill: \cf3 \strokec3 "hsl(var(--chart-2))"\cf2 \strokec2  \},\cb1 \
\cb4                     \{ metric: \cf3 \strokec3 "Net Income"\cf2 \strokec2 , value: monthlyData.netIncome, fill: \cf3 \strokec3 "hsl(var(--chart-3))"\cf2 \strokec2  \},\cb1 \
\cb4                     \{ metric: \cf3 \strokec3 "MRR"\cf2 \strokec2 , value: monthlyData.monthlyRecurringRevenue, fill: \cf3 \strokec3 "hsl(var(--chart-4))"\cf2 \strokec2  \},\cb1 \
\cb4                 ];\cb1 \
\cb4             \}\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  [];\cb1 \
\cb4         \}\cb1 \
\cb4     \};\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 chartData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 getChartData\cf2 \strokec2 (timeframe);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 chartConfig\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4         value: \{ label: \cf3 \strokec3 "Value"\cf2 \strokec2  \},\cb1 \
\cb4         revenue: \{ label: \cf3 \strokec3 "Revenue"\cf2 \strokec2 , color: \cf3 \strokec3 "hsl(var(--chart-1))"\cf2 \strokec2  \},\cb1 \
\cb4         expenses: \{ label: \cf3 \strokec3 "Expenses"\cf2 \strokec2 , color: \cf3 \strokec3 "hsl(var(--chart-2))"\cf2 \strokec2  \},\cb1 \
\cb4         netIncome: \{ label: \cf3 \strokec3 "Net Income"\cf2 \strokec2 , color: \cf3 \strokec3 "hsl(var(--chart-3))"\cf2 \strokec2  \},\cb1 \
\cb4         mrr: \{ label: \cf3 \strokec3 "MRR"\cf2 \strokec2 , color: \cf3 \strokec3 "hsl(var(--chart-4))"\cf2 \strokec2  \},\cb1 \
\cb4     \} \cf5 \strokec5 satisfies\cf2 \strokec2  \cf6 \strokec6 ChartConfig\cf2 \strokec2 ;\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 handleBarClick\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  (\cf7 \strokec7 data\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (data \cf5 \strokec5 &&\cf2 \strokec2  data.activePayload \cf5 \strokec5 &&\cf2 \strokec2  data.activePayload[\cf8 \strokec8 0\cf2 \strokec2 ]) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 metric\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  data.activePayload[\cf8 \strokec8 0\cf2 \strokec2 ].payload.metric;\cb1 \
\cb4             \cf6 \strokec6 setSelectedMetric\cf2 \strokec2 (metric);\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb4 \strokec6 setIsLoadingBreakdown\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getFinancialBreakdown\cf2 \strokec2 (metric);\cb1 \
\cb4             \cf6 \strokec6 setBreakdown\cf2 \strokec2 (result);\cb1 \
\cb4             \cf6 \strokec6 setIsLoadingBreakdown\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\cb4     \};\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 formatYAxis\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\cf7 \strokec7 value\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 number\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (timeframe \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'annual'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 `$$\{\cf6 \strokec6 Number\cf3 \strokec3 (\cf2 \strokec2 value\cf3 \strokec3 ) \cf5 \strokec5 /\cf3 \strokec3  \cf8 \strokec8 1000\cf3 \strokec3 \}k`\cf2 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 `$$\{(\cf6 \strokec6 Number\cf3 \strokec3 (\cf2 \strokec2 value\cf3 \strokec3 ) \cf5 \strokec5 /\cf3 \strokec3  \cf8 \strokec8 1000\cf3 \strokec3 ).\cf6 \strokec6 toFixed\cf3 \strokec3 (\cf8 \strokec8 1\cf3 \strokec3 )\}k`\cf2 \cb1 \strokec2 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 months\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  Array.\cf6 \strokec6 from\cf2 \strokec2 (\{ length: \cf8 \strokec8 6\cf2 \strokec2  \}, (\cf7 \strokec7 _\cf2 \strokec2 , \cf7 \strokec7 i\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  (\{\cb1 \
\cb4       value: i,\cb1 \
\cb4       label: \cf6 \strokec6 format\cf2 \strokec2 (\cf6 \strokec6 subMonths\cf2 \strokec2 (\cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Date\cf2 \strokec2 (), i), \cf3 \strokec3 'MMMM yyyy'\cf2 \strokec2 )\cb1 \
\cb4     \}));\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isIncorporated\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startup.incorporationDetails.isIncorporated;\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid md:grid-cols-3 gap-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "md:col-span-2 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >About \{startup.companyName\}</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >\{startup.description\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                  \{isIncorporated \cf5 \strokec5 &&\cf2 \strokec2  showFinancials \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <>\cb1 \
\cb4                         <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex justify-between items-start"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 CardTitle\cf2 \strokec2 >Financial Snapshot</\cf8 \strokec8 CardTitle\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 CardDescription\cf2 \strokec2 >\{timeframe \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'annual'\cf2 \strokec2  \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 'Annualized'\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 'Monthly'\cf2 \strokec2 \} key metrics. Click a bar for details.</\cf8 \strokec8 CardDescription\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex gap-2"\cf2 \strokec2 >\cb1 \
\cb4                                         \{timeframe \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'monthly'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                                             <\cf8 \strokec8 Select\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 String\cf2 \strokec2 (selectedMonth)\} \cf6 \strokec6 onValueChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 value\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setSelectedMonth\cf2 \strokec2 (\cf6 \strokec6 Number\cf2 \strokec2 (value))\}>\cb1 \
\cb4                                                 <\cf8 \strokec8 SelectTrigger\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-[180px]"\cf2 \strokec2 >\cb1 \
\cb4                                                     <\cf8 \strokec8 SelectValue\cf2 \strokec2  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf3 \strokec3 "Select month"\cf2 \strokec2  />\cb1 \
\cb4                                                 </\cf8 \strokec8 SelectTrigger\cf2 \strokec2 >\cb1 \
\cb4                                                 <\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                                     \{months.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 month\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                                                         <\cf8 \strokec8 SelectItem\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{month.value\} \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{\cf6 \strokec6 String\cf2 \strokec2 (month.value)\}>\{month.label\}</\cf8 \strokec8 SelectItem\cf2 \strokec2 >\cb1 \
\cb4                                                     ))\}\cb1 \
\cb4                                                 </\cf8 \strokec8 SelectContent\cf2 \strokec2 >\cb1 \
\cb4                                             </\cf8 \strokec8 Select\cf2 \strokec2 >\cb1 \
\cb4                                         )\}\cb1 \
\cb4                                         <\cf8 \strokec8 Tabs\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf2 \strokec2 \{timeframe\} \cf6 \strokec6 onValueChange\cf5 \strokec5 =\cf2 \strokec2 \{(\cf7 \strokec7 value\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setTimeframe\cf2 \strokec2 (value \cf5 \strokec5 as\cf2 \strokec2  \cf3 \strokec3 "annual"\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf3 \strokec3 "monthly"\cf2 \strokec2 )\}>\cb1 \
\cb4                                             <\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4                                                 <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "annual"\cf2 \strokec2 >Annual</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\cb1 \
\cb4                                                 <\cf8 \strokec8 TabsTrigger\cf2 \strokec2  \cf6 \strokec6 value\cf5 \strokec5 =\cf3 \strokec3 "monthly"\cf2 \strokec2 >Monthly</\cf8 \strokec8 TabsTrigger\cf2 \strokec2 >\cb1 \
\cb4                                             </\cf8 \strokec8 TabsList\cf2 \strokec2 >\cb1 \
\cb4                                         </\cf8 \strokec8 Tabs\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 ChartContainer\cf2 \strokec2  \cf6 \strokec6 config\cf5 \strokec5 =\cf2 \strokec2 \{chartConfig\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "min-h-[200px] w-full"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 BarChart\cf2 \strokec2  \cf6 \strokec6 accessibilityLayer\cf2 \strokec2  \cf6 \strokec6 data\cf5 \strokec5 =\cf2 \strokec2 \{chartData\} \cf6 \strokec6 onClick\cf5 \strokec5 =\cf2 \strokec2 \{handleBarClick\}>\cb1 \
\cb4                                         <\cf8 \strokec8 CartesianGrid\cf2 \strokec2  \cf6 \strokec6 vertical\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 false\cf2 \strokec2 \} />\cb1 \
\cb4                                         <\cf8 \strokec8 XAxis\cf2 \strokec2  \cf6 \strokec6 dataKey\cf5 \strokec5 =\cf3 \strokec3 "metric"\cf2 \strokec2  \cf6 \strokec6 tickLine\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 false\cf2 \strokec2 \} \cf6 \strokec6 tickMargin\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 10\cf2 \strokec2 \} \cf6 \strokec6 axisLine\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 false\cf2 \strokec2 \} />\cb1 \
\cb4                                         <\cf8 \strokec8 YAxis\cf2 \strokec2  \cf6 \strokec6 tickFormatter\cf5 \strokec5 =\cf2 \strokec2 \{formatYAxis\} />\cb1 \
\cb4                                         <\cf8 \strokec8 ChartTooltip\cf2 \strokec2  \cf6 \strokec6 cursor\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 false\cf2 \strokec2 \} \cf6 \strokec6 content\cf5 \strokec5 =\cf2 \strokec2 \{<\cf8 \strokec8 ChartTooltipContent\cf2 \strokec2  \cf6 \strokec6 indicator\cf5 \strokec5 =\cf3 \strokec3 "line"\cf2 \strokec2  />\} />\cb1 \
\cb4                                         <\cf8 \strokec8 Bar\cf2 \strokec2  \cf6 \strokec6 dataKey\cf5 \strokec5 =\cf3 \strokec3 "value"\cf2 \strokec2  \cf6 \strokec6 radius\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 4\cf2 \strokec2 \} \cf6 \strokec6 style\cf5 \strokec5 =\cf2 \strokec2 \{\{ cursor: \cf3 \strokec3 'pointer'\cf2 \strokec2  \}\}>\cb1 \
\cb4                                             \{chartData.\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 entry\cf2 \strokec2 , \cf7 \strokec7 index\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                                                 <\cf8 \strokec8 Cell\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `cell-$\{\cf2 \strokec2 index\cf3 \strokec3 \}`\cf2 \strokec2 \} \cf6 \strokec6 fill\cf5 \strokec5 =\cf2 \strokec2 \{entry.fill\} />\cb1 \
\cb4                                             ))\}\cb1 \
\cb4                                         </\cf8 \strokec8 Bar\cf2 \strokec2 >\cb1 \
\cb4                                     </\cf8 \strokec8 BarChart\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf8 \strokec8 ChartContainer\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CapTableCard\cf2 \strokec2  \cf6 \strokec6 capTable\cf5 \strokec5 =\cf2 \strokec2 \{startup.capTable\} />\cb1 \
\cb4                     </>\cb1 \
\cb4                 )\}\cb1 \
\
\cb4                 \{isIncorporated \cf5 \strokec5 &&\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 showFinancials \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 LockedFinancialsCard\cf2 \strokec2  />\cb1 \
\cb4                 )\}\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Company Info</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4 text-sm"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 ><\cf8 \strokec8 Building\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  /> <\cf3 \strokec3 span\cf2 \strokec2 >Industry: <\cf3 \strokec3 strong\cf2 \strokec2 >\{startup.industry\}</\cf3 \strokec3 strong\cf2 \strokec2 ></\cf3 \strokec3 span\cf2 \strokec2 ></\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 ><\cf8 \strokec8 Briefcase\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  /> <\cf3 \strokec3 span\cf2 \strokec2 >Stage: <\cf3 \strokec3 strong\cf2 \strokec2 >\{startup.stage\}</\cf3 \strokec3 strong\cf2 \strokec2 ></\cf3 \strokec3 span\cf2 \strokec2 ></\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             \{isIncorporated \cf5 \strokec5 ?\cf2 \strokec2  <\cf8 \strokec8 ShieldCheck\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-green-600"\cf2 \strokec2  /> \cf5 \strokec5 :\cf2 \strokec2  <\cf8 \strokec8 ShieldAlert\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-amber-600"\cf2 \strokec2  />\}\cb1 \
\cb4                             <\cf3 \strokec3 span\cf2 \strokec2 >Status: <\cf3 \strokec3 strong\cf2 \strokec2 >\{isIncorporated \cf5 \strokec5 ?\cf2 \strokec2  \cf3 \strokec3 "Incorporated"\cf2 \strokec2  \cf5 \strokec5 :\cf2 \strokec2  \cf3 \strokec3 "Not Incorporated"\cf2 \strokec2 \}</\cf3 \strokec3 strong\cf2 \strokec2 ></\cf3 \strokec3 span\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 ><\cf8 \strokec8 ExternalLink\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  /> <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{startup.website\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-primary hover:underline"\cf2 \strokec2 ><\cf3 \strokec3 strong\cf2 \strokec2 >Visit Website</\cf3 \strokec3 strong\cf2 \strokec2 ></\cf3 \strokec3 a\cf2 \strokec2 ></\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Founders</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{founders.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 founder\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{founder.id\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-3"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{founder.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{founder.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-10 h-10"\cf2 \strokec2  />\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-medium flex items-center gap-1.5"\cf2 \strokec2 >\cb1 \
\cb4                                         <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{\cf3 \strokec3 `/users/$\{\cf2 \strokec2 founder\cf3 \strokec3 .\cf2 \strokec2 id\cf3 \strokec3 \}`\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "hover:underline"\cf2 \strokec2 >\{founder.name\}</\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                                         \{(founder.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).isLead \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 Star\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-3.5 h-3.5 fill-yellow-400 text-yellow-500"\cf2 \strokec2  />\}\cb1 \
\cb4                                     </\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >\{(founder.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).title\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         ))\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 Dialog\cf2 \strokec2  \cf6 \strokec6 open\cf5 \strokec5 =\cf2 \strokec2 \{\cf5 \strokec5 !!\cf2 \strokec2 selectedMetric\} \cf6 \strokec6 onOpenChange\cf5 \strokec5 =\cf2 \strokec2 \{() \cf5 \strokec5 =>\cf2 \strokec2  \cf6 \strokec6 setSelectedMetric\cf2 \strokec2 (\cf8 \strokec8 null\cf2 \strokec2 )\}>\cb1 \
\cb4                 <\cf8 \strokec8 DialogContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "sm:max-w-[425px]"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 DialogTitle\cf2 \strokec2 >Detailed Breakdown: \{selectedMetric\}</\cf8 \strokec8 DialogTitle\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 DialogDescription\cf2 \strokec2 >\cb1 \
\cb4                             AI-generated analysis of the selected financial metric.\cb1 \
\cb4                         </\cf8 \strokec8 DialogDescription\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 DialogHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "py-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{isLoadingBreakdown \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Loader2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-8 w-8 animate-spin text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         ) \cf5 \strokec5 :\cf2 \strokec2  (\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground whitespace-pre-wrap"\cf2 \strokec2 >\{breakdown\}</\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         )\}\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 DialogContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Dialog\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 InvestorProfileView\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid md:grid-cols-3 gap-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "md:col-span-2 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >About</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                          <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground whitespace-pre-wrap"\cf2 \strokec2 >\{profile.about\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Investment Thesis</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 ><\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground whitespace-pre-wrap"\cf2 \strokec2 >\{profile.thesis\}</\cf3 \strokec3 p\cf2 \strokec2 ></\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 \{profile.companyName \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Company Info</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-3 text-sm"\cf2 \strokec2 >\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Building\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                                 <\cf3 \strokec3 strong\cf2 \strokec2 >\{profile.companyName\}</\cf3 \strokec3 strong\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             \{profile.companyUrl \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 ExternalLink\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2  />\cb1 \
\cb4                                     <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{profile.companyUrl\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-primary hover:underline"\cf2 \strokec2 >Visit Website</\cf3 \strokec3 a\cf2 \strokec2 >\cb1 \
\cb4                                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             )\}\cb1 \
\cb4                         </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4                 \{profile.seeking \cf5 \strokec5 &&\cf2 \strokec2  profile.seeking.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 >\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                      <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Actively Seeking</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             \{profile.seeking.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 item\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{item\}>\{item\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                         </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Focus Areas</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-3"\cf2 \strokec2 >\cb1 \
\cb4                          <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 h4\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm font-semibold mb-2 flex items-center gap-2"\cf2 \strokec2 ><\cf8 \strokec8 HandCoins\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2 />Industries</\cf3 \strokec3 h4\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap gap-2"\cf2 \strokec2 >\cb1 \
\cb4                                 \{profile.investmentInterests.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 interest\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{interest\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{interest\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                          <\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 h4\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm font-semibold mb-2 flex items-center gap-2"\cf2 \strokec2 ><\cf8 \strokec8 BarChart2\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4 text-muted-foreground"\cf2 \strokec2 />Stages</\cf3 \strokec3 h4\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap gap-2"\cf2 \strokec2 >\cb1 \
\cb4                                 \{profile.investmentStages?.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 stage\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{stage\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >\{stage\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Portfolio</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{profile.portfolio.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 company\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{company.companyName\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-3"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{company.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{company.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 40\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 40\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-10 h-10 rounded-md border"\cf2 \strokec2  />\cb1 \
\cb4                                 <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{company.companyUrl\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noopener noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-medium hover:underline"\cf2 \strokec2 >\{company.companyName\}</\cf3 \strokec3 a\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         ))\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                  <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Exits</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                         \{profile.exits.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 exit\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  (\cb1 \
\cb4                              <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{exit.companyName\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-3"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{exit.companyUrl\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noopener noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "font-medium hover:underline"\cf2 \strokec2 >\{exit.companyName\}</\cf3 \strokec3 a\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         ))\}\cb1 \
\cb4                          \{profile.exits.\cf8 \strokec8 length\cf2 \strokec2  \cf5 \strokec5 ===\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground"\cf2 \strokec2 >No exits to display.</\cf3 \strokec3 p\cf2 \strokec2 >\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 TalentProfileView\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid md:grid-cols-3 gap-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "md:col-span-2 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Experience</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 ><\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground whitespace-pre-wrap"\cf2 \strokec2 >\{profile.experience\}</\cf3 \strokec3 p\cf2 \strokec2 ></\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                  <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >About</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                          <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-sm text-muted-foreground whitespace-pre-wrap"\cf2 \strokec2 >\{profile.about\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                  <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Skills</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap gap-2"\cf2 \strokec2 >\cb1 \
\cb4                         \{profile.skills?.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 skill\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 key\cf5 \strokec5 =\cf2 \strokec2 \{skill\} \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2 >\{skill\}</\cf8 \strokec8 Badge\cf2 \strokec2 >)\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardHeader\cf2 \strokec2 ><\cf8 \strokec8 CardTitle\cf2 \strokec2 >Links</\cf8 \strokec8 CardTitle\cf2 \strokec2 ></\cf8 \strokec8 CardHeader\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-4"\cf2 \strokec2 >\cb1 \
\cb4                          <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{profile.linkedin\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2 text-sm text-primary hover:underline"\cf2 \strokec2 ><\cf8 \strokec8 Linkedin\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4"\cf2 \strokec2  /> <\cf3 \strokec3 span\cf2 \strokec2 >LinkedIn Profile</\cf3 \strokec3 span\cf2 \strokec2 ></\cf3 \strokec3 a\cf2 \strokec2 >\cb1 \
\cb4                          \{profile.github \cf5 \strokec5 &&\cf2 \strokec2  <\cf3 \strokec3 a\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf2 \strokec2 \{profile.github\} \cf6 \strokec6 target\cf5 \strokec5 =\cf3 \strokec3 "_blank"\cf2 \strokec2  \cf6 \strokec6 rel\cf5 \strokec5 =\cf3 \strokec3 "noreferrer"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2 text-sm text-primary hover:underline"\cf2 \strokec2 ><\cf8 \strokec8 Github\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-4 h-4"\cf2 \strokec2  /> <\cf3 \strokec3 span\cf2 \strokec2 >GitHub Profile</\cf3 \strokec3 span\cf2 \strokec2 ></\cf3 \strokec3 a\cf2 \strokec2 >\}\cb1 \
\cb4                     </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4                 </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 UserProfileHeader\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 isOwnProfile\cf2 \strokec2 , \cf7 \strokec7 startup\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 isOwnProfile\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 boolean\cf2 \strokec2 , \cf7 \strokec7 startup\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 startup) \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 Card\cf2 \strokec2 ><\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-6"\cf2 \strokec2 ><\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-24 w-full"\cf2 \strokec2  /></\cf8 \strokec8 CardContent\cf2 \strokec2 ></\cf8 \strokec8 Card\cf2 \strokec2 >;\cb1 \
\
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-6 flex flex-col sm:flex-row items-start gap-6 relative"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 Image\cf2 \strokec2  \cf6 \strokec6 src\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyLogoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf2 \strokec2 \{startup.companyName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 96\cf2 \strokec2 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf2 \strokec2 \{\cf8 \strokec8 96\cf2 \strokec2 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-24 h-24 rounded-full border"\cf2 \strokec2  \cf6 \strokec6 data-ai-hint\cf5 \strokec5 =\cf3 \strokec3 "logo"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >\{startup.companyName\}</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                              \{profile.isSeekingCoFounder \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                                 <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "gap-1.5"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 UserCheck\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-3.5 h-3.5"\cf2 \strokec2  />\cb1 \
\cb4                                     Seeking Co-founder\cb1 \
\cb4                                 </\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4                             )\}\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground"\cf2 \strokec2 >\{startup.tagline\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                         \cb1 \
\cb4                         \{\cf5 \strokec5 !\cf2 \strokec2 isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4 mt-4"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2 >Connect</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >Message</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         )\}\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                      \{isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/profile/edit"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 Pencil\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  />\cb1 \
\cb4                                     Edit Profile\cb1 \
\cb4                                 </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                 </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4         )\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 profile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-6 flex flex-col sm:flex-row items-start gap-6 relative"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-24 h-24 text-3xl"\cf2 \strokec2  />\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >\{user.name\}</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                             \{profile.investorType \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 Badge\cf2 \strokec2 >\{profile.investorType\}</\cf8 \strokec8 Badge\cf2 \strokec2 >\}\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground capitalize"\cf2 \strokec2 >\{user.role\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                         \cb1 \
\cb4                         \{\cf5 \strokec5 !\cf2 \strokec2 isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4 mt-4"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2 >Connect</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >Message</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                         )\}\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                      \{isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/profile/edit"\cf2 \strokec2 >\cb1 \
\cb4                                     <\cf8 \strokec8 Pencil\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  />\cb1 \
\cb4                                     Edit Profile\cb1 \
\cb4                                 </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                             </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                 </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4             </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4         );\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf9 \strokec9 // Default for Talent and others\cf2 \cb1 \strokec2 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 talentProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isSeekingCoFounder\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  talentProfile.isSeekingCoFounder;\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 CardContent\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "p-6 flex flex-col sm:flex-row items-start gap-6 relative"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 UserAvatar\cf2 \strokec2  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 \{user.name\} \cf6 \strokec6 avatarUrl\cf5 \strokec5 =\cf2 \strokec2 \{user.avatarUrl\} \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-24 h-24 text-3xl"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex-1"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex flex-wrap items-center gap-2"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf3 \strokec3 h1\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-2xl font-bold font-headline"\cf2 \strokec2 >\{user.name\}</\cf3 \strokec3 h1\cf2 \strokec2 >\cb1 \
\cb4                         \{isSeekingCoFounder \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                             <\cf8 \strokec8 Badge\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "secondary"\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "gap-1.5"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 UserCheck\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "w-3.5 h-3.5"\cf2 \strokec2  />\cb1 \
\cb4                                 Seeking Co-founder\cb1 \
\cb4                             </\cf8 \strokec8 Badge\cf2 \strokec2 >\cb1 \
\cb4                         )\}\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     \{talentProfile.headline \cf5 \strokec5 ?\cf2 \strokec2  (\cb1 \
\cb4                          <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-lg text-muted-foreground"\cf2 \strokec2 >\{talentProfile.headline\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     ) \cf5 \strokec5 :\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 p\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "text-muted-foreground capitalize"\cf2 \strokec2 >\{user.role\}</\cf3 \strokec3 p\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                     \cb1 \
\cb4                     \{\cf5 \strokec5 !\cf2 \strokec2 isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "flex items-center gap-4 mt-4"\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2 >Connect</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 variant\cf5 \strokec5 =\cf3 \strokec3 "outline"\cf2 \strokec2 >Message</\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     )\}\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                  \{isOwnProfile \cf5 \strokec5 &&\cf2 \strokec2  (\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "absolute top-1/2 right-6 -translate-y-1/2 flex items-center justify-center"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Button\cf2 \strokec2  \cf6 \strokec6 asChild\cf2 \strokec2 >\cb1 \
\cb4                             <\cf8 \strokec8 Link\cf2 \strokec2  \cf6 \strokec6 href\cf5 \strokec5 =\cf3 \strokec3 "/profile/edit"\cf2 \strokec2 >\cb1 \
\cb4                                 <\cf8 \strokec8 Pencil\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "mr-2 h-4 w-4"\cf2 \strokec2  />\cb1 \
\cb4                                 Edit Profile\cb1 \
\cb4                             </\cf8 \strokec8 Link\cf2 \strokec2 >\cb1 \
\cb4                         </\cf8 \strokec8 Button\cf2 \strokec2 >\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 )\}\cb1 \
\cb4             </\cf8 \strokec8 CardContent\cf2 \strokec2 >\cb1 \
\cb4         </\cf8 \strokec8 Card\cf2 \strokec2 >\cb1 \
\cb4     )\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 UserProfileClient\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (\{ \cf7 \strokec7 user\cf2 \strokec2 , \cf7 \strokec7 currentUser\cf2 \strokec2  \}\cf5 \strokec5 :\cf2 \strokec2  \{ \cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 , \cf7 \strokec7 currentUser\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2  \}) \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 startup\cf2 \strokec2 , \cf8 \strokec8 setStartup\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 Startup\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchStartup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  (user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).companyId) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 companyId\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  (user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ).companyId;\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "startups"\cf2 \strokec2 , companyId\cf5 \strokec5 !\cf2 \strokec2 );\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupSnap\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDoc\cf2 \strokec2 (startupRef);\cb1 \
\cb4                 \cf5 \strokec5 if\cf2 \strokec2  (startupSnap.\cf6 \strokec6 exists\cf2 \strokec2 ()) \{\cb1 \
\cb4                     \cf6 \strokec6 setStartup\cf2 \strokec2 (startupSnap.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 );\cb1 \
\cb4                 \}\cb1 \
\cb4             \}\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchStartup\cf2 \strokec2 ();\cb1 \
\cb4     \}, [user]);\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 isOwnProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  currentUser?.id \cf5 \strokec5 ===\cf2 \strokec2  user.id;\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4         <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4             <\cf8 \strokec8 UserProfileHeader\cf2 \strokec2  \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} \cf6 \strokec6 isOwnProfile\cf5 \strokec5 =\cf2 \strokec2 \{isOwnProfile\} \cf6 \strokec6 startup\cf5 \strokec5 =\cf2 \strokec2 \{startup\} />\cb1 \
\cb4             \{user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 FounderProfileView\cf2 \strokec2  \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\} />\}\cb1 \
\cb4             \{user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 InvestorProfileView\cf2 \strokec2  \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} />\}\cb1 \
\cb4             \{user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  <\cf8 \strokec8 TalentProfileView\cf2 \strokec2  \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} />\}\cb1 \
\cb4         </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4     );\cb1 \
\cb4 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 default\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 UserProfilePage\cf2 \strokec2 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 params\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useParams\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 id\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  params.id \cf5 \strokec5 as\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \{ \cf7 \strokec7 user\cf2 \strokec2 : \cf8 \strokec8 authUser\cf2 \strokec2 , \cf7 \strokec7 loading\cf2 \strokec2 : \cf8 \strokec8 authLoading\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useAuth\cf2 \strokec2 ();\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 user\cf2 \strokec2 , \cf8 \strokec8 setUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 currentUser\cf2 \strokec2 , \cf8 \strokec8 setCurrentUser\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 <\cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 |\cf2 \strokec2  \cf8 \strokec8 null\cf2 \strokec2 >(\cf8 \strokec8 null\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  [\cf8 \strokec8 loading\cf2 \strokec2 , \cf8 \strokec8 setLoading\cf2 \strokec2 ] \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 useState\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\
\cb4     \cf6 \strokec6 useEffect\cf2 \strokec2 (() \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf6 \strokec6 fetchUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  () \cf5 \strokec5 =>\cf2 \strokec2  \{\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 true\cf2 \strokec2 );\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getUserById\cf2 \strokec2 (id);\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 userProfile) \{\cb1 \
\cb4                 \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4                 \cf6 \strokec6 notFound\cf2 \strokec2 ();\cb1 \
\cb4                 \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\cb4             \}\cb1 \
\cb4             \cf6 \strokec6 setUser\cf2 \strokec2 (userProfile);\cb1 \
\cb4             \cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (authLoading) \cf5 \strokec5 return\cf2 \strokec2 ;\cb1 \
\
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (authUser) \{\cb1 \
\cb4                 \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 currentUserProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getCurrentUser\cf2 \strokec2 ();\cb1 \
\cb4                 \cf6 \strokec6 setCurrentUser\cf2 \strokec2 (currentUserProfile);\cb1 \
\cb4             \}\cb1 \
\cb4             \cf6 \strokec6 setLoading\cf2 \strokec2 (\cf8 \strokec8 false\cf2 \strokec2 );\cb1 \
\cb4         \};\cb1 \
\cb4         \cf6 \strokec6 fetchUsers\cf2 \strokec2 ();\cb1 \
\cb4     \}, [id, authUser, authLoading]);\cb1 \
\cb4     \cb1 \
\
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (loading \cf5 \strokec5 ||\cf2 \strokec2  \cf5 \strokec5 !\cf2 \strokec2 user) \{\cb1 \
\cb4        \cf5 \strokec5 return\cf2 \strokec2  (\cb1 \
\cb4             <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                 <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-40 w-full"\cf2 \strokec2  />\cb1 \
\cb4                 <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "grid md:grid-cols-3 gap-6"\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "md:col-span-2 space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-64 w-full"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-64 w-full"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                     <\cf3 \strokec3 div\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "space-y-6"\cf2 \strokec2 >\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-48 w-full"\cf2 \strokec2  />\cb1 \
\cb4                         <\cf8 \strokec8 Skeleton\cf2 \strokec2  \cf6 \strokec6 className\cf5 \strokec5 =\cf3 \strokec3 "h-48 w-full"\cf2 \strokec2  />\cb1 \
\cb4                     </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4                 </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4             </\cf3 \strokec3 div\cf2 \strokec2 >\cb1 \
\cb4         );\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 return\cf2 \strokec2  <\cf8 \strokec8 UserProfileClient\cf2 \strokec2  \cf6 \strokec6 user\cf5 \strokec5 =\cf2 \strokec2 \{user\} \cf6 \strokec6 currentUser\cf5 \strokec5 =\cf2 \strokec2 \{currentUser\} />;\cb1 \
\cb4 \}\cb1 \
\
}