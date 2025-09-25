{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red14\green106\blue57;\red255\green255\blue255;\red31\green31\blue31;
\red93\green93\blue93;\red181\green26\blue70;\red38\green59\blue169;\red91\green47\blue214;\red196\green100\blue30;
}
{\*\expandedcolortbl;;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;\cssrgb\c16078\c16078\c16078;
\cssrgb\c43922\c43922\c43922;\cssrgb\c76863\c18824\c34510;\cssrgb\c19608\c32157\c72157;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 "use client"\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 // Inspired by react-hot-toast library\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \cf7 \strokec7 *\cf4 \strokec4  \cf6 \strokec6 as\cf4 \strokec4  React \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 "react"\cf4 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   ToastActionElement,\cb1 \
\cb3   ToastProps,\cb1 \
\cb3 \} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 "@/components/ui/toast"\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 TOAST_LIMIT\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 1\cf4 \cb1 \strokec4 \
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 TOAST_REMOVE_DELAY\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 1000000\cf4 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 ToastProps\cf4 \strokec4  \cf6 \strokec6 &\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf9 \strokec9 id\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 string\cf4 \cb1 \strokec4 \
\cb3   \cf9 \strokec9 title\cf6 \strokec6 ?:\cf4 \strokec4  \cf8 \strokec8 React\cf4 \strokec4 .\cf8 \strokec8 ReactNode\cf4 \cb1 \strokec4 \
\cb3   \cf9 \strokec9 description\cf6 \strokec6 ?:\cf4 \strokec4  \cf8 \strokec8 React\cf4 \strokec4 .\cf8 \strokec8 ReactNode\cf4 \cb1 \strokec4 \
\cb3   \cf9 \strokec9 action\cf6 \strokec6 ?:\cf4 \strokec4  \cf8 \strokec8 ToastActionElement\cf4 \cb1 \strokec4 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 actionTypes\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   ADD_TOAST: \cf2 \strokec2 "ADD_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3   UPDATE_TOAST: \cf2 \strokec2 "UPDATE_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3   DISMISS_TOAST: \cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3   REMOVE_TOAST: \cf2 \strokec2 "REMOVE_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3 \} \cf6 \strokec6 as\cf4 \strokec4  \cf6 \strokec6 const\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 let\cf4 \strokec4  count \cf6 \strokec6 =\cf4 \strokec4  \cf7 \strokec7 0\cf4 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 genId\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   count \cf6 \strokec6 =\cf4 \strokec4  (count \cf6 \strokec6 +\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4 ) \cf6 \strokec6 %\cf4 \strokec4  Number.MAX_SAFE_INTEGER\cb1 \
\cb3   \cf6 \strokec6 return\cf4 \strokec4  count.\cf8 \strokec8 toString\cf4 \strokec4 ()\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 ActionType\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 typeof\cf4 \strokec4  actionTypes\cb1 \
\
\cf6 \cb3 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 Action\cf4 \strokec4  \cf6 \strokec6 =\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 |\cf4 \strokec4  \{\cb1 \
\cb3       \cf9 \strokec9 type\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ActionType\cf4 \strokec4 [\cf2 \strokec2 "ADD_TOAST"\cf4 \strokec4 ]\cb1 \
\cb3       \cf9 \strokec9 toast\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \cb1 \strokec4 \
\cb3     \}\cb1 \
\cb3   \cf6 \strokec6 |\cf4 \strokec4  \{\cb1 \
\cb3       \cf9 \strokec9 type\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ActionType\cf4 \strokec4 [\cf2 \strokec2 "UPDATE_TOAST"\cf4 \strokec4 ]\cb1 \
\cb3       \cf9 \strokec9 toast\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Partial\cf4 \strokec4 <\cf8 \strokec8 ToasterToast\cf4 \strokec4 >\cb1 \
\cb3     \}\cb1 \
\cb3   \cf6 \strokec6 |\cf4 \strokec4  \{\cb1 \
\cb3       \cf9 \strokec9 type\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ActionType\cf4 \strokec4 [\cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 ]\cb1 \
\cb3       \cf9 \strokec9 toastId\cf6 \strokec6 ?:\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \strokec4 [\cf2 \strokec2 "id"\cf4 \strokec4 ]\cb1 \
\cb3     \}\cb1 \
\cb3   \cf6 \strokec6 |\cf4 \strokec4  \{\cb1 \
\cb3       \cf9 \strokec9 type\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ActionType\cf4 \strokec4 [\cf2 \strokec2 "REMOVE_TOAST"\cf4 \strokec4 ]\cb1 \
\cb3       \cf9 \strokec9 toastId\cf6 \strokec6 ?:\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \strokec4 [\cf2 \strokec2 "id"\cf4 \strokec4 ]\cb1 \
\cb3     \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 interface\cf4 \strokec4  \cf8 \strokec8 State\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf9 \strokec9 toasts\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \strokec4 []\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 toastTimeouts\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 new\cf4 \strokec4  \cf8 \strokec8 Map\cf4 \strokec4 <\cf7 \strokec7 string\cf4 \strokec4 , \cf8 \strokec8 ReturnType\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  setTimeout>>()\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf8 \strokec8 addToRemoveQueue\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (\cf9 \strokec9 toastId\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 string\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 if\cf4 \strokec4  (toastTimeouts.\cf8 \strokec8 has\cf4 \strokec4 (toastId)) \{\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \cb1 \strokec4 \
\cb3   \}\cb1 \
\
\cb3   \cf6 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 timeout\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 setTimeout\cf4 \strokec4 (() \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     toastTimeouts.\cf8 \strokec8 delete\cf4 \strokec4 (toastId)\cb1 \
\cb3     \cf8 \strokec8 dispatch\cf4 \strokec4 (\{\cb1 \
\cb3       type: \cf2 \strokec2 "REMOVE_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3       toastId: toastId,\cb1 \
\cb3     \})\cb1 \
\cb3   \}, \cf7 \strokec7 TOAST_REMOVE_DELAY\cf4 \strokec4 )\cb1 \
\
\cb3   toastTimeouts.\cf8 \strokec8 set\cf4 \strokec4 (toastId, timeout)\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 const\cf4 \strokec4  \cf8 \strokec8 reducer\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (\cf9 \strokec9 state\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 State\cf4 \strokec4 , \cf9 \strokec9 action\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Action\cf4 \strokec4 )\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 State\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 switch\cf4 \strokec4  (action.type) \{\cb1 \
\cb3     \cf6 \strokec6 case\cf4 \strokec4  \cf2 \strokec2 "ADD_TOAST"\cf4 \strokec4 :\cb1 \
\cb3       \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3         toasts: [action.toast, \cf6 \strokec6 ...\cf4 \strokec4 state.toasts].\cf8 \strokec8 slice\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 , \cf7 \strokec7 TOAST_LIMIT\cf4 \strokec4 ),\cb1 \
\cb3       \}\cb1 \
\
\cb3     \cf6 \strokec6 case\cf4 \strokec4  \cf2 \strokec2 "UPDATE_TOAST"\cf4 \strokec4 :\cb1 \
\cb3       \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3         toasts: state.toasts.\cf8 \strokec8 map\cf4 \strokec4 ((\cf9 \strokec9 t\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \cb1 \strokec4 \
\cb3           t.id \cf6 \strokec6 ===\cf4 \strokec4  action.toast.id \cf6 \strokec6 ?\cf4 \strokec4  \{ \cf6 \strokec6 ...\cf4 \strokec4 t, \cf6 \strokec6 ...\cf4 \strokec4 action.toast \} \cf6 \strokec6 :\cf4 \strokec4  t\cb1 \
\cb3         ),\cb1 \
\cb3       \}\cb1 \
\
\cb3     \cf6 \strokec6 case\cf4 \strokec4  \cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 : \{\cb1 \
\cb3       \cf6 \strokec6 const\cf4 \strokec4  \{ \cf7 \strokec7 toastId\cf4 \strokec4  \} \cf6 \strokec6 =\cf4 \strokec4  action\cb1 \
\
\cb3       \cf5 \strokec5 // ! Side effects ! - This could be extracted into a dismissToast() action,\cf4 \cb1 \strokec4 \
\cb3       \cf5 \strokec5 // but I'll keep it here for simplicity\cf4 \cb1 \strokec4 \
\cb3       \cf6 \strokec6 if\cf4 \strokec4  (toastId) \{\cb1 \
\cb3         \cf8 \strokec8 addToRemoveQueue\cf4 \strokec4 (toastId)\cb1 \
\cb3       \} \cf6 \strokec6 else\cf4 \strokec4  \{\cb1 \
\cb3         state.toasts.\cf8 \strokec8 forEach\cf4 \strokec4 ((\cf9 \strokec9 toast\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3           \cf8 \strokec8 addToRemoveQueue\cf4 \strokec4 (toast.id)\cb1 \
\cb3         \})\cb1 \
\cb3       \}\cb1 \
\
\cb3       \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3         toasts: state.toasts.\cf8 \strokec8 map\cf4 \strokec4 ((\cf9 \strokec9 t\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \cb1 \strokec4 \
\cb3           t.id \cf6 \strokec6 ===\cf4 \strokec4  toastId \cf6 \strokec6 ||\cf4 \strokec4  toastId \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 undefined\cf4 \cb1 \strokec4 \
\cb3             \cf6 \strokec6 ?\cf4 \strokec4  \{\cb1 \
\cb3                 \cf6 \strokec6 ...\cf4 \strokec4 t,\cb1 \
\cb3                 open: \cf7 \strokec7 false\cf4 \strokec4 ,\cb1 \
\cb3               \}\cb1 \
\cb3             \cf6 \strokec6 :\cf4 \strokec4  t\cb1 \
\cb3         ),\cb1 \
\cb3       \}\cb1 \
\cb3     \}\cb1 \
\cb3     \cf6 \strokec6 case\cf4 \strokec4  \cf2 \strokec2 "REMOVE_TOAST"\cf4 \strokec4 :\cb1 \
\cb3       \cf6 \strokec6 if\cf4 \strokec4  (action.toastId \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 undefined\cf4 \strokec4 ) \{\cb1 \
\cb3         \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3           \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3           toasts: [],\cb1 \
\cb3         \}\cb1 \
\cb3       \}\cb1 \
\cb3       \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3         toasts: state.toasts.\cf8 \strokec8 filter\cf4 \strokec4 ((\cf9 \strokec9 t\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  t.id \cf6 \strokec6 !==\cf4 \strokec4  action.toastId),\cb1 \
\cb3       \}\cb1 \
\cb3   \}\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 listeners\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Array\cf4 \strokec4 <(\cf9 \strokec9 state\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 State\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \cf7 \strokec7 void\cf4 \strokec4 > \cf6 \strokec6 =\cf4 \strokec4  []\cb1 \
\
\cf6 \cb3 \strokec6 let\cf4 \strokec4  memoryState\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 State\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \{ toasts: [] \}\cb1 \
\
\cf6 \cb3 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 dispatch\cf4 \strokec4 (\cf9 \strokec9 action\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Action\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   memoryState \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 reducer\cf4 \strokec4 (memoryState, action)\cb1 \
\cb3   listeners.\cf8 \strokec8 forEach\cf4 \strokec4 ((\cf9 \strokec9 listener\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf8 \strokec8 listener\cf4 \strokec4 (memoryState)\cb1 \
\cb3   \})\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 Toast\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 Omit\cf4 \strokec4 <\cf8 \strokec8 ToasterToast\cf4 \strokec4 , \cf2 \strokec2 "id"\cf4 \strokec4 >\cb1 \
\
\cf6 \cb3 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 toast\cf4 \strokec4 (\{ \cf6 \strokec6 ...\cf9 \strokec9 props\cf4 \strokec4  \}\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Toast\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 id\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 genId\cf4 \strokec4 ()\cb1 \
\
\cb3   \cf6 \strokec6 const\cf4 \strokec4  \cf8 \strokec8 update\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (\cf9 \strokec9 props\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 ToasterToast\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \cb1 \strokec4 \
\cb3     \cf8 \strokec8 dispatch\cf4 \strokec4 (\{\cb1 \
\cb3       type: \cf2 \strokec2 "UPDATE_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3       toast: \{ \cf6 \strokec6 ...\cf4 \strokec4 props, id \},\cb1 \
\cb3     \})\cb1 \
\cb3   \cf6 \strokec6 const\cf4 \strokec4  \cf8 \strokec8 dismiss\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \cf8 \strokec8 dispatch\cf4 \strokec4 (\{ type: \cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 , toastId: id \})\cb1 \
\
\cb3   \cf8 \strokec8 dispatch\cf4 \strokec4 (\{\cb1 \
\cb3     type: \cf2 \strokec2 "ADD_TOAST"\cf4 \strokec4 ,\cb1 \
\cb3     toast: \{\cb1 \
\cb3       \cf6 \strokec6 ...\cf4 \strokec4 props,\cb1 \
\cb3       id,\cb1 \
\cb3       open: \cf7 \strokec7 true\cf4 \strokec4 ,\cb1 \
\cb3       \cf8 \strokec8 onOpenChange\cf4 \strokec4 : (\cf9 \strokec9 open\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3         \cf6 \strokec6 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 open) \cf8 \strokec8 dismiss\cf4 \strokec4 ()\cb1 \
\cb3       \},\cb1 \
\cb3     \},\cb1 \
\cb3   \})\cb1 \
\
\cb3   \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3     id: id,\cb1 \
\cb3     dismiss,\cb1 \
\cb3     update,\cb1 \
\cb3   \}\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 useToast\cf4 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 const\cf4 \strokec4  [\cf7 \strokec7 state\cf4 \strokec4 , \cf7 \strokec7 setState\cf4 \strokec4 ] \cf6 \strokec6 =\cf4 \strokec4  React.\cf8 \strokec8 useState\cf4 \strokec4 <\cf8 \strokec8 State\cf4 \strokec4 >(memoryState)\cb1 \
\
\cb3   React.\cf8 \strokec8 useEffect\cf4 \strokec4 (() \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     listeners.\cf8 \strokec8 push\cf4 \strokec4 (setState)\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3       \cf6 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 index\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  listeners.\cf8 \strokec8 indexOf\cf4 \strokec4 (setState)\cb1 \
\cb3       \cf6 \strokec6 if\cf4 \strokec4  (index \cf6 \strokec6 >\cf4 \strokec4  \cf6 \strokec6 -\cf7 \strokec7 1\cf4 \strokec4 ) \{\cb1 \
\cb3         listeners.\cf8 \strokec8 splice\cf4 \strokec4 (index, \cf7 \strokec7 1\cf4 \strokec4 )\cb1 \
\cb3       \}\cb1 \
\cb3     \}\cb1 \
\cb3   \}, [state])\cb1 \
\
\cb3   \cf6 \strokec6 return\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 ...\cf4 \strokec4 state,\cb1 \
\cb3     toast,\cb1 \
\cb3     \cf8 \strokec8 dismiss\cf4 \strokec4 : (\cf9 \strokec9 toastId\cf6 \strokec6 ?:\cf4 \strokec4  \cf7 \strokec7 string\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \cf8 \strokec8 dispatch\cf4 \strokec4 (\{ type: \cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 , toastId \}),\cb1 \
\cb3   \}\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 dismiss\cf4 \strokec4 (\cf9 \strokec9 toastId\cf6 \strokec6 ?:\cf4 \strokec4  \cf7 \strokec7 string\cf4 \strokec4 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf8 \strokec8 dispatch\cf4 \strokec4 (\{ type: \cf2 \strokec2 "DISMISS_TOAST"\cf4 \strokec4 , toastId \})\cb1 \
\cb3 \}\cb1 \
\
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \{ useToast, toast, dismiss \}\cb1 \
\
}