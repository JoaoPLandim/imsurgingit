import { PrismaClient } from '@prisma/client';
import SFUApiService from './apis/sfuApi.js';

const prisma = new PrismaClient();
const sfuApi = new SFUApiService();

export class ScheduleService {
  async generateScheduleForProgram(department, year = 1) {
    try {
      // Get courses from SFU API
      const sfuCourses = await sfuApi.getCourses('2024', 'fall', department);
      
      // Filter courses by year level (first digit of course number)
      const yearLevelCourses = sfuCourses.filter(course => {
        const courseNumber = parseInt(course.number);
        const courseYear = Math.floor(courseNumber / 100);
        return courseYear === year;
      });

      // Generate fall and spring schedules
      const fallSchedule = this.generateSemesterSchedule(
        yearLevelCourses.slice(0, 5), 
        'Fall 2024'
      );
      const springSchedule = this.generateSemesterSchedule(
        yearLevelCourses.slice(5, 10), 
        'Spring 2025'
      );

      return {
        department,
        year,
        schedules: [fallSchedule, springSchedule],
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to generate schedule:', error);
      throw error;
    }
  }

  generateSemesterSchedule(courses, semester) {
    return {
      semester,
      courses: courses.map(course => ({
        courseCode: `${course.subject} ${course.number}`,
        courseName: course.title,
        credits: 3,
        timeSlots: this.generateTimeSlots(),
        instructor: course.instructor || 'TBD'
      })),
      totalCredits: courses.length * 3
    };
  }

  generateTimeSlots() {
    const times = ['9:30-10:20', '10:30-11:20', '11:30-12:20', '12:30-13:20', '13:30-14:20'];
    const days = ['MWF', 'TTh'];
    
    return {
      time: times[Math.floor(Math.random() * times.length)],
      days: days[Math.floor(Math.random() * days.length)]
    };
  }
}

export default new ScheduleService();