const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxlCMOqZiD7t5sQfVYUsDCZgt-8ok4QdA",
  authDomain: "exam-system-65761.firebaseapp.com",
  projectId: "exam-system-65761",
  storageBucket: "exam-system-65761.appspot.com",
  messagingSenderId: "388201150905",
  appId: "1:388201150905:web:74c15b26c4ca5bf700de68",
  measurementId: "G-5HRTNK4X2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



const addExam = async () => {
  try {
    await signInWithEmailAndPassword(auth, 'kumarvishal00021@gmail.com', 'Vishal@1234');
const exam = {
  title: 'HUMAN VALUES & PROFESSIONAL ETIIICS',
  subject: 'MCQ',
  description: 'A comprehensive assessment of HUMAN VALUES & PROFESSIONAL ETIIICS, ideal for exams and interviews.',
  questions: [
    // From PAGE 1
    {
      text: 'What is the state of liking and a holistic and all encompassing state of the mind that creates inner harmony?',
      options: ['Prosperity', 'Happiness', 'Innateness', 'Self-organized'],
      correctAnswer: 'Happiness',
    },
    {
      text: 'What is called living with assumption for oneself as body and Living of human being only on the basis of physical facilities, and not with right understanding and relationship?',
      options: ['Human Consciousness', 'Happiness', 'Right Understanding', 'Animal Consciousness'],
      correctAnswer: 'Animal Consciousness',
    },
    {
      text: 'Five basic guidelines for value education are Universal, Natural and verifiable, all encompassing, leading to harmony and',
      options: ['Self exploration', 'Education', 'Right utilization', 'Rational'],
      correctAnswer: 'Rational',
    },
    {
      text: 'What are the basic desires of every human being for which they are working?',
      options: ['Physical facilities', 'Realization and understanding', 'Happiness and prosperity', 'Continuous happiness and prosperity'],
      correctAnswer: 'Continuous happiness and prosperity',
    },
    {
      text: 'When we participate in the larger order, this participation at different levels is known as our value. Values are outcome of',
      options: ['Prosperity', 'Happiness', 'Realization and understanding', 'Self exploration'],
      correctAnswer: 'Realization and understanding',
    },
    {
      text: 'Identify the solution which helps human being to transform from animal consciousness to human consciousness.',
      options: ['Right understanding', 'Realization', 'Value education', 'Physical facilities'],
      correctAnswer: 'Value education',
    },
    // From PAGE 2
    {
      text: 'To maintain harmony we have to work at four levels of living. Identify second level of living.',
      options: ['Self', 'Family', 'Nature', 'Society'],
      correctAnswer: 'Family',
    },
    {
      text: 'Self exploration is a process which helps us to find out "What I am and What I really want to be". Two mechanisms involved in self-exploration are',
      options: ['Realization and understanding', 'Natural and verifiable', 'Natural acceptance and experimental validation', 'Correctable and identifiable'],
      correctAnswer: 'Natural acceptance and experimental validation',
    },
    {
      text: 'Self exploration uses two mechanisms -',
      options: ['Natural acceptance and experiential validation', 'Right Understanding and self exploration', 'Self investigation and self exploration', 'Natural acceptance and self investigation'],
      correctAnswer: 'Natural acceptance and experiential validation',
    },
    {
      text: 'Samridhi means',
      options: ['Happiness', 'Wealth', 'Prosperity', 'Health'],
      correctAnswer: 'Prosperity',
    },
    {
      text: 'What is the third level of living?',
      options: ['Society', 'Individual', 'Family', 'Nature'],
      correctAnswer: 'Society',
    },
    {
      text: 'Developed nations are the live example of',
      options: ['Prosperity', 'Wealth', 'Happiness', 'Health'],
      correctAnswer: 'Wealth',
    },
    {
      text: 'The participation of human beings is seen in two forms',
      options: ['Prosperity and Work', 'Values and Understanding', 'Behavior and Wealth', 'Behavior and Work'],
      correctAnswer: 'Behavior and Work',
    },
    {
      text: 'What are the outcomes of realization and understanding?',
      options: ['Work', 'Values', 'Happiness', 'Health'],
      correctAnswer: 'Values',
    },
    // From PAGE 3
    {
      text: 'Values related to love is',
      options: ['forgiveness', 'trust', 'loyalty', 'universal love'],
      correctAnswer: 'universal love',
    },
    {
      text: 'Values related to non-violence is',
      options: ['tolerance', 'happiness', 'optimism', 'ingenuity'],
      correctAnswer: 'tolerance',
    },
    {
      text: '____ means freedom from mistake or error',
      options: ['perseverance', 'accuracy', 'discernment', 'service'],
      correctAnswer: 'accuracy',
    },
    {
      text: '____ means the power to see what is not obvious to the average mind',
      options: ['perseverance', 'accuracy', 'discernment', 'service'],
      correctAnswer: 'discernment',
    },
    {
      text: '____ Builds character',
      options: ['love', 'social skills', 'friendship', 'perseverance'],
      correctAnswer: 'perseverance',
    },
    {
      text: '____ is the word that refers to morals, values, and beliefs of the individuals, family or the society',
      options: ['ethics', 'values', 'morality', 'norms'],
      correctAnswer: 'ethics',
    },
    {
      text: '____ is defined as the unity of thought, word and deed (honesty) and open mindedness',
      options: ['morals', 'ethics', 'values', 'integrity'],
      correctAnswer: 'integrity',
    },
    {
      text: '____ is defined as a set of attitudes concerned with the value of work, which forms the motivational orientation.',
      options: ['ethics', 'integrity', 'work ethics', 'morals'],
      correctAnswer: 'work ethics',
    },
    // From PAGE 4
    {
      text: '____ lays a moral and meaningful foundation for life.',
      options: ['ethics', 'integrity', 'work', 'morals'],
      correctAnswer: 'morals',
    },
    {
      text: '____ refers to learning the service policies, procedures, norms, and conditions, other than "the technical trade practices"',
      options: ['work ethics', 'service learning', 'integrity', 'truth'],
      correctAnswer: 'service learning',
    },
    {
      text: '____ helps the individuals to interact ethically with colleagues and to effectively coordinate with other departments',
      options: ['work ethics', 'integrity', 'service learning', 'truth'],
      correctAnswer: 'work ethics',
    },
    {
      text: '____ may be defined as the non-paid activity',
      options: ['service learning', 'ethics', 'non-violence', 'integrity'],
      correctAnswer: 'service learning',
    },
    {
      text: '____ are positive and preferred values',
      options: ['service learning', 'ethics', 'non-violence', 'virtues'],
      correctAnswer: 'virtues',
    },
    {
      text: 'The ____ person is the ethical person.',
      options: ['moral', 'kind', 'honest', 'virtuous'],
      correctAnswer: 'virtuous',
    },
    {
      text: 'An individual may exhibit ____ by voting, volunteering, and organizing welfare groups and meetings.',
      options: ['service learning', 'ethics', 'non-violence', 'civic virtues'],
      correctAnswer: 'civic virtues',
    },
    {
      text: '____ are the moral duties and rights, as a citizen of the village or the country',
      options: ['work ethics', 'duty ethics', 'civic virtue', 'service learning'],
      correctAnswer: 'civic virtue',
    },
    {
      text: '____ is a basic requirement for nurturing friendship, teamwork, and for the synergy it promotes and sustains',
      options: ['virtues', 'honesty', 'respect for others', 'work ethics'],
      correctAnswer: 'respect for others',
    },
    // From PAGE 5
    {
      text: 'To ____, one should start installing peace within',
      options: ['live peacefully', 'respect for others', 'be honest', 'be courageous'],
      correctAnswer: 'live peacefully',
    },
    {
      text: '____ interests of all others concerned',
      options: ['live peacefully', 'caring', 'be honest', 'be courageous'],
      correctAnswer: 'caring',
    },
    {
      text: 'Honesty is a virtue, and it is exhibited in which aspects',
      options: ['truthfulness', 'happiness', 'awareness', 'comfortness'],
      correctAnswer: 'truthfulness',
    },
    {
      text: 'In courage, the thrust is on the adequacy of the ____ strength',
      options: ['social', 'physical', 'intellectual', 'self'],
      correctAnswer: 'physical',
    },
    {
      text: '____ means alignment to goals and adherence to ethical principles during the activities',
      options: ['welfare', 'empathy', 'commitment', 'rural'],
      correctAnswer: 'commitment',
    },
    {
      text: 'Demonstrate your own ____ and spirituality in all your action',
      options: ['education', 'property', 'self-knowledge', 'wealth'],
      correctAnswer: 'self-knowledge',
    },
    {
      text: 'Lack of promotion or career development policies or denied promotions',
      options: ['attitude', 'opportunity', 'resource crunch', 'over-emphasize'],
      correctAnswer: 'opportunity',
    },
    {
      text: 'One is unable to choose between two good moral solutions',
      options: ['vagueness', 'conflicting reasons', 'disagreement', 'refuse bribe'],
      correctAnswer: 'conflicting reasons',
    },
  ],
};

    await addDoc(collection(db, 'exams'), exam);
    console.log('Exam added successfully!');
  } catch (error) {
    console.error('Error adding exam:', error);
  }
};
addExam();
// const addExam = async () => {
//   try {
//     await signInWithEmailAndPassword(auth, 'kumarvishal00021@gmail.com', 'Vishal@1234');
//     const exam = {
//       title: 'Computer Forensics Assessment',
//       subject: 'Computer Forensics',
//       description: 'A comprehensive assessment of computer forensics concepts, covering digital evidence, cybercrimes, forensic techniques, and legal aspects, ideal for exams and interviews.',
//       questions: [
//         // Unit I: Introduction to Computer Forensics
//         {
//           text: 'What is the primary objective of computer forensics?',
//           options: ['To delete data from a system', 'To recover and analyze digital evidence', 'To create computer viruses', 'To modify system logs'],
//           correctAnswer: 'To recover and analyze digital evidence',
//         },
//         {
//           text: 'Which of the following is NOT a task in computer forensics?',
//           options: ['Collecting evidence', 'Destroying evidence', 'Recovering evidence', 'Preserving evidence'],
//           correctAnswer: 'Destroying evidence',
//         },
//         {
//           text: 'What is the first step in a forensic investigation?',
//           options: ['Analyzing the evidence', 'Preparing for an investigation', 'Creating a forensic report', 'Presenting evidence in court'],
//           correctAnswer: 'Preparing for an investigation',
//         },
//         {
//           text: 'What is a major challenge in cybercrime laws?',
//           options: ['Low enforcement costs', 'Jurisdictional issues', 'Easy identification of criminals', 'Readily available evidence'],
//           correctAnswer: 'Jurisdictional issues',
//         },
//         {
//           text: 'Which of the following ensures that digital evidence remains unaltered?',
//           options: ['Encryption', 'Hashing', 'File compression', 'Firewall protection'],
//           correctAnswer: 'Hashing',
//         },
//         {
//           text: 'What type of evidence is considered in digital forensics?',
//           options: ['Emails', 'Chat logs', 'Browser history', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Which law enforcement principle applies to handling digital evidence?',
//           options: ['Chain of custody', 'Freedom of information', 'User confidentiality', 'Online piracy protection'],
//           correctAnswer: 'Chain of custody',
//         },
//         {
//           text: 'What does "preserving evidence" mean in digital forensics?',
//           options: ['Deleting all unnecessary files', 'Keeping evidence unchanged and secure', 'Encrypting evidence to hide it', 'Modifying evidence to fit the case'],
//           correctAnswer: 'Keeping evidence unchanged and secure',
//         },
//         // Unit II: Computer Crimes
//         {
//           text: 'Which of the following is an example of a violent cybercrime?',
//           options: ['Identity theft', 'Cyberstalking', 'Software piracy', 'Data leakage'],
//           correctAnswer: 'Cyberstalking',
//         },
//         {
//           text: 'Which of the following is NOT a type of nonviolent cybercrime?',
//           options: ['Online fraud', 'Phishing', 'Cyberterrorism', 'Hacking'],
//           correctAnswer: 'Cyberterrorism',
//         },
//         {
//           text: 'Where is cybercrime evidence often stored?',
//           options: ['Temporary files', 'Emails', 'Chat logs', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Which law targets child pornography online?',
//           options: ['CFAA', 'COPPA', 'DMCA', 'CAN-SPAM Act'],
//           correctAnswer: 'COPPA',
//         },
//         {
//           text: 'What is cyber trespassing?',
//           options: ['Gaining unauthorized access to a system', 'Sending spam emails', 'Deleting user files accidentally', 'Legal hacking by government agencies'],
//           correctAnswer: 'Gaining unauthorized access to a system',
//         },
//         // Unit III: Computer Criminals
//         {
//           text: 'What does MAC stand for in forensic analysis?',
//           options: ['Modify, Access, Create', 'Memory, Analysis, Computation', 'Malware, Attack, Control', 'Modem, Antivirus, Cybersecurity'],
//           correctAnswer: 'Modify, Access, Create',
//         },
//         {
//           text: 'Why are MAC times unreliable?',
//           options: ['They change unpredictably', 'They can be easily erased', 'They only work on Linux systems', 'They are stored in RAM'],
//           correctAnswer: 'They change unpredictably',
//         },
//         {
//           text: 'Which of the following is NOT a type of cybercriminal?',
//           options: ['Script kiddies', 'Hacktivists', 'Cyber investigators', 'Insider threats'],
//           correctAnswer: 'Cyber investigators',
//         },
//         {
//           text: 'What is the role of cyber investigators?',
//           options: ['They create hacking tools', 'They analyze digital evidence', 'They spread malware', 'They delete evidence'],
//           correctAnswer: 'They analyze digital evidence',
//         },
//         {
//           text: 'What does a crime timeline help determine?',
//           options: ['When a crime was committed', 'Who committed the crime', 'Where the crime occurred', 'How to alter the evidence'],
//           correctAnswer: 'When a crime was committed',
//         },
//         // Unit IV: Building a Cybercrime Case
//         {
//           text: 'Which of the following is NOT a body of law?',
//           options: ['Constitutional law', 'Federal law', 'Administrative law', 'Cyber Law Enforcement Act'],
//           correctAnswer: 'Cyber Law Enforcement Act',
//         },
//         {
//           text: 'Which law applies to computer crimes at an international level?',
//           options: ['GDPR', 'DMCA', 'CFAA', 'CAN-SPAM Act'],
//           correctAnswer: 'GDPR',
//         },
//         {
//           text: 'What is vicarious liability in cyber law?',
//           options: ['An employer is responsible for an employee\'s cybercrime', 'A hacker is always anonymous', 'Evidence can be deleted if necessary', 'Only government agencies can prosecute cybercriminals'],
//           correctAnswer: 'An employer is responsible for an employee\'s cybercrime',
//         },
//         {
//           text: 'Which law combats spam emails?',
//           options: ['CFAA', 'CAN-SPAM Act', 'DMCA', 'GDPR'],
//           correctAnswer: 'CAN-SPAM Act',
//         },
//         // Unit V: Preserving and Recovering Digital Evidence
//         {
//           text: 'What is the purpose of disk imaging?',
//           options: ['To modify files', 'To create an exact copy of a disk', 'To compress files', 'To delete system logs'],
//           correctAnswer: 'To create an exact copy of a disk',
//         },
//         {
//           text: 'What does a hash function verify?',
//           options: ['Data integrity', 'File permissions', 'Internet connection', 'Operating system updates'],
//           correctAnswer: 'Data integrity',
//         },
//         {
//           text: 'Where can deleted data often be found?',
//           options: ['File system metadata', 'Firewall logs', 'BIOS', 'Antivirus software'],
//           correctAnswer: 'File system metadata',
//         },
//         {
//           text: 'What does a file header contain?',
//           options: ['File type and metadata', 'File content', 'Encryption key', 'Deleted records'],
//           correctAnswer: 'File type and metadata',
//         },
//         {
//           text: 'Which method is used to establish a digital crime timeline?',
//           options: ['MAC timestamps', 'Network scanning', 'Data encryption', 'Social engineering'],
//           correctAnswer: 'MAC timestamps',
//         },
//       ],
//     };

