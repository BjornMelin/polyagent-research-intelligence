# ⚡ PolyAgent Research Intelligence - Frontend

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

This is the frontend for the **PolyAgent Research Intelligence** platform, built with Next.js, Tailwind CSS, and Shadcn-UI. It provides a user-friendly interface for interacting with the multi-agent research system.

## 📑 Table of Contents

- [Frontend](#-polyagent-research-intelligence---frontend)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌟 Overview](#-overview)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Setting up GitHub Integration for Feedback](#setting-up-github-integration-for-feedback)
  - [✨ Features](#-features)
  - [📂 Project Structure](#-project-structure)
  - [🛠 Tech Stack](#-tech-stack)
  - [🤝 Contributing](#-contributing)
  - [👨‍💻 Author](#-author)
  - [📄 License](#-license)

## 🌟 Overview

The PolyAgent Research Intelligence frontend is a modern web application that allows users to:

- Submit research topics for analysis by the multi-agent system.
- Monitor the progress of the research workflow in real-time.
- View and download generated research reports.
- Provide feedback on the platform through GitHub Discussions.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- A [GitHub account](https://github.com/join)

### Installation

1. **Clone the repository (assuming you are in the project root):**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`.

### Setting up GitHub Integration for Feedback

The feedback feature utilizes GitHub Discussions to allow users to submit their feedback directly to the project repository. To enable this functionality, you need to create a GitHub Personal Access Token (PAT) with the appropriate permissions.

**Creating a GitHub PAT:**

1. **Go to your GitHub Settings:**
   - Click on your profile picture in the top-right corner.
   - Select **Settings**.
2. **Navigate to Developer settings:**
   - In the left sidebar, scroll down and click on **Developer settings**.
3. **Go to Personal access tokens:**
   - Click on **Personal access tokens**.
4. **Select Tokens (classic):**
   - Click on the **Tokens (classic)** tab.
5. **Generate new token:**
   - Click on **Generate new token**, then select **Generate new token (classic).**
6. **Configure the token:**

   - **Note:** Give your token a descriptive name (e.g., "PolyAgent Frontend Feedback").
   - **Expiration:** Choose an appropriate expiration period (e.g., 30 days, 90 days, or No expiration - consider security implications).
   - **Select scopes:**

     - **repo:** Select the entire `repo` scope.
     - **write:discussion:** Specifically, check this permission.
     - **read:org:** Check this permission.
     - **read:user:** Check this permission.

       > **Important:** Granting the `repo` scope gives broad access to your repositories. Ensure you understand the risks and only use this token for its intended purpose.

7. **Generate token:**
   - Scroll down and click the **Generate token** button.
8. **Copy your token:**
   - **Important:** Copy the generated token immediately. You will **not** be able to see it again.
9. **Store your token securely:**

   - Create a `.env.local` file in the `frontend` directory of your project.
   - Add the following line to the `.env.local` file, replacing `your_github_personal_access_token` with the token you copied:

     ```plaintext
     GITHUB_TOKEN=your_github_personal_access_token
     ```

**Note:** The `.env.local` file is already included in the project's `.gitignore` file, so it will not be committed to your repository.

**Permissions Breakdown:**

Your GitHub PAT needs the following permissions for the feedback functionality to work correctly:

- **`repo`:** Grants full access to the repository. While this is a broad scope, it is needed to create discussions via the API if your repository is private.
- **`write:discussion`:** Specifically allows creating and updating discussions.
- **`read:org`:** Allows reading organization membership, which might be needed to resolve discussion categories correctly.
- **`read:user`:** Allows reading basic user profile information, potentially used for displaying user details in feedback.

**Security Warning:**

- **Never** commit your `.env.local` file or expose your GitHub PAT in client-side code.
- Be cautious about the permissions you grant to your PAT and regularly review/revoke unused tokens.

## ✨ Features

- **📝 Research Topic Submission:** A user-friendly form to submit research topics with descriptions and keywords.
- **🔄 Real-time Progress Updates:** (Future) Displays the status of each agent in the research workflow.
- **📊 Report Visualization:** (Future) Presents key findings and insights from the generated reports.
- **📥 Report Download:** (Future) Enables users to download completed research reports in PDF or DOCX formats.
- **🌙 Dark/Light Mode:** Supports both dark and light themes for user preference.
- **📱 Responsive Design:** Adapts to different screen sizes for optimal viewing on various devices.
- **💬 Feedback Submission:** Integrated feedback form to create GitHub discussions.

## 📂 Project Structure

```markdown
frontend/
├── app/ # Next.js pages and API routes
│ ├── about/
│ │ └── page.tsx # About page
│ ├── api/
│ │ └── feedback/  
│ │ └── route.ts # API route for handling feedback submission
│ ├── error.tsx # Error page
│ ├── feedback/
│ │ └── page.tsx # Feedback page
│ ├── globals.css # Global styles
│ ├── layout.tsx # Main layout component
│ └── page.tsx # Home page
├── components/ # Reusable UI components
│ ├── forms/ # Form components
│ │ ├── feedback-form.tsx
│ │ └── research-topic-form.tsx
│ ├── layout/ # Layout components (header, footer, etc.)
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ └── success-message.tsx
│ ├── pages/ # Page-specific content components
│ │ ├── about-page.tsx
│ │ ├── feedback-page.tsx
│ │ └── home-page.tsx
│ ├── sections/ # Reusable sections (hero, features, etc.)
│ │ ├── cta-section.tsx
│ │ ├── feature-card.tsx
│ │ └── hero-section.tsx
│ ├── theme-provider.tsx # Theme provider component
│ └── ui/ # ShadCN-UI components
│ ├── badge.tsx
│ ├── button.tsx
│ ├── card.tsx
│ ├── chart.tsx
│ ├── dialog.tsx
│ ├── dropdown-menu.tsx
│ ├── form.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── select.tsx
│ ├── separator.tsx
│ ├── sonner.tsx
│ ├── tag-input.tsx
│ ├── textarea.tsx
│ └── toast.tsx
├── hooks/ # Custom React hooks
│ └── use-toast.ts # Hook for managing toasts
├── lib/ # Utility functions and shared code
│ ├── schemas.ts # Zod validation schemas
│ └── utils.ts # Utility functions (e.g., cn for Tailwind CSS)
├── public/ # Static assets
├── .eslintrc.json # ESLint configuration
├── components.json # ShadCN-UI configuration
├── next.config.js # Next.js configuration
├── package.json # Frontend dependencies and scripts
├── postcss.config.js # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
```

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn-ui](https://ui.shadcn.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **State Management:** React Context API or Zustand (optional)
- **Notifications:** [sonner](https://sonner.emilkowal.ski/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Package Manager:** pnpm

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/version/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feat/version/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

### Bjorn Melin

- [GitHub](https://github.com/BjornMelin)
- [LinkedIn](https://www.linkedin.com/in/bjorn-melin/)
- [Coursera](https://www.coursera.org/learner/bjorn-melin)
- [Medium](https://medium.com/@bjornmelin)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Bjorn Melin](https://bjornmelin.io)

</div>
