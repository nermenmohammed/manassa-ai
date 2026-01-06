import React from 'react';
import { Course } from './types';
import { BookOpen, Video, FileText, Cpu, Heart, Award } from 'lucide-react';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'الفيزياء الحديثة',
    category: 'secondary',
    description: 'شرح مفصل لمنهج الفيزياء للصف الثالث الثانوي مع تطبيقات عملية.',
    thumbnail: 'https://picsum.photos/400/225?random=1',
    lessons: [
      { id: 'l1', title: 'مقدمة في الفيزياء الذرية', type: 'video', textContent: 'الذرة هي أصغر حجر بناءٍ أو أصغر جزء من العنصر الكيميائي يمكن الوصول إليه والذي يحتفظ بالخصائص الكيميائية لذلك العنصر. يرجع أصل الكلمة الإنجليزية (Atom) إلى الكلمة الإغريقية أتوموس، والتي تعني غير القابل للانقسام' },
      { id: 'l2', title: 'ملخص القوانين (PDF)', type: 'pdf' },
      { id: 'l3', title: 'اختبار الفصل الأول', type: 'text', textContent: 'محتوى نصي للاختبار...' }
    ]
  },
  {
    id: 'c2',
    title: 'قيم وأخلاق',
    category: 'media',
    description: 'سلسلة تربوية لتعزيز القيم الأخلاقية والثقة بالنفس.',
    thumbnail: 'https://picsum.photos/400/225?random=2',
    lessons: [
      { id: 'm1', title: 'احترام المعلم', type: 'video' },
      { id: 'm2', title: 'إدارة الوقت', type: 'video' }
    ]
  },
  {
    id: 'c3',
    title: 'مقدمة في الذكاء الاصطناعي',
    category: 'tech',
    description: 'تعلم أساسيات البرمجة وكيفية استخدام أدوات AI.',
    thumbnail: 'https://picsum.photos/400/225?random=3',
    lessons: [
      { id: 't1', title: 'ما هو تعلم الآلة؟', type: 'video' }
    ]
  }
];

export const ICONS = {
  Secondary: <BookOpen className="w-5 h-5" />,
  Media: <Heart className="w-5 h-5" />,
  Tech: <Cpu className="w-5 h-5" />,
  Video: <Video className="w-4 h-4" />,
  PDF: <FileText className="w-4 h-4" />,
  Award: <Award className="w-6 h-6 text-yellow-500" />
};
