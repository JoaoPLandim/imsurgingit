import { NextResponse } from 'next/server';
import SFUApiService from '../../../../lib/apis/sfuApi.js';

const sfuApi = new SFUApiService();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year') || '2024';
  const term = searchParams.get('term') || 'fall';
  const department = searchParams.get('department');

  if (!department) {
    return NextResponse.json(
      { error: 'Department parameter is required' },
      { status: 400 }
    );
  }

  try {
    const courses = await sfuApi.getCourses(year, term, department);
    
    return NextResponse.json({
      school: 'SFU',
      year,
      term,
      department,
      courses
    });
  } catch (error) {
    console.error('SFU Courses API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}