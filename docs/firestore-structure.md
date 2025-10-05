# Firestore Collections Structure

## Collections Overview

### users/

```
users/{firebaseUid}/
├── email: string
├── name: string
├── firebaseUid: string
├── createdAt: string (ISO date)
└── updatedAt: string (ISO date)
```

### transcripts/

```
transcripts/{transcriptId}/
├── fileName: string
├── filePath: string
├── content: string (AI extracted content)
├── analysisData: string (JSON string of AI analysis)
├── uploadedAt: string (ISO date)
├── userId: string (references users/{firebaseUid})
└── courseId: string (optional, references courses/{courseId})
```

### courses/

```
courses/{courseId}/
├── courseCode: string (e.g., "CMPT 120")
├── courseName: string (e.g., "Introduction to Programming")
├── department: string (e.g., "School of Computing Science")
├── credits: number (e.g., 3)
└── description: string (optional)
```

### userCourses/

```
userCourses/{userCourseId}/
├── userId: string (references users/{firebaseUid})
├── courseId: string (references courses/{courseId})
├── semester: string (e.g., "Fall", "Spring", "Summer")
└── year: number (e.g., 2025)
```

## Example Documents

### User Document

```json
{
  "email": "john.doe@sfu.ca",
  "name": "John Doe",
  "firebaseUid": "abc123xyz789",
  "createdAt": "2025-10-05T14:30:00.000Z",
  "updatedAt": "2025-10-05T14:30:00.000Z"
}
```

### Transcript Document

```json
{
  "fileName": "transcript_2025.pdf",
  "filePath": "/uploads/abc123xyz789/transcript_2025.pdf",
  "content": "Student: John Doe\nProgram: Computer Science\n...",
  "analysisData": "{\"courses\":[{\"code\":\"CMPT120\",\"grade\":\"A\"}]}",
  "uploadedAt": "2025-10-05T15:00:00.000Z",
  "userId": "abc123xyz789",
  "courseId": "cmpt120-intro-programming"
}
```

### Course Document

```json
{
  "courseCode": "CMPT 120",
  "courseName": "Introduction to Programming",
  "department": "School of Computing Science",
  "credits": 3,
  "description": "An introduction to programming using Python..."
}
```

### UserCourse Document

```json
{
  "userId": "abc123xyz789",
  "courseId": "cmpt120-intro-programming",
  "semester": "Fall",
  "year": 2024
}
```

## Security Rules Applied

- Users can only read/write their own user document
- Users can only read/write transcripts they uploaded
- Users can only read/write their own course enrollments
- All users can read course information
- Only authenticated users can write course information
