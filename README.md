# W. Chloe Creative Agency

This is a sophisticated web application for the W. Chloe Creative Agency, a premier creative talent agency specializing in African talent. Built with a modern tech stack including Next.js, Firebase, and Tailwind CSS, it provides a comprehensive platform to showcase talent, manage agency operations, and connect with clients. The project leverages Firebase for backend services and Genkit for AI-powered features.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

## Features

- **Public-Facing Site:**
  - **Homepage:** A stunning hero section, featured talent, and calls-to-action.
  - **Talent Directory:** A public, searchable, and filterable directory of all approved creative talent.
  - **Detailed Talent Profiles:** Each talent has a dedicated public page with their biography, portfolio, social media links, and contact information for bookings.
  - **Blog:** An integrated blog for agency news, industry insights, and feature articles.
  - **Contact Page:** A functional contact form that submits messages directly to the admin dashboard.

- **User & Talent Features:**
  - **Secure Authentication:** User sign-up and login using Firebase Authentication (Email/Password and Google Provider).
  - **Profile Management:** Talent can sign up, complete a detailed profile, and edit their information.

- **Admin Dashboard:**
  - **Secure & Role-Based:** A protected area accessible only to users with an admin role.
  - **Dashboard Overview:** At-a-glance statistics for total talents, pending applications, and unread messages.
  - **Talent Management:** A data table to view, approve, and manage all talent profiles.
  - **Blog Management:** A CMS-like interface to create, edit, and manage blog posts.
  - **Message Center:** View and manage all incoming messages from the contact form.

- **AI & SEO:**
  - **AI-Powered Talent Matching:** An innovative tool for brand managers to find the perfect talent based on aesthetic preferences and budget, powered by Google's Gemini model via Genkit.
  - **Advanced SEO:** Dynamically generated sitemap (`sitemap.xml`) and a `robots.txt` file to ensure optimal indexing by search engines.
  - **Rich Metadata:** Enhanced Open Graph and Twitter card metadata for beautiful social media sharing.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Backend & Database:** [Firebase](https://firebase.google.com/)
  - **Authentication:** For user sign-in and access control.
  - **Firestore:** Real-time NoSQL database for all application data.
  - **Security Rules:** Robust server-side rules to protect data.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first approach.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) for beautifully designed, accessible components.
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) to integrate Google's Gemini models.
- **Deployment:** Firebase App Hosting for seamless, scalable deployment.

## Getting Started

This project is configured to run in a cloud development environment.

1.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command starts the Next.js development server.

2.  **Explore the application:**
    - The main application is available at the provided preview URL.
    - To access the admin dashboard, log in with an account and navigate to `/profile`. Click the "Become Admin" button to grant your account administrative privileges. Then, navigate to `/admin/dashboard`.
