# Tasks for Web Application for Daily Task Management and GitHub Activity Tracking

**Feature Branch**: `001-lets-create-an`
**Feature Spec**: `/home/roy/Desktop/gh-report-gem/specs/001-lets-create-an/spec.md`
**Implementation Plan**: `/home/roy/Desktop/gh-report-gem/specs/001-lets-create-an/plan.md`

## Context
This document outlines the actionable, dependency-ordered tasks for implementing the "Web Application for Daily Task Management and GitHub Activity Tracking" feature. The application will be a full-stack Next.js (React/Node.js) application with TypeScript, styled using Bootstrap and Material Design principles. Unit and End-to-End tests will be written for all features, and the app will be verified to pass all tests before deployment. Changelog and documentation will be updated when tests are passing.

## Task List

### Setup Tasks

*   **T001** [P]: Initialize Next.js project with TypeScript, Bootstrap, and Material Design.
    *   **Description**: Set up the basic Next.js project structure, configure TypeScript, and integrate Bootstrap and Material Design for styling.
    *   **Files**: `package.json`, `tsconfig.json`, `next.config.js`, `styles/globals.css`
    *   **Agent Command**: `run_shell_command('npx create-next-app@latest --ts --tailwind --eslint .', description='Initialize Next.js project')` (Note: Tailwind is often used with Next.js, but Bootstrap/Material Design was specified. This command needs adjustment or manual setup.)
*   **T002**: Configure linting and formatting for TypeScript.
    *   **Description**: Set up ESLint and Prettier for consistent code style.
    *   **Files**: `.eslintrc.json`, `.prettierrc.json`
*   **T003**: Install and configure necessary dependencies (e.g., for API calls, state management).
    *   **Description**: Add libraries for data fetching (e.g., `axios`, `swr`), state management (e.g., `zustand`, `redux`), and any other core utilities.
    *   **Files**: `package.json`

### Research & Decision Tasks (from research.md)

*   **T004**: Research and decide on the storage solution for user tasks, GitHub repository configurations, and cached GitHub activity data.
    *   **Description**: Investigate PostgreSQL, MongoDB, SQLite, Firebase, AWS DynamoDB, etc., and make a decision based on project needs.
    *   **Output**: Update `plan.md` with the chosen storage solution.
*   **T005**: Research and decide on testing frameworks and strategies for unit, integration, and end-to-end testing.
    *   **Description**: Evaluate Jest, React Testing Library, Cypress, Playwright, Supertest, etc., and make a decision.
    *   **Output**: Update `plan.md` with the chosen testing frameworks.
*   **T006**: Research and decide on the GitHub authentication method (OAuth 2.0, Personal Access Tokens, GitHub Apps).
    *   **Description**: Determine the most secure and user-friendly method for the web application.
    *   **Output**: Update `plan.md` and `api-contracts.md` with the chosen authentication method details.
*   **T007**: Research and decide on specific GitHub activities to track (commits, pull requests, issues, etc.).
    *   **Description**: Prioritize activities that directly reflect developer productivity and collaboration.
    *   **Output**: Update `data-model.md` and `api-contracts.md` with the chosen activities.

### Model Creation Tasks (from data-model.md)

*   **T008** [P]: Create `User` model/schema.
    *   **Description**: Define the data structure for the `User` entity, including `id`, `username`, `email`, `githubAuthToken`, `workSchedule`, and `configuredRepositories`.
    *   **Files**: `backend/src/models/User.ts`
*   **T009** [P]: Create `Task` model/schema.
    *   **Description**: Define the data structure for the `Task` entity, including `id`, `userId`, `description`, `status`, `dueDate`, `createdAt`, and `completedAt`.
    *   **Files**: `backend/src/models/Task.ts`
*   **T010** [P]: Create `GitHubRepository` model/schema.
    *   **Description**: Define the data structure for the `GitHubRepository` entity, including `id`, `userId`, `owner`, and `repoName`.
    *   **Files**: `backend/src/models/GitHubRepository.ts`
