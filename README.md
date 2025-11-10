# W. Chloe Creative Hub

This is a web application for the W. Chloe Creative Hub, a creative talent agency. Built with Next.js, Firebase, and Tailwind CSS, it provides a platform to showcase talent, manage agency operations, and connect with clients.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

## Features

- **Talent Directory:** A public, searchable directory of creative talent.
- **Detailed Talent Profiles:** Each talent has a dedicated page with their biography, portfolio, and contact information.
- **Blog:** An integrated blog for agency news, updates, and articles.
- **Admin Dashboard:** A secure, role-based dashboard for administrators to manage talent, blog posts, and messages.
- **Firebase Integration:**
  - **Authentication:** Secure user sign-up and login using Firebase Authentication (Email/Password and Google Provider).
  - **Firestore:** Real-time database for storing and managing all application data, including talent profiles, blog posts, and messages.
- **AI-Powered Talent Matching:** A tool for brand managers to find talent based on aesthetic preferences and budget, powered by Google's Gemini model via Genkit.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit)
- **Deployment:** Firebase App Hosting

## Getting Started

This project is set up to run in a cloud development environment.

1.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js application.

2.  **Explore the application:**
    - The main application is available at the provided preview URL.
    - The admin dashboard is located at `/admin/dashboard`. You can log in using one of the admin emails defined in `firestore.rules`.
