import React, { useState } from 'react';
import { 
  FolderPlus, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Code, 
  Database, 
  ShieldCheck, 
  RefreshCw,
  FolderGit2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProjectGenerator = () => {
  const { student, showToast, addStudentProject } = useAuth();
  const [selectedGap, setSelectedGap] = useState("React & Node.js (MERN)");
  const [isGenerating, setIsGenerating] = useState(false);

  const projectTemplates = {
    "React & Node.js (MERN)": {
      title: "Enterprise Academia Placement Portal",
      stack: ["React.js", "Node.js", "Express", "MongoDB", "REST API", "JWT Auth"],
      gapsClosed: ["React.js", "Node.js", "RESTful Architecture"],
      description: "A multi-tenant college placement portal featuring student resume parsers, company drive coordination, and real-time application status pipelines.",
      architecture: [
        "Frontend: React 19 Single Page Application with Context API",
        "Backend: Express.js REST API with JWT authorization middleware",
        "Database: MongoDB schemas for Students, Drives, and Job Applications",
        "DevOps: Containerized using Docker Compose for local development"
      ],
      deliverables: [
        "Authentication endpoints (Register/Login with bcrypt & JWT)",
        "CRUD routes for Job Requisitions & Student applications",
        "Interactive dashboard UI with Tailwind or Vanilla CSS",
        "Unit test coverage with Jest and Postman test collections"
      ]
    },
    "Django & REST APIs": {
      title: "Hospital OPD Slot Reservation & Billing System",
      stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Swagger"],
      gapsClosed: ["Django ORM", "REST API Design", "Relational Indexing"],
      description: "A production-grade healthcare microservice managing patient OPD queues, doctor time-slots, and automated PDF invoice generation.",
      architecture: [
        "Backend: Django MVT architecture with DRF Serializers & ViewSets",
        "Database: PostgreSQL with optimized indexes on appointment timestamps",
        "Caching: Redis for active queue number lookups",
        "Documentation: Swagger/OpenAPI interactive API docs"
      ],
      deliverables: [
        "Resolves N+1 query bottlenecks using select_related",
        "Automated PDF prescription generation using WeasyPrint",
        "Role-based access: Patient, Doctor, Hospital Admin"
      ]
    },
    "Docker & Cloud DevOps": {
      title: "Microservices CI/CD Deployment Pipeline",
      stack: ["Docker", "Docker Compose", "GitHub Actions", "Nginx", "Linux"],
      gapsClosed: ["Docker Containerization", "CI/CD Automation", "Cloud Deployment"],
      description: "Automated multi-stage Docker build pipeline that runs automated linting and tests on pull request, deploying container images to cloud hosting.",
      architecture: [
        "Containerization: Multi-stage Dockerfile minimizing image size by 70%",
        "Orchestration: Docker Compose linking Frontend, Backend API, and Postgres DB",
        "CI/CD: GitHub Actions pipeline with automated smoke testing"
      ],
      deliverables: [
        "Production-ready Dockerfile & docker-compose.yml",
        "Reverse proxy setup using Nginx container",
        "Automated deploy script for Railway or Render"
      ]
    }
  };

  const activeProject = projectTemplates[selectedGap] || projectTemplates["React & Node.js (MERN)"];

  const handleAddToPortfolio = () => {
    addStudentProject({
      title: activeProject.title,
      description: activeProject.description,
      tech: activeProject.stack,
      link: `https://github.com/${student.name.toLowerCase().replace(' ', '-')}/${activeProject.title.toLowerCase().replace(/ /g, '-')}`
    });
    showToast(`Project "${activeProject.title}" added to your verified portfolio!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #fdf4ff 0%, #ffffff 100%)',
        border: '1px solid #f0abfc'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c026d3', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Sparkles size={16} /> AI PROJECT GENERATOR & SKILL-GAP RECOMMENDATION (POINT 13)
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Practical Capstone Project Blueprints
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              AI generates end-to-end project specifications that directly provide demonstration evidence for your target career gaps.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {Object.keys(projectTemplates).map(gapName => (
              <button
                key={gapName}
                onClick={() => setSelectedGap(gapName)}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  border: selectedGap === gapName ? '1.5px solid #c026d3' : '1px solid #cbd5e1',
                  backgroundColor: selectedGap === gapName ? '#c026d3' : '#ffffff',
                  color: selectedGap === gapName ? '#ffffff' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {gapName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Project Spec Card */}
      <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                Closes: {activeProject.gapsClosed.join(", ")}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Estimated time: 2-3 Weeks</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              {activeProject.title}
            </h3>
            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#475569', lineHeight: '1.5' }}>
              {activeProject.description}
            </p>
          </div>

          <button
            onClick={handleAddToPortfolio}
            className="btn btn-student"
            style={{ backgroundColor: '#c026d3', borderColor: '#c026d3', whiteSpace: 'nowrap' }}
          >
            <FolderPlus size={15} /> + Add to My Portfolio
          </button>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', padding: '0.75rem', backgroundColor: '#faf5ff', borderRadius: '8px', border: '1px solid #f3e8ff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86198f' }}>Technologies Used:</span>
          {activeProject.stack.map((t, idx) => (
            <span key={idx} style={{ fontSize: '0.74rem', padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #d8b4fe', color: '#701a75', fontWeight: 600 }}>
              {t}
            </span>
          ))}
        </div>

        <div className="grid-2" style={{ gap: '1.25rem' }}>
          {/* Architecture Spec */}
          <div style={{ padding: '1.1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="#2563eb" /> System Architecture Blueprint
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#334155', lineHeight: '1.6' }}>
              {activeProject.architecture.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div style={{ padding: '1.1rem', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#16a34a" /> Key Portfolio Deliverables
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#15803d', lineHeight: '1.6' }}>
              {activeProject.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