*   **T011** [P]: Create `GitHubActivity` model/schema.
    *   **Description**: Define the data structure for the `GitHubActivity` entity, including `id`, `repositoryId`, `type`, `timestamp`, and `details`.
    *   **Files**: `backend/src/models/GitHubActivity.ts`
*   **T012** [P]: Create `WorkSchedule` model/schema.
    *   **Description**: Define the data structure for the `WorkSchedule` entity, including `id`, `userId`, `startTime`, `endTime`, and `workingDays`.
    *   **Files**: `backend/src/models/WorkSchedule.ts`

### Backend API Development Tasks (from api-contracts.md)

*   **T013**: Implement `POST /api/tasks` endpoint (Create Task).
    *   **Description**: Create the API endpoint to allow users to create new tasks.
    *   **Files**: `backend/src/api/tasks.ts`
*   **T014**: Implement `PUT /api/tasks/{taskId}/complete` endpoint (Mark Task Complete).
    *   **Description**: Create the API endpoint to allow users to mark tasks as complete.
    *   **Files**: `backend/src/api/tasks.ts`
*   **T015**: Implement `POST /api/github/repositories` endpoint (Configure GitHub Repositories).
    *   **Description**: Create the API endpoint to allow users to add or update GitHub repositories to track.
    *   **Files**: `backend/src/api/github.ts`
*   **T016**: Implement `GET /api/github/activity` endpoint (Fetch GitHub Activity).
    *   **Description**: Create the API endpoint to retrieve filtered GitHub activity for configured repositories within the user's work schedule.
    *   **Files**: `backend/src/api/github.ts`
*   **T017**: Implement `POST /api/github/auth/oauth` endpoint (GitHub OAuth Authentication).
    *   **Description**: Implement the GitHub OAuth authentication flow.
    *   **Files**: `backend/src/api/auth.ts`
*   **T018**: Implement `GET /api/dashboard` endpoint (Get Dashboard Data).
    *   **Description**: Create the API endpoint to provide a consolidated view of daily tasks and filtered GitHub activity.
    *   **Files**: `backend/src/api/dashboard.ts`
*   **T019**: Implement `PUT /api/users/me/work-schedule` endpoint (Update Work Schedule).
    *   **Description**: Create the API endpoint to allow users to configure their work schedule.
    *   **Files**: `backend/src/api/users.ts`

### Frontend Development Tasks

*   **T020**: Design and implement the main dashboard UI.
    *   **Description**: Create the React components for displaying daily tasks and GitHub activity.
    *   **Files**: `frontend/src/pages/dashboard.tsx`, `frontend/src/components/Dashboard.tsx`
*   **T021**: Implement task management UI (create, mark complete).
    *   **Description**: Create React components for adding new tasks and marking existing ones as complete.
    *   **Files**: `frontend/src/components/TaskForm.tsx`, `frontend/src/components/TaskList.tsx`
*   **T022**: Implement GitHub repository configuration UI.
    *   **Description**: Create React components for users to add and manage their GitHub repositories.
    *   **Files**: `frontend/src/pages/settings.tsx`, `frontend/src/components/GitHubRepoConfig.tsx`
*   **T023**: Implement work schedule configuration UI.
    *   **Description**: Create React components for users to set their work start time, end time, and working days.
    *   **Files**: `frontend/src/pages/settings.tsx`, `frontend/src/components/WorkScheduleConfig.tsx`
*   **T024**: Implement GitHub OAuth login flow on the frontend.
    *   **Description**: Integrate the GitHub OAuth process into the frontend application.
    *   **Files**: `frontend/src/pages/login.tsx`, `frontend/src/services/auth.ts`

### Testing Tasks (Unit & End-to-End)

*   **T025** [P]: Write unit tests for all backend models.
    *   **Description**: Ensure each model/schema behaves as expected.
    *   **Files**: `backend/tests/unit/models/*.test.ts`
