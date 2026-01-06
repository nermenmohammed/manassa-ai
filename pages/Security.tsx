import React from 'react';
import { Shield, Lock, EyeOff, FileCheck, AlertOctagon } from 'lucide-react';

export const Security: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Shield className="text-green-600" size={32} />
          الأمان والخصوصية
        </h2>
        <p className="text-gray-500 mt-2">نتحكم في بياناتك بأعلى معايير الأمان ونضمن بيئة تعليمية آمنة أخلاقياً</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Lock className="text-green-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">حماية البيانات الشخصية</h3>
          <p className="text-sm text-gray-600 mb-4">
            يتم تشفير جميع بيانات الطلاب ودرجاتهم باستخدام بروتوكولات AES-256. لا يتم مشاركة البيانات مع أي طرف ثالث.
          </p>
          <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
            <CheckIcon /> النظام مؤمن بالكامل
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <EyeOff className="text-blue-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">المراقبة الأخلاقية (AI Safety)</h3>
          <p className="text-sm text-gray-600 mb-4">
            يعمل الذكاء الاصطناعي على فلترة المحتوى والدردشات لضمان بيئة تربوية خالية من التنمر أو الألفاظ غير اللائقة.
          </p>
          <div className="flex items-center gap-2 text-blue-700 text-sm font-bold">
            <ActivityIcon /> المراقبة نشطة
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">إعدادات الخصوصية والتحكم</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div>
              <p className="font-bold text-gray-700">ظهور الملف الشخصي</p>
              <p className="text-xs text-gray-500">من يمكنه رؤية إنجازاتك وأوسمتك</p>
            </div>
            <select className="bg-gray-100 border-none rounded-lg text-sm p-2 focus:ring-0">
              <option>الجميع</option>
              <option>الأصدقاء فقط</option>
              <option>أنا فقط</option>
            </select>
          </div>
          
          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div>
              <p className="font-bold text-gray-700">تتبع النشاط التعليمي</p>
              <p className="text-xs text-gray-500">السماح لولي الأمر والمعلم بالاطلاع على التفاصيل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" readOnly />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
             <div>
              <p className="font-bold text-red-600 flex items-center gap-2">
                 <AlertOctagon size={16} />
                 منطقة الخطر
              </p>
              <p className="text-xs text-gray-500">تسجيل الخروج من جميع الأجهزة</p>
            </div>
            <button className="text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-sm hover:bg-red-50">تنفيذ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
