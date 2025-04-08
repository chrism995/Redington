# Probability Calculator

A web application that allows users to enter probabilities and perform basic probability calculations.

## Overview

This application was built as part of a technical test to demonstrate development knowledge, coding style, and thought process. It provides investment consultants with a tool to enter valid probabilities and carry out basic probability calculations.

## Features

- **Input Validation**: Ensures probabilities are valid (between 0 and 1)
- **Probability Calculations**:
  - **Combined With (AND)**: P(A)P(B) - the probability of both events occurring
  - **Either (OR)**: P(A) + P(B) - P(A)P(B) - the probability of either event occurring
- **Calculation History**: Logs previous calculations with timestamps
- **Clean, responsive UI**: Works across desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks/Zustand
- **Testing**: Jest/React Testing Library

## Project Structure

The application follows a standard Next.js App Router structure:

- `/app` - Main application pages and routes
- `/components` - Reusable UI components
- `/lib` - Utility functions including probability calculation logic
- `/public` - Static assets

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: npm i
3. Run the development server: npm run dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing

Run the test suite with:
npm test

## Architecture Decisions

Rather than maintaining a separate backend service, the calculation logic is implemented directly in the Next.js API routes. This approach:

- Simplifies deployment
- Reduces complexity for this specific use case
- Allows for future expansion to serverless functions if needed

### Component Design

The UI is built using a component-based architecture with shadcn/ui to ensure:

- Consistent styling and accessibility
- Reusable and maintainable components
- Easy extension for future features

### Logging Implementation

Calculation history is stored in-memory during the session with an option to export as a text file. This meets the requirement for logging without database integration.

## Future Enhancements

Potential future improvements include:

- Adding more complex probability calculations
- Implementing visualization of probability results
- Expanding the log export options (CSV, JSON)
- Adding support for conditional probability calculations