*   **T026** [P]: Write unit tests for all backend API utility functions/services.
    *   **Description**: Test individual functions that support the API endpoints.
    *   **Files**: `backend/tests/unit/services/*.test.ts`
*   **T027** [P]: Write contract tests for all API endpoints.
    *   **Description**: Verify that API requests and responses adhere to the defined contracts in `api-contracts.md`.
    *   **Files**: `backend/tests/contract/*.test.ts`
*   **T028** [P]: Write integration tests for Scenario 1: Viewing Daily Tasks and Filtered GitHub Activity.
    *   **Description**: Test the end-to-end flow of logging in, configuring repos/schedule, and viewing the dashboard.
    *   **Files**: `tests/integration/dashboard.test.ts`
*   **T029** [P]: Write integration tests for Scenario 2: Marking a Task as Complete.
    *   **Description**: Test the end-to-end flow of creating a task and marking it as complete.
    *   **Files**: `tests/integration/task-management.test.ts`
*   **T030** [P]: Write unit tests for all frontend React components.
    *   **Description**: Test individual React components in isolation.
    *   **Files**: `frontend/tests/unit/components/*.test.tsx`
*   **T031** [P]: Write end-to-end tests for critical user flows.
    *   **Description**: Use a tool like Cypress or Playwright to simulate user interactions and verify the entire application flow.
    *   **Files**: `tests/e2e/*.test.ts`

### Integration & Polish Tasks

*   **T032**: Implement database connection and migrations.
    *   **Description**: Set up the chosen database and create initial migration scripts for the defined models.
    *   **Files**: `backend/src/config/database.ts`, `backend/src/migrations/*.ts`
*   **T033**: Implement GitHub API client and data fetching logic.
    *   **Description**: Create a service to interact with the GitHub API, handling authentication and data retrieval.
    *   **Files**: `backend/src/services/github.ts`
*   **T034**: Implement error handling and logging across the application.
    *   **Description**: Ensure robust error handling for API calls, database operations, and UI interactions, with appropriate logging.
    *   **Files**: `backend/src/utils/errorHandler.ts`, `frontend/src/utils/logger.ts`
*   **T035**: Implement user authentication and session management.
    *   **Description**: Secure user login, session handling, and authorization for API endpoints.
    *   **Files**: `backend/src/middleware/auth.ts`, `frontend/src/services/auth.ts`
*   **T036**: Update changelog and documentation.
    *   **Description**: Document the new feature, API endpoints, and any significant changes.
    *   **Files**: `CHANGELOG.md`, `README.md`, `docs/*.md`
*   **T037**: Verify app is passing all tests.
    *   **Description**: Run all unit, integration, and end-to-end tests to ensure full test coverage and functionality.
    *   **Agent Command**: `run_shell_command('npm test', description='Run all tests')`

## Parallel Execution Guidance

Tasks marked with `[P]` can be executed in parallel as they are largely independent. For example:

```bash
# Example of parallel execution for model creation
run_shell_command('create_model User', description='Create User model') &
run_shell_command('create_model Task', description='Create Task model') &
run_shell_command('create_model GitHubRepository', description='Create GitHubRepository model') &
run_shell_command('create_model GitHubActivity', description='Create GitHubActivity model') &
run_shell_command('create_model WorkSchedule', description='Create WorkSchedule model')
```

## Dependency Notes

*   Setup tasks must be completed before any other development.
*   Research and Decision tasks should ideally be completed before starting model or API development, as they inform key architectural choices.
*   Model creation tasks are prerequisites for backend API development.
*   Backend API development tasks are prerequisites for frontend development tasks that consume those APIs.
*   Testing tasks should be performed concurrently with development (TDD approach), with contract and integration tests preceding unit tests for implementation.
*   Integration and Polish tasks are generally performed towards the end of the development cycle.
