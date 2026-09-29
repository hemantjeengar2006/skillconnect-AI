# AI-Powered Academia–Industry Collaboration Portal
### Skill Mapping • Skill Gap Analysis • Internships • Placement • Industry Collaboration

> **Bridging the gap between what students learn in academia and what industries actually require.**

---

## 🌟 Key Highlights & User Requirements

1. **3 Dedicated, Separate Login Pages (Alag-Alag Login Pages)**:
   - 🎓 **Student Login Portal** (`/login/student`): Dedicated student sign-in with 1-click demo login as *Rahul Sharma (BCA 5th Sem, Apex Institute)*, benefits list, and registration prompt.
   - 🏛️ **College / University Login Portal** (`/login/college`): Dedicated institutional/TPO administrative sign-in with 1-click demo login as *Dr. Sudhir Rao (Dean - Training & Placement)*.
   - 🏢 **Industry / Company Login Portal** (`/login/company`): Dedicated employer/recruiter sign-in with 1-click demo login as *TechCorp Solutions Talent Lead*.
   - **Gateway Landing Page**: Beautiful 3-door portal with quick direct access to all 3 login pages and live persona toggling.

2. **Simple, Clean & Intuitive UI/UX ("Simple Body & Layout")**:
   - Modern, uncluttered aesthetic built on a curated cool-slate design system (`#f8fafc` background, crisp cards, high-contrast readable typography).
   - Lightweight, responsive navigation tabs.
   - Real-time toast notifications and confetti celebrations on assessment success.

---

## 🚀 Running the Project Locally

The development server is running locally on port **5173**:

```bash
# To run development server
npm run dev

# Local URL:
http://localhost:5173/

# To build for production
npm run build
```

---

## 🧩 Complete Module Implementations

| Module | Features & Capabilities |
|---|---|
| **Module 1: Authentication & Role Management** | 3 separate dedicated login pages + instant 1-click evaluation logins for Student, College, and Company. |
| **Module 2: Digital Student Profile** | Academic stats (CGPA, Course, Sem), verified skill badges, soft skills, projects, certifications, and GitHub/LinkedIn links. |
| **Module 3: AI Resume Analyzer** | Natural Language Processing (NLP) text extraction engine. Supports 1-click test resumes (Python, MERN, AI/Data Science) and merges detected skills directly into student profile. |
| **Module 4: Skill Assessment Engine** | Timed interactive quizzes for Python, SQL, and React with immediate scoring, answer explanations, and automatic profile badge upgrades. |
| **Module 5 & 6: AI Skill Mapping & Gap Analysis** | Compares student's skills with industry requirements (Python Backend, MERN, AI, DevOps). Displays **Matched Skills**, **Needs Boost**, and **Missing Skills** with overall Match Readiness %. |
| **Module 7: Personalized Learning Roadmap** | 5-phase customized learning pathway with interactive milestone checkboxes, duration targets, and curated documentation links. |
| **Module 8 & 10: Industry Requirement Management** | Companies can post internship requirements with stipend, duration, openings, and technical criteria. |
| **Module 9: AI Internship Matching** | Transparent match scoring algorithm displaying verified matched skills vs missing skills for each opening. |
| **Module 11: Application Tracking System** | Full 6-stage lifecycle tracking: `Applied` ➔ `Under Review` ➔ `Shortlisted` ➔ `Assessment` ➔ `Interview` ➔ `Selected`. |
| **Module 12: Candidate Talent Search** | Filter candidates across colleges by skill, CGPA, department, and assessment scores. |
| **Module 14 & 19: College Skill Analytics** | Real-time department proficiency heatmaps for BCA, B.Tech CSE, and MCA, plus cohort skill gap alerts. |
| **Module 15 & 20: Industry Skill Trend Analysis** | Live aggregate industry demand tracking across 80+ tech companies (Python, SQL, AI/ML, React, Cloud). |
| **Module 16 & 21: Structured Internship Feedback** | 5-star evaluation matrix for Technical Skills, Problem Solving, Communication, Teamwork, and Professionalism with permanent profile integration. |

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 8, Vanilla Modern CSS with CSS Variables.
- **Icons & Visuals**: `lucide-react`, `canvas-confetti`.
- **State Management**: Centralized reactive `AuthContext` with cross-role state synchronization.
- **Typography**: Plus Jakarta Sans & Inter via Google Fonts.
