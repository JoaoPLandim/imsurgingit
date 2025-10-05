import { NextResponse } from 'next/server';
import scheduleService from '../../../../lib/scheduleService.js';

export async function POST(request) {
  try {
    const { department, year } = await request.json();

    if (!department) {
      return NextResponse.json(
        { error: 'Department is required' },
        { status: 400 }
      );
    }

    const schedule = await scheduleService.generateScheduleForProgram(
      department, 
      year || 1
    );

    return NextResponse.json({
      success: true,
      schedule
    });
  } catch (error) {
    console.error('Schedule generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate schedule' },
      { status: 500 }
    );
  }
}