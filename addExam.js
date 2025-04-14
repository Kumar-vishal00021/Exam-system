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
      title: '.NET Framework and C# Assessment',
      subject: 'C# Programming',
      description:
        'A comprehensive assessment of .NET Framework and C# concepts, covering data types, CLR, object-oriented programming, collections, and more, ideal for interviews and exams.',
      questions: [
        {
          text: 'Which of the following is the base class for all data types in C#?',
          options: ['System.Type', 'System.Base', 'System.Object', 'System.Data'],
          correctAnswer: 'System.Object',
        },
        {
          text: 'Which component of the .NET Framework provides runtime environment?',
          options: ['BCL', 'CLR', 'CTS', 'CLS'],
          correctAnswer: 'CLR',
        },
        {
          text: 'What is the default access modifier of a class in C#?',
          options: ['public', 'private', 'internal', 'protected'],
          correctAnswer: 'internal',
        },
        {
          text: 'Which keyword is used to create an object in C#?',
          options: ['create', 'alloc', 'new', 'object'],
          correctAnswer: 'new',
        },
        {
          text: 'Which operator is used to access members of a class or struct?',
          options: [':', '->', '.', '::'],
          correctAnswer: '.',
        },
        {
          text: 'Which keyword is used for inheritance in C#?',
          options: ['implements', 'inherits', 'extends', ':'],
          correctAnswer: ':',
        },
        {
          text: 'The concept of reusing the fields and methods of an existing class is called?',
          options: ['Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction'],
          correctAnswer: 'Inheritance',
        },
        {
          text: 'Which of these is NOT a value type in C#?',
          options: ['int', 'double', 'enum', 'string'],
          correctAnswer: 'string',
        },
        {
          text: 'Which method is used to convert a string to an integer in C#?',
          options: ['Convert.ToString()', 'int.Parse()', 'string.Parse()', 'ToInt()'],
          correctAnswer: 'int.Parse()',
        },
        {
          text: 'Boxing is the process of:',
          options: [
            'Converting value type to reference type',
            'Converting reference type to value type',
            'Comparing types',
            'Converting object to string',
          ],
          correctAnswer: 'Converting value type to reference type',
        },
        {
          text: 'Which loop will always execute at least once?',
          options: ['for', 'while', 'do-while', 'foreach'],
          correctAnswer: 'do-while',
        },
        {
          text: 'What is the file extension for a C# source file?',
          options: ['.cpp', '.cs', '.c', '.c#'],
          correctAnswer: '.cs',
        },
        {
          text: 'What is the output of: Console.WriteLine(5/2);',
          options: ['2', '2.5', '2.0', 'Error'],
          correctAnswer: '2',
        },
        {
          text: 'What does CLR stand for?',
          options: [
            'Common Language Runtime',
            'Common Language Reader',
            'Code Language Reader',
            'Common Logic Runtime',
          ],
          correctAnswer: 'Common Language Runtime',
        },
        {
          text: 'Which of these is NOT a .NET language?',
          options: ['C#', 'VB.NET', 'Java', 'F#'],
          correctAnswer: 'Java',
        },
        {
          text: 'Which keyword is used to define an interface in C#?',
          options: ['interface', 'Interface', 'Iinterface', 'implements'],
          correctAnswer: 'interface',
        },
        {
          text: 'Which is a reference type in C#?',
          options: ['int', 'enum', 'struct', 'string'],
          correctAnswer: 'string',
        },
        {
          text: 'Which one is the correct way to declare an array in C#?',
          options: [
            'int arr[] = new int[5];',
            'int[] arr = new int[5];',
            'arr int[] = new int[5];',
            'array int arr = 5;',
          ],
          correctAnswer: 'int[] arr = new int[5];',
        },
        {
          text: 'What is the use of using directive in C#?',
          options: [
            'For importing a namespace',
            'For looping',
            'For conditional statements',
            'For error handling',
          ],
          correctAnswer: 'For importing a namespace',
        },
        {
          text: 'Which access modifier allows a class member to be accessible only within the same assembly?',
          options: ['protected', 'internal', 'public', 'private'],
          correctAnswer: 'internal',
        },
        {
          text: 'Which collection class uses key-value pairs?',
          options: ['List', 'Queue', 'Stack', 'Dictionary'],
          correctAnswer: 'Dictionary',
        },
        {
          text: 'Which method is used to compare two strings in C#?',
          options: ['Equals()', 'CompareTo()', '==', 'All of the above'],
          correctAnswer: 'All of the above',
        },
        {
          text: 'What is null in C#?',
          options: ['0', 'An empty string', 'No reference', 'A Boolean'],
          correctAnswer: 'No reference',
        },
        {
          text: 'Which method is the starting point of a C# application?',
          options: ['Start()', 'Run()', 'Main()', 'Init()'],
          correctAnswer: 'Main()',
        },
        {
          text: 'Which keyword is used for exception handling in C#?',
          options: ['try-catch', 'exception', 'throw', 'error'],
          correctAnswer: 'try-catch',
        },
        {
          text: 'Which of the following is a loop structure in C#?',
          options: ['do-while', 'while', 'for', 'All of the above'],
          correctAnswer: 'All of the above',
        },
        {
          text: 'What is the result of true && false in C#?',
          options: ['true', 'false', '1', '0'],
          correctAnswer: 'false',
        },
        {
          text: 'Which operator is used for conditional checking in C#?',
          options: ['==', '=', '!=', 'A and C'],
          correctAnswer: 'A and C',
        },
        {
          text: 'What is the maximum value of int in C#?',
          options: ['32767', '2147483647', '65535', '999999999'],
          correctAnswer: '2147483647',
        },
        {
          text: 'Which method is used to print on the console in C#?',
          options: ['Print()', 'WriteLine()', 'show()', 'display()'],
          correctAnswer: 'WriteLine()',
        },
        {
          text: 'Which of the following is not a keyword in C#?',
          options: ['sealed', 'void', 'interface', 'include'],
          correctAnswer: 'include',
        },
        {
          text: 'Which keyword is used to create an abstract class in C#?',
          options: ['base', 'abstract', 'virtual', 'interface'],
          correctAnswer: 'abstract',
        },
        {
          text: 'The term CTS stands for:',
          options: [
            'Common Type Structure',
            'Common Type System',
            'Common Text System',
            'Central Type System',
          ],
          correctAnswer: 'Common Type System',
        },
        {
          text: 'Which is NOT a valid data type in C#?',
          options: ['char', 'float', 'real', 'decimal'],
          correctAnswer: 'real',
        },
        {
          text: 'What does the is keyword check in C#?',
          options: ['Type compatibility', 'Value', 'Length', 'Reference'],
          correctAnswer: 'Type compatibility',
        },
        {
          text: 'What is a constructor in C#?',
          options: [
            'A method to destroy an object',
            'A method to initialize an object',
            'A static method',
            'A type of class',
          ],
          correctAnswer: 'A method to initialize an object',
        },
        {
          text: 'Which of the following is not a loop?',
          options: ['for', 'while', 'repeat', 'do-while'],
          correctAnswer: 'repeat',
        },
        {
          text: 'What is the purpose of this keyword?',
          options: [
            'Refers to the current instance',
            'Refers to base class',
            'Refers to static class',
            'None',
          ],
          correctAnswer: 'Refers to the current instance',
        },
        {
          text: 'What is the output of Console.WriteLine("5" + 5);?',
          options: ['10', '55', 'Error', '5'],
          correctAnswer: '55',
        },
        {
          text: 'Which of these keywords is used to inherit a class?',
          options: ['base', 'extends', ':', 'inherits'],
          correctAnswer: ':',
        },
        {
          text: 'Which is used to define a constant value in C#?',
          options: ['final', 'const', 'static', 'define'],
          correctAnswer: 'const',
        },
        {
          text: 'What is method overloading?',
          options: [
            'Defining multiple methods with same name but different parameters',
            'Defining multiple classes',
            'Calling multiple methods',
            'None',
          ],
          correctAnswer: 'Defining multiple methods with same name but different parameters',
        },
        {
          text: 'What is the purpose of params keyword?',
          options: [
            'Accepts fixed parameters',
            'Accepts variable number of arguments',
            'Accepts string parameters',
            'None',
          ],
          correctAnswer: 'Accepts variable number of arguments',
        },
        {
          text: 'Which class is used to work with files in C#?',
          options: ['FileInfo', 'File', 'StreamWriter', 'All of the above'],
          correctAnswer: 'All of the above',
        },
        {
          text: 'What is delegate in C#?',
          options: ['Class', 'Type-safe function pointer', 'Variable', 'Method'],
          correctAnswer: 'Type-safe function pointer',
        },
        {
          text: 'What is the purpose of finally block?',
          options: [
            'Executes only if exception occurs',
            'Executes whether exception occurs or not',
            'Ignores exception',
            'Stops the program',
          ],
          correctAnswer: 'Executes whether exception occurs or not',
        },
        {
          text: 'Which of the following supports multiple inheritance in C#?',
          options: ['class', 'struct', 'interface', 'object'],
          correctAnswer: 'interface',
        },
        {
          text: 'Which keyword prevents a class from being inherited?',
          options: ['stop', 'final', 'sealed', 'static'],
          correctAnswer: 'sealed',
        },
        {
          text: 'What is LINQ in C#?',
          options: [
            'Language Integrated Query',
            'List Integrated Query',
            'Linked Query',
            'Loop in Query',
          ],
          correctAnswer: 'Language Integrated Query',
        },
        {
          text: 'What does var keyword do in C#?',
          options: [
            'Declares a fixed type variable',
            'Declares an implicitly typed variable',
            'Declares a constant',
            'Declares a static type',
          ],
          correctAnswer: 'Declares an implicitly typed variable',
        },
      ],
    };

    await addDoc(collection(db, 'exams'), exam);
    console.log('Exam added successfully!');
  } catch (error) {
    console.error('Error adding exam:', error);
  }
};

// Run the function
addExam();