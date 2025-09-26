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
\outl0\strokewidth0 \strokec2 'use server'\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{ai\} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 '@/ai/genkit'\cf4 \strokec4 ;\cb1 \
\cf5 \cb3 \strokec5 import\cf4 \strokec4  \{z\} \cf5 \strokec5 from\cf4 \strokec4  \cf2 \strokec2 'genkit'\cf4 \strokec4 ;\cb1 \
\
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 ProfilePictureAutoTaggingInputSchema\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  z.\cf7 \strokec7 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   photoDataUri: z\cb1 \
\cb3     .\cf7 \strokec7 string\cf4 \strokec4 ()\cb1 \
\cb3     .\cf7 \strokec7 describe\cf4 \strokec4 (\cb1 \
\cb3       \cf2 \strokec2 "A profile picture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."\cf4 \cb1 \strokec4 \
\cb3     ),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 type\cf4 \strokec4  \cf7 \strokec7 ProfilePictureAutoTaggingInput\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 typeof\cf4 \strokec4  ProfilePictureAutoTaggingInputSchema\cb1 \
\cb3 >;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 ProfilePictureAutoTaggingOutputSchema\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  z.\cf7 \strokec7 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   tags: z\cb1 \
\cb3     .\cf7 \strokec7 array\cf4 \strokec4 (z.\cf7 \strokec7 string\cf4 \strokec4 ())\cb1 \
\cb3     .\cf7 \strokec7 describe\cf4 \strokec4 (\cb1 \
\cb3       \cf2 \strokec2 'An array of suggested tags for the profile picture (e.g., professional, friendly, founder, investor).'\cf4 \cb1 \strokec4 \
\cb3     ),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 type\cf4 \strokec4  \cf7 \strokec7 ProfilePictureAutoTaggingOutput\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf7 \strokec7 z\cf4 \strokec4 .\cf7 \strokec7 infer\cf4 \strokec4 <\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf5 \strokec5 typeof\cf4 \strokec4  ProfilePictureAutoTaggingOutputSchema\cb1 \
\cb3 >;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf7 \strokec7 profilePictureAutoTagging\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf8 \strokec8 input\cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 ProfilePictureAutoTaggingInput\cf4 \cb1 \strokec4 \
\cb3 )\cf5 \strokec5 :\cf4 \strokec4  \cf7 \strokec7 Promise\cf4 \strokec4 <\cf7 \strokec7 ProfilePictureAutoTaggingOutput\cf4 \strokec4 > \{\cb1 \
\cb3   \cf5 \strokec5 return\cf4 \strokec4  \cf7 \strokec7 profilePictureAutoTaggingFlow\cf4 \strokec4 (input);\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 profilePictureAutoTaggingPrompt\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  ai.\cf7 \strokec7 definePrompt\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   name: \cf2 \strokec2 'profilePictureAutoTaggingPrompt'\cf4 \strokec4 ,\cb1 \
\cb3   input: \{schema: ProfilePictureAutoTaggingInputSchema\},\cb1 \
\cb3   output: \{schema: ProfilePictureAutoTaggingOutputSchema\},\cb1 \
\cb3   prompt: \cf2 \strokec2 `Analyze the provided profile picture and suggest relevant tags to improve profile discoverability and matching accuracy.\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2   Consider aspects like the person's attire, background, and overall impression to determine appropriate tags such as 'professional', 'friendly', 'founder', 'investor', 'approachable', or other relevant descriptors.\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2   Photo: \{\{media url=photoDataUri\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Tags:`\cf4 \strokec4 ,\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 const\cf4 \strokec4  \cf6 \strokec6 profilePictureAutoTaggingFlow\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  ai.\cf7 \strokec7 defineFlow\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \{\cb1 \
\cb3     name: \cf2 \strokec2 'profilePictureAutoTaggingFlow'\cf4 \strokec4 ,\cb1 \
\cb3     inputSchema: ProfilePictureAutoTaggingInputSchema,\cb1 \
\cb3     outputSchema: ProfilePictureAutoTaggingOutputSchema,\cb1 \
\cb3   \},\cb1 \
\cb3   \cf5 \strokec5 async\cf4 \strokec4  \cf8 \strokec8 input\cf4 \strokec4  \cf5 \strokec5 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf5 \strokec5 const\cf4 \strokec4  \{\cf6 \strokec6 output\cf4 \strokec4 \} \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf7 \strokec7 profilePictureAutoTaggingPrompt\cf4 \strokec4 (input);\cb1 \
\cb3     \cf5 \strokec5 return\cf4 \strokec4  output\cf5 \strokec5 !\cf4 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 );\cb1 \
\
}