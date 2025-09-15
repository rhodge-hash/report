# Tasks: 001-lets-create-an

**Input**: Design documents from `/specs/001-lets-create-an/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src//
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Initialize Next.js project in `frontend/` with TypeScript, Bootstrap, and Material Design principles. (Already partially done, but need to ensure all are configured).
- [ ] T002 Configure ESLint and Prettier for `frontend/` and `backend/` (if applicable) for consistent code style.
- [ ] T003 Set up basic Vercel deployment configuration (`vercel.json` if needed, or ensure `next.config.js` is ready).
- [ ] T004 Create GitHub Actions workflow for CI/CD (lint, test, build, deploy to Vercel on `dev` branch push).

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test `POST /api/tasks` in `tests/contract/frontend/api/tasks.test.ts`.
- [ ] T006 [P] Contract test `PUT /api/tasks/{taskId}/complete` in `tests/contract/frontend/api/tasks.test.ts`.
- [ ] T007 [P] Contract test `POST /api/github/repositories` in `tests/contract/frontend/api/github.test.ts`.
- [ ] T008 [P] Contract test `GET /api/github/activity` in `tests/contract/frontend/api/github.test.ts`.
- [ ] T009 [P] Contract test `POST /api/github/auth/oauth` in `tests/contract/frontend/api/github.test.ts`. (Note: This endpoint needs clarification, so the test will be based on current understanding).
- [ ] T010 [P] Contract test `GET /api/dashboard` in `tests/contract/frontend/api/dashboard.test.ts`.
- [ ] T011 [P] Contract test `PUT /api/users/me/work-schedule` in `tests/contract/frontend/api/users.test.ts`.
- [ ] T012 [P] Integration test "Viewing Daily Tasks and Filtered GitHub Activity" in `tests/integration/frontend/dashboard.test.ts`.
- [ ] T013 [P] Integration test "Marking a Task as Complete" in `tests/integration/frontend/tasks.test.ts`.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T014 [P] Implement `User` model in `backend/src/models/User.ts`.
- [ ] T015 [P] Implement `Task` model in `backend/src/models/Task.ts`.
- [ ] T016 [P] Implement `GitHubRepository` model in `backend/src/models/GitHubRepository.ts`.
- [ ] T017 [P] Implement `GitHubActivity` model in `backend/src/models/GitHubActivity.ts`.
- [ ] T018 [P] Implement `WorkSchedule` model in `backend/src/models/WorkSchedule.ts`.
- [ ] T019 Implement `POST /api/tasks` endpoint in `frontend/src/app/api/tasks/route.ts`.
- [ ] T020 Implement `PUT /api/tasks/{taskId}/complete` endpoint in `frontend/src/app/api/tasks/[taskId]/complete/route.ts`.
- [ ] T021 Implement `POST /api/github/repositories` endpoint in `frontend/src/app/api/github/repositories/route.ts`.
- [ ] T022 Implement `GET /api/github/activity` endpoint in `frontend/src/app/api/github/activity/route.ts`.
- [ ] T023 Implement `POST /api/github/auth/oauth` endpoint in `frontend/src/app/api/github/auth/oauth/route.ts`.
- [ ] T024 Implement `GET /api/dashboard` endpoint in `frontend/src/app/api/dashboard/route.ts`.
- [ ] T025 Implement `PUT /api/users/me/work-schedule` endpoint in `frontend/src/app/api/users/me/work-schedule/route.ts`.
- [ ] T026 [P] Implement basic UI for task management in `frontend/src/components/TaskManagement.tsx`.
- [ ] T027 [P] Implement basic UI for GitHub activity display in `frontend/src/components/GitHubActivityDisplay.tsx`.
- [ ] T028 [P] Implement basic UI for repository configuration in `frontend/src/components/RepositoryConfiguration.tsx`.
- [ ] T029 [P] Implement basic UI for work schedule configuration in `frontend/src/components/WorkScheduleConfiguration.tsx`.
- [ ] T030 Integrate UI components into `frontend/app/page.tsx`.

## Phase 3.4: Integration
- [ ] T031 Implement secure handling of GitHub Personal Access Token (environment variables, encryption).
- [ ] T032 Integrate GitHub API calls for activity fetching.
- [ ] T033 Implement local storage for task management persistence.
- [ ] T034 Implement data filtering logic for GitHub activity based on work schedule.

## Phase 3.5: Polish
- [ ] T035 [P] Unit tests for models in `tests/unit/backend/models/`.
- [ ] T036 [P] Unit tests for UI components in `tests/unit/frontend/components/`.
- [ ] T037 Performance optimization for API endpoints and UI rendering.
- [ ] T038 Update `README.md` with setup, configuration, and deployment instructions.
- [ ] T039 Run `npm run lint` and fix all reported issues.
- [ ] T040 Ensure all CI/CD steps pass on GitHub Actions.

## Dependencies
- Tasks T005-T013 (Tests) must be completed and fail before T014-T030 (Core Implementation).
- Tasks T014-T018 (Models) block T019-T025 (API Endpoints) and T031-T034 (Integration).
- Tasks T026-T029 (UI Components) block T030 (UI Integration).
- Tasks T031-T034 (Integration) block T037 (Performance Optimization).
- All implementation tasks (T014-T034) must be completed before T035-T040 (Polish).

## Parallel Example
```bash
# Phase 3.2: Tests First (TDD)
# These tasks can be run in parallel as they create separate test files.
# Each test should be written to fail initially.

