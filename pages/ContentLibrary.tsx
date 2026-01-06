import React, { useState, useRef } from 'react';
import { MOCK_COURSES, ICONS } from '../constants';
import { generateSummary } from '../services/gemini';
import { PlayCircle, FileText, Zap, ChevronRight, X, UploadCloud, Radio, Filter, Video, Search } from 'lucide-react';
import { Lesson, Course } from '../types';

export const ContentLibrary: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'secondary' | 'media' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const course = courses.find(c => c.id === selectedCourseId);

  // Filter Logic
  const filteredCourses = courses.filter(c => {
    const matchesTab = activeTab === 'all' || c.category === activeTab;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lessons.some(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const handleSummarize = async (text: string) => {
    setLoadingSummary(true);
    const res = await generateSummary(text);
    setSummary(res);
    setLoadingSummary(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedCourseId) return;

    const newLesson: Lesson = {
      id: `new-${Date.now()}`,
      title: file.name.replace('.pdf', ''),
      type: 'pdf',
      contentUrl: URL.createObjectURL(file),
      textContent: "محتوى الملف الذي تم تحميله..." 
    };

    setCourses(prevCourses => prevCourses.map(c => {
      if (c.id === selectedCourseId) {
        return { ...c, lessons: [...c.lessons, newLesson] };
      }
      return c;
    }));

    setActiveLesson(newLesson);
    setSummary("");
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-8 animate-fade-in">
      {!selectedCourseId ? (
        <>
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">مكتبة المحتوى الذكية</h2>
            <p className="text-gray-500">منصة شاملة تجمع بين المنهج الدراسي، القيم التربوية، ومهارات المستقبل</p>
          </div>

          {/* Live Stream Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-1 shadow-lg mb-10 overflow-hidden group cursor-pointer relative">
            <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-md px-4 py-1 rounded-bl-2xl z-10 font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> مباشر
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
               <div className="relative w-full md:w-64 h-36 bg-gray-900 rounded-lg overflow-hidden shrink-0 group-hover:shadow-xl transition-all">
                 <img src="https://picsum.photos/400/225?grayscale" className="w-full h-full object-cover opacity-60" alt="Live" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <PlayCircle className="text-white opacity-80 group-hover:scale-110 transition-transform" size={48} />
                 </div>
               </div>
               <div className="flex-1">
                 <h3 className="text-xl font-bold text-gray-800 mb-2">البث المباشر: ندوة القيم الرقمية</h3>
                 <p className="text-gray-500 text-sm mb-4">انضم إلينا الآن في نقاش مفتوح حول أخلاقيات استخدام الذكاء الاصطناعي في التعليم مع نخبة من الخبراء.</p>
                 <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 text-sm">
                   <Video size={16} /> انضم للبث الآن
                 </button>
               </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'secondary', label: 'المناهج الدراسية' },
                { id: 'media', label: 'الإعلام التربوي' },
                { id: 'tech', label: 'التكنولوجيا & AI' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="بحث عن درس، دورة، أو موضوع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm shadow-sm"
              />
            </div>
          </div>
          
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer" onClick={() => setSelectedCourseId(item.id)}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-900 flex items-center gap-1 shadow-sm">
                       {item.category === 'secondary' ? ICONS.Secondary : item.category === 'media' ? ICONS.Media : ICONS.Tech}
                       {item.category === 'secondary' ? 'ثانوي' : item.category === 'media' ? 'إعلام تربوي' : 'تكنولوجيا'}
                    </div>
                    <div className="absolute bottom-4 right-4 text-white">
                      <h3 className="text-lg font-bold shadow-black drop-shadow-md">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{item.description}</p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{item.lessons.length} دروس</span>
                      <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        بدء الدورة <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-700">لا توجد نتائج مطابقة</h3>
                <p className="text-gray-500 text-sm">جرب البحث بكلمات مفتاحية مختلفة</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
          {/* Lessons List Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <button onClick={() => { setSelectedCourseId(null); setActiveLesson(null); setSummary(""); }} className="text-gray-500 hover:text-indigo-600 flex items-center gap-1 text-xs font-bold mb-1">
                  <ChevronRight size={12} className="rotate-180" /> العودة للمكتبة
                </button>
                <h3 className="font-bold text-indigo-900 truncate max-w-[200px]">{course?.title}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                {course?.category === 'secondary' ? ICONS.Secondary : course?.category === 'media' ? ICONS.Media : ICONS.Tech}
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-3 space-y-2">
              {course?.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => { setActiveLesson(lesson); setSummary(""); }}
                  className={`w-full text-right p-3 rounded-xl flex items-center gap-3 transition-all ${activeLesson?.id === lesson.id ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700 border border-transparent'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeLesson?.id === lesson.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{lesson.title}</p>
                    <div className="flex items-center gap-2 mt-1 opacity-80">
                       {lesson.type === 'video' ? <Video size={10} /> : <FileText size={10} />}
                       <span className="text-[10px]">{lesson.type === 'video' ? 'فيديو' : 'مستند PDF'}</span>
                    </div>
                  </div>
                  {activeLesson?.id === lesson.id && <PlayCircle size={16} />}
                </button>
              ))}
            </div>

            {/* Upload Section */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf" 
                onChange={handleFileUpload} 
              />
              <button 
                onClick={triggerUpload}
                className="w-full py-3 px-4 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-bold hover:bg-indigo-50 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <UploadCloud size={18} />
                <span>إضافة محتوى (PDF)</span>
              </button>
            </div>
          </div>

          {/* Content Viewer Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
            {activeLesson ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{activeLesson.title}</h2>
                    <p className="text-xs text-gray-400 mt-1">{course?.title} / الدرس {course?.lessons.findIndex(l => l.id === activeLesson.id)! + 1}</p>
                  </div>
                  {activeLesson.textContent && (
                    <button
                      onClick={() => handleSummarize(activeLesson.textContent!)}
                      disabled={loadingSummary}
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
                    >
                      <Zap size={16} className={loadingSummary ? "animate-spin" : ""} />
                      {loadingSummary ? 'تحليل ذكي' : 'تلخيص AI'}
                    </button>
                  )}
                </div>

                {activeLesson.type === 'video' ? (
                  <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white mb-6 relative group overflow-hidden shadow-inner">
                    <img src={`https://picsum.photos/800/450?random=${activeLesson.id}`} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                    <PlayCircle size={64} className="relative z-10 opacity-80 group-hover:opacity-100 cursor-pointer transition-all drop-shadow-xl" />
                    <p className="relative z-10 mt-4 font-bold tracking-wider">تشغيل الدرس</p>
                  </div>
                ) : (
                   <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 mb-6 relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                     <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 relative z-10">
                       <FileText size={32} className="text-indigo-500" />
                     </div>
                     <p className="text-gray-800 font-bold text-lg mb-1 relative z-10">{activeLesson.title}</p>
                     <p className="text-gray-400 text-sm mb-6 relative z-10">مستند بصيغة PDF</p>
                     {activeLesson.contentUrl && (
                       <a href={activeLesson.contentUrl} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 font-bold relative z-10">
                         قراءة الملف
                       </a>
                     )}
                   </div>
                )}

                {/* AI Summary Section */}
                {summary && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 animate-fade-in mt-auto shadow-sm">
                    <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 pb-2 border-b border-indigo-200">
                      <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                      النقاط الرئيسية (ملخص الذكاء الاصطناعي)
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap font-medium">{summary}</p>
                  </div>
                )}

                {!summary && activeLesson.textContent && !loadingSummary && (
                   <div className="text-gray-500 text-xs mt-4 text-center italic">
                      انقر على "تلخيص AI" للحصول على مراجعة سريعة لهذا المحتوى.
                   </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                <div className="bg-gray-100 p-8 rounded-full mb-6">
                  <PlayCircle size={64} className="text-gray-300" />
                </div>
                <p className="font-bold text-lg">اختر درساً من القائمة للبدء</p>
                <p className="text-sm">يمكنك مشاهدة الفيديوهات أو قراءة الملفات</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};