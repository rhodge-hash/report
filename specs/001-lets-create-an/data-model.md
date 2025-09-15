# Data Model for Web Application for Daily Task Management and GitHub Activity Tracking

## Entities

### User
- **Description**: Represents the individual using the application.
- **Attributes**:
    - `id`: Unique identifier (UUID)
    - `username`: User's chosen username (string)
    - `email`: User's email address (string, unique)
    - `githubAuthToken`: Encrypted GitHub authentication token (string, optional, [NEEDS CLARIFICATION: OAuth token or PAT?])
    - `workSchedule`: Reference to WorkSchedule entity (object)
    - `configuredRepositories`: List of GitHubRepository entities (array of objects)

### Task
- **Description**: A single item of work for the user.
- **Attributes**:
    - `id`: Unique identifier (UUID)
    - `userId`: ID of the user who owns the task (UUID)
    - `description`: Details of the task (string)
    - `status`: Current status (enum: `pending`, `complete`)
    - `dueDate`: Optional due date for the task (date, optional)
    - `createdAt`: Timestamp of task creation (datetime)
    - `completedAt`: Timestamp of task completion (datetime, optional)

### GitHubRepository
- **Description**: A reference to a GitHub repository configured by the user.
- **Attributes**:
    - `id`: Unique identifier (UUID)
    - `userId`: ID of the user who configured the repository (UUID)
    - `owner`: GitHub username or organization name (string)
    - `repoName`: Name of the GitHub repository (string)

### GitHubActivity
- **Description**: An event from GitHub related to a configured repository.
- **Attributes**:
    - `id`: Unique identifier (UUID)
    - `repositoryId`: ID of the associated GitHubRepository (UUID)
    - `type`: Type of GitHub event (enum: `push`, `pull_request`, `issue`, `issue_comment`, `code_review`, [NEEDS CLARIFICATION: specific types to track])
    - `timestamp`: When the activity occurred (datetime)
    - `details`: JSON object containing event-specific details (object)

### WorkSchedule
- **Description**: User-defined work schedule for filtering GitHub activity.
- **Attributes**:
    - `id`: Unique identifier (UUID)
    - `userId`: ID of the user who owns the schedule (UUID)
    - `startTime`: Start time of the workday (time, e.g., '09:00')
    - `endTime`: End time of the workday (time, e.g., '17:00')
    - `workingDays`: List of working days (array of enum: `MONDAY`, `TUESDAY`, etc.)
