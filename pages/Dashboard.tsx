import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { UserRole } from '../types';
import { Users, Clock, Award, TrendingUp, Brain, Calendar, PlayCircle, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const dataPerformance = [
  { name: 'أسبوع 1', score: 65 },
  { name: 'أسبوع 2', score: 70 },
  { name: 'أسبوع 3', score: 68 },
  { name: 'أسبوع 4', score: 85 },
  { name: 'أسبوع 5', score: 90 },
];

const dataEngagement = [
  { name: 'السبت', hours: 2 },
  { name: 'الأحد', hours: 3.5 },
  { name: 'الاثنين', hours: 1.5 },
  { name: 'الثلاثاء', hours: 4 },
  { name: 'الأربعاء', hours: 3 },
  { name: 'الخميس', hours: 5 },
  { name: 'الجمعة', hours: 2 },
];

export const Dashboard: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.TEACHER);

  const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-105">
      <div className={`p-4 rounded-xl ${color} text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Role Switcher & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">لوحة المتابعة والتحليل</h2>
          <p className="text-gray-500">نظرة شاملة على الأداء التعليمي والقيمي</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-1 flex shadow-sm">
          {[UserRole.TEACHER, UserRole.PARENT, UserRole.ADMIN].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${role === r ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {r === UserRole.TEACHER ? 'المعلم' : r === UserRole.PARENT ? 'ولي الأمر' : 'الإدارة'}
            </button>
          ))}
        </div>
      </div>

      {/* Student Daily Mission (Visible to Teachers/Admins as "Student View Preview") */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-yellow-300">
              <Brain size={14} />
              خطة اليوم المقترحة
            </div>
            <h3 className="text-3xl font-bold">صباح الخير، يا بطل! 🚀</h3>
            <p className="text-indigo-100 text-lg">
              لديك اليوم فرصة ممتازة لإنهاء وحدة <span className="text-white font-bold">"الفيزياء الحديثة"</span>. 
              لقد قمت بجدولة درسين لك، ومقطع فيديو قصير عن "أهمية الصدق".
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/learn" className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors flex items-center gap-2">
                <PlayCircle size={20} /> ابدأ التعلم الآن
              </Link>
              <Link to="/assessment" className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
                اختبار سريع
              </Link>
            </div>
          </div>
          
          {/* Daily Progress Widget */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full md:w-80">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <CheckSquare size={18} className="text-green-400" /> مهام اليوم
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs">✓</div>
                <span className="line-through opacity-50">مراجعة درس الكيمياء</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                <span>مشاهدة فيديو "احترام المعلم"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                <span>حل اختبار الفيزياء</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الطلاب" value="1,240" icon={<Users />} color="bg-blue-500" />
        <StatCard title="ساعات التعلم" value="14.5k" icon={<Clock />} color="bg-green-500" />
        <StatCard title="نقاط التفاعل" value="85%" icon={<TrendingUp />} color="bg-purple-500" />
        <StatCard title="الأوسمة المكتسبة" value="342" icon={<Award />} color="bg-yellow-500" />
      </div>

      {/* Live Schedule & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Broadcast Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="text-red-500" /> جدول البث المباشر
            </h3>
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full animate-pulse">مباشر الآن</span>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 items-center p-3 rounded-xl bg-red-50 border border-red-100">
              <div className="bg-red-500 text-white w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold text-xs shrink-0">
                <span>الآن</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">ندوة: القيم والأخلاق في عصر AI</h4>
                <p className="text-xs text-gray-500">د. محمد أحمد • إعلام تربوي</p>
              </div>
              <button className="mr-auto bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-600">شاهد</button>
            </div>
            
            <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gray-100 text-gray-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold text-xs shrink-0">
                <span>02:00</span>
                <span>PM</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">مراجعة فيزياء (الفصل 3)</h4>
                <p className="text-xs text-gray-500">أ. سارة علي • ثانوي</p>
              </div>
            </div>

             <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gray-100 text-gray-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold text-xs shrink-0">
                <span>04:30</span>
                <span>PM</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">ورشة: برمجة بايثون للمبتدئين</h4>
                <p className="text-xs text-gray-500">م. كريم • تكنولوجيا</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800">تحليل المستوى الأكاديمي</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {role === UserRole.ADMIN && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white flex items-center justify-between">
           <div>
              <h3 className="font-bold text-lg">توصيات النظام الذكي (Admin AI)</h3>
              <p className="text-gray-400 text-sm">تم رصد انخفاض في التفاعل مع قسم "التكنولوجيا" هذا الأسبوع.</p>
           </div>
           <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
             عرض التحليل الكامل
           </button>
        </div>
      )}
    </div>
  );
};