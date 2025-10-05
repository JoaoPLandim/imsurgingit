import { NextResponse } from 'next/server';
import SFUApiService from '../../../../lib/apis/sfuApi.js';

const sfuApi = new SFUApiService();

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