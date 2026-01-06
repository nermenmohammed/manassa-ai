import React, { useState, useEffect } from 'react';
import { User, BookOpen, Clock, AlertCircle, Brain, CheckCircle, Bell, X, Info, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface Notification {
  id: number;
  type: 'alert' | 'info' | 'success';
  message: string;
  time: string;
  read: boolean;
}

export const ParentPortal: React.FC = () => {
  const [activeChild, setActiveChild] = useState('ahmed');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'alert', message: 'موعد اختبار الفيزياء الشهري: يوم الخميس القادم.', time: 'منذ ساعتين', read: false },
    { id: 2, type: 'info', message: 'تم إضافة محتوى جديد في قسم "القيم والأخلاق".', time: 'أمس', read: true }
  ]);

  // Simulate receiving a new notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotif: Notification = {
        id: Date.now(),
        type: 'success',
        message: 'إشعار فوري: أحمد أتم درس "الفيزياء الحديثة" بنجاح!',
        time: 'الآن',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mock Data
  const children = [
    { id: 'ahmed', name: 'أحمد', grade: '3 ثانوي', avatar: 'bg-blue-100 text-blue-600' },
    { id: 'sara', name: 'سارة', grade: '1 ثانوي', avatar: 'bg-pink-100 text-pink-600' }
  ];

  const stats = {
    ahmed: {
      completion: 75,
      quizAvg: 82,
      timeSpent: '12h 30m',
      weakness: 'الفيزياء الكهربية',
      strength: 'اللغة العربية',
      aiAdvice: "أحمد يظهر تحسناً ملحوظاً في المواد الأدبية، لكنه يحتاج لدعم إضافي في الفيزياء. نقترح تخصيص 30 دقيقة يومياً لحل مسائل عملية. تم إدراج فيديوهات مراجعة في خطته."
    },
    sara: {
      completion: 90,
      quizAvg: 95,
      timeSpent: '18h 15m',
      weakness: 'لا يوجد',
      strength: 'الرياضيات',
      aiAdvice: "مستوى سارة ممتاز! للحفاظ على شغفها، نقترح إشراكها في مسابقة 'المبرمج الصغير' المتاحة على المنصة لتعزيز مهاراتها التكنولوجية."
    }
  };

  const subjectData = [
    { name: 'الفيزياء', score: 65 },
    { name: 'الكيمياء', score: 80 },
    { name: 'العربي', score: 95 },
    { name: 'الإنجليزي', score: 85 },
  ];

  const currentStats = stats[activeChild as keyof typeof stats];

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle size={16} className="text-red-500" />;
      case 'success': return <Check size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const getNotifBg = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 border-red-100';
      case 'success': return 'bg-green-50 border-green-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header & Child Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">بوابة ولي الأمر</h2>
          <p className="text-gray-500">تابع تقدم أبنائك وتلقى إرشادات تربوية ذكية</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setActiveChild(child.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${activeChild === child.id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${child.avatar}`}>
                <User size={14} />
              </div>
              {child.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">إتمام المنهج</span>
            <BookOpen className="text-indigo-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{currentStats.completion}%</div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${currentStats.completion}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">متوسط الاختبارات</span>
            <CheckCircle className="text-green-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{currentStats.quizAvg}%</div>
          <p className="text-xs text-green-600 mt-2 font-bold">+5% عن الأسبوع الماضي</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">وقت التعلم</span>
            <Clock className="text-orange-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-800">{currentStats.timeSpent}</div>
          <p className="text-xs text-gray-400 mt-2">خلال هذا الشهر</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">نقاط القوة</span>
            <Brain className="text-purple-500" size={20} />
          </div>
          <div className="text-lg font-bold text-purple-700">{currentStats.strength}</div>
          <p className="text-xs text-gray-400 mt-1">يحتاج تركيز: {currentStats.weakness}</p>
        </div>
      </div>

      {/* Detailed Analysis & AI Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">الأداء الأكاديمي حسب المادة</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '10px'}} />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Advisor Box */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Brain className="text-yellow-400" size={24} />
              </div>
              <h3 className="font-bold text-xl">المستشار التربوي الذكي</h3>
            </div>
            <p className="text-indigo-100 leading-relaxed text-sm mb-6">
              {currentStats.aiAdvice}
            </p>
            <button className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              طلب تقرير مفصل PDF
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>
      
      {/* Notifications System */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Bell size={20} className={notifications.some(n => !n.read) ? "text-indigo-600 animate-swing" : "text-gray-400"} />
            تنبيهات ورسائل المدرسة
            {notifications.some(n => !n.read) && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">جديد</span>
            )}
          </h3>
          {notifications.length > 0 && (
             <button onClick={markAllRead} className="text-xs text-indigo-600 font-bold hover:underline">
               تحديد الكل كمقروء
             </button>
          )}
        </div>
        
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">لا توجد تنبيهات جديدة</div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${getNotifBg(notif.type)} ${!notif.read ? 'border-l-4 border-l-indigo-500 shadow-sm' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white ${notif.type === 'alert' ? 'text-red-500' : notif.type === 'success' ? 'text-green-500' : 'text-blue-500'}`}>
                  {getNotifIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-gray-800 text-sm ${!notif.read ? 'font-bold' : ''}`}>{notif.message}</p>
                  <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
                </div>
                <button 
                  onClick={() => dismissNotification(notif.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};