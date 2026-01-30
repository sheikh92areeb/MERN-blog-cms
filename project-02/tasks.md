# 🚀 Full-Stack Modern Blog Platform - Task Checklist

A detailed, step-by-step task list for building the project.

---

### Phase 1: Project Setup & Foundation

- [x] Initialize Next.js project with TypeScript and Tailwind CSS.
- [x] Install core dependencies: `motion`, `lucide-react`, `@reduxjs/toolkit`, `react-redux`, `next-auth@beta`, `axios`, `mongoose`, `cloudinary`, `zod`, `react-hook-form`, `bcrypt`, `slugify`.
- [x] Set up MongoDB Atlas database, get connection string.
- [x] Create a `.env.local` file and add environment variables (DB URI, Cloudinary credentials, NextAuth secret, etc.).
- [x] Establish a connection to MongoDB using Mongoose.
- [x] Create the basic folder structure as defined in the architecture plan (`app/(auth)`, `app/(dashboard)`, etc.).

---

### Phase 2: Authentication & User Management (RBAC)

- [x] Define and create the User schema in Mongoose.
- [x] Create the API route for user registration (`/api/auth/register`) with `bcrypt` password hashing and `zod` validation.
- [x] Configure NextAuth (`/api/auth/[...nextauth]/route.ts`).
- [x] Implement the Credentials Provider for email/password login.
- [x] Implement OAuth Providers (Google and/or GitHub).
- [x] Configure the JWT callback to include the user's role in the token.
- [x] Configure the Session callback to inject the role from the token into the `session.user` object.
- [x] Create the Login page UI (`app/(auth)/login/page.tsx`) with form handling (React Hook Form + Zod).
- [x] Create the Register page UI (`app/(auth)/register/page.tsx`) with form handling.
- [x] Implement the `middleware.ts` file to protect dashboard routes based on user roles.

---

### Phase 3: Blog Management (CRUD)

- [x] Define and create the Blog schema in Mongoose.
- [x] Set up the TipTap editor component.
- [x] Create the Blog Editor page (`/dashboard/author/editor/[slug]` for edits, `/dashboard/author/editor/new` for creation).
- [x] Implement editor features: text formatting, headings, code blocks.
- [x] Implement image upload functionality within the editor, sending files to Cloudinary.
- [x] Create API route `POST /api/blogs` to create new blogs (or save drafts).
- [x] Create API route `PUT /api/blogs/:id` to update blogs.
- [x] Create API route `DELETE /api/blogs/:id` to delete blogs.
- [x] Create API route `POST /api/blogs/:id/publish` to toggle the blog's status.
- [x] Create the "My Blogs" page (`/dashboard/author/blogs`) to list, edit, and delete blogs belonging to the logged-in author.

---

### Phase 4: Public Pages & Content Display

- [x] Create the Home page (`app/page.tsx`) to fetch and display a list of the latest `PUBLISHED` blogs.
- [x] Create the dynamic Blog Details page (`app/blog/[slug]/page.tsx`).
- [x] Implement `getStaticPaths` and `getStaticProps` (or new App Router equivalents) for blog pages for SEO.
- [x] Implement view count logic (incrementing views on blog load).
- [x] Design and build the UI for displaying blog content, including the cover image, title, and TipTap-generated HTML.

---

### Phase 5: Engagement Features (Comments, Likes, Bookmarks)

- [x] Define and create the Comment schema.
- [x] Define and create the Bookmark schema.
- [x] Create API route `POST /api/comments` to add a new comment to a blog.
- [x] Create API route `DELETE /api/comments/:id` to delete a comment (owner or admin only).
- [x] Implement the front-end UI for displaying comments in a nested/threaded view.
- [x] Implement the front-end form for adding new comments.
- [x] Add `likes` array to the Blog schema.
- [x] Create an API endpoint to handle liking/unliking a blog.
- [x] Create API route `POST /api/bookmark` to allow users to save/unsave a blog.

---

### Phase 6: Admin Dashboard

- [x] Create the main Admin Dashboard page (`/dashboard/admin`).
- [x] Build the User Management section to list all users.
- [x] Implement functionality for admins to change user roles or delete users.
- [x] Build a Blog Moderation section where admins can view and delete any blog post.
- [x] Build a Comment Moderation section where admins can view and delete any comment.
- [x] Ensure all API routes for admin actions are strictly protected by role-based checks.

---

### Phase 7: State Management & UI Polish

- [x] Set up the Redux Toolkit store and provider.
- [x] Create slices (`authSlice`, `blogSlice`, `uiSlice`, etc.).
- [x] Integrate `authSlice` to manage login/logout state and user info globally.
- [x] Use `uiSlice` for managing toast notifications and modals.
- [x] Implement skeleton loaders on pages that fetch data (Home, Blog Details).
- [x] Add Framer Motion for page transitions and subtle animations on interactive elements.

---

### Phase 8: Deployment & Finalization

- [x] Create a new project on Vercel and link the GitHub repository.
- [x] Add all environment variables from `.env.local` to the Vercel project settings.
- [x] Deploy the application.
- [x] Configure the production URL in NextAuth and other services.
- [x] Whitelist the production domain in MongoDB Atlas network access.
- [x] Implement dynamic `metadata` for SEO in Next.js layouts and pages.
- [x] Generate a `sitemap.xml` to be submitted to search engines.
- [ ] Perform final end-to-end testing on the live production environment.
