import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header'; 
import './EditorLayout.css'; 

function EditorLayout() {
  return (
    <div className="editor-layout">
      <Header />
      <main className="editor-content">
        <Outlet />
      </main>
    </div>
  );
}

export default EditorLayout;