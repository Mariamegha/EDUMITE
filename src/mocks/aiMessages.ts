/**
 * MOCK DATA: AI Chat Messages
 * Realistic AI responses for UI development
 */

export interface MockMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface MockConversation {
  id: string;
  title: string;
  messages: MockMessage[];
  createdAt: string;
  updatedAt: string;
}

export const MOCK_AI_RESPONSES = {
  greeting: "Hello! I'm your AI study assistant. I can help you with:\n\n• Explaining complex concepts\n• Answering questions on any subject\n• Creating study plans\n• Generating practice problems\n• Debugging code\n• And much more!\n\nWhat would you like to learn about today?",
  
  quantumPhysics: "Quantum physics is fascinating! Let me break it down:\n\n**Key Concepts:**\n1. **Wave-Particle Duality**: Particles like electrons can behave as both waves and particles\n2. **Superposition**: Quantum systems can exist in multiple states simultaneously until measured\n3. **Entanglement**: Particles can be connected in ways where measuring one instantly affects another\n\n**Example:**\nImagine Schrödinger's cat - it's both alive and dead until you open the box and observe it. This thought experiment illustrates superposition.\n\n**Applications:**\n- Quantum computers\n- Secure communications\n- Advanced sensors\n\nWould you like me to dive deeper into any specific aspect?",
  
  calculus: "Great question about calculus! Let me help you understand derivatives:\n\n**What is a Derivative?**\nA derivative measures how a function changes as its input changes. It's the slope of a function at any point.\n\n**Formula:**\n```\nf'(x) = lim(h→0) [f(x+h) - f(x)] / h\n```\n\n**Example:**\nIf f(x) = x², then f'(x) = 2x\n\n**Real-World Application:**\n- **Physics**: Velocity is the derivative of position\n- **Economics**: Marginal cost is the derivative of total cost\n- **Engineering**: Optimization problems\n\n**Practice Problem:**\nFind the derivative of f(x) = 3x³ - 2x + 5\n\nWould you like me to walk you through the solution?",
  
  studyPlan: "I'll create a personalized study plan for you! Here's a structured approach:\n\n**Week 1-2: Foundations**\n- Day 1-3: Basics & Fundamentals (2 hours/day)\n- Day 4-5: Practice Problems (1.5 hours/day)\n- Weekend: Review & Self-Assessment\n\n**Week 3-4: Deep Dive**\n- Mon-Wed: Advanced Concepts (2.5 hours/day)\n- Thu-Fri: Hands-on Projects (3 hours/day)\n- Weekend: Peer Study Groups\n\n**Week 5-6: Mastery**\n- Mon-Thu: Real-world Applications (2 hours/day)\n- Fri: Quiz & Testing\n- Weekend: Final Project\n\n**Study Tips:**\n✓ Use Pomodoro technique (25 min focus, 5 min break)\n✓ Active recall over passive reading\n✓ Teach concepts to solidify understanding\n✓ Join study groups for motivation\n\nWhat subject should we customize this plan for?",
  
  historyQuiz: "Excellent! Let's test your history knowledge:\n\n**Question 1:**\nWho was the first President of the United States?\nA) Thomas Jefferson\nB) George Washington\nC) John Adams\nD) Benjamin Franklin\n\n**Question 2:**\nIn what year did World War II end?\nA) 1943\nB) 1944\nC) 1945\nD) 1946\n\n**Question 3:**\nThe Renaissance began in which country?\nA) France\nB) England\nC) Italy\nD) Spain\n\n**Question 4:**\nWho wrote the Declaration of Independence?\nA) George Washington\nB) Thomas Jefferson\nC) Benjamin Franklin\nD) John Adams\n\n**Question 5:**\nThe Great Wall of China was primarily built during which dynasty?\nA) Tang Dynasty\nB) Ming Dynasty\nC) Han Dynasty\nD) Qin Dynasty\n\nReply with your answers (e.g., 1-B, 2-C, etc.) and I'll grade them!",
  
  codeHelp: "Let me help you debug that code!\n\n**Common Issues to Check:**\n\n1. **Syntax Errors**\n```javascript\n// Wrong\nif (x = 5) { } // Assignment instead of comparison\n\n// Correct\nif (x === 5) { } // Comparison\n```\n\n2. **Undefined Variables**\n```javascript\n// Wrong\nconsole.log(myVar); // ReferenceError\n\n// Correct\nlet myVar = 'Hello';\nconsole.log(myVar);\n```\n\n3. **Scope Issues**\n```javascript\n// Wrong\nif (true) {\n  let x = 5;\n}\nconsole.log(x); // ReferenceError\n\n// Correct\nlet x;\nif (true) {\n  x = 5;\n}\nconsole.log(x);\n```\n\n**Debugging Tips:**\n- Use console.log() to track variable values\n- Check browser/console for error messages\n- Use debugger breakpoints\n- Verify data types with typeof\n\nPaste your code and I'll help identify the issue!",
};

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 'conv-001',
    title: 'React Hooks Discussion',
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-01T11:15:00Z',
    messages: [
      {
        id: 'msg-001',
        role: 'user',
        content: 'Can you explain React Hooks?',
        timestamp: '2024-12-01T10:30:00Z',
      },
      {
        id: 'msg-002',
        role: 'assistant',
        content: "Absolutely! React Hooks are functions that let you use state and lifecycle features in functional components.\n\n**Main Hooks:**\n\n1. **useState** - Manages component state\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n2. **useEffect** - Handles side effects\n```jsx\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n```\n\n3. **useContext** - Consumes context values\n4. **useRef** - Accesses DOM elements\n5. **useMemo** - Memoizes expensive calculations\n\n**Benefits:**\n✓ Cleaner code\n✓ Better reusability\n✓ Easier testing\n✓ No class boilerplate\n\nWould you like examples of any specific hook?",
        timestamp: '2024-12-01T10:31:30Z',
      },
    ],
  },
  {
    id: 'conv-002',
    title: 'Calculus Help',
    createdAt: '2024-12-02T14:20:00Z',
    updatedAt: '2024-12-02T14:45:00Z',
    messages: [
      {
        id: 'msg-003',
        role: 'user',
        content: 'Help me understand integration',
        timestamp: '2024-12-02T14:20:00Z',
      },
      {
        id: 'msg-004',
        role: 'assistant',
        content: MOCK_AI_RESPONSES.calculus,
        timestamp: '2024-12-02T14:22:00Z',
      },
    ],
  },
  {
    id: 'conv-003',
    title: 'Python Study Plan',
    createdAt: '2024-12-03T09:00:00Z',
    updatedAt: '2024-12-03T09:20:00Z',
    messages: [
      {
        id: 'msg-005',
        role: 'user',
        content: 'Create a study plan for learning Python',
        timestamp: '2024-12-03T09:00:00Z',
      },
      {
        id: 'msg-006',
        role: 'assistant',
        content: MOCK_AI_RESPONSES.studyPlan,
        timestamp: '2024-12-03T09:01:45Z',
      },
    ],
  },
];

