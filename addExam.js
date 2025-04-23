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

const addExam = async () => {
  try {
    await signInWithEmailAndPassword(auth, 'kumarvishal00021@gmail.com', 'Vishal@1234');
//     const exam = {
//       title: 'Mobile Computing Assessment',
//       subject: 'Mobile Computing',
//       description: 'A comprehensive assessment of mobile computing concepts, covering GSM, Bluetooth, wireless LAN, and related technologies, ideal for interviews and exams.',
//       questions: [
//         {
//           text: 'Which of the following usually stores all user-related data that is also relevant to GSM mobile systems?',
//           options: ['VLR', 'HMR', 'CMR', 'SIM'],
//           correctAnswer: 'SIM',
//         },
//         {
//           text: 'Which of the following stores Mobile Subscriber ISDN number - MSISDN?',
//           options: ['Home location register', 'Visitor location register', 'Entity equipment register', 'None of the above'],
//           correctAnswer: 'Home location register',
//         },
//         {
//           text: 'The base station covers a specific area that is called a --',
//           options: ['Cell', 'Tessellate', 'Mobile station', 'None of the above'],
//           correctAnswer: 'Cell',
//         },
//         {
//           text: 'Bluetooth Technology supports',
//           options: ['Piconet', 'Ad hoc piconet', 'Scatter net', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Which of the following wireless technology is used for exchanging data between a variety of fixed and mobile devices over a very short diameter?',
//           options: ['Mobile technology', 'Bluetooth technology', 'Ad hoc computing', 'None of the above'],
//           correctAnswer: 'Bluetooth technology',
//         },
//         {
//           text: 'Which of the following uses high-frequency radio waves instead of cables for connecting the devices in LAN?',
//           options: ['Wired LAN', 'Wireless LAN', 'Fiber made LAN', 'None of the above'],
//           correctAnswer: 'Wireless LAN',
//         },
//         {
//           text: 'Which of the following is/are the advantages of a wireless LAN?',
//           options: ['Flexibility', 'Ease of use', 'Robustness', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'In piconet devices connected with the master is called',
//           options: ['Slaves', 'Parked', 'Standby', 'None of the above'],
//           correctAnswer: 'Slaves',
//         },
//         {
//           text: 'All transactions must satisfy the',
//           options: ['Consistency', 'Availability', 'ACID Property', 'All of the above'],
//           correctAnswer: 'ACID Property',
//         },
//         {
//           text: 'The most important feature/s of mobile computing technology is/are --',
//           options: ['Mobility', 'Portability', 'Wireless connectivity', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Which of the following is the base of most mobile communications?',
//           options: ['GSM', 'GPRS', 'CDMA', 'None of the above'],
//           correctAnswer: 'GSM',
//         },
//         {
//           text: 'In a cellular system, the shape of the cell is generally --',
//           options: ['Hexagon', 'Circular', 'Square', 'None of the above'],
//           correctAnswer: 'Hexagon',
//         },
//         {
//           text: 'Important mobile computing application/s is/are',
//           options: ['Education', 'Sports', 'Games', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Challenges of mobile computing include',
//           options: ['Low Security', 'Ad hoc Networking', 'Shared medium', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'The base station covers a specific area that is called a --',
//           options: ['Cell', 'Radius', 'Tessellate', 'None of the above'],
//           correctAnswer: 'Cell',
//         },
//         {
//           text: 'The overlapping portion of two piconets is called--',
//           options: ['Piconet', 'Ad hoc piconet', 'Scatter net', 'All of the above'],
//           correctAnswer: 'Scatter net',
//         },
//         {
//           text: 'The overlapping portion of two piconets is called--',
//           options: ['Piconet', 'Ad hoc piconet', 'Scatter net', 'All of the above'],
//           correctAnswer: 'Scatter net',
//         },
//         {
//           text: 'The term "HLR" stands for the',
//           options: ['Home Location Register', 'House Location Register', 'Home Live Register', 'None of the above'],
//           correctAnswer: 'Home Location Register',
//         },
//         {
//           text: 'The term TDM stands for',
//           options: ['Time Division Multiplexing', 'Transfer Multiplexing', 'Tedious Division Multiplexing', 'None of the above'],
//           correctAnswer: 'Time Division Multiplexing',
//         },
//         {
//           text: 'The hexagon shape is used for radio coverage because',
//           options: ['It uses the maximum area for coverage', 'Fewer number of cells are required', 'It approximates a circular radiation pattern', 'All of the above'],
//           correctAnswer: 'It uses the maximum area for coverage',
//         },
//         {
//           text: 'Which of the following is known as one of the responsibilities of Mobile Switching Centre (or MSC) in cellular telephone systems?',
//           options: ['Connection of mobile to PSTN', 'Connection of base station to MSC', 'Connection of mobile to base stations', 'All of the above'],
//           correctAnswer: 'Connection of mobile to PSTN',
//         },
//         {
//           text: 'In which one of the following codes with specific characteristics can be applied to the transmission?',
//           options: ['CDMA', 'GPRS', 'GSM', 'All of the above'],
//           correctAnswer: 'CDMA',
//         },
//         {
//           text: 'Which of the following offers packet mode data transfer service over the cellular network?',
//           options: ['TCP', 'GPRS', 'GSM', 'None of the above'],
//           correctAnswer: 'GPRS',
//         },
//         {
//           text: 'Which one of the following enables us to use the entire bandwidth simultaneously?',
//           options: ['TDMA', 'CDMA', 'FDMA', 'All of the above'],
//           correctAnswer: 'CDMA',
//         },
//         {
//           text: 'In the Cellular Network, on which of the following, the cell\'s shape depends?',
//           options: ['Political conditions', 'Social Conditions', 'Environment Condition', 'None of the above'],
//           correctAnswer: 'Environment Condition',
//         },
//         {
//           text: 'In a Cellular network, which of the following is used to use the same frequency for others?',
//           options: ['Frequency hopping', 'Frequency reuse', 'Frequency planning', 'None of the above'],
//           correctAnswer: 'Frequency reuse',
//         },
//         {
//           text: 'Which one of the following can be considered as the features of CODA?',
//           options: ['A disconnected operation for mobile computing', 'It is freely available under a liberal license', 'It provides high performance through client-side persistent caching', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'Which of the following can be considered as the advantage of using frequency reuse?',
//           options: ['The same spectrum can be allocated to the other networks', 'Only a limited spectrum is required', 'Increase capacity', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'In which one of the following, the slow and fast hopping is used?',
//           options: ['GSM', 'GPRS', 'FHSS', 'None of the above'],
//           correctAnswer: 'FHSS',
//         },
//         {
//           text: 'Mobile Computing allows transmission of data from one wireless-enabled device to another_',
//           options: ['Any device', 'Wired device', 'Wireless-enabled device', 'None of the above'],
//           correctAnswer: 'Wireless-enabled device',
//         },
//         {
//           text: 'Which of the following can be considered as the drawbacks of the Mobile and Wireless Devices?',
//           options: ['Smaller keypads', 'Consumes power rapidly', 'Requires a big power source', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'In general, a mobile computing environment can also be considered as the type of environment.',
//           options: ['Grid computing', 'Mobile computing', 'Distributed computing', 'None of the above'],
//           correctAnswer: 'Distributed computing',
//         },
//         {
//           text: 'Which of the following is a fundamental principle of wireless communication?',
//           options: ['Electromagnetic waves', 'Microwaves', 'Both A and B', 'None of the above'],
//           correctAnswer: 'Electromagnetic waves',
//         },
//         {
//           text: 'When was the 2G communication introduced in the market?',
//           options: ['1982', '1984', '1986', '1988'],
//           correctAnswer: '1988',
//         },
//         {
//           text: 'Which of the following supports data rates of 4G Networks?',
//           options: ['1024 kbps', '100 Mbps', '200 Mbps', 'None of the above'],
//           correctAnswer: '100 Mbps',
//         },
//         {
//           text: 'Which one of the following is considered as the GSM supplementary service?',
//           options: ['Emergency number', 'SMS', 'Call forwarding', 'All of the above'],
//           correctAnswer: 'Call forwarding',
//         },
//         {
//           text: 'How many sub-systems are Global Systems for Mobiles?',
//           options: ['4', '3', '2', 'None of the above'],
//           correctAnswer: '3',
//         },
//         {
//           text: 'Which of the following is considered as the heart of the Global Systems for Mobiles (or GSM)?',
//           options: ['Networks Switching Sub System', 'Operational Support Sub-system', 'Base Station Subsystem', 'None of the above'],
//           correctAnswer: 'Networks Switching Sub System',
//         },
//         {
//           text: 'The term "HLR" stands for the',
//           options: ['Home Location Register', 'House Location Register', 'Home Live Register', 'None of the above'],
//           correctAnswer: 'Home Location Register',
//         },
//         {
//           text: 'The term TDM stands for',
//           options: ['Time Division Multiplexing', 'Transfer Multiplexing', 'Tedious Division Multiplexing', 'None of the above'],
//           correctAnswer: 'Time Division Multiplexing',
//         },
//         {
//           text: 'In which one of the following times is specifically divided into several time slots that are in the fixed patterns?',
//           options: ['CDMA', 'TDMA', 'FDMA', 'All of the above'],
//           correctAnswer: 'TDMA',
//         },
//         {
//           text: 'The paging system can be used for',
//           options: ['Sending numeric messages', 'Audio Calls', 'Sending alphanumeric messages', 'All of the above'],
//           correctAnswer: 'All of the above',
//         },
//         {
//           text: 'The term refers to transporting a mobile station from one base station to another base station.',
//           options: ['Roamer', 'Forward channel', 'Handoff or hand over', 'MIN'],
//           correctAnswer: 'Handoff or hand over',
//         },
//         {
//           text: 'Radio capacity may be increased in cellular by',
//           options: ['Increase in the radio spectrum', 'Increasing the number of base stations & reusing the channels', 'None of the above', 'Both a & b'],
//           correctAnswer: 'Increasing the number of base stations & reusing the channels',
//         },
//         {
//           text: 'Which of the following is also known as the developer of the world\'s first cellular system?',
//           options: ['Bellcore and Motorola', 'Nippon Telephone and Telegraph (NTT)', 'Qualcomm', 'None of the above'],
//           correctAnswer: 'Nippon Telephone and Telegraph (NTT)',
//         },
//         {
//           text: 'Which one of the following is not referred as the characteristics of the cellular telephone system?',
//           options: ['Large frequency spectrum', 'Limited frequency spectrum', 'Accommodate a large number of users', 'None of the above'],
//           correctAnswer: 'Large frequency spectrum',
//         },
//       ],
//     };
const exam = {
  title: 'Computer Forensics Assessment',
  subject: 'Computer Forensics',
  description: 'A comprehensive assessment of computer forensics concepts, covering digital evidence, cybercrimes, forensic techniques, and legal aspects, ideal for exams and interviews.',
  questions: [
    // Unit I: Introduction to Computer Forensics
    {
      text: 'What is the primary objective of computer forensics?',
      options: ['To delete data from a system', 'To recover and analyze digital evidence', 'To create computer viruses', 'To modify system logs'],
      correctAnswer: 'To recover and analyze digital evidence',
    },
    {
      text: 'Which of the following is NOT a task in computer forensics?',
      options: ['Collecting evidence', 'Destroying evidence', 'Recovering evidence', 'Preserving evidence'],
      correctAnswer: 'Destroying evidence',
    },
    {
      text: 'What is the first step in a forensic investigation?',
      options: ['Analyzing the evidence', 'Preparing for an investigation', 'Creating a forensic report', 'Presenting evidence in court'],
      correctAnswer: 'Preparing for an investigation',
    },
    {
      text: 'What is a major challenge in cybercrime laws?',
      options: ['Low enforcement costs', 'Jurisdictional issues', 'Easy identification of criminals', 'Readily available evidence'],
      correctAnswer: 'Jurisdictional issues',
    },
    {
      text: 'Which of the following ensures that digital evidence remains unaltered?',
      options: ['Encryption', 'Hashing', 'File compression', 'Firewall protection'],
      correctAnswer: 'Hashing',
    },
    {
      text: 'What type of evidence is considered in digital forensics?',
      options: ['Emails', 'Chat logs', 'Browser history', 'All of the above'],
      correctAnswer: 'All of the above',
    },
    {
      text: 'Which law enforcement principle applies to handling digital evidence?',
      options: ['Chain of custody', 'Freedom of information', 'User confidentiality', 'Online piracy protection'],
      correctAnswer: 'Chain of custody',
    },
    {
      text: 'What does "preserving evidence" mean in digital forensics?',
      options: ['Deleting all unnecessary files', 'Keeping evidence unchanged and secure', 'Encrypting evidence to hide it', 'Modifying evidence to fit the case'],
      correctAnswer: 'Keeping evidence unchanged and secure',
    },
    // Unit II: Computer Crimes
    {
      text: 'Which of the following is an example of a violent cybercrime?',
      options: ['Identity theft', 'Cyberstalking', 'Software piracy', 'Data leakage'],
      correctAnswer: 'Cyberstalking',
    },
    {
      text: 'Which of the following is NOT a type of nonviolent cybercrime?',
      options: ['Online fraud', 'Phishing', 'Cyberterrorism', 'Hacking'],
      correctAnswer: 'Cyberterrorism',
    },
    {
      text: 'Where is cybercrime evidence often stored?',
      options: ['Temporary files', 'Emails', 'Chat logs', 'All of the above'],
      correctAnswer: 'All of the above',
    },
    {
      text: 'Which law targets child pornography online?',
      options: ['CFAA', 'COPPA', 'DMCA', 'CAN-SPAM Act'],
      correctAnswer: 'COPPA',
    },
    {
      text: 'What is cyber trespassing?',
      options: ['Gaining unauthorized access to a system', 'Sending spam emails', 'Deleting user files accidentally', 'Legal hacking by government agencies'],
      correctAnswer: 'Gaining unauthorized access to a system',
    },
    // Unit III: Computer Criminals
    {
      text: 'What does MAC stand for in forensic analysis?',
      options: ['Modify, Access, Create', 'Memory, Analysis, Computation', 'Malware, Attack, Control', 'Modem, Antivirus, Cybersecurity'],
      correctAnswer: 'Modify, Access, Create',
    },
    {
      text: 'Why are MAC times unreliable?',
      options: ['They change unpredictably', 'They can be easily erased', 'They only work on Linux systems', 'They are stored in RAM'],
      correctAnswer: 'They change unpredictably',
    },
    {
      text: 'Which of the following is NOT a type of cybercriminal?',
      options: ['Script kiddies', 'Hacktivists', 'Cyber investigators', 'Insider threats'],
      correctAnswer: 'Cyber investigators',
    },
    {
      text: 'What is the role of cyber investigators?',
      options: ['They create hacking tools', 'They analyze digital evidence', 'They spread malware', 'They delete evidence'],
      correctAnswer: 'They analyze digital evidence',
    },
    {
      text: 'What does a crime timeline help determine?',
      options: ['When a crime was committed', 'Who committed the crime', 'Where the crime occurred', 'How to alter the evidence'],
      correctAnswer: 'When a crime was committed',
    },
    // Unit IV: Building a Cybercrime Case
    {
      text: 'Which of the following is NOT a body of law?',
      options: ['Constitutional law', 'Federal law', 'Administrative law', 'Cyber Law Enforcement Act'],
      correctAnswer: 'Cyber Law Enforcement Act',
    },
    {
      text: 'Which law applies to computer crimes at an international level?',
      options: ['GDPR', 'DMCA', 'CFAA', 'CAN-SPAM Act'],
      correctAnswer: 'GDPR',
    },
    {
      text: 'What is vicarious liability in cyber law?',
      options: ['An employer is responsible for an employee\'s cybercrime', 'A hacker is always anonymous', 'Evidence can be deleted if necessary', 'Only government agencies can prosecute cybercriminals'],
      correctAnswer: 'An employer is responsible for an employee\'s cybercrime',
    },
    {
      text: 'Which law combats spam emails?',
      options: ['CFAA', 'CAN-SPAM Act', 'DMCA', 'GDPR'],
      correctAnswer: 'CAN-SPAM Act',
    },
    // Unit V: Preserving and Recovering Digital Evidence
    {
      text: 'What is the purpose of disk imaging?',
      options: ['To modify files', 'To create an exact copy of a disk', 'To compress files', 'To delete system logs'],
      correctAnswer: 'To create an exact copy of a disk',
    },
    {
      text: 'What does a hash function verify?',
      options: ['Data integrity', 'File permissions', 'Internet connection', 'Operating system updates'],
      correctAnswer: 'Data integrity',
    },
    {
      text: 'Where can deleted data often be found?',
      options: ['File system metadata', 'Firewall logs', 'BIOS', 'Antivirus software'],
      correctAnswer: 'File system metadata',
    },
    {
      text: 'What does a file header contain?',
      options: ['File type and metadata', 'File content', 'Encryption key', 'Deleted records'],
      correctAnswer: 'File type and metadata',
    },
    {
      text: 'Which method is used to establish a digital crime timeline?',
      options: ['MAC timestamps', 'Network scanning', 'Data encryption', 'Social engineering'],
      correctAnswer: 'MAC timestamps',
    },
  ],
};

    await addDoc(collection(db, 'exams'), exam);
    console.log('Exam added successfully!');
  } catch (error) {
    console.error('Error adding exam:', error);
  }
};

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
addExam();