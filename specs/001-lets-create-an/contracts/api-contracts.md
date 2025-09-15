# API Contracts for Web Application for Daily Task Management and GitHub Activity Tracking

## Endpoints

### Task Management

#### `POST /api/tasks` - Create Task
- **Description**: Allows a user to create a new daily task.
- **Request Body**:
    ```json
    {
      "description": "string"
    }
    ```
- **Response**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "status": "pending",
      "createdAt": "datetime"
    }
    ```

#### `PUT /api/tasks/{taskId}/complete` - Mark Task Complete
- **Description**: Allows a user to mark an existing task as complete.
- **Path Parameters**:
    - `taskId`: UUID of the task to complete.
- **Response**:
    ```json
    {
      "id": "uuid",
      "description": "string",
      "status": "complete",
      "createdAt": "datetime",
      "completedAt": "datetime"
    }
    ```

### GitHub Integration

#### `POST /api/github/repositories` - Configure GitHub Repositories
- **Description**: Allows a user to add or update GitHub repositories to track.
- **Request Body**:
    ```json
    {
      "owner": "string",
      "repoName": "string"
    }
    ```
- **Response**:
    ```json
    {
      "id": "uuid",
      "owner": "string",
      "repoName": "string"
    }
    ```

#### `GET /api/github/activity` - Fetch GitHub Activity
- **Description**: Retrieves filtered GitHub activity for configured repositories within the user's work schedule.
- **Query Parameters**:
    - `startDate`: Optional, filter activities from this date (YYYY-MM-DD)
    - `endDate`: Optional, filter activities up to this date (YYYY-MM-DD)
- **Response**:
    ```json
    [
      {
        "id": "uuid",
        "repositoryId": "uuid",
        "type": "string",
        "timestamp": "datetime",
        "details": {}
      }
    ]
    ```

#### `POST /api/github/auth/oauth` - GitHub OAuth Authentication [NEEDS CLARIFICATION]
- **Description**: Initiates or completes the OAuth flow for GitHub authentication.
- **Request/Response**: [NEEDS CLARIFICATION: Details depend on OAuth implementation]

### Dashboard & User Configuration

#### `GET /api/dashboard` - Get Dashboard Data
- **Description**: Provides a consolidated view of daily tasks and filtered GitHub activity.
- **Response**:
    ```json
    {
      "tasks": [],
      "githubActivity": []
    }
    ```

#### `PUT /api/users/me/work-schedule` - Update Work Schedule
- **Description**: Allows a user to configure their work schedule.
- **Request Body**:
    ```json
    {
      "startTime": "HH:MM",
      "endTime": "HH:MM",
      "workingDays": ["MONDAY", "TUESDAY"]
    }
    ```
- **Response**:
    ```json
    {
      "id": "uuid",
      "startTime": "HH:MM",
      "endTime": "HH:MM",
      "workingDays": ["MONDAY", "TUESDAY"]
    }
    ```

## Contract Testing
- **Requirement**: For each defined API endpoint, contract tests must be created to ensure that requests and responses adhere to the specified schemas. These tests should fail if the API implementation deviates from the contract.
- **Tools**: [NEEDS CLARIFICATION: Specific contract testing framework/tool to be used, e.g., Pact, OpenAPI testing tools]
