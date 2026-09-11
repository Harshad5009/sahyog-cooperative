export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface TranslationDict {
  appName: string;
  tagline: string;
  subTagline: string;
  bookService: string;
  describeProblemPlaceholder: string;
  findRightWorker: string;
  emergencyService: string;
  emergencyTitle: string;
  emergencySub: string;
  verifiedWorkers: string;
  fairAllocationTitle: string;
  fairAllocationSubtitle: string;
  cooperativeEcosystem: string;
  workerPassport: string;
  welfareProtection: string;
  voiceSampleText: string;
  emergencyBadge: string;
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
    emergency: string;
  };
  metrics: {
    workersCount: string;
    avgRating: string;
    servicesDone: string;
    welfareCovered: string;
  };
  bookingSteps: {
    selectService: string;
    selectType: string;
    describeProblem: string;
    uploadPhoto: string;
    dateTime: string;
    location: string;
    priceBreakdown: string;
    workerMatch: string;
    confirm: string;
    payment: string;
    confirmation: string;
  };
  roles: {
    customer: string;
    worker: string;
    admin: string;
  };
  welfareStatus: {
    active: string;
    pending: string;
    notEligible: string;
    actionRequired: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    appName: 'Sahyog',
    tagline: 'Trusted Services. Fair Work. Stronger Cooperatives.',
    subTagline: 'Sahyog connects households and institutions with verified cooperative workers through digital infrastructure that guarantees fair wages, worker welfare, and complete transparency.',
    bookService: 'Book a Service',
    describeProblemPlaceholder: 'Example: My kitchen tap is leaking and needs urgent repair...',
    findRightWorker: 'Find the Right Worker',
    emergencyService: 'Emergency SOS Dispatch',
    emergencyTitle: '24/7 Rapid Emergency Assistance',
    emergencySub: 'Guaranteed 15–20 minute dispatch for burst pipes, electrical short hazards, and emergency patient assistance.',
    emergencyBadge: 'Emergency SOS',
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
      emergency: 'Emergency SOS',
    },
    metrics: {
      workersCount: '10K+ Verified Workers',
      avgRating: '4.8 Average Rating',
      servicesDone: '50K+ Services Completed',
      welfareCovered: '100% Worker Welfare Enabled',
    },
    bookingSteps: {
      selectService: '1. Select Service',
      selectType: '2. Service Type',
      describeProblem: '3. Describe Problem',
      uploadPhoto: '4. Upload Photo',
      dateTime: '5. Date & Time',
      location: '6. Location',
      priceBreakdown: '7. Estimated Price',
      workerMatch: '8. Matched Workers',
      confirm: '9. Confirm Booking',
      payment: '10. Payment',
      confirmation: '11. Confirmation',
    },
    roles: {
      customer: 'Customer',
      worker: 'Cooperative Worker',
      admin: 'Federation Admin',
    },
    welfareStatus: {
      active: 'ACTIVE',
      pending: 'PENDING',
      notEligible: 'NOT ELIGIBLE',
      actionRequired: 'ACTION REQUIRED',
    }
  },
  hi: {
    appName: 'सहयोग',
    tagline: 'विश्वसनीय सेवाएँ। न्यायसंगत कार्य। सशक्त सहकारी संस्थाएँ।',
    subTagline: 'सहयोग परिवारों और संस्थानों को सत्यापित सहकारी श्रमिकों से जोड़ता है, जो उचित पारिश्रमिक, सामाजिक सुरक्षा और पूर्ण पारदर्शिता सुनिश्चित करता है।',
    bookService: 'सेवा बुक करें',
    describeProblemPlaceholder: 'उदाहरण: रसोई का नल टपक रहा है और तत्काल मरम्मत की आवश्यकता है...',
    findRightWorker: 'उचित श्रमिक खोजें',
    emergencyService: 'आपातकालीन SOS सेवा',
    emergencyTitle: '२४/७ त्वरित आपातकालीन सहायता',
    emergencySub: 'फटे हुए पाइप, शॉर्ट सर्किट और आपातकालीन देखभाल के लिए १५-२० मिनट में गारंटीकृत सेवा।',
    emergencyBadge: 'आपातकालीन SOS',
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
      emergency: 'आपातकालीन SOS',
    },
    metrics: {
      workersCount: '१०,०००+ सत्यापित श्रमिक',
      avgRating: '४.८ औसत रेटिंग',
      servicesDone: '५०,०००+ पूर्ण कार्य',
      welfareCovered: '१००% कल्याण कोष सुरक्षा',
    },
    bookingSteps: {
      selectService: '१. सेवा चुनें',
      selectType: '२. सेवा प्रकार',
      describeProblem: '३. समस्या विवरण',
      uploadPhoto: '४. फोटो अपलोड',
      dateTime: '५. दिनांक व समय',
      location: '६. स्थान',
      priceBreakdown: '७. अनुमानित शुल्क',
      workerMatch: '८. चयनित श्रमिक',
      confirm: '९. पुष्टि करें',
      payment: '१०. भुगतान',
      confirmation: '११. बुकिंग पुष्टि',
    },
    roles: {
      customer: 'ग्राहक',
      worker: 'सहकारी श्रमिक',
      admin: 'फेडरेशन एडमिन',
    },
    welfareStatus: {
      active: 'सक्रिय (ACTIVE)',
      pending: 'प्रक्रियाधीन (PENDING)',
      notEligible: 'अपात्र (NOT ELIGIBLE)',
      actionRequired: 'कार्रवाई आवश्यक (ACTION REQUIRED)',
    }
  },
  mr: {
    appName: 'सहयोग',
    tagline: 'विश्वसनीय सेवा. न्याय्य काम. सक्षम सहकारी संस्था.',
    subTagline: 'सहयोग नागरिक व संस्थांना कामगार सहकारी संस्थांशी जोडते. न्याय्य वेतन, सामाजिक सुरक्षा आणि संपूर्ण पारदर्शकता यांची हमी देणारी डिजिटल प्रणाली.',
    bookService: 'सेवा बुक करा',
    describeProblemPlaceholder: 'उदा: माझ्या घरातील नळ खराब झाला असून तातडीने दुरुस्ती हवी आहे...',
    findRightWorker: 'योग्य कामगार निवडा',
    emergencyService: 'तातडीची आपत्कालीन SOS सेवा',
    emergencyTitle: '२४/७ तत्काळ आपत्कालीन सहाय्य',
    emergencySub: 'नळ फुटणे, शॉर्ट सर्किट किंवा तातडीच्या रुग्ण सहाय्यासाठी १५ ते २० मिनिटांत कामगार दाखल होण्याची हमी.',
    emergencyBadge: 'आपत्कालीन SOS',
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
      emergency: 'आपत्कालीन SOS',
    },
    metrics: {
      workersCount: '१०,०००+ नोंदणीकृत कामगार',
      avgRating: '४.८ सरासरी ग्राहक समाधान',
      servicesDone: '५०,०००+ यशस्वी सेवा',
      welfareCovered: '१००% कामगार कल्याण संरक्षण',
    },
    bookingSteps: {
      selectService: '१. सेवा निवडा',
      selectType: '२. सेवा प्रकार',
      describeProblem: '३. समस्या सांगा',
      uploadPhoto: '४. फोटो जोडा',
      dateTime: '५. तारीख व वेळ',
      location: '६. पत्ता व ठिकाण',
      priceBreakdown: '७. शुल्क तपशील',
      workerMatch: '८. कामगार जुळणी',
      confirm: '९. खात्री करा',
      payment: '१०. डिजिटल देयक',
      confirmation: '११. बुकिंग पावती',
    },
    roles: {
      customer: 'ग्राहक',
      worker: 'सहकारी कामगार',
      admin: 'महासंघ प्रशासक',
    },
    welfareStatus: {
      active: 'सक्रिय (ACTIVE)',
      pending: 'प्रलंबित (PENDING)',
      notEligible: 'अपात्र (NOT ELIGIBLE)',
      actionRequired: 'तात्काळ कारवाई (ACTION REQUIRED)',
    }
  }
};
