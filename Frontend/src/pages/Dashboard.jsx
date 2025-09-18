import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { getAllResumes, deleteResumeById } from '../utils/resumeService';
import { FaFileAlt } from 'react-icons/fa'; 
import './DashboardPage.css';

const getRelativeTime = (resumeId) => {
  const timestamp = parseInt(resumeId.split('_')[1]);
  if (isNaN(timestamp)) return 'Recently';
  
  const now = new Date();
  const savedDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - savedDate) / 1000);

  const days = Math.floor(diffInSeconds / 86400);
  if (days > 1) return `Saved ${days} days ago`;
  if (days === 1) return 'Saved yesterday';
  
  const hours = Math.floor(diffInSeconds / 3600);
  if (hours > 1) return `Saved ${hours} hours ago`;
  if (hours === 1) return 'Saved an hour ago';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 1) return `Saved ${minutes} minutes ago`;
  
  return 'Saved just now';
};
  const capitalizeName = (name) => {
    if (!name) return 'Valued User'; 
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = () => setSavedResumes(getAllResumes());
    fetchResumes();
    window.addEventListener('focus', fetchResumes);
    return () => window.removeEventListener('focus', fetchResumes);
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
          <h1>Hello, {capitalizeName(user?.name)}!</h1>
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
                <div className="card-thumbnail" onClick={() => handleEdit(resume.id)}>
                  <FaFileAlt className="thumbnail-icon" />
                </div>
                <div className="card-info">
                  <h3>{resume.resumeTitle || resume.name || 'Untitled Resume'}</h3>
                  <p className="card-meta">{getRelativeTime(resume.id)}</p>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(resume.id)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(resume.id)} className="btn-delete">Delete</button>
                  </div>
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