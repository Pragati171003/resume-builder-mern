import React from 'react';
import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { getAllResumes, deleteResumeById } from '../utils/resumeService';
import './DashboardPage.css'; // We'll create this next

{/*
const savedResumes = [
  { id: 1, title: 'Software Engineer Application', lastModified: '2 days ago' },
  { id: 2, title: 'Product Manager Role (Draft)', lastModified: '1 week ago' },
  { id: 3, title: 'My Main Resume', lastModified: '3 weeks ago' },
];*/}

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedResumes, setSavedResumes] = useState([]);
  useEffect(() => {
    setSavedResumes(getAllResumes());
  }, []);

  const handleEdit = (resumeId) => {
    navigate(`/editor/${resumeId}`);
  };

  const handleDelete = (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      deleteResumeById(resumeId);
      setSavedResumes(getAllResumes()); 
    }
  };

 return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="welcome-message">
          <h1>Welcome Back{user ? `, ${user.name}` : ''}!</h1>
          <p>Manage your resumes or create a new one to get started.</p>
        </div>
        <Link to="/editor/new" className="btn-create-new">
          + Create New Resume
        </Link>
      </header>

      <main className="dashboard-content">
        <h2>Your Resumes</h2>
        {savedResumes.length > 0 ? (
          <div className="resume-card-list">
            {savedResumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <h3>{resume.resumeTitle || resume.name || 'Untitled Resume'}</h3>
                <div className="card-actions">
                  <button onClick={() => handleEdit(resume.id)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(resume.id)} className="btn-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-resumes-message">
            <p>You haven't created any resumes yet. <br /> Click the button below to start your first one!</p>
            <Link to="/editor/new" className="btn-create-new">
              + Create New Resume
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;