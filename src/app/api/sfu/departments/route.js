import { NextResponse } from 'next/server';
import sfuApi from '@/lib/sfuApi';

export async function GET() {
  try {
    const departments = await sfuApi.getDepartments();
    
    return NextResponse.json({
      school: 'SFU',
      departments
    });
  } catch (error) {
    console.error('SFU Departments API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}