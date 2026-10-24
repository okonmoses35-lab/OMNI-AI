import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  BookCheck,
  BrainCircuit
} from 'lucide-react';
import { QuizQuestion } from '../types';

const SAMPLE_QUIZZES: Record<string, QuizQuestion[]> = {
  Mathematics: [
    {
      id: 'q1',
      subject: 'Mathematics',
      question: 'Find the roots of the quadratic equation: x² - 7x + 12 = 0',
      options: ['x = 2 or x = 6', 'x = 3 or x = 4', 'x = -3 or x = -4', 'x = 1 or x = 12'],
      correctAnswerIndex: 1,
      explanation: 'Factorization: find two numbers that multiply to 12 and add to -7. These are -3 and -4. So (x - 3)(x - 4) = 0, which gives x = 3 or x = 4.',
    },
    {
      id: 'q2',
      subject: 'Mathematics',
      question: 'Evaluate log₁₀(1000) + log₂(16)',
      options: ['7', '6', '12', '5'],
      correctAnswerIndex: 0,
      explanation: 'log₁₀(1000) = log₁₀(10³) = 3. log₂(16) = log₂(2⁴) = 4. Therefore, 3 + 4 = 7.',
    },
    {
      id: 'q3',
      subject: 'Mathematics',
      question: 'The 3rd term of an Arithmetic Progression (A.P.) is 10 and the 6th term is 19. Find the first term (a).',
      options: ['a = 4', 'a = 1', 'a = 3', 'a = 7'],
      correctAnswerIndex: 0,
      explanation: 'T_n = a + (n-1)d. T₃ = a + 2d = 10. T₆ = a + 5d = 19. Subtracting: 3d = 9 => d = 3. Substituting into T₃: a + 2(3) = 10 => a = 4.',
    },
  ],
  Biology: [
    {
      id: 'q4',
      subject: 'Biology',
      question: 'Which of the following cellular organelles is primarily responsible for ATP synthesis during cellular respiration?',
      options: ['Golgi apparatus', 'Mitochondria', 'Ribosome', 'Endoplasmic reticulum'],
      correctAnswerIndex: 1,
      explanation: 'Mitochondria are the powerhouses of eukaryotic cells where the Krebs cycle and oxidative phosphorylation take place to generate ATP.',
    },
    {
      id: 'q5',
      subject: 'Biology',
      question: 'The vector responsible for the transmission of the Plasmodium parasite causing malaria in Nigeria is:',
      options: ['Female Anopheles mosquito', 'Tsetse fly', 'Aedes mosquito', 'Male Culex mosquito'],
      correctAnswerIndex: 0,
      explanation: 'The female Anopheles mosquito requires blood meals for egg development and transmits Plasmodium sporozoites into human circulation.',
    },
  ],
  Government: [
    {
      id: 'q6',
      subject: 'Government',
      question: 'Which constitutional conference paved the way for the 1954 Lyttelton Constitution that introduced genuine federalism in Nigeria?',
      options: ['1950 Ibadan Conference', '1953 London Conference', '1946 Richards Conference', '1957 Constitutional Conference'],
      correctAnswerIndex: 1,
      explanation: 'The 1953 London Constitutional Conference resolved regional crises and established the 1954 Lyttelton Constitution, officially creating Nigeria’s federal system with regional autonomy.',
    },
  ],
};

