import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })

    const prompt = `You are an assistant for a community issue-reporting app. A user submitted this report:

Title: ${title}
Description: ${description}

Do two things:
1. Categorize this issue into EXACTLY one of these categories: Streetlight, Water, Garbage, Road, Electricity, Other.
2. Rewrite the user's rough description into a clear, professional, formal complaint suitable for submission to a local authority. Keep it concise (2-4 sentences), factual, and polite.

Respond ONLY in this exact JSON format, with no extra text, no markdown code blocks:
{"category": "...", "complaint": "..."}`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    const cleanedText = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleanedText)

    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('AI analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'AI analysis failed' },
      { status: 500 }
    )
  }
}