import { NextResponse } from 'next/server';
import sfuApi from '@/lib/sfuApi';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currentTerm = sfuApi.getCurrentTerm();
  const year = searchParams.get('year') || currentTerm.year;
  const term = searchParams.get('term') || currentTerm.term;
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