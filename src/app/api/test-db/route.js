import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const courseCount = await prisma.course.count();
    
    return NextResponse.json({
      status: 'Database connected successfully!',
      tables: {
        users: userCount,
        courses: courseCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        status: 'Database connection failed',
        error: error.message 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}