import scheduleService from './scheduleService.js';

export class ChatService {
  async processMessage(message, userId = null) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching for hackathon
    if (lowerMessage.includes('cmpt') || lowerMessage.includes('computer science') || lowerMessage.includes('computing')) {
      return await this.generateProgramResponse('CMPT', 'Computing Science');
    }
    
    if (lowerMessage.includes('math') || lowerMessage.includes('mathematics')) {
      return await this.generateProgramResponse('MATH', 'Mathematics');
    }
    
    if (lowerMessage.includes('phys') || lowerMessage.includes('physics')) {
      return await this.generateProgramResponse('PHYS', 'Physics');
    }
    
    // Default response
    return {
      message: "I can help you with course schedules! Try asking about CMPT, MATH, or PHYS programs.",
      type: 'info'
    };
  }

  async generateProgramResponse(department, programName) {
    try {
      const schedule = await scheduleService.generateScheduleForProgram(department, 1);
      
      return {
        message: `Here's a suggested schedule for ${programName} (Year 1):`,
        type: 'schedule',
        data: schedule
      };
    } catch (error) {
      return {
        message: `Sorry, I couldn't generate a schedule for ${programName} right now.`,
        type: 'error'
      };
    }
  }
}

export default new ChatService();