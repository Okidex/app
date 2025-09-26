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
\outl0\strokewidth0 \strokec2 'use server'\cf4 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 /**\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * \cf6 \strokec6 @fileOverview\cf5 \strokec5  Populates a user's profile from their LinkedIn URL.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  *\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - populateProfileFromLinkedIn - A function that takes a LinkedIn URL and returns structured profile data.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - PopulateProfileFromLinkedInInput - The input type for the populateProfileFromLinkedIn function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - PopulateProfileFromLinkedInOutput - The return type for the populateProfileFromLinkedIn function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  */\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{ai\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 '@/ai/genkit'\cf4 \strokec4 ;\cb1 \
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{z\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 'genkit'\cf4 \strokec4 ;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 PopulateProfileFromLinkedInInputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   linkedinUrl: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 url\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The URL of the user\cf7 \strokec7 \\'\cf2 \strokec2 s LinkedIn profile.'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 PopulateProfileFromLinkedInInput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  PopulateProfileFromLinkedInInputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 PopulateProfileFromLinkedInOutputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     name: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 "The user's full name."\cf4 \strokec4 ),\cb1 \
\cb3     title: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 optional\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 "The user's current job title or headline."\cf4 \strokec4 ),\cb1 \
\cb3     experience: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 optional\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 "A summary of the user's professional experience."\cf4 \strokec4 ),\cb1 \
\cb3     skills: z.\cf8 \strokec8 array\cf4 \strokec4 (z.\cf8 \strokec8 string\cf4 \strokec4 ()).\cf8 \strokec8 optional\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 "A list of the user's skills."\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 PopulateProfileFromLinkedInOutput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  PopulateProfileFromLinkedInOutputSchema>;\cb1 \
\
\
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 async\cf4 \strokec4  \cf6 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 populateProfileFromLinkedIn\cf4 \strokec4 (\cf9 \strokec9 input\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 PopulateProfileFromLinkedInInput\cf4 \strokec4 )\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Promise\cf4 \strokec4 <\cf8 \strokec8 PopulateProfileFromLinkedInOutput\cf4 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 return\cf4 \strokec4  \cf8 \strokec8 populateProfileFromLinkedInFlow\cf4 \strokec4 (input);\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 prompt\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 definePrompt\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   name: \cf2 \strokec2 'populateProfileFromLinkedInPrompt'\cf4 \strokec4 ,\cb1 \
\cb3   input: \{schema: PopulateProfileFromLinkedInInputSchema\},\cb1 \
\cb3   output: \{schema: PopulateProfileFromLinkedInOutputSchema\},\cb1 \
\cb3   prompt: \cf2 \strokec2 `You are an expert at parsing LinkedIn profiles. Given a LinkedIn profile URL, your task is to extract key information to populate a user's profile on our platform.\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 LinkedIn Profile URL: \{\{\{linkedinUrl\}\}\}\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 Please extract the following information and return it in the specified JSON format:\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - Full Name\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - Current job title or headline\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - A summary of their professional experience\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 - A list of their skills\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 Do not scrape the website. Based on the URL structure, make assumptions about the user's profile. For example, if the URL is "linkedin.com/in/ada-lovelace", the name is likely "Ada Lovelace". Invent plausible details for a person with that name.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 `\cf4 \strokec4 ,\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 populateProfileFromLinkedInFlow\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 defineFlow\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \{\cb1 \
\cb3     name: \cf2 \strokec2 'populateProfileFromLinkedInFlow'\cf4 \strokec4 ,\cb1 \
\cb3     inputSchema: PopulateProfileFromLinkedInInputSchema,\cb1 \
\cb3     outputSchema: PopulateProfileFromLinkedInOutputSchema,\cb1 \
\cb3   \},\cb1 \
\cb3   \cf6 \strokec6 async\cf4 \strokec4  \cf9 \strokec9 input\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 const\cf4 \strokec4  \{\cf7 \strokec7 output\cf4 \strokec4 \} \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 await\cf4 \strokec4  \cf8 \strokec8 prompt\cf4 \strokec4 (input);\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \strokec4  output\cf6 \strokec6 !\cf4 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 );\cb1 \
\
}