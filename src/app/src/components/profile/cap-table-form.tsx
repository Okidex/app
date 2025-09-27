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
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'react'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Card, CardContent, CardDescription, CardHeader, CardTitle \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/table"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Input \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/input"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ CapTableEntry, InvestmentStage \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/types"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Pencil, Save, Trash, PlusCircle \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'lucide-react'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useToast \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/hooks/use-toast'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '../ui/alert-dialog'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Select, SelectTrigger, SelectValue, SelectContent, SelectItem \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '../ui/select'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ investmentStages \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/lib/data'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Badge \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '../ui/badge'\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 interface\cf4 \strokec4  \cf6 \strokec6 CapTableFormProps\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf7 \strokec7 initialData\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 CapTableEntry\cf4 \strokec4 [];\cb1 \
\cb3     \cf7 \strokec7 startupStage\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 InvestmentStage\cf4 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 formatCurrency\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 value\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 number\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf5 \strokec5 return\cf4 \strokec4  \cf5 \strokec5 new\cf4 \strokec4  Intl.\cf6 \strokec6 NumberFormat\cf4 \strokec4 (\cf2 \strokec2 'en-US'\cf4 \strokec4 , \{\cb1 \
\cb3         style: \cf2 \strokec2 'currency'\cf4 \strokec4 ,\cb1 \
\cb3         currency: \cf2 \strokec2 'USD'\cf4 \strokec4 ,\cb1 \
\cb3         minimumFractionDigits: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3         maximumFractionDigits: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3     \}).\cf6 \strokec6 format\cf4 \strokec4 (value);\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 CapTableForm\cf4 \strokec4 (\{ \cf7 \strokec7 initialData\cf4 \strokec4 , \cf7 \strokec7 startupStage\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 CapTableFormProps\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 newEntryDefault\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 Omit\cf4 \strokec4 <\cf6 \strokec6 CapTableEntry\cf4 \strokec4 , \cf2 \strokec2 'id'\cf4 \strokec4 > \cf5 \strokec5 =\cf4 \strokec4  \{\cb1 \
\cb3         shareholderName: \cf2 \strokec2 ''\cf4 \strokec4 ,\cb1 \
\cb3         investment: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3         shares: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3         equityPercentage: \cf8 \strokec8 0\cf4 \strokec4 ,\cb1 \
\cb3         investmentStage: startupStage\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 data\cf4 \strokec4 , \cf8 \strokec8 setData\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 CapTableEntry\cf4 \strokec4 []>(initialData);\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 editingRow\cf4 \strokec4 , \cf8 \strokec8 setEditingRow\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf8 \strokec8 string\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 >(\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 editedData\cf4 \strokec4 , \cf8 \strokec8 setEditedData\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf6 \strokec6 Partial\cf4 \strokec4 <\cf6 \strokec6 CapTableEntry\cf4 \strokec4 > \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 >(\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 isAdding\cf4 \strokec4 , \cf8 \strokec8 setIsAdding\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \{ \cf8 \strokec8 toast\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useToast\cf4 \strokec4 ();\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleEdit\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 entry\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 CapTableEntry\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 setEditingRow\cf4 \strokec4 (entry.id);\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (entry);\cb1 \
\cb3         \cf6 \strokec6 setIsAdding\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleCancel\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 setEditingRow\cf4 \strokec4 (\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setIsAdding\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleSave\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 editedData) \cf5 \strokec5 return\cf4 \strokec4 ;\cb1 \
\
\cb3         \cf5 \strokec5 if\cf4 \strokec4  (isAdding) \{\cb1 \
\cb3             \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 newId\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 `ct-new-$\{\cf4 \strokec4 Date\cf2 \strokec2 .\cf6 \strokec6 now\cf2 \strokec2 ()\}`\cf4 \strokec4 ;\cb1 \
\cb3             \cf6 \strokec6 setData\cf4 \strokec4 ([\cf5 \strokec5 ...\cf4 \strokec4 data, \{ \cf5 \strokec5 ...\cf4 \strokec4 newEntryDefault, \cf5 \strokec5 ...\cf4 \strokec4 editedData, id: newId \}]);\cb1 \
\cb3             \cf6 \strokec6 toast\cf4 \strokec4 (\{ title: \cf2 \strokec2 "Shareholder Added"\cf4 \strokec4 , description: \cf2 \strokec2 `Added $\{\cf4 \strokec4 editedData\cf2 \strokec2 .\cf4 \strokec4 shareholderName\cf2 \strokec2 \} to the cap table.`\cf4 \strokec4  \});\cb1 \
\cb3         \} \cf5 \strokec5 else\cf4 \strokec4  \{\cb1 \
\cb3             \cf6 \strokec6 setData\cf4 \strokec4 (data.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 d\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  d.id \cf5 \strokec5 ===\cf4 \strokec4  editedData.id \cf5 \strokec5 ?\cf4 \strokec4  \{ \cf5 \strokec5 ...\cf4 \strokec4 d, \cf5 \strokec5 ...\cf4 \strokec4 editedData \} \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 CapTableEntry\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  d));\cb1 \
\cb3             \cf6 \strokec6 toast\cf4 \strokec4 (\{ title: \cf2 \strokec2 "Cap Table Updated"\cf4 \strokec4 , description: \cf2 \strokec2 `Successfully updated details for $\{\cf4 \strokec4 editedData\cf2 \strokec2 .\cf4 \strokec4 shareholderName\cf2 \strokec2 \}.`\cf4 \strokec4  \});\cb1 \
\cb3         \}\cb1 \
\
\cb3         \cf6 \strokec6 setEditingRow\cf4 \strokec4 (\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3         \cf6 \strokec6 setIsAdding\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleDelete\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 id\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 entryName\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  data.\cf6 \strokec6 find\cf4 \strokec4 (\cf7 \strokec7 d\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  d.id \cf5 \strokec5 ===\cf4 \strokec4  id)?.shareholderName;\cb1 \
\cb3         \cf6 \strokec6 setData\cf4 \strokec4 (data.\cf6 \strokec6 filter\cf4 \strokec4 (\cf7 \strokec7 d\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  d.id \cf5 \strokec5 !==\cf4 \strokec4  id));\cb1 \
\cb3         \cf6 \strokec6 toast\cf4 \strokec4 (\{ title: \cf2 \strokec2 "Shareholder Removed"\cf4 \strokec4 , description: \cf2 \strokec2 `$\{\cf4 \strokec4 entryName\cf2 \strokec2 \} has been removed from the cap table.`\cf4 \strokec4 , variant: \cf2 \strokec2 "destructive"\cf4 \strokec4  \});\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleInputChange\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 ChangeEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLInputElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 editedData) \cf5 \strokec5 return\cf4 \strokec4 ;\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \{ \cf8 \strokec8 name\cf4 \strokec4 , \cf8 \strokec8 value\cf4 \strokec4 , \cf8 \strokec8 type\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  e.target;\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (\{ \cf5 \strokec5 ...\cf4 \strokec4 editedData, [name]: type \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 'number'\cf4 \strokec4  \cf5 \strokec5 ?\cf4 \strokec4  \cf6 \strokec6 Number\cf4 \strokec4 (value) \cf5 \strokec5 :\cf4 \strokec4  value \});\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleSelectChange\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 value\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 InvestmentStage\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 if\cf4 \strokec4  (\cf5 \strokec5 !\cf4 \strokec4 editedData) \cf5 \strokec5 return\cf4 \strokec4 ;\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (\{ \cf5 \strokec5 ...\cf4 \strokec4 editedData, investmentStage: value \});\cb1 \
\cb3     \}\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 startAdding\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 setIsAdding\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 newId\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 'new-entry'\cf4 \strokec4 ;\cb1 \
\cb3         \cf6 \strokec6 setEditedData\cf4 \strokec4 (\{ id: newId, \cf5 \strokec5 ...\cf4 \strokec4 newEntryDefault \});\cb1 \
\cb3         \cf6 \strokec6 setEditingRow\cf4 \strokec4 (newId);\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 renderRow\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 entry\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 Partial\cf4 \strokec4 <\cf6 \strokec6 CapTableEntry\cf4 \strokec4 >, \cf7 \strokec7 isEditMode\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 boolean\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 currentData\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  isEditMode \cf5 \strokec5 ?\cf4 \strokec4  editedData \cf5 \strokec5 :\cf4 \strokec4  entry;\cb1 \
\
\cb3         \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3              <\cf8 \strokec8 TableRow\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.id\}>\cb1 \
\cb3                 <\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Input\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "text"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "shareholderName"\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.shareholderName \cf5 \strokec5 ||\cf4 \strokec4  \cf2 \strokec2 ''\cf4 \strokec4 \} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf4 \strokec4 \{handleInputChange\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8"\cf4 \strokec4  />\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         <\cf2 \strokec2 span\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "font-medium"\cf4 \strokec4 >\{currentData?.shareholderName\}</\cf2 \strokec2 span\cf4 \strokec4 >\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                  <\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                          <\cf8 \strokec8 Select\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.investmentStage\} \cf6 \strokec6 onValueChange\cf5 \strokec5 =\cf4 \strokec4 \{handleSelectChange\}>\cb1 \
\cb3                             <\cf8 \strokec8 SelectTrigger\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8"\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 SelectValue\cf4 \strokec4  \cf6 \strokec6 placeholder\cf5 \strokec5 =\cf2 \strokec2 "Select stage"\cf4 \strokec4  />\cb1 \
\cb3                             </\cf8 \strokec8 SelectTrigger\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                                 \{investmentStages.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 stage\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                                     <\cf8 \strokec8 SelectItem\cf4 \strokec4  \cf6 \strokec6 key\cf5 \strokec5 =\cf4 \strokec4 \{stage\} \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{stage\}>\{stage\}</\cf8 \strokec8 SelectItem\cf4 \strokec4 >\cb1 \
\cb3                                 ))\}\cb1 \
\cb3                             </\cf8 \strokec8 SelectContent\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 Select\cf4 \strokec4 >\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Badge\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "outline"\cf4 \strokec4 >\{currentData?.investmentStage\}</\cf8 \strokec8 Badge\cf4 \strokec4 >\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Input\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "number"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "investment"\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.investment \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 \} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf4 \strokec4 \{handleInputChange\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8"\cf4 \strokec4  />\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         \cf6 \strokec6 formatCurrency\cf4 \strokec4 (currentData?.investment \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 )\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                  <\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Input\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "number"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "shares"\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.shares \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 \} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf4 \strokec4 \{handleInputChange\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8"\cf4 \strokec4  />\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         (currentData?.shares \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 ).\cf6 \strokec6 toLocaleString\cf4 \strokec4 ()\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                  <\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                         <\cf8 \strokec8 Input\cf4 \strokec4  \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "number"\cf4 \strokec4  \cf6 \strokec6 name\cf5 \strokec5 =\cf2 \strokec2 "equityPercentage"\cf4 \strokec4  \cf6 \strokec6 value\cf5 \strokec5 =\cf4 \strokec4 \{currentData?.equityPercentage \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec4 \} \cf6 \strokec6 onChange\cf5 \strokec5 =\cf4 \strokec4 \{handleInputChange\} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-8"\cf4 \strokec4  \cf6 \strokec6 step\cf5 \strokec5 =\cf2 \strokec2 "0.01"\cf4 \strokec4  />\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         \cf2 \strokec2 `$\{(\cf4 \strokec4 currentData\cf2 \strokec2 ?.\cf4 \strokec4 equityPercentage\cf2 \strokec2  \cf5 \strokec5 ||\cf2 \strokec2  \cf8 \strokec8 0\cf2 \strokec2 ).\cf6 \strokec6 toFixed\cf2 \strokec2 (\cf8 \strokec8 2\cf2 \strokec2 )\}%`\cf4 \cb1 \strokec4 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 TableCell\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-right"\cf4 \strokec4 >\cb1 \
\cb3                     \{isEditMode \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3                         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex gap-2 justify-end"\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "outline"\cf4 \strokec4  \cf6 \strokec6 size\cf5 \strokec5 =\cf2 \strokec2 "sm"\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{handleCancel\}>Cancel</\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 size\cf5 \strokec5 =\cf2 \strokec2 "sm"\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{handleSave\}><\cf8 \strokec8 Save\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4"\cf4 \strokec4  />Save</\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                     ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3                         <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex gap-2 justify-end"\cf4 \strokec4 >\cb1 \
\cb3                              <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "ghost"\cf4 \strokec4  \cf6 \strokec6 size\cf5 \strokec5 =\cf2 \strokec2 "icon"\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{() \cf5 \strokec5 =>\cf4 \strokec4  \cf6 \strokec6 handleEdit\cf4 \strokec4 (entry \cf5 \strokec5 as\cf4 \strokec4  \cf6 \strokec6 CapTableEntry\cf4 \strokec4 )\}>\cb1 \
\cb3                                 <\cf8 \strokec8 Pencil\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-4 w-4"\cf4 \strokec4  />\cb1 \
\cb3                             </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 AlertDialog\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 AlertDialogTrigger\cf4 \strokec4  \cf6 \strokec6 asChild\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 variant\cf5 \strokec5 =\cf2 \strokec2 "ghost"\cf4 \strokec4  \cf6 \strokec6 size\cf5 \strokec5 =\cf2 \strokec2 "icon"\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-destructive hover:text-destructive"\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf8 \strokec8 Trash\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "h-4 w-4"\cf4 \strokec4  />\cb1 \
\cb3                                     </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf8 \strokec8 AlertDialogTrigger\cf4 \strokec4 >\cb1 \
\cb3                                 <\cf8 \strokec8 AlertDialogContent\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf8 \strokec8 AlertDialogHeader\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf8 \strokec8 AlertDialogTitle\cf4 \strokec4 >Are you sure?</\cf8 \strokec8 AlertDialogTitle\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf8 \strokec8 AlertDialogDescription\cf4 \strokec4 >\cb1 \
\cb3                                             This action cannot be undone. This will permanently remove \{entry.shareholderName\} from the cap table.\cb1 \
\cb3                                         </\cf8 \strokec8 AlertDialogDescription\cf4 \strokec4 >\cb1 \
\cb3                                     </\cf8 \strokec8 AlertDialogHeader\cf4 \strokec4 >\cb1 \
\cb3                                     <\cf8 \strokec8 AlertDialogFooter\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf8 \strokec8 AlertDialogCancel\cf4 \strokec4 >Cancel</\cf8 \strokec8 AlertDialogCancel\cf4 \strokec4 >\cb1 \
\cb3                                         <\cf8 \strokec8 AlertDialogAction\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{() \cf5 \strokec5 =>\cf4 \strokec4  \cf6 \strokec6 handleDelete\cf4 \strokec4 (entry.id\cf5 \strokec5 !\cf4 \strokec4 )\}>Continue</\cf8 \strokec8 AlertDialogAction\cf4 \strokec4 >\cb1 \
\cb3                                     </\cf8 \strokec8 AlertDialogFooter\cf4 \strokec4 >\cb1 \
\cb3                                 </\cf8 \strokec8 AlertDialogContent\cf4 \strokec4 >\cb1 \
\cb3                             </\cf8 \strokec8 AlertDialog\cf4 \strokec4 >\cb1 \
\cb3                         </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                     )\}\cb1 \
\cb3                 </\cf8 \strokec8 TableCell\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3         )\cb1 \
\cb3     \}\cb1 \
\
\cb3     \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3         <\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3                 <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex justify-between items-start"\cf4 \strokec4 >\cb1 \
\cb3                     <\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardTitle\cf4 \strokec4 >Capitalization Table</\cf8 \strokec8 CardTitle\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 CardDescription\cf4 \strokec4 >Manage your startup's shareholders and equity distribution.</\cf8 \strokec8 CardDescription\cf4 \strokec4 >\cb1 \
\cb3                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                      <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{startAdding\} \cf6 \strokec6 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isAdding \cf5 \strokec5 ||\cf4 \strokec4  \cf5 \strokec5 !!\cf4 \strokec4 editingRow\}>\cb1 \
\cb3                         <\cf8 \strokec8 PlusCircle\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4"\cf4 \strokec4  /> Add Shareholder\cb1 \
\cb3                     </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3                 </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 CardHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3                 <\cf8 \strokec8 Table\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 TableHeader\cf4 \strokec4 >\cb1 \
\cb3                         <\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Shareholder</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Stage</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Investment</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Shares</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4 >Equity</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                             <\cf8 \strokec8 TableHead\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-right"\cf4 \strokec4 >Actions</\cf8 \strokec8 TableHead\cf4 \strokec4 >\cb1 \
\cb3                         </\cf8 \strokec8 TableRow\cf4 \strokec4 >\cb1 \
\cb3                     </\cf8 \strokec8 TableHeader\cf4 \strokec4 >\cb1 \
\cb3                     <\cf8 \strokec8 TableBody\cf4 \strokec4 >\cb1 \
\cb3                         \{data.\cf6 \strokec6 map\cf4 \strokec4 (\cf7 \strokec7 entry\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \cf6 \strokec6 renderRow\cf4 \strokec4 (entry, editingRow \cf5 \strokec5 ===\cf4 \strokec4  entry.id))\}\cb1 \
\cb3                         \{isAdding \cf5 \strokec5 &&\cf4 \strokec4  \cf6 \strokec6 renderRow\cf4 \strokec4 (editedData\cf5 \strokec5 !\cf4 \strokec4 , \cf8 \strokec8 true\cf4 \strokec4 )\}\cb1 \
\cb3                     </\cf8 \strokec8 TableBody\cf4 \strokec4 >\cb1 \
\cb3                 </\cf8 \strokec8 Table\cf4 \strokec4 >\cb1 \
\cb3             </\cf8 \strokec8 CardContent\cf4 \strokec4 >\cb1 \
\cb3         </\cf8 \strokec8 Card\cf4 \strokec4 >\cb1 \
\cb3     );\cb1 \
\cb3 \}\cb1 \
\
}