export const OmniLearnPage: React.FC = () => {
  const { sendChatMessage, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'tutor' | 'quiz' | 'timetable'>('tutor');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTopic, setSelectedTopic] = useState('Quadratic Equations');
  const [explanationOutput, setExplanationOutput] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const subjects = ['Mathematics', 'Biology', 'English Language', 'Government', 'Physics', 'Chemistry', 'Economics'];

  const topicsMap: Record<string, string[]> = {
    Mathematics: ['Quadratic Equations', 'Logarithms & Indices', 'Arithmetic & Geometric Progressions (AP/GP)', 'Trigonometry & Bearings'],
    Biology: ['Cell Structure & Functions', 'Malaria Transmission & Control', 'Genetics & Heredity', 'Ecology & Nutrient Cycles'],
    Government: ['Lyttelton Constitution 1954', 'Federalism in Nigeria', 'Separation of Powers', 'Electoral Systems'],
    'English Language': ['Lexis & Structure', 'Idiomatic Expressions', 'Summary Writing', 'Oral English (Vowels & Consonants)'],
    Physics: ['Vectors & Scalars', 'Ohm’s Law & Resistance', 'Work, Energy & Power', 'Wave Motion'],
    Chemistry: ['Periodic Table & Periodicity', 'Acids, Bases & Salts', 'Organic Chemistry (Hydrocarbons)', 'Electrolysis'],
    Economics: ['Law of Demand & Supply', 'Inflation in Developing Nations', 'National Income Accounting', 'Monetary Policy in Nigeria'],
  };

  const handleExplainTopic = () => {
    setIsExplaining(true);
    setTimeout(() => {
      if (selectedTopic.includes('Quadratic')) {
        setExplanationOutput(`### Understanding Quadratic Equations (${selectedSubject})
A **quadratic equation** is a polynomial equation of the second degree in the standard form:
$$ax^2 + bx + c = 0$$
where $a, b, c$ are constants and $a \\neq 0$.

#### 1. The Factorization Method:
When an equation can easily be factored, find two integers whose product is $ac$ and whose sum is $b$.
*Example:* $x^2 - 5x + 6 = 0$
- Product = $+6$, Sum = $-5$. The two numbers are $-2$ and $-3$.
- $(x - 2)(x - 3) = 0 \\implies x = 2$ or $x = 3$.

#### 2. The Quadratic Formula (Almighty Formula):
For any quadratic equation where factoring is challenging:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
The term $b^2 - 4ac$ is called the **discriminant** ($\\Delta$):
- If $\\Delta > 0$: Two distinct real roots.
- If $\\Delta = 0$: One repeated real root.
- If $\\Delta < 0$: Complex / imaginary roots.

*JAMB Tip:* Always simplify signs carefully when substituting negative values of $b$ into the formula!`);
      } else {
        setExplanationOutput(`### ${selectedTopic} — Core Examination Breakdown (${selectedSubject})
Here is your structured study overview for ${selectedTopic}:

1. **Fundamental Definition:** Understand the key principles, primary terminology, and standard units or historical dates involved.
2. **Key Formulas / Laws:** Memorize the governing definitions (e.g. laws, hypotheses, and standard mechanisms tested by JAMB and WAEC).
3. **Common Pitfalls:** Examiners frequently introduce deceptive multiple-choice distractors regarding sign errors or ambiguous wording.
4. **Examination Technique:** When tackling questions on ${selectedTopic}, first write down given data, state the governing formula or rule, and compute step-by-step.`);
      }
      setIsExplaining(false);
    }, 600);
  };

  const currentQuestions = SAMPLE_QUIZZES[selectedSubject] || SAMPLE_QUIZZES['Mathematics'];
  const currentQ = currentQuestions[currentQuizIndex];

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // already selected
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentQ.correctAnswerIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex + 1 < currentQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 border border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-lg">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-400">MODULE 02</span>
                <span className="rounded-md bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-800/40">
                  JAMB • WAEC • NECO
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">OmniLearn Tutoring</h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Personalized lessons, practice quizzes, and revision roadmaps for Nigerian students.
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                sendChatMessage('Teach me quadratic equations from the beginning with worked examples', 'omni_learn');
                setCurrentPage('chat');
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex border-b border-slate-800 space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'tutor' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Interactive Topic Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'quiz' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="h-4 w-4" />
            <span>Practice Quiz Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'timetable' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>30-Day Revision Timetable</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Topic Tutor */}
      {activeTab === 'tutor' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 rounded-3xl bg-slate-900 p-5 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Select Subject
            </h3>
            <div className="space-y-1.5">
              {subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSubject(s);
                    setSelectedTopic(topicsMap[s]?.[0] || 'Fundamentals');
                    setExplanationOutput(null);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-left transition-all ${
                    selectedSubject === s
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{s}</span>
                  {selectedSubject === s && <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-3 border-t border-slate-800">
              2. Select Curriculum Topic
            </h3>
            <div className="space-y-1.5">
              {(topicsMap[selectedSubject] || []).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTopic(t);
                    setExplanationOutput(null);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-xs text-left transition-all ${
                    selectedTopic === t
                      ? 'bg-slate-800 text-white font-bold border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleExplainTopic}
              disabled={isExplaining}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 text-xs transition-all shadow-md shadow-amber-950/40"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isExplaining ? 'Generating Lesson...' : 'Teach Me This Topic'}</span>
            </button>
          </div>

          <div className="md:col-span-2 rounded-3xl bg-slate-900 p-6 border border-slate-800 flex flex-col justify-between">
            {explanationOutput ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {selectedSubject} • {selectedTopic}
                  </span>
                  <span className="text-[11px] text-slate-400">WAEC / JAMB Syllabus Standard</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                  {explanationOutput}
                </div>
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      sendChatMessage(`Give me 3 practice exam questions on ${selectedTopic} in ${selectedSubject}`, 'omni_learn');
                      setCurrentPage('chat');
                    }}
                    className="rounded-xl bg-slate-950 hover:bg-slate-800 px-3 py-2 text-xs text-amber-300 font-semibold border border-slate-800 transition-colors"
                  >
                    Generate More Practice Questions →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <BookCheck className="h-12 w-12 text-slate-600" />
                <h4 className="font-bold text-white text-sm">Select a subject and topic to begin</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  OmniLearn breaks down secondary and tertiary concepts into digestible steps with Nigerian curriculum examples.
                </p>
                <button
                  onClick={handleExplainTopic}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs text-white font-semibold"
                >
                  Start with Quadratic Equations
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Practice Quiz */}
      {activeTab === 'quiz' && (
        <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 max-w-3xl mx-auto">
          {!quizFinished && currentQ ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    {selectedSubject} Practice Quiz
                  </span>
                  <p className="text-xs text-slate-400">
                    Question {currentQuizIndex + 1} of {currentQuestions.length}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 px-3 py-1.5 border border-slate-800 text-xs font-mono text-emerald-400">
                  Score: {quizScore}/{currentQuestions.length}
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-4 leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctAnswerIndex;
                    let btnStyle = 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 text-emerald-300 border-emerald-600 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/80 text-rose-300 border-rose-600';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                      >
                        <span className="flex items-center space-x-3">
                          <span className="h-6 w-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        )}
                        {selectedOption !== null && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {showExplanation && (
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-xs space-y-2 animate-in fade-in">
                  <span className="font-bold text-amber-400 block">Step-by-Step Explanation:</span>
                  <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {selectedOption !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={nextQuestion}
                    className="flex items-center space-x-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 text-xs transition-all shadow-md"
                  >
                    <span>{currentQuizIndex + 1 === currentQuestions.length ? 'Finish Quiz' : 'Next Question'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <Award className="h-16 w-16 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-sm text-slate-300">
                You scored <strong className="text-emerald-400">{quizScore}</strong> out of{' '}
                <strong>{currentQuestions.length}</strong> questions ({Math.round((quizScore / currentQuestions.length) * 100)}%).
              </p>
              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-xs font-semibold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => {
                    sendChatMessage(`Give me 5 more difficult JAMB exam practice questions on ${selectedSubject}`, 'omni_learn');
                    setCurrentPage('chat');
                  }}
                  className="rounded-xl bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-xs font-semibold"
                >
                  Generate 5 More Questions →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Timetable */}
      {activeTab === 'timetable' && (
        <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">30-Day JAMB / WAEC Success Schedule</h3>
              <p className="text-xs text-slate-400">Structured 2-hour daily study sessions balancing Science & Arts</p>
            </div>
            <span className="rounded bg-emerald-950 text-emerald-400 px-2 py-0.5 text-xs font-bold border border-emerald-800">
              Exam Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Week 1: Foundations & Past Question Diagnostics</span>
              <p className="text-slate-300 text-[11px]">Daily 1h Math (Algebra & Indices) + 1h English Lexis. Identify weak areas using practice tests.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Week 2: Deep Core Subject Mastery</span>
              <p className="text-slate-300 text-[11px]">Sciences: Cell biology & mechanics. Arts: Government federalism & Literature texts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Week 3: Speed, Accuracy & CBT Simulation</span>
              <p className="text-slate-300 text-[11px]">Practice 40-question timed mocks. Master pacing: max 45 seconds per question.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Week 4: Final Revision & Formula Drills</span>
              <p className="text-slate-300 text-[11px]">Flashcards, sleep discipline, formula sheets, and past question review.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
