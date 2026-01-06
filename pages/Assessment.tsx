import React, { useState } from 'react';
import { generateQuiz } from '../services/gemini';
import { Quiz, QuizQuestion } from '../types';
import { CheckCircle, XCircle, Brain, RefreshCw, Award } from 'lucide-react';

export const Assessment: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleCreateQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    
    const generatedQuiz = await generateQuiz(topic, 'High School');
    setQuiz(generatedQuiz);
    setLoading(false);
  };

  const handleSelectAnswer = (qIndex: number, option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">منشئ الاختبارات الذكي</h2>
        <p className="text-gray-500">اكتب أي موضوع وسيقوم الذكاء الاصطناعي بإنشاء اختبار مخصص لقياس فهمك</p>
      </div>

      {!quiz && (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-50 text-center max-w-lg mx-auto">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Brain size={32} />
          </div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="مثال: قوانين نيوتن، الأخلاق في الإسلام، تاريخ مصر..."
            className="w-full p-4 rounded-xl border border-gray-200 mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center text-lg"
          />
          <button
            onClick={handleCreateQuiz}
            disabled={loading || !topic}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Brain />}
            {loading ? 'جاري توليد الأسئلة...' : 'إنشاء الاختبار'}
          </button>
        </div>
      )}

      {quiz && (
        <div className="space-y-6 animate-fade-in">
           {submitted && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg transform transition-all">
              <div>
                <h3 className="text-2xl font-bold mb-1">النتيجة: {score} / {quiz.questions.length}</h3>
                <p className="opacity-90">{score > 3 ? 'ممتاز! فهمك للموضوع عميق.' : 'تحتاج لبعض المراجعة، لا بأس!'}</p>
              </div>
              <Award size={48} className="text-yellow-300" />
            </div>
           )}

          {quiz.questions.map((q, idx) => {
            const isCorrect = answers[idx] === q.correctAnswer;
            const isSelected = (opt: string) => answers[idx] === opt;
            
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">{q.question}</h3>
                </div>

                <div className="space-y-3 pr-12">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(idx, opt)}
                      disabled={submitted}
                      className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center justify-between
                        ${submitted 
                          ? opt === q.correctAnswer 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : isSelected(opt) ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-100 bg-gray-50'
                          : isSelected(opt) 
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                            : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span>{opt}</span>
                      {submitted && opt === q.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                      {submitted && isSelected(opt) && opt !== q.correctAnswer && <XCircle size={20} className="text-red-600" />}
                    </button>
                  ))}
                </div>
                
                {submitted && (
                  <div className="mt-4 mr-12 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                    <strong>شرح الإجابة:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-200 transition-all"
              >
                إنهاء الاختبار وعرض النتيجة
              </button>
            </div>
          )}
          
          {submitted && (
             <div className="flex justify-center pt-8">
               <button onClick={() => setQuiz(null)} className="text-gray-500 hover:text-indigo-600 flex items-center gap-2">
                 <RefreshCw size={16} /> إنشاء اختبار جديد
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};