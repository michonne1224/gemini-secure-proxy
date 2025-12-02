{\rtf1\ansi\ansicpg950\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const \{ GoogleGenAI \} = require('@google/genai');\
\
// \uc0\u36889 \u26159  Netlify Function \u30340 \u20837 \u21475 \u20989 \u24335 \
exports.handler = async (event, context) => \{\
    // \uc0\u27298 \u26597  HTTP \u26041 \u27861 \u65292 Netlify Functions \u19981 \u20351 \u29992  express\u65292 \u32780 \u26159 \u30452 \u25509 \u27298 \u26597  event.httpMethod\
    if (event.httpMethod !== 'POST') \{\
        return \{\
            statusCode: 405,\
            body: JSON.stringify(\{ error: "Method Not Allowed. Use POST." \})\
        \};\
    \}\
\
    // \uc0\u38364 \u37749 \u27493 \u39519 \u65306 \u24478 \u29872 \u22659 \u35722 \u25976 \u20013 \u21462 \u24471  API Key\
    const apiKey = process.env.GEMINI_API_KEY;\
\
    if (!apiKey) \{\
        return \{\
            statusCode: 500,\
            body: JSON.stringify(\{ error: 'Server configuration error: API Key is missing.' \})\
        \};\
    \}\
    \
    // \uc0\u21021 \u22987 \u21270  Gemini \u23458 \u25143 \u31471 \
    const ai = new GoogleGenAI(apiKey);\
    \
    try \{\
        // \uc0\u24478 \u35531 \u27714 \u20027 \u39636  (body) \u21462 \u24471 \u29992 \u25142 \u36664 \u20837 \
        const \{ prompt \} = JSON.parse(event.body);\
\
        if (!prompt) \{\
             return \{\
                statusCode: 400,\
                body: JSON.stringify(\{ error: 'Missing prompt in request body.' \})\
            \};\
        \}\
\
        // \uc0\u21628 \u21483  Gemini API\
        const response = await ai.models.generateContent(\{\
            model: "gemini-2.5-flash",\
            contents: prompt\
        \});\
\
        // \uc0\u20659 \u22238 \u25104 \u21151 \u30340 \u22238 \u25033 \
        return \{\
            statusCode: 200,\
            headers: \{ \
                "Access-Control-Allow-Origin": "*", // \uc0\u20801 \u35377 \u21069 \u31471 \u21628 \u21483 \
                "Content-Type": "application/json" \
            \},\
            body: JSON.stringify(\{ text: response.text \})\
        \};\
\
    \} catch (error) \{\
        console.error('Gemini API Error:', error);\
        return \{\
            statusCode: 500,\
            body: JSON.stringify(\{ error: 'Failed to generate content from AI.', details: error.message \})\
        \};\
    \}\
\};}