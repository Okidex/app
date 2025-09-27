{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red181\green26\blue70;\red255\green255\blue255;\red31\green31\blue31;
\red14\green106\blue57;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c76863\c18824\c34510;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c0\c48235\c28627;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/components/ui/table"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ CapTableEntry \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "@/lib/types"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ Users \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "lucide-react"\cf4 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf4 \strokec4  \{ Badge \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 "../ui/badge"\cf4 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 interface\cf4 \strokec4  \cf6 \strokec6 CapTableCardProps\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf7 \strokec7 capTable\cf2 \strokec2 :\cf4 \strokec4  \cf6 \strokec6 CapTableEntry\cf4 \strokec4 [];\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 formatCurrency\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  (\cf7 \strokec7 value\cf2 \strokec2 :\cf4 \strokec4  \cf8 \strokec8 number\cf4 \strokec4 ) \cf2 \strokec2 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf2 \strokec2 if\cf4 \strokec4  (value \cf2 \strokec2 ===\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ) \cf2 \strokec2 return\cf4 \strokec4  \cf5 \strokec5 "-"\cf4 \strokec4 ;\cb1 \
\cb3     \cf2 \strokec2 return\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  Intl.\cf6 \strokec6 NumberFormat\cf4 \strokec4 (\cf5 \strokec5 'en-US'\cf4 \strokec4 , \{\cb1 \
\cb3         style: \cf5 \strokec5 'currency'\cf4 \strokec4 ,\cb1 \
\cb3         currency: \cf5 \strokec5 'USD'\cf4 \strokec4 ,\cb1 \
\cb3         minimumFractionDigits: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3         maximumFractionDigits: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3     \}).\cf6 \strokec6 format\cf4 \strokec4 (value);\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  \cf2 \strokec2 function\cf4 \strokec4  \cf6 \strokec6 CapTableCard\cf4 \strokec4 (\{ \cf7 \strokec7 capTable\cf4 \strokec4  \}\cf2 \strokec2 :\cf4 \strokec4  \cf6 \strokec6 CapTableCardProps\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf2 \strokec2 const\cf4 \strokec4  \cf8 \strokec8 totalInvestment\cf4 \strokec4  \cf2 \strokec2 =\cf4 \strokec4  capTable.\cf6 \strokec6 reduce\cf4 \strokec4 ((\cf7 \strokec7 acc\cf4 \strokec4 , \cf7 \strokec7 entry\cf4 \strokec4 ) \cf2 \strokec2 =>\cf4 \strokec4  acc \cf2 \strokec2 +\cf4 \strokec4  entry.investment, \cf8 \strokec8 0\cf4 \strokec4 );\cb1 \
\
\cb3     \cf2 \strokec2 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf5 \strokec5 div\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "flex justify-between items-start"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf5 \strokec5 div\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardTitle\cf4 \strokec4 >Capitalization Table</\cf8 \strokec8 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                             Total Investment: <\cf5 \strokec5 strong\cf4 \strokec4 >\{\cf6 \strokec6 formatCurrency\cf4 \strokec4 (totalInvestment)\}</\cf5 \strokec5 strong\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf5 \strokec5 div\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 Users\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "w-6 h-6 text-muted-foreground"\cf4 \strokec4  />\cb1 \
\cb3                 </\cf5 \strokec5 div\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Table\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 TableHeader\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Shareholder</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Stage</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >Investment</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >Shares</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >Equity</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3                     </\cf8 \strokec8 TableHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 TableBody\cf4 \strokec4 >\cb1 \
\cb3                         \{capTable.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 entry\cf4 \strokec4  \cf2 \strokec2 =>\cf4 \strokec4  (\cb1 \
\cb3                             <\cf8 \strokec8 TableRow\cf4 \strokec4  \cf6 \strokec6 key\cf2 \strokec2 =\cf4 \strokec4 \{entry.id\}>\cb1 \
\cb3                                 <\cf8 \strokec8 TableCell\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "font-medium"\cf4 \strokec4 >\{entry.shareholderName\}</\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 TableCell\cf4 \strokec4 ><\cf8 \strokec8 Badge\cf4 \strokec4  \cf6 \strokec6 variant\cf2 \strokec2 =\cf5 \strokec5 "outline"\cf4 \strokec4 >\{entry.investmentStage\}</\cf8 \strokec8 Badge\cf4 \strokec4 ></\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 TableCell\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >\{\cf6 \strokec6 formatCurrency\cf4 \strokec4 (entry.investment)\}</\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 TableCell\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >\{entry.shares.\cf6 \strokec6 toLocaleString\cf4 \strokec4 ()\}</\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 TableCell\cf4 \strokec4  \cf6 \strokec6 className\cf2 \strokec2 =\cf5 \strokec5 "text-right"\cf4 \strokec4 >\{entry.equityPercentage.\cf6 \strokec6 toFixed\cf4 \strokec4 (\cf8 \strokec8 2\cf4 \strokec4 )\}%</\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                             </\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3                         ))\}\cb1 \
\cb3                     </\cf8 \strokec8 TableBody\cf4 \strokec4 >\cb1 \
\cb3                 </\cf8 \strokec8 Table\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3         </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3     );\cb1 \
\cb3 \}\cb1 \
\
}