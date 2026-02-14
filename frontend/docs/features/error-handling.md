# Global Error Handling & UX

## Overview
Standardizes how API and runtime errors are displayed across the application.

## Features
- ErrorBoundary for React runtime errors
- Toast system for global notifications
- API error mapping for:
  - 400 validation errors
  - 409 conflicts
  - 404 / 500 server errors

## Usage
- Use `useApiError()` in mutation onError handlers
- Global toast used for non-field errors

