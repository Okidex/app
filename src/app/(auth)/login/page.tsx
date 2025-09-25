{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red181\green26\blue70;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c76863\c18824\c34510;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useState \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  Link \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/link"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useRouter \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "next/navigation"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useForm \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "react-hook-form"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ z \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "zod"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ zodResolver \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@hookform/resolvers/zod"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Button \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/button"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   Card,\cb1 \
\cb3   CardContent,\cb1 \
\cb3   CardDescription,\cb1 \
\cb3   CardHeader,\cb1 \
\cb3   CardTitle,\cb1 \
\cb3 \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/card"\cf4 \strokec4 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   Form,\cb1 \
\cb3   FormControl,\cb1 \
\cb3   FormField,\cb1 \
\cb3   FormItem,\cb1 \
\cb3   FormLabel,\cb1 \
\cb3   FormMessage,\cb1 \
\cb3 \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/form"\cf4 \strokec4 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Input \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/input"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ useToast \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/hooks/use-toast"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/dialog"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ sendPasswordReset, login \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "@/lib/auth"\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ Loader2 \} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 "lucide-react"\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 loginSchema\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  z.\cf7 \strokec7 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   email: z.\cf7 \strokec7 string\cf4 \strokec4 ().\cf7 \strokec7 email\cf4 \strokec4 (\{ message: \cf2 \strokec2 "Invalid email address."\cf4 \strokec4  \}),\cb1 \
\cb3   password: z.\cf7 \strokec7 string\cf4 \strokec4 ().\cf7 \strokec7 min\cf4 \strokec4 (\cf6 \strokec6 1\cf4 \strokec4 , \{ message: \cf2 \strokec2 "Password is required."\cf4 \strokec4  \}),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 resetSchema\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  z.\cf7 \strokec7 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   resetEmail: z.\cf7 \strokec7 string\cf4 \strokec4 ().\cf7 \strokec7 email\cf4 \strokec4 (\{ message: \cf2 \strokec2 "Invalid email address."\cf4 \strokec4  \}),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf7 \strokec7 LoginPage\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 router\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useRouter\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \{ \cf6 \strokec6 toast\cf4 \strokec4  \} \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useToast\cf4 \strokec4 ();\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf6 \strokec6 isForgotPasswordOpen\cf4 \strokec4 , \cf6 \strokec6 setIsForgotPasswordOpen\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useState\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf6 \strokec6 isResetting\cf4 \strokec4 , \cf6 \strokec6 setIsResetting\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useState\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  [\cf6 \strokec6 isLoggingIn\cf4 \strokec4 , \cf6 \strokec6 setIsLoggingIn\cf4 \strokec4 ] \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useState\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 form\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useForm\cf4 \strokec4 <\cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  loginSchema>>(\{\cb1 \
\cb3     resolver: \cf7 \strokec7 zodResolver\cf4 \strokec4 (loginSchema),\cb1 \
\cb3     defaultValues: \{\cb1 \
\cb3       email: \cf2 \strokec2 ""\cf4 \strokec4 ,\cb1 \
\cb3       password: \cf2 \strokec2 ""\cf4 \strokec4 ,\cb1 \
\cb3     \},\cb1 \
\cb3   \});\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 resetForm\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 useForm\cf4 \strokec4 <\cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  resetSchema>>(\{\cb1 \
\cb3     resolver: \cf7 \strokec7 zodResolver\cf4 \strokec4 (resetSchema),\cb1 \
\cb3     defaultValues: \{\cb1 \
\cb3       resetEmail: \cf2 \strokec2 ""\cf4 \strokec4 ,\cb1 \
\cb3     \},\cb1 \
\cb3   \});\cb1 \
\
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 onSubmit\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  (\cf8 \strokec8 values\cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  loginSchema>) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf7 \strokec7 setIsLoggingIn\cf4 \strokec4 (\cf6 \strokec6 true\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 result\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf7 \strokec7 login\cf4 \strokec4 (values.email, values.password);\cb1 \
\cb3     \cf7 \strokec7 setIsLoggingIn\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (result.success) \{\cb1 \
\cb3       router.\cf7 \strokec7 push\cf4 \strokec4 (\cf2 \strokec2 "/dashboard"\cf4 \strokec4 );\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \{\cb1 \
\cb3        \cf7 \strokec7 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Login Failed"\cf4 \strokec4 ,\cb1 \
\cb3         description: result.error,\cb1 \
\cb3         variant: \cf2 \strokec2 "destructive"\cf4 \strokec4 ,\cb1 \
\cb3       \});\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\cb3   \cb1 \
\cb3   \cf5 \strokec5 const\cf4 \strokec4  \cf7 \strokec7 handlePasswordReset\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  (\cf8 \strokec8 values\cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cf5 \strokec5 typeof\cf4 \strokec4  resetSchema>) \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf7 \strokec7 setIsResetting\cf4 \strokec4 (\cf6 \strokec6 true\cf4 \strokec4 );\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 result\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf7 \strokec7 sendPasswordReset\cf4 \strokec4 (values.resetEmail);\cb1 \
\cb3     \cf7 \strokec7 setIsResetting\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\cb3     \cb1 \
\cb3     \cf5 \strokec5 if\cf4 \strokec4  (result.success) \{\cb1 \
\cb3       \cf7 \strokec7 setIsForgotPasswordOpen\cf4 \strokec4 (\cf6 \strokec6 false\cf4 \strokec4 );\cb1 \
\cb3       \cf7 \strokec7 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Password Reset Email Sent"\cf4 \strokec4 ,\cb1 \
\cb3         description: \cf2 \strokec2 "Please check your inbox for instructions to reset your password."\cf4 \strokec4 ,\cb1 \
\cb3       \});\cb1 \
\cb3     \} \cf5 \strokec5 else\cf4 \strokec4  \{\cb1 \
\cb3       \cf7 \strokec7 toast\cf4 \strokec4 (\{\cb1 \
\cb3         title: \cf2 \strokec2 "Error"\cf4 \strokec4 ,\cb1 \
\cb3         description: result.error,\cb1 \
\cb3         variant: \cf2 \strokec2 "destructive"\cf4 \strokec4 ,\cb1 \
\cb3       \});\cb1 \
\cb3     \}\cb1 \
\cb3   \};\cb1 \
\
\cb3   \cf5 \strokec5 return\cf4 \strokec4  (\cb1 \
\cb3     <>\cb1 \
\cb3       <\cf6 \strokec6 Card\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-full max-w-md"\cf4 \strokec4 >\cb1 \
\cb3         <\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 CardTitle\cf4 \strokec4 >Welcome back</\cf6 \strokec6 CardTitle\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3             Enter your credentials to access your account. Don\cf6 \strokec6 &apos;\cf4 \strokec4 t have one?\{\cf2 \strokec2 ' '\cf4 \strokec4 \}\cb1 \
\cb3             <\cf6 \strokec6 Link\cf4 \strokec4  \cf7 \strokec7 href\cf5 \strokec5 =\cf2 \strokec2 "/register"\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "text-primary hover:underline"\cf4 \strokec4 >\cb1 \
\cb3               Sign up\cb1 \
\cb3             </\cf6 \strokec6 Link\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 CardDescription\cf4 \strokec4 >\cb1 \
\cb3         </\cf6 \strokec6 CardHeader\cf4 \strokec4 >\cb1 \
\cb3         <\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 Form\cf4 \strokec4  \{\cf5 \strokec5 ...\cf4 \strokec4 form\}>\cb1 \
\cb3             <\cf2 \strokec2 form\cf4 \strokec4  \cf7 \strokec7 onSubmit\cf5 \strokec5 =\cf4 \strokec4 \{form.\cf7 \strokec7 handleSubmit\cf4 \strokec4 (onSubmit)\} \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-6"\cf4 \strokec4 >\cb1 \
\cb3               <\cf6 \strokec6 FormField\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 control\cf5 \strokec5 =\cf4 \strokec4 \{form.control\}\cb1 \
\cb3                 \cf7 \strokec7 name\cf5 \strokec5 =\cf2 \strokec2 "email"\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 render\cf5 \strokec5 =\cf4 \strokec4 \{(\{ \cf8 \strokec8 field\cf4 \strokec4  \}) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                   <\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormLabel\cf4 \strokec4 >Email</\cf6 \strokec6 FormLabel\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 Input\cf4 \strokec4  \cf7 \strokec7 placeholder\cf5 \strokec5 =\cf2 \strokec2 "ada@example.com"\cf4 \strokec4  \{\cf5 \strokec5 ...\cf4 \strokec4 field\} />\cb1 \
\cb3                     </\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormMessage\cf4 \strokec4  />\cb1 \
\cb3                   </\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                 )\}\cb1 \
\cb3               />\cb1 \
\cb3               <\cf6 \strokec6 FormField\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 control\cf5 \strokec5 =\cf4 \strokec4 \{form.control\}\cb1 \
\cb3                 \cf7 \strokec7 name\cf5 \strokec5 =\cf2 \strokec2 "password"\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 render\cf5 \strokec5 =\cf4 \strokec4 \{(\{ \cf8 \strokec8 field\cf4 \strokec4  \}) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                   <\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                     <\cf2 \strokec2 div\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "flex items-center justify-between"\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 FormLabel\cf4 \strokec4 >Password</\cf6 \strokec6 FormLabel\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 Button\cf4 \cb1 \strokec4 \
\cb3                         \cf7 \strokec7 type\cf5 \strokec5 =\cf2 \strokec2 "button"\cf4 \cb1 \strokec4 \
\cb3                         \cf7 \strokec7 variant\cf5 \strokec5 =\cf2 \strokec2 "link"\cf4 \cb1 \strokec4 \
\cb3                         \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "h-auto p-0 text-sm"\cf4 \cb1 \strokec4 \
\cb3                         \cf7 \strokec7 onClick\cf5 \strokec5 =\cf4 \strokec4 \{() \cf5 \strokec5 =>\cf4 \strokec4  \cf7 \strokec7 setIsForgotPasswordOpen\cf4 \strokec4 (\cf6 \strokec6 true\cf4 \strokec4 )\}\cb1 \
\cb3                       >\cb1 \
\cb3                         Forgot password?\cb1 \
\cb3                       </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3                     </\cf2 \strokec2 div\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 Input\cf4 \strokec4  \cf7 \strokec7 type\cf5 \strokec5 =\cf2 \strokec2 "password"\cf4 \strokec4  \{\cf5 \strokec5 ...\cf4 \strokec4 field\} />\cb1 \
\cb3                     </\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormMessage\cf4 \strokec4  />\cb1 \
\cb3                   </\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                 )\}\cb1 \
\cb3               />\cb1 \
\cb3               <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 type\cf5 \strokec5 =\cf2 \strokec2 "submit"\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "w-full"\cf4 \strokec4  \cf7 \strokec7 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isLoggingIn\}>\cb1 \
\cb3                  \{isLoggingIn \cf5 \strokec5 &&\cf4 \strokec4  <\cf6 \strokec6 Loader2\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4 animate-spin"\cf4 \strokec4  />\}\cb1 \
\cb3                 \{isLoggingIn \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 'Logging in...'\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 'Log In'\cf4 \strokec4 \}\cb1 \
\cb3               </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 form\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 Form\cf4 \strokec4 >\cb1 \
\cb3         </\cf6 \strokec6 CardContent\cf4 \strokec4 >\cb1 \
\cb3       </\cf6 \strokec6 Card\cf4 \strokec4 >\cb1 \
\cb3       \cb1 \
\cb3       <\cf6 \strokec6 Dialog\cf4 \strokec4  \cf7 \strokec7 open\cf5 \strokec5 =\cf4 \strokec4 \{isForgotPasswordOpen\} \cf7 \strokec7 onOpenChange\cf5 \strokec5 =\cf4 \strokec4 \{setIsForgotPasswordOpen\}>\cb1 \
\cb3         <\cf6 \strokec6 DialogContent\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 DialogHeader\cf4 \strokec4 >\cb1 \
\cb3             <\cf6 \strokec6 DialogTitle\cf4 \strokec4 >Forgot Password</\cf6 \strokec6 DialogTitle\cf4 \strokec4 >\cb1 \
\cb3             <\cf6 \strokec6 DialogDescription\cf4 \strokec4 >\cb1 \
\cb3               Enter your email address and we will send you a link to reset your password.\cb1 \
\cb3             </\cf6 \strokec6 DialogDescription\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 DialogHeader\cf4 \strokec4 >\cb1 \
\cb3           <\cf6 \strokec6 Form\cf4 \strokec4  \{\cf5 \strokec5 ...\cf4 \strokec4 resetForm\}>\cb1 \
\cb3             <\cf2 \strokec2 form\cf4 \strokec4  \cf7 \strokec7 onSubmit\cf5 \strokec5 =\cf4 \strokec4 \{resetForm.\cf7 \strokec7 handleSubmit\cf4 \strokec4 (handlePasswordReset)\} \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "space-y-4"\cf4 \strokec4 >\cb1 \
\cb3               <\cf6 \strokec6 FormField\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 control\cf5 \strokec5 =\cf4 \strokec4 \{resetForm.control\}\cb1 \
\cb3                 \cf7 \strokec7 name\cf5 \strokec5 =\cf2 \strokec2 "resetEmail"\cf4 \cb1 \strokec4 \
\cb3                 \cf7 \strokec7 render\cf5 \strokec5 =\cf4 \strokec4 \{(\{ \cf8 \strokec8 field\cf4 \strokec4  \}) \cf5 \strokec5 =>\cf4 \strokec4  (\cb1 \
\cb3                   <\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormLabel\cf4 \strokec4 >Email</\cf6 \strokec6 FormLabel\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                       <\cf6 \strokec6 Input\cf4 \strokec4  \cf7 \strokec7 placeholder\cf5 \strokec5 =\cf2 \strokec2 "ada@example.com"\cf4 \strokec4  \{\cf5 \strokec5 ...\cf4 \strokec4 field\} />\cb1 \
\cb3                     </\cf6 \strokec6 FormControl\cf4 \strokec4 >\cb1 \
\cb3                     <\cf6 \strokec6 FormMessage\cf4 \strokec4  />\cb1 \
\cb3                   </\cf6 \strokec6 FormItem\cf4 \strokec4 >\cb1 \
\cb3                 )\}\cb1 \
\cb3               />\cb1 \
\cb3               <\cf6 \strokec6 DialogFooter\cf4 \strokec4 >\cb1 \
\cb3                 <\cf6 \strokec6 DialogClose\cf4 \strokec4  \cf7 \strokec7 asChild\cf4 \strokec4 >\cb1 \
\cb3                   <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 type\cf5 \strokec5 =\cf2 \strokec2 "button"\cf4 \strokec4  \cf7 \strokec7 variant\cf5 \strokec5 =\cf2 \strokec2 "outline"\cf4 \strokec4  \cf7 \strokec7 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isResetting\}>\cb1 \
\cb3                     Cancel\cb1 \
\cb3                   </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3                 </\cf6 \strokec6 DialogClose\cf4 \strokec4 >\cb1 \
\cb3                 <\cf6 \strokec6 Button\cf4 \strokec4  \cf7 \strokec7 type\cf5 \strokec5 =\cf2 \strokec2 "submit"\cf4 \strokec4  \cf7 \strokec7 disabled\cf5 \strokec5 =\cf4 \strokec4 \{isResetting\}>\cb1 \
\cb3                   \{isResetting \cf5 \strokec5 &&\cf4 \strokec4  <\cf6 \strokec6 Loader2\cf4 \strokec4  \cf7 \strokec7 className\cf5 \strokec5 =\cf2 \strokec2 "mr-2 h-4 w-4 animate-spin"\cf4 \strokec4  />\}\cb1 \
\cb3                   \{isResetting \cf5 \strokec5 ?\cf4 \strokec4  \cf2 \strokec2 "Sending..."\cf4 \strokec4  \cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 "Send Reset Link"\cf4 \strokec4 \}\cb1 \
\cb3                 </\cf6 \strokec6 Button\cf4 \strokec4 >\cb1 \
\cb3               </\cf6 \strokec6 DialogFooter\cf4 \strokec4 >\cb1 \
\cb3             </\cf2 \strokec2 form\cf4 \strokec4 >\cb1 \
\cb3           </\cf6 \strokec6 Form\cf4 \strokec4 >\cb1 \
\cb3         </\cf6 \strokec6 DialogContent\cf4 \strokec4 >\cb1 \
\cb3       </\cf6 \strokec6 Dialog\cf4 \strokec4 >\cb1 \
\cb3     </>\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
\
}