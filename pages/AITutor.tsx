import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle, Volume2, User, Sparkles, HelpCircle, BookOpen, Lightbulb } from 'lucide-react';
import { sendMessageToAI } from '../services/gemini';
import { ChatMessage } from '../types';

export const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'مرحباً بك! أنا معلمك الذكي "معلم".\nأنا هنا لمساعدتك في فهم دروسك، حل المسائل، أو حتى تقديم نصائح لتنظيم وقتك.\nبماذا تحب أن نبدأ اليوم؟' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { text: "لخص لي درس الفيزياء الأخير", icon: <BookOpen size={14} /> },
    { text: "كيف يمكنني تنظيم وقتي للمذاكرة؟", icon: <ClockIcon /> },
    { text: "ما أهمية القيم في استخدام التكنولوجيا؟", icon: <Lightbulb size={14} /> },
    { text: "اشرح لي قاعدة 'If' في الإنجليزية", icon: <HelpCircle size={14} /> },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const response = await sendMessageToAI(text);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response }]);
    setIsLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("يرجى السماح باستخدام الميكروفون للتحدث مع المعلم الذكي");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudio = async (blob: Blob) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      
      const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: '🎤 رسالة صوتية...', isAudio: true };
      setMessages(prev => [...prev, userMsg]);

      const response = await sendMessageToAI("", base64Audio);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response }]);
      setIsLoading(false);
    };
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 m-4">
      {/* Header */}
      <div className="bg-indigo-700 p-4 text-white flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
            <Sparkles className="text-yellow-300" />
          </div>
          <div>
            <h2 className="font-bold text-lg">المعلم الذكي</h2>
            <p className="text-xs text-indigo-200 opacity-80">متصل الآن • يرد فوراً</p>
          </div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          متاح
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} relative z-10`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${msg.role === 'user' ? 'bg-white border-gray-200' : 'bg-indigo-100 border-indigo-200'}`}>
                {msg.role === 'user' ? <User size={18} className="text-gray-600" /> : <BrainIcon />}
              </div>
              <div 
                className={`p-5 rounded-2xl shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-white text-gray-800 rounded-tr-none border border-gray-100' 
                  : 'bg-indigo-600 text-white rounded-tl-none'
                }`}
              >
                {msg.isAudio ? (
                  <div className="flex items-center gap-2">
                    <Volume2 size={20} className="animate-pulse" />
                    <span className="font-bold">تم إرسال رسالة صوتية</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm md:text-base">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
             <div className="bg-indigo-50 text-indigo-800 px-4 py-3 rounded-2xl rounded-tl-none text-sm animate-pulse flex items-center gap-2 border border-indigo-100">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
              جارٍ التفكير...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 z-20">
        {/* Quick Prompts */}
        {messages.length < 3 && (
           <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
             {suggestedPrompts.map((prompt, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleSend(prompt.text)}
                 className="flex items-center gap-2 whitespace-nowrap bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors"
               >
                 {prompt.icon} {prompt.text}
               </button>
             ))}
           </div>
        )}

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب استفسارك هنا..."
            className="flex-1 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-right shadow-inner"
            disabled={isLoading || isRecording}
          />
          
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-xl transition-all shadow-md ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-4 ring-red-200' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-500'}`}
            title={isRecording ? "إيقاف التسجيل" : "تحدث صوتياً"}
          >
            {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
          </button>

          <button
            onClick={() => handleSend()}
            disabled={isLoading || (!inputText && !isRecording)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transform active:scale-95"
          >
            <Send size={24} className={isLoading ? "opacity-0" : ""} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
          <Sparkles size={10} /> مدعوم بأحدث تقنيات الذكاء الاصطناعي الآمن تعليمياً
        </p>
      </div>
    </div>
  );
};

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
