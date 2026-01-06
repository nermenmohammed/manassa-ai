import React from 'react';
import { Shield, Users, FileText, AlertTriangle, Check, X, Eye, Activity, Sparkles, Brain, Mic, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const usageData = [
    { name: 'السبت', visits: 4000 },
    { name: 'الأحد', visits: 3000 },
    { name: 'الاثنين', visits: 2000 },
    { name: 'الثلاثاء', visits: 2780 },
    { name: 'الأربعاء', visits: 1890 },
    { name: 'الخميس', visits: 2390 },
    { name: 'الجمعة', visits: 3490 },
  ];

  const flaggedContent = [
    { id: 1, user: 'User_123', content: 'تعليق غير لائق في غرفة النقاش', type: 'تعليق', severity: 'High' },
    { id: 2, user: 'User_456', content: 'محاولة مشاركة روابط خارجية', type: 'رابط', severity: 'Medium' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">لوحة تحكم الإدارة</h2>
          <p className="text-gray-500">مراقبة الجودة، الأمان، والتأثير التربوي</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50">تصدير التقارير</button>
          <button className="bg-indigo-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-800">إضافة مستخدم</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-r-4 border-r-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">المستخدمين النشطين</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">12,450</h3>
            </div>
            <Users className="text-indigo-200" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-r-4 border-r-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">45.2K</h3>
            </div>
            <Eye className="text-green-200" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-r-4 border-r-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">تنبيهات المحتوى</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3</h3>
            </div>
            <AlertTriangle className="text-red-200" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-r-4 border-r-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">التأثير القيمي</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">94%</h3>
            </div>
            <Activity className="text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">إحصائيات الاستخدام الأسبوعي</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="visits" fill="#4338ca" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Moderation Queue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">مراجعة المحتوى (Ethical AI)</h3>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">2 معلق</span>
          </div>
          <div className="space-y-4">
            {flaggedContent.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500">{item.user}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.severity === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {item.severity === 'High' ? 'خطير' : 'متوسط'}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-3">{item.content}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-gray-300 text-gray-600 py-1 rounded text-xs hover:bg-gray-100">تجاهل</button>
                  <button className="flex-1 bg-red-600 text-white py-1 rounded text-xs hover:bg-red-700">حظر</button>
                </div>
              </div>
            ))}
            {flaggedContent.length === 0 && (
              <p className="text-center text-gray-400 py-8">لا يوجد محتوى يحتاج للمراجعة حالياً.</p>
            )}
          </div>
        </div>
      </div>

      {/* Educational Impact Report */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
        <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <FileText size={20} />
          تقارير التأثير القيمي والتربوي
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">نسبة التفاعل مع "القيم"</p>
            <p className="text-xl font-bold text-gray-800">85%</p>
            <p className="text-xs text-green-600">مرتفع جداً</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">تطور الدرجات (متوسط)</p>
            <p className="text-xl font-bold text-gray-800">+12%</p>
            <p className="text-xs text-green-600">تحسن ملحوظ</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">رضا أولياء الأمور</p>
            <p className="text-xl font-bold text-gray-800">4.8/5</p>
            <p className="text-xs text-green-600">بناءً على 500 تقييم</p>
          </div>
        </div>
      </div>

      {/* AI & Content Engagement KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={20} />
            إحصائيات الذكاء الاصطناعي
          </h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 transition-hover hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <Brain className="text-indigo-600" size={20} />
                   <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+12%</span>
                </div>
                <p className="text-2xl font-bold text-indigo-900">15,420</p>
                <p className="text-xs text-indigo-700">محادثة تعليمية</p>
             </div>
             <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 transition-hover hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <FileText className="text-purple-600" size={20} />
                   <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+8%</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">4,500</p>
                <p className="text-xs text-purple-700">ملخص تم توليده</p>
             </div>
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 transition-hover hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <Zap className="text-yellow-600" size={20} />
                   <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+25%</span>
                </div>
                <p className="text-2xl font-bold text-yellow-900">890</p>
                <p className="text-xs text-yellow-700">اختبار ذكي</p>
             </div>
             <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 transition-hover hover:shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <Mic className="text-blue-600" size={20} />
                   <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+5%</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">2,100</p>
                <p className="text-xs text-blue-700">تفاعل صوتي</p>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="text-green-500" size={20} />
             أكثر المحتويات تفاعلاً
          </h3>
          <div className="space-y-4">
            {[
              { title: 'درس الفيزياء الحديثة', views: '12.5k', type: 'Secondary' },
              { title: 'ندوة القيم الأخلاقية', views: '8.2k', type: 'Media' },
              { title: 'أساسيات البرمجة', views: '6.1k', type: 'Tech' },
              { title: 'كيف تنظم وقتك؟', views: '5.4k', type: 'Media' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                 <div>
                   <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                   <p className="text-xs text-gray-500">{item.type === 'Secondary' ? 'منهج دراسي' : item.type === 'Media' ? 'إعلام تربوي' : 'تكنولوجيا'}</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <Eye size={14} className="text-gray-400" />
                   <span className="text-sm font-bold text-gray-600">{item.views}</span>
                 </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="w-full py-2 text-indigo-600 font-bold text-sm border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
              عرض كل المحتويات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};