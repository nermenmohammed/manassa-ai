import React from 'react';
import { Trophy, Star, Target, Crown, Zap } from 'lucide-react';

export const Gamification: React.FC = () => {
  const leaderboard = [
    { rank: 1, name: 'أحمد محمد', points: 2500, avatar: 'bg-yellow-100 text-yellow-600' },
    { rank: 2, name: 'سارة علي', points: 2350, avatar: 'bg-gray-100 text-gray-600' },
    { rank: 3, name: 'كريم حسن', points: 2100, avatar: 'bg-orange-100 text-orange-600' },
    { rank: 4, name: 'طالب مجتهد (أنت)', points: 1250, avatar: 'bg-indigo-100 text-indigo-600' },
    { rank: 5, name: 'منى السيد', points: 1100, avatar: 'bg-blue-100 text-blue-600' },
  ];

  const badges = [
    { id: 1, name: 'بداية قوية', desc: 'أتممت أول 5 دروس', icon: <Zap size={24} className="text-yellow-500" />, locked: false },
    { id: 2, name: 'ملك الفيزياء', desc: 'حصلت على 100% في اختبار الفيزياء', icon: <Target size={24} className="text-red-500" />, locked: false },
    { id: 3, name: 'مواظب', desc: 'دخلت المنصة 7 أيام متتالية', icon: <ClockIcon />, locked: true },
    { id: 4, name: 'القيم العليا', desc: 'شاهدت كل فيديوهات القيم الأخلاقية', icon: <HeartIcon />, locked: true },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">واحة التميز والمنافسة</h2>
        <p className="text-gray-500">اجمع النقاط، احصل على الأوسمة، وتصدر قائمة الشرف</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Stats Card */}
        <div className="bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white text-center shadow-xl lg:col-span-1">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4 border-4 border-white/30">
            <Trophy size={48} className="text-yellow-300" />
          </div>
          <h3 className="text-2xl font-bold mb-1">طالب مجتهد</h3>
          <p className="text-indigo-200 mb-6">المستوى 5 • خبير</p>
          
          <div className="flex justify-around bg-white/10 rounded-xl p-4 mb-6">
            <div>
              <div className="text-2xl font-bold text-yellow-300">1,250</div>
              <div className="text-xs opacity-70">نقطة</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs opacity-70">وسام</div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex justify-between text-sm mb-2">
              <span>التقدم للمستوى التالي</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden">
              <div className="bg-yellow-400 h-full w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Crown className="text-yellow-500" />
            لوحة المتصدرين (الأسبوعية)
          </h3>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-xl transition-transform hover:scale-[1.01] ${user.rank === 4 ? 'bg-indigo-50 border border-indigo-200 shadow-inner' : 'bg-white border border-gray-100'}`}>
                <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${user.rank <= 3 ? 'text-white' : 'text-gray-500 bg-gray-100'} ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-orange-400' : ''}`}>
                  {user.rank}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.avatar}`}>
                  <UserIcon />
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${user.rank === 4 ? 'text-indigo-900' : 'text-gray-800'}`}>{user.name}</p>
                </div>
                <div className="font-bold text-indigo-600 flex items-center gap-1">
                  {user.points} <Star size={14} className="fill-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-6">أوسمتي</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className={`flex flex-col items-center text-center p-4 rounded-xl border ${badge.locked ? 'bg-gray-50 border-gray-200 opacity-60 grayscale' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${badge.locked ? 'bg-gray-200' : 'bg-white shadow-sm'}`}>
                {badge.icon}
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
