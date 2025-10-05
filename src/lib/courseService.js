import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourseService {
  async createCourse(courseData) {
    return await prisma.course.create({
      data: {
        courseCode: courseData.courseCode,
        courseName: courseData.courseName,
        department: courseData.department,
        credits: courseData.credits,
        description: courseData.description,
        program: courseData.program
      }
    });
  }

  async getCoursesByDepartment(department) {
    return await prisma.course.findMany({
      where: { department: department.toUpperCase() },
      include: {
        userCourses: true
      }
    });
  }

  async upsertCourseFromSFU(sfuCourseData) {
    return await prisma.course.upsert({
      where: { courseCode: sfuCourseData.courseCode },
      update: {
        courseName: sfuCourseData.courseName,
        description: sfuCourseData.description
      },
      create: {
        courseCode: sfuCourseData.courseCode,
        courseName: sfuCourseData.courseName,
        department: sfuCourseData.department,
        credits: sfuCourseData.credits,
        description: sfuCourseData.description,
        program: sfuCourseData.program
      }
    });
  }
}

export default new CourseService();