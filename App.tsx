import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ContentLibrary } from './pages/ContentLibrary';
import { AITutor } from './pages/AITutor';
import { Assessment } from './pages/Assessment';
import { ParentPortal } from './pages/ParentPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { Gamification } from './pages/Gamification';
import { Security } from './pages/Security';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex bg-[#f8fafc] min-h-screen font-sans" dir="rtl">
        <Sidebar />
        
        <main className="flex-1 mr-64 transition-all duration-300">
           {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40 flex justify-between items-center shadow-sm px-8">
             <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">اليوم:</span>
                <span className="font-bold text-gray-700">السبت، 15 أكتوبر 2023</span>
             </div>
             
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors">
                 <span>1,250</span>
                 <span className="text-xs">نقطة</span>
                 <span className="text-yellow-600">🏆</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 cursor-pointer hover:bg-indigo-200">
                 🔔
               </div>
               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 border border-gray-300">
                 أ
               </div>
             </div>
          </header>

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<ContentLibrary />} />
            <Route path="/media" element={<ContentLibrary />} /> {/* Reusing for demo */}
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/parent" element={<ParentPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/security" element={<Security />} />
            <Route path="*" element={<div className="p-10 text-center text-gray-500">الصفحة غير موجودة</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;