{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red38\green59\blue169;\red196\green100\blue30;\red91\green47\blue214;}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c19608\c32157\c72157;\cssrgb\c81569\c47059\c14902;\cssrgb\c43529\c29804\c87059;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  \cf5 \strokec5 as\cf4 \strokec4  React \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \cf6 \strokec6 *\cf4 \strokec4  \cf5 \strokec5 as\cf4 \strokec4  SheetPrimitive \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@radix-ui/react-dialog"\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ cva, \cf5 \strokec5 type\cf4 \strokec4  VariantProps \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "class-variance-authority"\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ X \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \cb1 \strokec4 \
\
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ cn \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/utils"\cf4 \cb1 \strokec4 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 Sheet\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Root\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetTrigger\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Trigger\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetClose\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Close\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetPortal\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Portal\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetOverlay\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  React.forwardRef\cf5 \strokec5 <\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   React.ElementRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Overlay\cf5 \strokec5 >\cf4 \strokec4 ,\cb1 \
\cb3   React.ComponentPropsWithoutRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Overlay\cf5 \strokec5 >\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 >\cf4 \strokec4 ((\{ \cf7 \strokec7 className\cf4 \strokec4 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf4 \strokec4  \}, \cf7 \strokec7 ref\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   <\cf6 \strokec6 SheetPrimitive.Overlay\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cb1 \
\cb3       \cf2 \strokec2 "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"\cf4 \strokec4 ,\cb1 \
\cb3       className\cb1 \
\cb3     )\}\cb1 \
\cb3     \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3     \cf8 \strokec8 ref\cf5 \strokec5 =\cf4 \strokec4 \{ref\}\cb1 \
\cb3   />\cb1 \
\cb3 ))\cb1 \
\cb3 SheetOverlay.displayName \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Overlay.displayName\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 sheetVariants\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf8 \strokec8 cva\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf2 \strokec2 "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"\cf4 \strokec4 ,\cb1 \
\cb3   \{\cb1 \
\cb3     variants: \{\cb1 \
\cb3       side: \{\cb1 \
\cb3         top: \cf2 \strokec2 "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"\cf4 \strokec4 ,\cb1 \
\cb3         bottom:\cb1 \
\cb3           \cf2 \strokec2 "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"\cf4 \strokec4 ,\cb1 \
\cb3         left: \cf2 \strokec2 "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm"\cf4 \strokec4 ,\cb1 \
\cb3         right:\cb1 \
\cb3           \cf2 \strokec2 "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"\cf4 \strokec4 ,\cb1 \
\cb3       \},\cb1 \
\cb3     \},\cb1 \
\cb3     defaultVariants: \{\cb1 \
\cb3       side: \cf2 \strokec2 "right"\cf4 \strokec4 ,\cb1 \
\cb3     \},\cb1 \
\cb3   \}\cb1 \
\cb3 )\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 interface\cf4 \strokec4  \cf8 \strokec8 SheetContentProps\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 extends\cf4 \strokec4  \cf8 \strokec8 React\cf4 \strokec4 .\cf8 \strokec8 ComponentPropsWithoutRef\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  SheetPrimitive.Content>,\cb1 \
\cb3     \cf8 \strokec8 VariantProps\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  sheetVariants> \{\}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetContent\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  React.forwardRef\cf5 \strokec5 <\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   React.ElementRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Content\cf5 \strokec5 >\cf4 \strokec4 ,\cb1 \
\cb3   SheetContentProps\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 >\cf4 \strokec4 ((\{ \cf7 \strokec7 side\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 "right"\cf4 \strokec4 , \cf7 \strokec7 className\cf4 \strokec4 , \cf7 \strokec7 children\cf4 \strokec4 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf4 \strokec4  \}, \cf7 \strokec7 ref\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   <\cf6 \strokec6 SheetPortal\cf4 \strokec4 >\cb1 \
\cb3     <\cf6 \strokec6 SheetOverlay\cf4 \strokec4  />\cb1 \
\cb3     <\cf6 \strokec6 SheetPrimitive.Content\cf4 \cb1 \strokec4 \
\cb3       \cf8 \strokec8 ref\cf5 \strokec5 =\cf4 \strokec4 \{ref\}\cb1 \
\cb3       \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cf8 \strokec8 sheetVariants\cf4 \strokec4 (\{ side \}), className)\}\cb1 \
\cb3       \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3     >\cb1 \
\cb3       \{children\}\cb1 \
\cb3       <\cf6 \strokec6 SheetPrimitive.Close\cf4 \strokec4  \cf8 \strokec8 className\cf5 \strokec5 =\cf2 \strokec2 "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"\cf4 \strokec4 >\cb1 \
\cb3         <\cf6 \strokec6 X\cf4 \strokec4  \cf8 \strokec8 className\cf5 \strokec5 =\cf2 \strokec2 "h-4 w-4"\cf4 \strokec4  />\cb1 \
\cb3         <\cf2 \strokec2 span\cf4 \strokec4  \cf8 \strokec8 className\cf5 \strokec5 =\cf2 \strokec2 "sr-only"\cf4 \strokec4 >Close</\cf2 \strokec2 span\cf4 \strokec4 >\cb1 \
\cb3       </\cf6 \strokec6 SheetPrimitive.Close\cf4 \strokec4 >\cb1 \
\cb3     </\cf6 \strokec6 SheetPrimitive.Content\cf4 \strokec4 >\cb1 \
\cb3   </\cf6 \strokec6 SheetPortal\cf4 \strokec4 >\cb1 \
\cb3 ))\cb1 \
\cb3 SheetContent.displayName \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Content.displayName\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 SheetHeader\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   className,\cb1 \
\cb3   \cf5 \strokec5 ...\cf4 \strokec4 props\cb1 \
\cb3 \}\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 React\cf4 \strokec4 .\cf8 \strokec8 HTMLAttributes\cf4 \strokec4 <\cf8 \strokec8 HTMLDivElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3   <\cf2 \strokec2 div\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cb1 \
\cb3       \cf2 \strokec2 "flex flex-col space-y-2 text-center sm:text-left"\cf4 \strokec4 ,\cb1 \
\cb3       className\cb1 \
\cb3     )\}\cb1 \
\cb3     \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3   />\cb1 \
\cb3 )\cb1 \
\cb3 SheetHeader.displayName \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 "SheetHeader"\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf8 \strokec8 SheetFooter\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   className,\cb1 \
\cb3   \cf5 \strokec5 ...\cf4 \strokec4 props\cb1 \
\cb3 \}\cf5 \strokec5 :\cf4 \strokec4  \cf8 \strokec8 React\cf4 \strokec4 .\cf8 \strokec8 HTMLAttributes\cf4 \strokec4 <\cf8 \strokec8 HTMLDivElement\cf4 \strokec4 >) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3   <\cf2 \strokec2 div\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cb1 \
\cb3       \cf2 \strokec2 "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"\cf4 \strokec4 ,\cb1 \
\cb3       className\cb1 \
\cb3     )\}\cb1 \
\cb3     \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3   />\cb1 \
\cb3 )\cb1 \
\cb3 SheetFooter.displayName \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 "SheetFooter"\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetTitle\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  React.forwardRef\cf5 \strokec5 <\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   React.ElementRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Title\cf5 \strokec5 >\cf4 \strokec4 ,\cb1 \
\cb3   React.ComponentPropsWithoutRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Title\cf5 \strokec5 >\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 >\cf4 \strokec4 ((\{ \cf7 \strokec7 className\cf4 \strokec4 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf4 \strokec4  \}, \cf7 \strokec7 ref\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   <\cf6 \strokec6 SheetPrimitive.Title\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 ref\cf5 \strokec5 =\cf4 \strokec4 \{ref\}\cb1 \
\cb3     \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cf2 \strokec2 "text-lg font-semibold text-foreground"\cf4 \strokec4 , className)\}\cb1 \
\cb3     \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3   />\cb1 \
\cb3 ))\cb1 \
\cb3 SheetTitle.displayName \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Title.displayName\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 SheetDescription\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  React.forwardRef\cf5 \strokec5 <\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   React.ElementRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Description\cf5 \strokec5 >\cf4 \strokec4 ,\cb1 \
\cb3   React.ComponentPropsWithoutRef\cf5 \strokec5 <typeof\cf4 \strokec4  SheetPrimitive.Description\cf5 \strokec5 >\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 >\cf4 \strokec4 ((\{ \cf7 \strokec7 className\cf4 \strokec4 , \cf5 \strokec5 ...\cf7 \strokec7 props\cf4 \strokec4  \}, \cf7 \strokec7 ref\cf4 \strokec4 ) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   <\cf6 \strokec6 SheetPrimitive.Description\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 ref\cf5 \strokec5 =\cf4 \strokec4 \{ref\}\cb1 \
\cb3     \cf8 \strokec8 className\cf5 \strokec5 =\cf4 \strokec4 \{\cf8 \strokec8 cn\cf4 \strokec4 (\cf2 \strokec2 "text-sm text-muted-foreground"\cf4 \strokec4 , className)\}\cb1 \
\cb3     \{\cf5 \strokec5 ...\cf4 \strokec4 props\}\cb1 \
\cb3   />\cb1 \
\cb3 ))\cb1 \
\cb3 SheetDescription.displayName \cf5 \strokec5 =\cf4 \strokec4  SheetPrimitive.Description.displayName\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   Sheet,\cb1 \
\cb3   SheetPortal,\cb1 \
\cb3   SheetOverlay,\cb1 \
\cb3   SheetTrigger,\cb1 \
\cb3   SheetClose,\cb1 \
\cb3   SheetContent,\cb1 \
\cb3   SheetHeader,\cb1 \
\cb3   SheetFooter,\cb1 \
\cb3   SheetTitle,\cb1 \
\cb3   SheetDescription,\cb1 \
\cb3 \}\cb1 \
\
}