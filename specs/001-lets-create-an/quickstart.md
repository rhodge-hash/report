# Quickstart Guide for Web Application for Daily Task Management and GitHub Activity Tracking

This quickstart guide outlines the primary user journey and acceptance scenarios for the application.

## Primary User Story

A user wants to manage their daily tasks and track GitHub activity for two specific repositories during their 9 AM - 5 PM work schedule, Monday to Friday.

## Acceptance Scenarios

### Scenario 1: Viewing Daily Tasks and Filtered GitHub Activity

**Given**:
- The user has successfully logged into the application.
- The user has configured two GitHub repositories to track.
- The user has set their work schedule to 9 AM - 5 PM, Monday to Friday.
- There is recent GitHub activity for the configured repositories within the user's work hours.

**When**:
- The user navigates to the main dashboard.

**Then**:
- The user should see a list of their daily tasks.
- The user should see relevant GitHub activity for the configured repositories, filtered to show only events that occurred between 9 AM and 5 PM on working days.

### Scenario 2: Marking a Task as Complete

**Given**:
- The user is logged into the application.
- The user has an active task displayed on their dashboard.

**When**:
- The user interacts with the UI to mark the active task as complete.

**Then**:
- The task's status should be updated to 'complete'.
- The completed task should no longer appear in the active task list on the dashboard.

