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
\cf5 \cb3 \strokec5  * \cf6 \strokec6 @fileOverview\cf5 \strokec5  Provides a detailed breakdown of a specific financial metric.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  *\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - financialBreakdown - A function that takes a metric name and returns a detailed analysis.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - FinancialBreakdownInput - The input type for the financialBreakdown function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - FinancialBreakdownOutput - The return type for the financialBreakdown function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  */\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{ai\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 '@/ai/genkit'\cf4 \strokec4 ;\cb1 \
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{z\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 'genkit'\cf4 \strokec4 ;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 FinancialBreakdownInputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   metric: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The financial metric to be broken down (e.g., "Revenue", "Expenses").'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 FinancialBreakdownInput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  FinancialBreakdownInputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 FinancialBreakdownOutputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   breakdown: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 "A concise, visually-led breakdown of the financial metric. It should be easy to read, using formatting like bullet points and bold text to highlight key information."\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 FinancialBreakdownOutput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  FinancialBreakdownOutputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 async\cf4 \strokec4  \cf6 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 financialBreakdown\cf4 \strokec4 (\cf9 \strokec9 input\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 FinancialBreakdownInput\cf4 \strokec4 )\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Promise\cf4 \strokec4 <\cf8 \strokec8 FinancialBreakdownOutput\cf4 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 return\cf4 \strokec4  \cf8 \strokec8 financialBreakdownFlow\cf4 \strokec4 (input);\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 prompt\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 definePrompt\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   name: \cf2 \strokec2 'financialBreakdownPrompt'\cf4 \strokec4 ,\cb1 \
\cb3   input: \{schema: FinancialBreakdownInputSchema\},\cb1 \
\cb3   output: \{schema: FinancialBreakdownOutputSchema\},\cb1 \
\cb3   prompt: \cf2 \strokec2 `You are a financial analyst providing a concise and visually-led breakdown of a financial metric for an investor. Your explanation must be clear and easy to read.\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2   The user has requested a breakdown of the following metric: \{\{\{metric\}\}\}.\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2   Your task is to generate a plausible, detailed analysis. For example, if the metric is "Revenue", you could break it down by product lines or subscription tiers. If it's "Expenses", you could detail costs like salaries and marketing.\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2   **Instructions:**\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   1.  Start with a one-sentence summary of the metric's composition.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   2.  Follow with a bulleted list that breaks down the metric into its key components.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   3.  Use bold formatting for key labels and figures to make the information stand out (e.g., "**Enterprise Tier:** $300,000").\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   4.  Keep the language direct and professional.\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   `\cf4 \strokec4 ,\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 financialBreakdownFlow\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 defineFlow\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \{\cb1 \
\cb3     name: \cf2 \strokec2 'financialBreakdownFlow'\cf4 \strokec4 ,\cb1 \
\cb3     inputSchema: FinancialBreakdownInputSchema,\cb1 \
\cb3     outputSchema: FinancialBreakdownOutputSchema,\cb1 \
\cb3   \},\cb1 \
\cb3   \cf6 \strokec6 async\cf4 \strokec4  \cf9 \strokec9 input\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 const\cf4 \strokec4  \{\cf7 \strokec7 output\cf4 \strokec4 \} \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 await\cf4 \strokec4  \cf8 \strokec8 prompt\cf4 \strokec4 (input);\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \strokec4  output\cf6 \strokec6 !\cf4 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 );\cb1 \
\
}