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
\cf5 \cb3 \strokec5  * \cf6 \strokec6 @fileOverview\cf5 \strokec5  Summarizes financial data provided by founders for investors.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  *\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - summarizeFinancialData - A function that takes financial data as input and returns a summary.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - FinancialDataInput - The input type for the summarizeFinancialData function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  * - FinancialDataOutput - The return type for the summarizeFinancialData function.\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5  */\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{ai\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 '@/ai/genkit'\cf4 \strokec4 ;\cb1 \
\cf6 \cb3 \strokec6 import\cf4 \strokec4  \{z\} \cf6 \strokec6 from\cf4 \strokec4  \cf2 \strokec2 'genkit'\cf4 \strokec4 ;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 FinancialDataInputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   companyName: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The name of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   revenue: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The total revenue of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   expenses: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The total expenses of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   netIncome: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The net income of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   grossProfitMargin: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The gross profit margin of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   ebitda: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The EBITDA of the company.'\cf4 \strokec4 ),\cb1 \
\cb3   customerAcquisitionCost: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The customer acquisition cost.'\cf4 \strokec4 ),\cb1 \
\cb3   customerLifetimeValue: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The customer lifetime value.'\cf4 \strokec4 ),\cb1 \
\cb3   monthlyRecurringRevenue: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The monthly recurring revenue.'\cf4 \strokec4 ),\cb1 \
\cb3   cashBurnRate: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The cash burn rate.'\cf4 \strokec4 ),\cb1 \
\cb3   runway: z.\cf8 \strokec8 number\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'The runway of the company in months.'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 FinancialDataInput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  FinancialDataInputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 FinancialDataOutputSchema\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  z.\cf8 \strokec8 object\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   summary: z.\cf8 \strokec8 string\cf4 \strokec4 ().\cf8 \strokec8 describe\cf4 \strokec4 (\cf2 \strokec2 'A summary of the financial data, highlighting key metrics and insights.'\cf4 \strokec4 ),\cb1 \
\cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 type\cf4 \strokec4  \cf8 \strokec8 FinancialDataOutput\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf8 \strokec8 z\cf4 \strokec4 .\cf8 \strokec8 infer\cf4 \strokec4 <\cf6 \strokec6 typeof\cf4 \strokec4  FinancialDataOutputSchema>;\cb1 \
\
\cf6 \cb3 \strokec6 export\cf4 \strokec4  \cf6 \strokec6 async\cf4 \strokec4  \cf6 \strokec6 function\cf4 \strokec4  \cf8 \strokec8 summarizeFinancialData\cf4 \strokec4 (\cf9 \strokec9 input\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 FinancialDataInput\cf4 \strokec4 )\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 Promise\cf4 \strokec4 <\cf8 \strokec8 FinancialDataOutput\cf4 \strokec4 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \cf6 \strokec6 return\cf4 \strokec4  \cf8 \strokec8 financialDataSummaryFlow\cf4 \strokec4 (input);\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 prompt\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 definePrompt\cf4 \strokec4 (\{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   name: \cf2 \strokec2 'financialDataSummaryPrompt'\cf4 \strokec4 ,\cb1 \
\cb3   input: \{schema: FinancialDataInputSchema\},\cb1 \
\cb3   output: \{schema: FinancialDataOutputSchema\},\cb1 \
\cb3   prompt: \cf2 \strokec2 `You are an expert financial analyst summarizing financial data for investors.\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2   Given the following financial data for \{\{companyName\}\}, provide a concise summary highlighting key metrics and insights that would be relevant to investors. Focus on metrics that indicate the company's financial health and growth potential.\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2   Revenue: \{\{revenue\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Expenses: \{\{expenses\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Net Income: \{\{netIncome\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Gross Profit Margin: \{\{grossProfitMargin\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   EBITDA: \{\{ebitda\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Customer Acquisition Cost: \{\{customerAcquisitionCost\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Customer Lifetime Value: \{\{customerLifetimeValue\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Monthly Recurring Revenue: \{\{monthlyRecurringRevenue\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Cash Burn Rate: \{\{cashBurnRate\}\}\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2   Runway: \{\{runway\}\} months\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2   Summary:`\cf4 \strokec4 ,\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \});\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf4 \strokec4  \cf7 \strokec7 financialDataSummaryFlow\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  ai.\cf8 \strokec8 defineFlow\cf4 \strokec4 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   \{\cb1 \
\cb3     name: \cf2 \strokec2 'financialDataSummaryFlow'\cf4 \strokec4 ,\cb1 \
\cb3     inputSchema: FinancialDataInputSchema,\cb1 \
\cb3     outputSchema: FinancialDataOutputSchema,\cb1 \
\cb3   \},\cb1 \
\cb3   \cf6 \strokec6 async\cf4 \strokec4  \cf9 \strokec9 input\cf4 \strokec4  \cf6 \strokec6 =>\cf4 \strokec4  \{\cb1 \
\cb3     \cf6 \strokec6 const\cf4 \strokec4  \{\cf7 \strokec7 output\cf4 \strokec4 \} \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 await\cf4 \strokec4  \cf8 \strokec8 prompt\cf4 \strokec4 (input);\cb1 \
\cb3     \cf6 \strokec6 return\cf4 \strokec4  output\cf6 \strokec6 !\cf4 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 );\cb1 \
\
}