{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;\red93\green93\blue93;
}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;\cssrgb\c43922\c43922\c43922;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState, useRef \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "../ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Loader2, Upload, UploadCloud \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  Image \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/image"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ cn \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/utils"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 interface\cf4 \strokec4  \cf6 \strokec6 BusinessLogoUploaderProps\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf7 \strokec7 initialLogoUrl\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 ;\cb1 \
\cb3   \cf7 \strokec7 initialName\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 BusinessLogoUploader\cf4 \strokec4 (\{ \cf7 \strokec7 initialLogoUrl\cf4 \strokec4 , \cf7 \strokec7 initialName\cf4 \strokec4  \}\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 BusinessLogoUploaderProps\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 isLoading\cf4 \strokec4 , \cf8 \strokec8 setIsLoading\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 logoUrl\cf4 \strokec4 , \cf8 \strokec8 setLogoUrl\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 <\cf8 \strokec8 string\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 >(initialLogoUrl);\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf8 \strokec8 isDragging\cf4 \strokec4 , \cf8 \strokec8 setIsDragging\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 fileInputRef\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 useRef\cf4 \strokec4 <\cf6 \strokec6 HTMLInputElement\cf4 \strokec4 >(\cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleFileChange\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 file\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 File\cf4 \strokec4  \cf5 \strokec5 |\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (file \cf5 \strokec5 &&\cf4 \strokec4  (file.type \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 "image/jpeg"\cf4 \strokec4  \cf5 \strokec5 ||\cf4 \strokec4  file.type \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 "image/png"\cf4 \strokec4  \cf5 \strokec5 ||\cf4 \strokec4  file.type \cf5 \strokec5 ===\cf4 \strokec4  \cf2 \strokec2 "image/gif"\cf4 \strokec4 )) \{\cb1 \
\cb3       \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 reader\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 new\cf4 \strokec4  \cf6 \strokec6 FileReader\cf4 \strokec4 ();\cb1 \
\cb3       reader.\cf6 \strokec6 onload\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 setLogoUrl\cf4 \strokec4 (e.target?.result \cf5 \strokec5 as\cf4 \strokec4  \cf8 \strokec8 string\cf4 \strokec4 );\cb1 \
\cb3       \};\cb1 \
\cb3       reader.\cf6 \strokec6 readAsDataURL\cf4 \strokec4 (file);\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 onDragOver\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 DragEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLDivElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     e.\cf6 \strokec6 preventDefault\cf4 \strokec4 ();\cb1 \
\cb3     \cf6 \strokec6 setIsDragging\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 onDragLeave\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 DragEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLDivElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     e.\cf6 \strokec6 preventDefault\cf4 \strokec4 ();\cb1 \
\cb3     \cf6 \strokec6 setIsDragging\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 onDrop\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 DragEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLDivElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     e.\cf6 \strokec6 preventDefault\cf4 \strokec4 ();\cb1 \
\cb3     \cf6 \strokec6 setIsDragging\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 file\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  e.dataTransfer.files[\cf8 \strokec8 0\cf4 \strokec4 ];\cb1 \
\cb3     \cf6 \strokec6 handleFileChange\cf4 \strokec4 (file);\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 onFileInputChange\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\cf7 \strokec7 e\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 React\cf4 \strokec4 .\cf6 \strokec6 ChangeEvent\cf4 \strokec4 <\cf6 \strokec6 HTMLInputElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 file\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  e.target.files?.[\cf8 \strokec8 0\cf4 \strokec4 ];\cb1 \
\cb3     \cf6 \strokec6 handleFileChange\cf4 \strokec4 (file \cf5 \strokec5 ||\cf4 \strokec4  \cf8 \strokec8 null\cf4 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleUploadClick\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     fileInputRef.current?.\cf6 \strokec6 click\cf4 \strokec4 ();\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 handleUpload\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  () \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 setIsLoading\cf4 \strokec4 (\cf8 \strokec8 true\cf4 \strokec4 );\cb1 \
\cb3     \cf9 \strokec9 // Placeholder for actual upload logic to a storage service.\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 await\cf4 \strokec4  \cf5 \strokec5 new\cf4 \strokec4  \cf8 \strokec8 Promise\cf4 \strokec4 (\cf7 \strokec7 resolve\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \cf6 \strokec6 setTimeout\cf4 \strokec4 (resolve, \cf8 \strokec8 1500\cf4 \strokec4 ));\cb1 \
\cb3     \cf6 \strokec6 setIsLoading\cf4 \strokec4 (\cf8 \strokec8 false\cf4 \strokec4 );\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "flex flex-col items-center space-y-4"\cf4 \strokec4 >\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4  \cb1 \
\cb3         \cf6 \strokec6 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf6 \strokec6 cn\cf4 \strokec4 (\cb1 \
\cb3             \cf2 \strokec2 "w-48 h-48 border-2 border-dashed rounded-full flex flex-col items-center justify-center text-muted-foreground cursor-pointer transition-colors"\cf4 \strokec4 ,\cb1 \
\cb3             isDragging \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "border-primary bg-accent"\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "border-border"\cf4 \cb1 \strokec4 \
\cb3         )\}\cb1 \
\cb3         \cf6 \strokec6 onDragOver\cf5 \strokec5 =\cf4 \strokec4 \{onDragOver\}\cb1 \
\cb3         \cf6 \strokec6 onDragLeave\cf5 \strokec5 =\cf4 \strokec4 \{onDragLeave\}\cb1 \
\cb3         \cf6 \strokec6 onDrop\cf5 \strokec5 =\cf4 \strokec4 \{onDrop\}\cb1 \
\cb3         \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{handleUploadClick\}\cb1 \
\cb3       >\cb1 \
\cb3         \{logoUrl \cf5 \strokec5 ?\cf4 \strokec4  (\cb1 \
\cb3           <\cf8 \strokec8 Image\cf4 \strokec4  \cf6 \strokec6 src\cf5 \strokec5 =\cf4 \strokec4 \{logoUrl\} \cf6 \strokec6 alt\cf5 \strokec5 =\cf4 \strokec4 \{initialName\} \cf6 \strokec6 width\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 192\cf4 \strokec4 \} \cf6 \strokec6 height\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 192\cf4 \strokec4 \} \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "rounded-full object-cover w-full h-full"\cf4 \strokec4  />\cb1 \
\cb3         ) \cf5 \strokec5 :\cf4 \strokec4  (\cb1 \
\cb3           <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-center p-4"\cf4 \strokec4 >\cb1 \
\cb3             <\cf8 \strokec8 UploadCloud\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mx-auto h-10 w-10 mb-2"\cf4 \strokec4  />\cb1 \
\cb3             <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-sm"\cf4 \strokec4 >Drag & drop your logo here</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3              <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-xs text-muted-foreground/80 mt-1"\cf4 \strokec4 >or click to browse</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3           </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3         )\}\cb1 \
\cb3         <\cf2 \strokec2 input\cf4 \strokec4  \cb1 \
\cb3           \cf6 \strokec6 ref\cf5 \strokec5 =\cf4 \strokec4 \{fileInputRef\}\cb1 \
\cb3           \cf6 \strokec6 type\cf5 \strokec5 =\cf2 \strokec2 "file"\cf4 \strokec4  \cb1 \
\cb3           \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "hidden"\cf4 \cb1 \strokec4 \
\cb3           \cf6 \strokec6 accept\cf5 \strokec5 =\cf2 \strokec2 "image/jpeg, image/png, image/gif"\cf4 \cb1 \strokec4 \
\cb3           \cf6 \strokec6 onChange\cf5 \strokec5 =\cf4 \strokec4 \{onFileInputChange\}\cb1 \
\cb3         />\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3       <\cf2 \strokec2 div\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-center"\cf4 \strokec4 >\cb1 \
\cb3         <\cf8 \strokec8 Button\cf4 \strokec4  \cf6 \strokec6 onClick\cf5 \strokec5 =\cf4 \strokec4 \{handleUpload\} \cf6 \strokec6 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isLoading \cf5 \strokec5 ||\cf4 \strokec4  logoUrl \cf5 \strokec5 ===\cf4 \strokec4  initialLogoUrl\}>\cb1 \
\cb3           \{isLoading \cf5 \strokec5 ?\cf4 \strokec4  <\cf8 \strokec8 Loader2\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4 animate-spin"\cf4 \strokec4  /> \cf5 \strokec5 :\cf4 \strokec4  <\cf8 \strokec8 Upload\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4"\cf4 \strokec4  />\}\cb1 \
\cb3           \{isLoading \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "Uploading..."\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "Upload Logo"\cf4 \strokec4 \}\cb1 \
\cb3         </\cf8 \strokec8 Button\cf4 \strokec4 >\cb1 \
\cb3         <\cf2 \strokec2 p\cf4 \strokec4  \cf6 \strokec6 className\cf5 \strokec5 =\cf2 \strokec2 "text-xs text-muted-foreground mt-2"\cf4 \strokec4 >Recommended size: 200x200px. JPG, PNG, GIF</\cf2 \strokec2 p\cf4 \strokec4 >\cb1 \
\cb3       </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}