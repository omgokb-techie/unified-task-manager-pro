
# Task Management Module

This is a simplified task management module for property management, allowing users to create tasks, assign them to users, and track their status across different buildings.

## Features

- **Task Management**:
  - Create tasks with title, assigned user, status, due date, and building/property
  - Update task status (To Do, In Progress, Complete)
  - Filter tasks by building ID or assigned user
  - View all tasks in a responsive grid layout

- **Auto-Reminder Logic**:
  - Tasks that are overdue or due within 24 hours are highlighted
  - Dedicated reminders section in the sidebar

- **UI Features**:
  - Responsive design that works on mobile, tablet, and desktop
  - Status indicators with color coding
  - Form validation for task creation
  - Loading states and error handling

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - React Hook Form for form handling
  - Tailwind CSS for styling
  - Shadcn UI for component library
  - Date-fns for date manipulation

- **Data Management**:
  - Mock API service with simulated network delays
  - In-memory data store (would connect to PostgreSQL/MySQL in production)

## Project Structure

- `/src/components`: UI components for the application
- `/src/services`: API and data services
- `/src/types`: TypeScript type definitions
- `/src/pages`: Main application pages

## API Endpoints (Mock Implementation)

The application includes mock implementations of the following API endpoints:

- `GET /tasks`: List all tasks
- `GET /tasks?buildingId={id}`: List tasks by building ID
- `GET /tasks?userId={id}`: List tasks by assigned user
- `POST /tasks`: Create a new task
- `PATCH /tasks/{id}/status`: Update a task status
- `GET /tasks/reminders`: Get tasks needing reminders

## How Email Integration Could Work

The task system could be linked to an incoming email parser or API integration as follows:

1. **Email Parser Integration**:
   - Set up a dedicated email address (e.g., tasks@property.com)
   - Incoming emails would be parsed by a service like Mailgun or SendGrid
   - The parser would extract key information (subject = task title, body = details)
   - Structured data would be sent to the API to create new tasks
   - Reply-to threads could update existing tasks

2. **API Integration**:
   - Expose a secure API endpoint for external services
   - Third-party property management tools could create tasks via API
   - Maintenance request systems could automatically generate tasks
   - Smart building systems could trigger tasks based on sensor data

3. **Implementation**:
   - Add a webhook endpoint to receive parsed email data
   - Implement authentication for API consumers
   - Create a task mapping service to standardize incoming data
   - Add notification system to alert users of new email-generated tasks

## Future Enhancements

- User authentication and role-based permissions
- File attachments for tasks (photos of issues, documents)
- Task comments and activity history
- Task categories and priority levels
- Task dependencies and subtasks
- Calendar view for due dates
- Mobile app with push notifications

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser to the local server address shown in the terminal (typically http://localhost:8080)
