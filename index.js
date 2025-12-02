{\rtf1\ansi\ansicpg950\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u24341 \u20837 \u25152 \u38656 \u30340 \u20989 \u24335 \u24235 \
const express = require('express');\
const cors = require('cors');\
const \{ GoogleGenAI \} = require('@google/genai');\
\
const app = express();\
// \uc0\u35731 \u20282 \u26381 \u22120 \u33021 \u35299 \u26512  JSON \u26684 \u24335 \u30340 \u35531 \u27714 \
app.use(express.json());\
// \uc0\u21855 \u29992  CORS\u65292 \u20801 \u35377 \u21069 \u31471 \u32178 \u38913 \u65288 \u20363 \u22914  GitHack \u19978 \u30340 \u38913 \u38754 \u65289 \u21628 \u21483 \u36889 \u20491 \u24460 \u31471 \
app.use(cors()); \
\
// \uc0\u38364 \u37749 \u27493 \u39519 \u65306 \u24478 \u29872 \u22659 \u35722 \u25976 \u20013 \u21462 \u24471  API Key\
// Vercel \uc0\u37096 \u32626 \u26178 \u65292 \u24744 \u26371 \u22312 \u35373 \u23450 \u20013 \u22635 \u23531 \u36889 \u20491 \u35722 \u25976  (GEMINI_API_KEY)\
const apiKey = process.env.GEMINI_API_KEY;\
\
// \uc0\u21021 \u22987 \u21270  Gemini \u23458 \u25143 \u31471 \
// \uc0\u22914 \u26524  apiKey \u19981 \u23384 \u22312 \u65292 \u23427 \u26371 \u25291 \u20986 \u37679 \u35492 \u65292 \u36889 \u26159 \u27491 \u30906 \u30340 \u20445 \u35703 \u27231 \u21046 \
const ai = new GoogleGenAI(apiKey);\
\
// \uc0\u24314 \u31435 \u19968 \u20491  API \u36335 \u30001 \u65306 \u30070 \u21069 \u31471 \u21628 \u21483 \u36889 \u20491 \u32178 \u22336 \u26178 \u65292 \u26371 \u22519 \u34892 \u19979 \u38754 \u30340 \u31243 \u24335 \u30908 \
app.post('/generate', async (req, res) => \{\
    // \uc0\u27298 \u26597 \u26159 \u21542 \u26377  API Key\u65292 \u36889 \u26159 \u31532 \u19968 \u36947 \u38450 \u32218 \
    if (!apiKey) \{\
        return res.status(500).json(\{ error: 'Server configuration error: API Key is missing.' \});\
    \}\
\
    // \uc0\u24478 \u21069 \u31471 \u35531 \u27714 \u20013 \u21462 \u24471 \u29992 \u25142 \u36664 \u20837 \u30340 \u25552 \u31034  (prompt)\
    const \{ prompt \} = req.body;\
\
    if (!prompt) \{\
        return res.status(400).json(\{ error: 'Missing prompt in request body.' \});\
    \}\
\
    try \{\
        // \uc0\u21628 \u21483  Gemini API (\u36889 \u35041 \u20351 \u29992  gemini-2.5-flash \u27169 \u22411 )\
        const response = await ai.models.generateContent(\{\
            model: "gemini-2.5-flash",\
            contents: prompt\
        \});\
\
        // \uc0\u23559  Gemini \u22238 \u20659 \u30340 \u32080 \u26524 \u20659 \u22238 \u32102 \u21069 \u31471 \
        res.json(\{ text: response.text \});\
    \} catch (error) \{\
        console.error('Gemini API Error:', error);\
        res.status(500).json(\{ error: 'Failed to generate content from AI.', details: error.message \});\
    \}\
\});\
\
// Vercel Function \uc0\u30340 \u27161 \u28310 \u36664 \u20986 \
// \uc0\u35731  Vercel \u30693 \u36947 \u36889 \u26159 \u35201 \u23566 \u20986 \u30340 \u20989 \u24335 \
module.exports = app;}