import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Tv, Brain, BarChart2, Shield, Settings, Users, Trophy, Activity } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-indigo-800 hover:text-white";

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <Home size={20} /> },
    { name: 'المناهج الدراسية', path: '/learn', icon: <Book size={20} /> },
    { name: 'الإعلام التربوي', path: '/media', icon: <Tv size={20} /> },
    { name: 'المعلم الذكي (AI)', path: '/ai-tutor', icon: <Brain size={20} /> },
    { name: 'الاختبارات والتقييم', path: '/assessment', icon: <Settings size={20} /> },
    { name: 'واحة التميز (الألعاب)', path: '/gamification', icon: <Trophy size={20} /> }, // New
    { name: 'بوابة ولي الأمر', path: '/parent', icon: <Users size={20} /> }, // New
    { name: 'الإدارة والتحكم', path: '/admin', icon: <Activity size={20} /> }, // New
    { name: 'الدعم والأمان', path: '/security', icon: <Shield size={20} /> },
  ];

  return (
    <div className="w-64 bg-indigo-900 min-h-screen flex flex-col shadow-xl fixed right-0 top-0 bottom-0 z-50">
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="text-yellow-400" />
          منصة المعرفة
        </h1>
        <p className="text-xs text-indigo-300 mt-2">التعليم الثانوي • القيم • التكنولوجيا</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)}`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <div className="bg-indigo-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-indigo-900">
            ط
          </div>
          <div>
            <p className="text-sm font-bold text-white">طالب مجتهد</p>
            <p className="text-xs text-indigo-300">المستوى: 3 ثانوي</p>
          </div>
        </div>
      </div>
    </div>
  );
};