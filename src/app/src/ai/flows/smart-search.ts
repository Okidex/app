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
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 /**\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * \cf6 \strokec6 @fileOverview\cf5 \strokec5  An AI-powered search flow to find relevant startups and users.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  *\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - smartSearch - A function that takes a natural language query and returns relevant startup and user IDs.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - SmartSearchInput - The input type for the smartSearch function  * - SmartSearchOutput - The return type for the smartSearch function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  */\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{ai\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 '@/ai/genkit'\cf4 \strokec4 ;\cb1 \
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{z\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 'genkit'\cf4 \strokec4 ;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 SmartSearchInputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   query: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The natural language search query.'\cf4 \strokec4 ),\cb1 \
\cb3   searchableData: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'A JSON string of all searchable data including startups and users.'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 SmartSearchInput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  SmartSearchInputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 SmartSearchOutputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   startupIds: z.\cf8 \strokec8 array\cf4 \strokec4 (z.\cf8 \strokec8 string\cf4 \strokec4 ()).\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'An array of startup IDs that are relevant to the search query.'\cf4 \strokec4 ),\cb1 \
\cb3   userIds: z.\cf8 \strokec8 array\cf4 \strokec4 (z.\cf8 \strokec8 string\cf4 \strokec4 ()).\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'An array of user IDs that are relevant to the search query.'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 SmartSearchOutput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  SmartSearchOutputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 async\cf4 \strokec4  \cf6 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 smartSearch\cf4 \strokec4 (\cf9 \strokec9 input\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 SmartSearchInput\cf4 \strokec4 )\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Promise\cf4 \strokec4 <\cf8 \strokec8 SmartSearchOutput\cf4 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 return\cf4 \strokec4  \cf8 \strokec8 smartSearchFlow\cf4 \strokec4 (input);\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 prompt\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 definePrompt\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   name: \cf2 \strokec2 'smartSearchPrompt'\cf4 \strokec4 ,\cb1 \
\cb3   input: \{schema: SmartSearchInputSchema\},\cb1 \
\cb3   output: \{schema: SmartSearchOutputSchema\},\cb1 \
\cb3   prompt: \cf2 \strokec2 `You are an intelligent search engine for a platform connecting startup founders, investors, and talent. Your task is to analyze a natural language query and return the most relevant startup and user IDs based on the provided data.\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 Search Query: "\{\{query\}\}"\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 Searchable Data (JSON):\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 \{\{\{searchableData\}\}\}\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 Based on the query, identify the most relevant startups and users from the data. Return their IDs in the "startupIds" and "userIds" arrays. Match against all available fields, including names, descriptions, industries, skills, investment interests, etc. Prioritize relevance.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 `\cf4 \strokec4 ,\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 smartSearchFlow\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 defineFlow\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \{\cb1 \
\cb3     name: \cf2 \strokec2 'smartSearchFlow'\cf4 \strokec4 ,\cb1 \
\cb3     inputSchema: SmartSearchInputSchema,\cb1 \
\cb3     outputSchema: SmartSearchOutputSchema,\cb1 \
\cb3   \},\cb1 \
\cb3   \cf6 \strokec6 async\cf4 \strokec4  \cf9 \strokec9 input\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 const\cf4 \strokec4  \{\cf7 \strokec7 output\cf4 \strokec4 \} \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 await\cf4 \strokec4  \cf8 \strokec8 prompt\cf4 \strokec4 (input);\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \strokec4  output\cf6 \strokec6 !\cf4 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 );\cb1 \
\
}