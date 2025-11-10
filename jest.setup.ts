// In a real-world application, you'd want to mock out the Firebase services
// to ensure your tests are fast and isolated. For this example, we'll just
// use a basic setup.

import '@testing-library/jest-dom'

// Mock the Firebase hooks and services used in the components
jest.mock('@/firebase', () => ({
  ...jest.requireActual('@/firebase'), // Import and retain default behavior
  useUser: () => ({ user: null, isUserLoading: false }),
  useAdmin: () => ({ isAdmin: false, isAdminLoading: false }),
  useCollection: () => ({ data: [], isLoading: false }),
  useDoc: () => ({ data: null, isLoading: false }),
  useFirestore: () => null,
  useAuth: () => null,
  useMemoFirebase: (cb: () => any) => cb(),
}));