//     await addDoc(collection(db, 'exams'), exam);
//     console.log('Exam added successfully!');
//   } catch (error) {
//     console.error('Error adding exam:', error);
//   }
// };
// Run the function







// const addExam = async () => {
//   try {
//     await signInWithEmailAndPassword(auth, 'kumarvishal00021@gmail.com', 'Vishal@1234');
//     const exam = {
//       title: '.NET Framework and C# Assessment',
//       subject: 'C# Programming',
//       description:
//         'A comprehensive assessment of .NET Framework and C# concepts, covering data types, CLR, object-oriented programming, collections, and more, ideal for interviews and exams.',
//       questions: [
//         {
//           text: 'Which of the following is the base class for all data types in C#?',
//           options: ['System.Type', 'System.Base', 'System.Object', 'System.Data'],
//           correctAnswer: 'System.Object',
//         },
//         {
//           text: 'Which component of the .NET Framework provides runtime environment?',
//           options: ['BCL', 'CLR', 'CTS', 'CLS'],
//           correctAnswer: 'CLR',
//         },
//         {
//           text: 'What is the default access modifier of a class in C#?',
//           options: ['public', 'private', 'internal', 'protected'],
//           correctAnswer: 'internal',
//         },
//         {
//           text: 'Which keyword is used to create an object in C#?',
//           options: ['create', 'alloc', 'new', 'object'],
//           correctAnswer: 'new',
//         },
//         {
//           text: 'Which operator is used to access members of a class or struct?',
//           options: [':', '->', '.', '::'],
//           correctAnswer: '.',
//         },
//         {
//           text: 'Which keyword is used for inheritance in C#?',
//           options: ['implements', 'inherits', 'extends', ':'],
//           correctAnswer: ':',
//         },
//         {
//           text: 'The concept of reusing the fields and methods of an existing class is called?',
//           options: ['Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction'],
//           correctAnswer: 'Inheritance',
//         },
//         {
//           text: 'Which of these is NOT a value type in C#?',
//           options: ['int', 'double', 'enum', 'string'],
//           correctAnswer: 'string',
//         },
//         {
//           text: 'Which method is used to convert a string to an integer in C#?',
//           options: ['Convert.ToString()', 'int.Parse()', 'string.Parse()', 'ToInt()'],
//           correctAnswer: 'int.Parse()',
//         },
//         {
//           text: 'Boxing is the process of:',
//           options: [
//             'Converting value type to reference type',
//             'Converting reference type to value type',
//             'Comparing types',
//             'Converting object to string',
//           ],
//           correctAnswer: 'Converting value type to reference type',
//         },
//         {
//           text: 'Which loop will always execute at least once?',
//           options: ['for', 'while', 'do-while', 'foreach'],
//           correctAnswer: 'do-while',
//         },
//         {
//           text: 'What is the file extension for a C# source file?',
//           options: ['.cpp', '.cs', '.c', '.c#'],
//           correctAnswer: '.cs',
//         },
//         {
//           text: 'What is the output of: Console.WriteLine(5/2);',
//           options: ['2', '2.5', '2.0', 'Error'],
//           correctAnswer: '2',
//         },
//         {
//           text: 'What does CLR stand for?',
//           options: [
//             'Common Language Runtime',
//             'Common Language Reader',
//             'Code Language Reader',
//             'Common Logic Runtime',
//           ],
//           correctAnswer: 'Common Language Runtime',
//         },
//         {
//           text: 'Which of these is NOT a .NET language?',
//           options: ['C#', 'VB.NET', 'Java', 'F#'],
//           correctAnswer: 'Java',
//         },
//         {
//           text: 'Which keyword is used to define an interface in C#?',
//           options: ['interface', 'Interface', 'Iinterface', 'implements'],
//           correctAnswer: 'interface',
//         },
//         {
//           text: 'Which is a reference type in C#?',
//           options: ['int', 'enum', 'struct', 'string'],
//           correctAnswer: 'string',
//         },
//         {
//           text: 'Which one is the correct way to declare an array in C#?',
//           options: [
//             'int arr[] = new int[5];',
//             'int[] arr = new int[5];',
//             'arr int[] = new int[5];',
//             'array int arr = 5;',
//           ],
//           correctAnswer: 'int[] arr = new int[5];',
//         },
//         {
//           text: 'What is the use of using directive in C#?',
//           options: [
//             'For importing a namespace',
//             'For looping',
//             'For conditional statements',
//             'For error handling',
//           ],
//           correctAnswer: 'For importing a namespace',
//         },
//         {
//           text: 'Which access modifier allows a class member to be accessible only within the same assembly?',
//           options: ['protected', 'internal', 'public', 'private'],
//           correctAnswer: 'internal',
//         },
//         {
//           text: 'Which collection class uses key-value pairs?',
//           options: ['List', 'Queue', 'Stack', 'Dictionary'],
//           correctAnswer: 'Dictionary',
//         },
//         {
//           text: 'Which method is used to compare two strings in C#?',
//           options: ['Equals()', 'CompareTo()', '==', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'What is null in C#?',
//           options: ['0', 'An empty string', 'No reference', 'A Boolean'],
//           correctAnswer: 'No reference',
//         },
//         {
//           text: 'Which method is the starting point of a C# application?',
//           options: ['Start()', 'Run()', 'Main()', 'Init()'],
//           correctAnswer: 'Main()',
//         },
//         {
//           text: 'Which keyword is used for exception handling in C#?',
//           options: ['try-catch', 'exception', 'throw', 'error'],
//           correctAnswer: 'try-catch',
//         },
//         {
//           text: 'Which of the following is a loop structure in C#?',
//           options: ['do-while', 'while', 'for', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'What is the result of true && false in C#?',
//           options: ['true', 'false', '1', '0'],
//           correctAnswer: 'false',
//         },
//         {
//           text: 'Which operator is used for conditional checking in C#?',
//           options: ['==', '=', '!=', 'A and C'],
//           correctAnswer: 'A and C',
//         },
//         {
//           text: 'What is the maximum value of int in C#?',
//           options: ['32767', '2147483647', '65535', '999999999'],
//           correctAnswer: '2147483647',
//         },
//         {
//           text: 'Which method is used to print on the console in C#?',
//           options: ['Print()', 'WriteLine()', 'show()', 'display()'],
//           correctAnswer: 'WriteLine()',
//         },
//         {
//           text: 'Which of the following is not a keyword in C#?',
//           options: ['sealed', 'void', 'interface', 'include'],
//           correctAnswer: 'include',
//         },
//         {
//           text: 'Which keyword is used to create an abstract class in C#?',
//           options: ['base', 'abstract', 'virtual', 'interface'],
//           correctAnswer: 'abstract',
//         },
//         {
//           text: 'The term CTS stands for:',
//           options: [
//             'Common Type Structure',
//             'Common Type System',
//             'Common Text System',
//             'Central Type System',
//           ],
//           correctAnswer: 'Common Type System',
//         },
//         {
//           text: 'Which is NOT a valid data type in C#?',
//           options: ['char', 'float', 'real', 'decimal'],
//           correctAnswer: 'real',
//         },
//         {
//           text: 'What does the is keyword check in C#?',
//           options: ['Type compatibility', 'Value', 'Length', 'Reference'],
//           correctAnswer: 'Type compatibility',
//         },
//         {
//           text: 'What is a constructor in C#?',
//           options: [
//             'A method to destroy an object',
//             'A method to initialize an object',
//             'A static method',
//             'A type of class',
//           ],
//           correctAnswer: 'A method to initialize an object',
//         },
//         {
//           text: 'Which of the following is not a loop?',
//           options: ['for', 'while', 'repeat', 'do-while'],
//           correctAnswer: 'repeat',
//         },
//         {
//           text: 'What is the purpose of this keyword?',
//           options: [
//             'Refers to the current instance',
//             'Refers to base class',
//             'Refers to static class',
//             'None',
//           ],
//           correctAnswer: 'Refers to the current instance',
//         },
//         {
//           text: 'What is the output of Console.WriteLine("5" + 5);?',
//           options: ['10', '55', 'Error', '5'],
//           correctAnswer: '55',
//         },
//         {
//           text: 'Which of these keywords is used to inherit a class?',
//           options: ['base', 'extends', ':', 'inherits'],
//           correctAnswer: ':',
//         },
//         {
//           text: 'Which is used to define a constant value in C#?',
//           options: ['final', 'const', 'static', 'define'],
//           correctAnswer: 'const',
//         },
//         {
//           text: 'What is method overloading?',
//           options: [
//             'Defining multiple methods with same name but different parameters',
//             'Defining multiple classes',
//             'Calling multiple methods',
//             'None',
//           ],
//           correctAnswer: 'Defining multiple methods with same name but different parameters',
//         },
//         {
//           text: 'What is the purpose of params keyword?',
//           options: [
//             'Accepts fixed parameters',
//             'Accepts variable number of arguments',
//             'Accepts string parameters',
//             'None',
//           ],
//           correctAnswer: 'Accepts variable number of arguments',
//         },
//         {
//           text: 'Which class is used to work with files in C#?',
//           options: ['FileInfo', 'File', 'StreamWriter', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'What is delegate in C#?',
//           options: ['Class', 'Type-safe function pointer', 'Variable', 'Method'],
//           correctAnswer: 'Type-safe function pointer',
//         },
//         {
//           text: 'What is the purpose of finally block?',
//           options: [
//             'Executes only if exception occurs',
//             'Executes whether exception occurs or not',
//             'Ignores exception',
//             'Stops the program',
//           ],
//           correctAnswer: 'Executes whether exception occurs or not',
//         },
//         {
//           text: 'Which of the following supports multiple inheritance in C#?',
//           options: ['class', 'struct', 'interface', 'object'],
//           correctAnswer: 'interface',
//         },
//         {
//           text: 'Which keyword prevents a class from being inherited?',
//           options: ['stop', 'final', 'sealed', 'static'],
//           correctAnswer: 'sealed',
//         },
//         {
//           text: 'What is LINQ in C#?',
//           options: [
//             'Language Integrated Query',
//             'List Integrated Query',
//             'Linked Query',
//             'Loop in Query',
//           ],
//           correctAnswer: 'Language Integrated Query',
//         },
//         {
//           text: 'What does var keyword do in C#?',
//           options: [
//             'Declares a fixed type variable',
//             'Declares an implicitly typed variable',
//             'Declares a constant',
//             'Declares a static type',
//           ],
//           correctAnswer: 'Declares an implicitly typed variable',
//         },
//       ],
//     };

//     await addDoc(collection(db, 'exams'), exam);
//     console.log('Exam added successfully!');
//   } catch (error) {
//     console.error('Error adding exam:', error);
//   }
// };