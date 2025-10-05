import { NextResponse } from 'next/server';
import chatService from '../../../lib/chatService.js';

export async function POST(request) {
  try {
    const { message, userId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await chatService.processMessage(message, userId);

    return NextResponse.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}