# In separate terminal sessions or as parallel steps in a CI/CD pipeline:
# Task: "Contract test POST /api/tasks in tests/contract/frontend/api/tasks.test.ts"
# Task: "Contract test PUT /api/tasks/{taskId}/complete in tests/contract/frontend/api/tasks.test.ts"
# Task: "Contract test POST /api/github/repositories in tests/contract/frontend/api/github.test.ts"
# Task: "Contract test GET /api/github/activity in tests/contract/frontend/api/github.test.ts"
# Task: "Contract test POST /api/github/auth/oauth in tests/contract/frontend/api/github.test.ts"
# Task: "Contract test GET /api/dashboard in tests/contract/frontend/api/dashboard.test.ts"
# Task: "Contract test PUT /api/users/me/work-schedule in tests/contract/frontend/api/users.test.ts"
# Task: "Integration test \"Viewing Daily Tasks and Filtered GitHub Activity\" in tests/integration/frontend/dashboard.test.ts"
# Task: "Integration test \"Marking a Task as Complete\" in tests/integration/frontend/tasks.test.ts"

# Example of running a single test:
# npm test -- tests/contract/frontend/api/tasks.test.ts

# Phase 3.3: Core Implementation - Models
# These tasks can be run in parallel as they create separate model files.

# In separate terminal sessions or as parallel steps:
# Task: "Implement `User` model in backend/src/models/User.ts"
# Task: "Implement `Task` model in backend/src/models/Task.ts"
# Task: "Implement `GitHubRepository` model in backend/src/models/GitHubRepository.ts"
# Task: "Implement `GitHubActivity` model in backend/src/models/GitHubActivity.ts"
# Task: "Implement `WorkSchedule` model in backend/src/models/WorkSchedule.ts"

# Phase 3.3: Core Implementation - UI Components
# These tasks can be run in parallel as they create separate UI component files.

# In separate terminal sessions or as parallel steps:
# Task: "Implement basic UI for task management in frontend/src/components/TaskManagement.tsx"
# Task: "Implement basic UI for GitHub activity display in frontend/src/components/GitHubActivityDisplay.tsx"
# Task: "Implement basic UI for repository configuration in frontend/src/components/RepositoryConfiguration.tsx"
# Task: "Implement basic UI for work schedule configuration in frontend/src/components/WorkScheduleConfiguration.tsx"

# Phase 3.5: Polish - Unit Tests
# These tasks can be run in parallel as they create separate unit test files.

# In separate terminal sessions or as parallel steps:
# Task: "Unit tests for models in tests/unit/backend/models/"
# Task: "Unit tests for UI components in tests/unit/frontend/components/"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
