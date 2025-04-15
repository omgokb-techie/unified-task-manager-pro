# Unified Task Manager Pro

A modern, feature-rich task management system designed for property management teams. This application helps teams efficiently manage tasks across multiple buildings and properties, with real-time updates and smart notifications.

## 🚀 Features

### Task Management
- **Create & Manage Tasks**
  - Create tasks with detailed information (title, assigned user, status, due date, building)
  - Update task status in real-time (To Do, In Progress, Complete)
  - Filter tasks by building, user, or status
  - Responsive grid layout with task cards

### Smart Notifications
- **Real-time Updates**
  - Instant notifications for task status changes
  - Upcoming task reminders (24 hours before due date)
  - Overdue task alerts
  - Desktop notifications with detailed task information

### User Experience
- **Modern UI/UX**
  - Clean, intuitive interface built with Shadcn UI
  - Responsive design for all devices
  - Color-coded status indicators
  - Form validation and error handling
  - Loading states and feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **React Hook Form** for efficient form handling
- **Tailwind CSS** for utility-first styling
- **Shadcn UI** for beautiful, accessible components
- **Date-fns** for reliable date manipulation
- **Socket.io** for real-time updates

### Data Management
- **RESTful API** integration
- **WebSocket** for real-time communication
- **TypeScript** interfaces for type safety
- **Error handling** and loading states

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── TaskCard.tsx
│   ├── CreateTaskForm.tsx
│   └── ...
├── services/      # API and data services
│   ├── taskService.ts
│   └── ...
├── types/         # TypeScript type definitions
│   └── task.ts
├── pages/         # Application pages
│   └── Index.tsx
└── lib/          # Utility functions and configurations
```

## 🔌 API Integration

The application integrates with a RESTful API for task management:

### Task Endpoints
- `GET /tasks` - List all tasks
- `GET /tasks?buildingId={id}` - Filter tasks by building
- `GET /tasks?userId={id}` - Filter tasks by user
- `POST /tasks` - Create new task
- `PATCH /tasks/{id}/status` - Update task status
- `GET /tasks/reminders` - Get tasks needing reminders

### WebSocket Events
- `task:upcoming` - Notifications for tasks due soon
- `task:overdue` - Alerts for overdue tasks
- `task:updated` - Real-time status updates

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/omgokb-techie/unified-task-manager-pro.git
   cd unified-task-manager-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔮 Future Enhancements

- [ ] User authentication and role-based access
- [ ] File attachments for tasks
- [ ] Task comments and activity history
- [ ] Task categories and priority levels
- [ ] Task dependencies and subtasks
- [ ] Calendar view for due dates
- [ ] Mobile app with push notifications
- [ ] Email integration for task creation
- [ ] API integration for third-party tools