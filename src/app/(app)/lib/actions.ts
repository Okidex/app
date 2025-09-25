{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red31\green31\blue31;\red14\green106\blue57;\red255\green255\blue255;
\red181\green26\blue70;\red91\green47\blue214;\red196\green100\blue30;\red38\green59\blue169;}
{\*\expandedcolortbl;;\cssrgb\c16078\c16078\c16078;\cssrgb\c0\c48235\c28627;\cssrgb\c100000\c100000\c100000;
\cssrgb\c76863\c18824\c34510;\cssrgb\c43529\c29804\c87059;\cssrgb\c81569\c47059\c14902;\cssrgb\c19608\c32157\c72157;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf3 \cb4 \strokec3 "use server"\cf2 \strokec2 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ summarizeFinancialData, FinancialDataInput \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/financial-data-summary"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ profilePictureAutoTagging \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/profile-picture-auto-tagging"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ smartMatch \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/smart-matching"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ populateProfileFromLinkedIn \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/linkedin-profile-populator"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ financialBreakdown \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/financial-breakdown"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ smartSearch \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "@/ai/flows/smart-search"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ FullUserProfile, FounderProfile, TalentProfile, Startup, Profile, UserRole, TalentSubRole \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 "./types"\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ db, auth, storage \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 './firebase'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ collection, getDocs, doc, setDoc, updateDoc \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'firebase/firestore'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ createUserWithEmailAndPassword, updateProfile \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'firebase/auth'\cf2 \strokec2 ;\cb1 \
\cf5 \cb4 \strokec5 import\cf2 \strokec2  \{ ref, uploadString, getDownloadURL \} \cf5 \strokec5 from\cf2 \strokec2  \cf3 \strokec3 'firebase/storage'\cf2 \strokec2 ;\cb1 \
\
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getFinancialSummary\cf2 \strokec2 (\cf7 \strokec7 input\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FinancialDataInput\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 summarizeFinancialData\cf2 \strokec2 (input);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  result.summary;\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4     console.\cf6 \strokec6 error\cf2 \strokec2 (error);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 "Error generating summary. Please try again."\cf2 \strokec2 ;\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getProfilePictureTags\cf2 \strokec2 (\cf7 \strokec7 photoDataUri\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 profilePictureAutoTagging\cf2 \strokec2 (\{ photoDataUri \});\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  result.tags;\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4     console.\cf6 \strokec6 error\cf2 \strokec2 (error);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  [];\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getSmartMatches\cf2 \strokec2 (\cf7 \strokec7 user\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupsCollection\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'startups'\cf2 \strokec2 ));\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allStartups\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startupsCollection.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersCollection\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'users'\cf2 \strokec2 ));\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersCollection.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\
\cb4     \cf5 \strokec5 let\cf2 \strokec2  userProfileDesc \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 `User is a $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 role\cf3 \strokec3 \}. Name: $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 name\cf3 \strokec3 \}. `\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 founderProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  user.profile \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  allStartups.\cf6 \strokec6 find\cf2 \strokec2 (\cf7 \strokec7 s\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  s.id \cf5 \strokec5 ===\cf2 \strokec2  founderProfile.companyId);\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (startup) \{\cb1 \
\cb4             userProfileDesc \cf5 \strokec5 +=\cf2 \strokec2  \cf3 \strokec3 `Founder of $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 companyName\cf3 \strokec3 \}, in the $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 industry\cf3 \strokec3 \} industry. Stage: $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 stage\cf3 \strokec3 \}. Tagline: $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 tagline\cf3 \strokec3 \}. Description: $\{\cf2 \strokec2 startup\cf3 \strokec3 .\cf2 \strokec2 description\cf3 \strokec3 \}`\cf2 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf3 \strokec3 'investmentInterests'\cf2 \strokec2  \cf5 \strokec5 in\cf2 \strokec2  user.profile) \{\cb1 \
\cb4         userProfileDesc \cf5 \strokec5 +=\cf2 \strokec2  \cf3 \strokec3 `Investor with interests in $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 profile\cf3 \strokec3 .\cf2 \strokec2 investmentInterests\cf3 \strokec3 .\cf6 \strokec6 join\cf3 \strokec3 (', ')\}. Thesis: $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 profile\cf3 \strokec3 .\cf2 \strokec2 thesis\cf3 \strokec3 \}`\cf2 \strokec2 ;\cb1 \
\cb4     \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (user.role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2  \cf5 \strokec5 &&\cf2 \strokec2  \cf3 \strokec3 'skills'\cf2 \strokec2  \cf5 \strokec5 in\cf2 \strokec2  user.profile) \{\cb1 \
\cb4         userProfileDesc \cf5 \strokec5 +=\cf2 \strokec2  \cf3 \strokec3 `Talent with skills in $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 profile\cf3 \strokec3 .\cf2 \strokec2 skills\cf3 \strokec3 ?.\cf6 \strokec6 join\cf3 \strokec3 (', ')\}. Experience: $\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 profile\cf3 \strokec3 .\cf2 \strokec2 experience\cf3 \strokec3 \}`\cf2 \strokec2 ;\cb1 \
\cb4     \}\cb1 \
\
\cb4     \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 smartMatch\cf2 \strokec2 (\{ startupProfile: userProfileDesc \});\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  result;\cb1 \
\cb4     \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4         console.\cf6 \strokec6 error\cf2 \strokec2 (error);\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ investorMatches: [], talentMatches: [] \};\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getProfileFromLinkedIn\cf2 \strokec2 (\cf7 \strokec7 linkedinUrl\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 populateProfileFromLinkedIn\cf2 \strokec2 (\{ linkedinUrl \});\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  result;\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4     console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error in getProfileFromLinkedIn:"\cf2 \strokec2 , error);\cb1 \
\cb4     \cf5 \strokec5 throw\cf2 \strokec2  \cf5 \strokec5 new\cf2 \strokec2  \cf6 \strokec6 Error\cf2 \strokec2 (\cf3 \strokec3 "Failed to get profile from LinkedIn."\cf2 \strokec2 );\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getFinancialBreakdown\cf2 \strokec2 (\cf7 \strokec7 metric\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4   \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 result\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 financialBreakdown\cf2 \strokec2 (\{ metric \});\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  result.breakdown;\cb1 \
\cb4   \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4     console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error in getFinancialBreakdown:"\cf2 \strokec2 , error);\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 "Could not generate breakdown. Please try again."\cf2 \strokec2 ;\cb1 \
\cb4   \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 getSearchResults\cf2 \strokec2 (\cf7 \strokec7 query\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 query) \{\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ startups: [], users: [] \};\cb1 \
\cb4     \}\cb1 \
\cb4     \cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupsCollection\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'startups'\cf2 \strokec2 ));\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allStartups\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  startupsCollection.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 usersCollection\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 getDocs\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'users'\cf2 \strokec2 ));\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 allUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  usersCollection.docs.\cf6 \strokec6 map\cf2 \strokec2 (\cf7 \strokec7 doc\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  doc.\cf6 \strokec6 data\cf2 \strokec2 () \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2 );\cb1 \
\
\cb4     \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 searchableData\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf8 \strokec8 JSON\cf2 \strokec2 .\cf6 \strokec6 stringify\cf2 \strokec2 (\{ startups: allStartups, users: allUsers \});\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \{ \cf8 \strokec8 startupIds\cf2 \strokec2 , \cf8 \strokec8 userIds\cf2 \strokec2  \} \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 smartSearch\cf2 \strokec2 (\{ query, searchableData \});\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 filteredStartups\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  allStartups.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 s\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  startupIds.\cf6 \strokec6 includes\cf2 \strokec2 (s.id));\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 filteredUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  allUsers.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 u\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  userIds.\cf6 \strokec6 includes\cf2 \strokec2 (u.id));\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ startups: filteredStartups, users: filteredUsers \};\cb1 \
\cb4     \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4         console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error performing smart search:"\cf2 \strokec2 , error);\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 lowerCaseQuery\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  query.\cf6 \strokec6 toLowerCase\cf2 \strokec2 ();\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 filteredStartups\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  allStartups.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 startup\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cb1 \
\cb4             Object.\cf6 \strokec6 values\cf2 \strokec2 (startup).\cf6 \strokec6 some\cf2 \strokec2 (\cf7 \strokec7 val\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cb1 \
\cb4                 \cf6 \strokec6 String\cf2 \strokec2 (val).\cf6 \strokec6 toLowerCase\cf2 \strokec2 ().\cf6 \strokec6 includes\cf2 \strokec2 (lowerCaseQuery)\cb1 \
\cb4             )\cb1 \
\cb4         );\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 filteredUsers\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  allUsers.\cf6 \strokec6 filter\cf2 \strokec2 (\cf7 \strokec7 user\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cb1 \
\cb4             Object.\cf6 \strokec6 values\cf2 \strokec2 (user).\cf6 \strokec6 some\cf2 \strokec2 (\cf7 \strokec7 val\cf2 \strokec2  \cf5 \strokec5 =>\cf2 \strokec2  \cb1 \
\cb4                 \cf6 \strokec6 String\cf2 \strokec2 (val).\cf6 \strokec6 toLowerCase\cf2 \strokec2 ().\cf6 \strokec6 includes\cf2 \strokec2 (lowerCaseQuery)\cb1 \
\cb4             )\cb1 \
\cb4         );\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ startups: filteredStartups, users: filteredUsers \};\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 uploadImage\cf2 \strokec2 (\cf7 \strokec7 dataUrl\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 , \cf7 \strokec7 path\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 )\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Promise\cf2 \strokec2 <\cf8 \strokec8 string\cf2 \strokec2 > \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 if\cf2 \strokec2  (\cf5 \strokec5 !\cf2 \strokec2 dataUrl) \cf5 \strokec5 return\cf2 \strokec2  \cf3 \strokec3 ""\cf2 \strokec2 ;\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 storageRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 ref\cf2 \strokec2 (storage, path);\cb1 \
\cb4     \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 snapshot\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 uploadString\cf2 \strokec2 (storageRef, dataUrl, \cf3 \strokec3 'data_url'\cf2 \strokec2 );\cb1 \
\cb4     \cf5 \strokec5 return\cf2 \strokec2  \cf6 \strokec6 getDownloadURL\cf2 \strokec2 (snapshot.ref);\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 createUserAndProfile\cf2 \strokec2 (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf7 \strokec7 email\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 password\cf5 \strokec5 :\cf2 \strokec2   \cf8 \strokec8 string\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 name\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 role\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 UserRole\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 profileData\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 subRole\cf5 \strokec5 ?:\cf2 \strokec2  \cf6 \strokec6 TalentSubRole\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 avatarFile\cf5 \strokec5 ?:\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ,\cb1 \
\cb4     \cf7 \strokec7 logoFile\cf5 \strokec5 ?:\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ,\cb1 \
\cb4 ) \{\cb1 \
\cb4     \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userCredential\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 createUserWithEmailAndPassword\cf2 \strokec2 (auth, email, password);\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 user\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  userCredential.user;\cb1 \
\cb4         \cb1 \
\cb4         \cf5 \strokec5 let\cf2 \strokec2  avatarUrl \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 ""\cf2 \strokec2 ;\cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (avatarFile) \{\cb1 \
\cb4             avatarUrl \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 uploadImage\cf2 \strokec2 (avatarFile, \cf3 \strokec3 `avatars/$\{\cf2 \strokec2 user\cf3 \strokec3 .\cf2 \strokec2 uid\cf3 \strokec3 \}`\cf2 \strokec2 );\cb1 \
\cb4         \}\cb1 \
\
\cb4         \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 updateProfile\cf2 \strokec2 (user, \{ displayName: name, photoURL: avatarUrl \});\cb1 \
\
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userData\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 FullUserProfile\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4             id: user.uid,\cb1 \
\cb4             email,\cb1 \
\cb4             name,\cb1 \
\cb4             role,\cb1 \
\cb4             avatarUrl,\cb1 \
\cb4             profile: \{\}\cb1 \
\cb4         \};\cb1 \
\cb4         \cb1 \
\cb4         \cf5 \strokec5 if\cf2 \strokec2  (role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'founder'\cf2 \strokec2 ) \{\cb1 \
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupId\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (\cf6 \strokec6 collection\cf2 \strokec2 (db, \cf3 \strokec3 'startups'\cf2 \strokec2 )).id;\cb1 \
\cb4             \cf5 \strokec5 let\cf2 \strokec2  companyLogoUrl \cf5 \strokec5 =\cf2 \strokec2  \cf3 \strokec3 ""\cf2 \strokec2 ;\cb1 \
\cb4             \cf5 \strokec5 if\cf2 \strokec2  (logoFile) \{\cb1 \
\cb4                 companyLogoUrl \cf5 \strokec5 =\cf2 \strokec2  \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 uploadImage\cf2 \strokec2 (logoFile, \cf3 \strokec3 `logos/$\{\cf2 \strokec2 startupId\cf3 \strokec3 \}`\cf2 \strokec2 );\cb1 \
\cb4             \}\cb1 \
\
\cb4             userData.profile \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4                 companyId: startupId,\cb1 \
\cb4                 title: profileData.title,\cb1 \
\cb4                 isLead: \cf8 \strokec8 true\cf2 \strokec2 ,\cb1 \
\cb4                 isPremium: \cf8 \strokec8 false\cf2 \strokec2 ,\cb1 \
\cb4                 isSeekingCoFounder: profileData.isSeekingCoFounder,\cb1 \
\cb4             \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 FounderProfile\cf2 \strokec2 ;\cb1 \
\
\cb4             \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 startupData\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Startup\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4                 id: startupId,\cb1 \
\cb4                 companyName: profileData.companyName,\cb1 \
\cb4                 companyLogoUrl,\cb1 \
\cb4                 founderIds: [user.uid],\cb1 \
\cb4                 industry: profileData.industry,\cb1 \
\cb4                 stage: profileData.stage,\cb1 \
\cb4                 tagline: profileData.tagline,\cb1 \
\cb4                 website: profileData.website,\cb1 \
\cb4                 description: profileData.description,\cb1 \
\cb4                 financials: \{ revenue: \cf8 \strokec8 0\cf2 \strokec2 , expenses: \cf8 \strokec8 0\cf2 \strokec2 , netIncome: \cf8 \strokec8 0\cf2 \strokec2 , grossProfitMargin: \cf8 \strokec8 0\cf2 \strokec2 , ebitda: \cf8 \strokec8 0\cf2 \strokec2 , customerAcquisitionCost: \cf8 \strokec8 0\cf2 \strokec2 , customerLifetimeValue: \cf8 \strokec8 0\cf2 \strokec2 , monthlyRecurringRevenue: \cf8 \strokec8 0\cf2 \strokec2 , cashBurnRate: \cf8 \strokec8 0\cf2 \strokec2 , runway: \cf8 \strokec8 0\cf2 \strokec2 , companyName: profileData.companyName \},\cb1 \
\cb4                 monthlyFinancials: [],\cb1 \
\cb4                 capTable: [],\cb1 \
\cb4                 incorporationDetails: \{\cb1 \
\cb4                     isIncorporated: profileData.isIncorporated,\cb1 \
\cb4                     country: profileData.country,\cb1 \
\cb4                     incorporationType: profileData.incorporationType,\cb1 \
\cb4                     incorporationDate: profileData.incorporationDate,\cb1 \
\cb4                     entityNumber: profileData.entityNumber,\cb1 \
\cb4                     taxId: profileData.taxId,\cb1 \
\cb4                 \}\cb1 \
\cb4             \};\cb1 \
\cb4             \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 setDoc\cf2 \strokec2 (\cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "startups"\cf2 \strokec2 , startupId), startupData);\cb1 \
\
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'investor'\cf2 \strokec2 ) \{\cb1 \
\cb4             userData.profile \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4                 companyName: profileData.companyName,\cb1 \
\cb4                 companyUrl: profileData.companyUrl,\cb1 \
\cb4                 investorType: profileData.investorType,\cb1 \
\cb4                 about: profileData.about,\cb1 \
\cb4                 investmentInterests: profileData.investmentInterests.\cf6 \strokec6 split\cf2 \strokec2 (\cf3 \strokec3 ','\cf2 \strokec2 ).\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 s\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  s.\cf6 \strokec6 trim\cf2 \strokec2 ()),\cb1 \
\cb4                 investmentStages: profileData.investmentStages,\cb1 \
\cb4                 portfolio: [],\cb1 \
\cb4                 exits: profileData.exits,\cb1 \
\cb4             \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 InvestorProfile\cf2 \strokec2 ;\cb1 \
\cb4         \} \cf5 \strokec5 else\cf2 \strokec2  \cf5 \strokec5 if\cf2 \strokec2  (role \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'talent'\cf2 \strokec2 ) \{\cb1 \
\cb4             userData.profile \cf5 \strokec5 =\cf2 \strokec2  \{\cb1 \
\cb4                 subRole,\cb1 \
\cb4                 headline: profileData.headline,\cb1 \
\cb4                 skills: profileData.skills.\cf6 \strokec6 split\cf2 \strokec2 (\cf3 \strokec3 ','\cf2 \strokec2 ).\cf6 \strokec6 map\cf2 \strokec2 ((\cf7 \strokec7 s\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 ) \cf5 \strokec5 =>\cf2 \strokec2  s.\cf6 \strokec6 trim\cf2 \strokec2 ()),\cb1 \
\cb4                 experience: profileData.experience,\cb1 \
\cb4                 linkedin: profileData.linkedin,\cb1 \
\cb4                 github: profileData.github,\cb1 \
\cb4                 about: profileData.about,\cb1 \
\cb4                 organization: profileData.organization,\cb1 \
\cb4                 education: profileData.education,\cb1 \
\cb4                 isSeekingCoFounder: subRole \cf5 \strokec5 ===\cf2 \strokec2  \cf3 \strokec3 'co-founder'\cf2 \strokec2 ,\cb1 \
\cb4             \} \cf5 \strokec5 as\cf2 \strokec2  \cf6 \strokec6 TalentProfile\cf2 \strokec2 ;\cb1 \
\cb4         \}\cb1 \
\cb4         \cb1 \
\cb4         \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 setDoc\cf2 \strokec2 (\cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 , user.uid), userData);\cb1 \
\
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 true\cf2 \strokec2 , userId: user.uid \};\cb1 \
\cb4     \} \cf5 \strokec5 catch\cf2 \strokec2  (\cf7 \strokec7 error\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 any\cf2 \strokec2 ) \{\cb1 \
\cb4         console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error creating user:"\cf2 \strokec2 , error);\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 false\cf2 \strokec2 , error: error.message \};\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb4 \strokec5 export\cf2 \strokec2  \cf5 \strokec5 async\cf2 \strokec2  \cf5 \strokec5 function\cf2 \strokec2  \cf6 \strokec6 updateUserProfile\cf2 \strokec2 (\cf7 \strokec7 userId\cf5 \strokec5 :\cf2 \strokec2  \cf8 \strokec8 string\cf2 \strokec2 , \cf7 \strokec7 data\cf5 \strokec5 :\cf2 \strokec2  \cf6 \strokec6 Partial\cf2 \strokec2 <\cf6 \strokec6 Profile\cf2 \strokec2 >) \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb4     \cf5 \strokec5 try\cf2 \strokec2  \{\cb1 \
\cb4         \cf5 \strokec5 const\cf2 \strokec2  \cf8 \strokec8 userRef\cf2 \strokec2  \cf5 \strokec5 =\cf2 \strokec2  \cf6 \strokec6 doc\cf2 \strokec2 (db, \cf3 \strokec3 "users"\cf2 \strokec2 , userId);\cb1 \
\cb4         \cf5 \strokec5 await\cf2 \strokec2  \cf6 \strokec6 updateDoc\cf2 \strokec2 (userRef, \{ profile: data \});\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 true\cf2 \strokec2  \};\cb1 \
\cb4     \} \cf5 \strokec5 catch\cf2 \strokec2  (error) \{\cb1 \
\cb4         console.\cf6 \strokec6 error\cf2 \strokec2 (\cf3 \strokec3 "Error updating user profile:"\cf2 \strokec2 , error);\cb1 \
\cb4         \cf5 \strokec5 return\cf2 \strokec2  \{ success: \cf8 \strokec8 false\cf2 \strokec2 , error: \cf3 \strokec3 "Failed to update profile."\cf2 \strokec2  \};\cb1 \
\cb4     \}\cb1 \
\cb4 \}\cb1 \
\
}