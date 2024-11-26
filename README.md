## Debt Tracker

A modern web application for tracking personal debts and loans.

### Features

- Add and manage debts with names, amounts, and descriptions
- Mark debts as paid/unpaid
- Search through debts
- Automatic calculation of total outstanding amount
- Persistent storage using localStorage
- Responsive design that works on all devices

### Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vitest for testing
- Testing Library for component testing

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run tests with UI:
   ```bash
   npm run test:ui
   ```

5. Generate coverage report:
   ```bash
   npm run coverage
   ```

### Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript types
└── __tests__/       # Test files
```

### Contributing

1. Write tests for new features
2. Ensure all tests pass before submitting changes
3. Follow the existing code style
4. Update documentation as needed