export const MOCK_SUGGESTED_PROMPTS = [
  'Explain quantum physics in simple terms',
  'Help me with calculus derivatives',
  'Create a personalized study plan',
  'Quiz me on world history',
  'Explain machine learning algorithms',
  'How do I prepare for coding interviews?',
  'Teach me about data structures',
  'What are the best study techniques?',
];

export const generateMockAIResponse = (userMessage: string): string => {
  const lowercaseMsg = userMessage.toLowerCase();
  
  if (lowercaseMsg.includes('quantum') || lowercaseMsg.includes('physics')) {
    return MOCK_AI_RESPONSES.quantumPhysics;
  }
  if (lowercaseMsg.includes('calculus') || lowercaseMsg.includes('derivative') || lowercaseMsg.includes('integral')) {
    return MOCK_AI_RESPONSES.calculus;
  }
  if (lowercaseMsg.includes('study plan') || lowercaseMsg.includes('schedule')) {
    return MOCK_AI_RESPONSES.studyPlan;
  }
  if (lowercaseMsg.includes('quiz') || lowercaseMsg.includes('history')) {
    return MOCK_AI_RESPONSES.historyQuiz;
  }
  if (lowercaseMsg.includes('code') || lowercaseMsg.includes('debug') || lowercaseMsg.includes('error')) {
    return MOCK_AI_RESPONSES.codeHelp;
  }
  if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
    return MOCK_AI_RESPONSES.greeting;
  }
  
  // Default response
  return `I understand you're asking about "${userMessage}". Let me help you with that!\n\nWhile I'm still processing your specific question, I can provide some general guidance:\n\n**Key Points:**\n1. Break down complex topics into smaller concepts\n2. Practice regularly with hands-on examples\n3. Connect new knowledge to what you already know\n4. Don't hesitate to ask follow-up questions\n\nCould you provide more details about what specifically you'd like to learn? This will help me give you a more targeted explanation.`;
};
