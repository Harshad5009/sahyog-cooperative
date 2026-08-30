export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface TranslationDict {
  appName: string;
  tagline: string;
  subTagline: string;
  bookService: string;
  describeProblemPlaceholder: string;
  findRightWorker: string;
  emergencyService: string;
  verifiedWorkers: string;
  fairAllocationTitle: string;
  fairAllocationSubtitle: string;
  cooperativeEcosystem: string;
  workerPassport: string;
  welfareProtection: string;
  voiceSampleText: string;
  nav: {
    home: string;
    services: string;
    howItWorks: string;
    forWorkers: string;
    forCooperatives: string;
    aboutUs: string;
    login: string;
    signup: string;
    dashboard: string;
  };
  metrics: {
    workersCount: string;
    avgRating: string;
    servicesDone: string;
    welfareCovered: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    appName: 'Sahyog',
    tagline: 'Trusted Services. Empowered Workers. Stronger Communities.',
    subTagline: 'Sahyog connects households and institutions with verified cooperative workers while ensuring fair work opportunities, transparent pricing, and stronger local communities.',
    bookService: 'Book a Service',
    describeProblemPlaceholder: 'Example: My kitchen tap is leaking and needs urgent repair...',
    findRightWorker: 'Find the Right Worker',
    emergencyService: '🚨 Emergency SOS Dispatch',
    verifiedWorkers: '10,000+ Verified Cooperative Workers',
    fairAllocationTitle: 'AI That Distributes Work Fairly',
    fairAllocationSubtitle: 'Sahyog balances customer needs with worker availability, certifications, location, and workload — preventing algorithmic exhaustion.',
    cooperativeEcosystem: 'Democratic Labour Federation Network',
    workerPassport: 'Digital Skill Passport',
    welfareProtection: '₹5 Lakh Health & Accident Cover',
    voiceSampleText: 'My bathroom pipe is leaking and needs urgent repair.',
    nav: {
      home: 'Home',
      services: 'Services',
      howItWorks: 'How It Works',
      forWorkers: 'For Workers',
      forCooperatives: 'For Cooperatives',
      aboutUs: 'About Us',
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard',
    },
    metrics: {
      workersCount: '10K+ Verified Workers',
      avgRating: '4.8 Average Rating',
      servicesDone: '50K+ Services Completed',
      welfareCovered: '100% Worker Welfare Enabled',
    }
  },
  hi: {
    appName: 'सहयोग',
    tagline: 'विश्वसनीय सेवाएँ। सशक्त श्रमिक। सुदृढ़ समाज।',
    subTagline: 'सहयोग परिवारों और संस्थानों को सत्यापित सहकारी श्रमिकों से जोड़ता है, जिससे पारदर्शी मूल्य निर्धारण, निष्पक्ष कार्य आवंटन और सामाजिक सुरक्षा सुनिश्चित होती है।',
    bookService: 'सेवा बुक करें',
    describeProblemPlaceholder: 'उदाहरण: रसोई का नल टपक रहा है और तत्काल मरम्मत की आवश्यकता है...',
    findRightWorker: 'उचित श्रमिक खोजें',
    emergencyService: '🚨 आपातकालीन SOS सेवा',
    verifiedWorkers: '१०,०००+ सत्यापित सहकारी श्रमिक',
    fairAllocationTitle: 'AI जो कार्य का निष्पक्ष वितरण करता है',
    fairAllocationSubtitle: 'सहयोग ग्राहक की जरूरतों को श्रमिक की उपलब्धता, कौशल, स्थान और वर्तमान कार्यभार के साथ संतुलित करता है।',
    cooperativeEcosystem: 'लोकतांत्रिक श्रम सहकारी संघ',
    workerPassport: 'डिजिटल कौशल पासपोर्ट',
    welfareProtection: '₹५ लाख स्वास्थ्य एवं दुर्घटना सुरक्षा',
    voiceSampleText: 'रसोई का नल टपक रहा है और पानी भर रहा है, जल्द ठीक कराएं।',
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      howItWorks: 'यह कैसे काम करता है',
      forWorkers: 'श्रमिकों के लिए',
      forCooperatives: 'सहकारी संस्थाओं के लिए',
      aboutUs: 'हमारे बारे में',
      login: 'लॉग इन',
      signup: 'साइन अप',
      dashboard: 'डैशबोर्ड',
    },
    metrics: {
      workersCount: '१०,०००+ सत्यापित श्रमिक',
      avgRating: '४.८ औसत रेटिंग',
      servicesDone: '५०,०००+ पूर्ण कार्य',
      welfareCovered: '१००% कल्याण कोष सुरक्षा',
    }
  },
  mr: {
    appName: 'सहयोग',
    tagline: 'विश्वसनीय सेवा. सक्षम कामगार. समृद्ध समाज.',
    subTagline: 'सहयोग नागरिक व संस्थांना कामगार सहकारी संस्थांशी जोडते. न्याय्य काम वाटप, पारदर्शक दर आणि कामगार कल्याण निधीची खात्री देते.',
    bookService: 'सेवा बुक करा',
    describeProblemPlaceholder: 'उदा: माझ्या घरातील नळ खराब झाला असून तातडीने दुरुस्ती हवी आहे...',
    findRightWorker: 'योग्य कामगार निवडा',
    emergencyService: '🚨 तातडीची आपत्कालीन SOS सेवा',
    verifiedWorkers: '१०,०००+ अधिकृत सहकारी कामगार',
    fairAllocationTitle: 'न्याय्य काम वाटप करणारी AI यंत्रणा',
    fairAllocationSubtitle: 'सहयोग एकाच कामगारावर कामाचा ताण न टाकता कौशल्य, अंतर, कामाचा अनुभव आणि आजचे काम याचा विचार करून काम वाटप करते.',
    cooperativeEcosystem: 'लोकशाही कामगार सहकारी महासंघ',
    workerPassport: 'डिजिटल कौशल्य पासपोर्ट',
    welfareProtection: '₹५ लाख अपघात व आरोग्य विमा संरक्षण',
    voiceSampleText: 'माझ्या घरातील नळ खराब झाला आहे आणि पाणी गळत आहे.',
    nav: {
      home: 'मुख्यपृष्ठ',
      services: 'सर्व सेवा',
      howItWorks: 'कसे चालते',
      forWorkers: 'कामगारांसाठी',
      forCooperatives: 'सहकारी संस्थांसाठी',
      aboutUs: 'आमच्याविषयी',
      login: 'प्रवेश (Login)',
      signup: 'नोंदणी करा',
      dashboard: 'डॅशबोर्ड',
    },
    metrics: {
      workersCount: '१०,०००+ नोंदणीकृत कामगार',
      avgRating: '४.८ सरासरी ग्राहक समाधान',
      servicesDone: '५०,०००+ यशस्वी सेवा',
      welfareCovered: '१००% कामगार कल्याण संरक्षण',
    }
  }
};
