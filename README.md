# 🧠 PolyAgent Research Intelligence

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GitHub](https://img.shields.io/badge/GitHub-BjornMelin-181717?logo=github)](https://github.com/BjornMelin)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bjorn%20Melin-0077B5?logo=linkedin)](https://www.linkedin.com/in/bjorn-melin/)

## 📑 Table of Contents

- [🧠 PolyAgent Research Intelligence](#-polyagent-research-intelligence)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌟 Overview](#-overview)
  - [🚀 Getting Started](#-getting-started)
  - [✨ Features](#-features)
  - [🗂️ Project Structure](#️-project-structure)
    - [Mermaid Diagram](#mermaid-diagram)
    - [File Tree](#file-tree)
  - [🛠 Tech Stack](#-tech-stack)
  - [🤝 Contributing](#-contributing)
  - [👨‍💻 Author](#-author)
  - [📄 License](#-license)

## 🌟 Overview

The **PolyAgent Research Intelligence** is a cutting-edge platform designed to revolutionize research by leveraging the power of multiple AI agents. This system allows users to input research topics, and then utilizes a team of specialized agents, orchestrated by LangChain and OpenRouter, to perform in-depth research, analysis, and report generation. The system is built with a modern web development stack, featuring a Next.js frontend and a FastAPI backend.

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BjornMelin/polyagent-research-intelligence.git
   cd polyagent-research-intelligence
   ```

2. **Install dependencies:**

   - Make sure you have pnpm installed:

   ```bash
   npm install -g pnpm
   ```

   - Then, install project dependencies

   ```bash
   pnpm install
   ```

3. **Run both frontend and backend:**

   ```bash
   pnpm run frontend
   pnpm run backend
   ```

4. **Open your browser** and navigate to `http://localhost:3000` for the frontend. The backend will typically run on port 8000.

## ✨ Features

- **🤖 Multi-Agent System:** Utilizes multiple AI agents, each specialized in tasks like research, analysis, writing, and proofreading.
- **🧠 Advanced AI Models:** Integrates with powerful language models, including DeepSeek-v3, LLaMA3.3-70B-Instruct, GPT-4o, and PHI-4 via OpenRouter.
- **📝 Research Topic Submission:** User-friendly interface for submitting research topics and queries.
- **🔄 Real-time Progress Updates:** Displays real-time updates on the progress of the multi-agent workflow using WebSockets or polling.
- **📊 Data Visualization:** Provides a dashboard to visualize agent outputs and workflow stages.
- **📄 Report Generation:** Automatically generates structured research reports based on agent findings.
- **📥 Report Download:** Allows users to download reports in PDF or DOCX formats.
- **🗃️ Data Storage:** Stores data locally using PostgreSQL and FAISS, with scalability for future AWS deployment.
- **🔍 Monitoring:** Employs Prometheus and Grafana for system performance monitoring.

## 🗂️ Project Structure

### Mermaid Diagram

```mermaid
graph TD
    A[User] --> B(Next.js Frontend);
    B --> C{FastAPI Backend};
    C --> D[Research Agent];
    C --> E[Analysis Agent];
    C --> F[Writing Agent];
    C --> G[Proofreading Agent];
    D --> H[DeepSeek-v3];
    E --> I[Python Libraries];
    F --> J[LLaMA3.3];
    G --> K[PHI-4];
    H --> L[OpenRouter];
    J --> L;
    K --> L;
    C --> M[PostgreSQL];
    C --> N[FAISS];
    C --> O[LocalStack];
    M --> P[User Queries, Workflow States];
    N --> Q[Document Embeddings];
    O --> R[PDFs, DOCXs];
    S[Prometheus] --> C;
    T[Grafana] --> S;
```

### File Tree

```markdown
polyagent-research-intelligence/
├── .gitignore
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── package.json (Root)
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ ├── venv/
│ └── ...
└── frontend/
├── app/
│ ├── about/
│ │ └── page.tsx
│ ├── api/
│ │ └── feedback/
│ │ └── route.ts
│ ├── error.tsx
│ ├── feedback/
│ │ └── page.tsx
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── forms/
│ │ ├── feedback-form.tsx
│ │ └── research-topic-form.tsx
│ ├── layout/
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ └── success-message.tsx
│ ├── pages/
│ │ ├── about-page.tsx
│ │ ├── feedback-page.tsx
│ │ └── home-page.tsx
│ ├── sections/
│ │ ├── cta-section.tsx
│ │ ├── feature-card.tsx
│ │ └── hero-section.tsx
│ ├── theme-provider.tsx
│ └── ui/
│ ├── ... (ShadCN-UI components)
├── hooks/
│ └── use-toast.ts
├── lib/
│ ├── schemas.ts
│ └── utils.ts
├── public/
├── .eslintrc.json
├── components.json
├── next.config.js
├── package.json (Frontend)
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠 Tech Stack

- **Frontend:**
  - **Framework:** [Next.js](https://nextjs.org/)
  - **Language:** TypeScript
  - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - **UI Components:** [shadcn-ui](https://ui.shadcn.com/)
  - **State Management:** React Context API or Zustand
- **Backend:**
  - **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
  - **Agent Orchestration:** [LangChain](https://www.langchain.com/)
  - **Asynchronous Tasks:** Celery or Ray
  - **Web Server:** Uvicorn
- **Database:**
  - **Primary Database:** [PostgreSQL](https://www.postgresql.org/)
  - **ORM:** SQLAlchemy
  - **Vector Storage:** FAISS (Local), Pinecone/Weaviate (Future)
- **LLM Integration:**
  - **API Gateway:** [OpenRouter](https://openrouter.ai/)
  - **Models:**
    - DeepSeek-v3 (Retrieval, Summarization)
    - LLaMA3.3-70B-Instruct (Report Generation)
    - GPT-4o (Reasoning, Hypothesis Generation)
    - PHI-4 (Proofreading, Grammar)
- **Monitoring:**
  - **Metrics:** [Prometheus](https://prometheus.io/)
  - **Visualization:** [Grafana](https://grafana.com/)
- **File Storage:**
  - **Local:** [LocalStack](https://localstack.cloud/) (AWS S3 Emulation)
  - **Cloud (Future):** AWS S3
- **Caching:**
  - **In-Memory Cache:** Redis (Future)
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

[![AWS Certified Solutions Architect](https://images.credly.com/size/110x110/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png)](https://www.credly.com/org/amazon-web-services/badge/aws-certified-solutions-architect-associate)
[![AWS Certified Developer](https://images.credly.com/size/110x110/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png)](https://www.credly.com/org/amazon-web-services/badge/aws-certified-developer-associate)
[![AWS Certified SysOps Administrator](https://images.credly.com/size/110x110/images/f0d3fbb9-bfa7-4017-9989-7bde8eaf42b1/image.png)](https://www.credly.com/org/amazon-web-services/badge/aws-certified-sysops-administrator-associate)
[![AWS Certified Machine Learning Engineer](https://images.credly.com/size/110x110/images/1a634b4e-3d6b-4a74-b118-c0dcb429e8d2/image.png)](https://www.credly.com/org/amazon-web-services/badge/aws-certified-machine-learning-engineer-associate)

AWS-certified Solutions Architect, Developer, SysOps Administrator, and Machine Learning Engineer with expertise in cloud architecture and modern development practices. Connect with me on:

- [GitHub](https://github.com/BjornMelin)
- [LinkedIn](https://www.linkedin.com/in/bjorn-melin/)
- [Coursera](https://www.coursera.org/learner/bjorn-melin)
- [Medium](https://medium.com/@bjornmelin)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Bjorn Melin](https://bjornmelin.io)

</div>
```
