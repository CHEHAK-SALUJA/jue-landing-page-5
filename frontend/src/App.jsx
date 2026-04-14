import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import NewsCarousel from './components/NewsCarousel';
import HighlightsCarousel from './components/HighlightsCarousel';
import './index.css';
import namasteIcon from './assets/namaste.png';
import japan1 from './assets/ai_images_why_japan/japan_1.png';
import japan2 from './assets/ai_images_why_japan/japan_2.png';
import japan3 from './assets/ai_images_why_japan/japan_3.png';
import japan4 from './assets/ai_images_why_japan/japan_4.png';
import japan5 from './assets/ai_images_why_japan/japan_5.png';
import japan6 from './assets/ai_images_why_japan/japan_6.png';
import japan7 from './assets/ai_images_why_japan/japan_7.png';
import japan8 from './assets/ai_images_why_japan/japan_8.png';

// Explore Japan Images
import expUrban from './assets/ai_images_explore_japan/urban.png';
import expFood from './assets/ai_images_explore_japan/food.png';
import expNature from './assets/ai_images_explore_japan/nature.png';
import expStudent from './assets/ai_images_explore_japan/student_life.png';
import expTech from './assets/ai_images_explore_japan/tech.png';
import expCulture from './assets/ai_images_explore_japan/culture.png';

// Social Logos
import fbLogo from './assets/logos/Facebook_logo.png';
import igLogo from './assets/logos/Instagram_logo.png';
// import lnLogo from './assets/logos/Line_logo.png';
import ytLogo from './assets/logos/Youtube_logo.png';
import liLogo from './assets/logos/linkedIn_logo.png';

const Counter = ({ target, duration = 800, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const end = parseFloat(target.replace(/,/g, ''));
    if (isNaN(end)) return setCount(target);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (target.includes('.')) return num.toFixed(1);
    return Math.floor(num).toLocaleString();
  };

  return <span ref={countRef}>{formatNumber(count)}{suffix}</span>;
};

const featureSlides = [
  {
    title: "Why Indian Parents Are Choosing Japan?",
    text: "World's Safest Environment\nDisciplined & Secure for All\nMore Affordable Than the West\nIndian Food & Lifestyle Support\nGlobal Career Opportunities\nStrong International Reputation",
    image: "/images/why-parents.png"
  },
  {
    title: "Why More Indian Students Are Choosing Japan?",
    text: "World-Class Safety & Standards\nAffordable Living & Tuition\nPart-Time Work Permissions\nGlobal Career Opportunities\nLanguage-Driven Success\nModern Cities & Infrastructure\nIndian Food & Global Culture",
    image: "/images/why-japan.jpg"
  },
  {
    title: "Why Indian Students Choose Japan University of Economics?",
    text: "Affordable Tuition & Scholarships\nEnglish-Friendly Programs\nCareer & Internship Support\nModern City Campuses\nSafe & Global Environment\nHousing & Work Assistance",
    image: "/images/why-jue.jpg"
  },
  {
    title: "Worried About Career & Placement?",
    text: "Internship Opportunities During Study\nComprehensive Job-Hunting Support\nResume & Interview Preparation\nPersonalized Career Guidance\nConnect with Top Japanese Companies\nDedicated International Placement",
    image: "/images/career-jue.jpg"
  },
  {
    title: "Worried About Japanese Language?",
    text: "English-Friendly Classes Available\nIntegrated University Language Lessons\nLearn While Studying Your Degree\nDaily Life & Part-Time Job Support\nJLPT Preparation Assistance\nBoost Your Global Career Opportunities",
    image: "/images/language-jue.jpg"
  },
  {
    title: "Worried About Accommodation?",
    text: "University Accommodation Support\nSafe & Affordable Housing Options\nSeparate Dorms for Boys & Girls\nConvenient Locations Near Campus\nFree Shuttle Bus Access Available\nSecure International Environment",
    image: "/images/accommodation-jue.jpg"
  },
  {
    title: "Scholarships & Financial Support",
    text: "International Student Scholarships\nTuition Fee Reduction Options\nExpert Application Guidance\nCompetitive Global Affordability",
    image: "/images/scholarship-jue.jpg"
  },
  {
    title: "Worried About Visa & Documents?",
    text: "Student Visa Application Guidance\nComplete Documentation Support\nStep-by-Step Assistance\nUniversity-Issued Certificates\nDedicated Visa Compliance Team",
    image: "/images/visa-jue.png"
  },
  {
    title: "Worried About Arrival in Japan?",
    text: "Flight Booking & Travel Advice\nAirport Pickup Support Information\nPost-Arrival Settling-In Assistance\nResidence Registration Help\nBank Account Setup Support",
    image: "/images/travel-jue.png"
  }
];

const FeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState('idle');
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const slideNext = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  const slidePrev = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + featureSlides.length) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 70) {
      slideNext();
    }
    if (touchStart.current - touchEnd.current < -70) {
      slidePrev();
    }
  };

  const slide = featureSlides[currentIndex];
  const animClass = animState === 'exit' ? 'slide-exit' : animState === 'enter' ? 'slide-enter' : 'slide-idle';

  return (
    <div
      className="feature-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`feature-slider-box ${animClass}`}>
        <div className="feature-slider-text">
          <h2>{slide.title}</h2>
          <div className="feature-slider-content">
            {slide.text.includes('\n') ? (
              <ul className="feature-list">
                {slide.text.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{slide.text}</p>
            )}
          </div>
        </div>
        <div className="feature-slider-image">
          <img src={slide.image} alt={slide.title} />
        </div>
      </div>
    </div>
  );
};

const highlightData = [
  {
    title: "STATIO Shibuya",
    desc: "Modern student lounge and creative space in the heart of Tokyo's trendiest district.",
    image: "/images/why-japan.jpg",
    tag: "TOKYO"
  },
  {
    title: "Blue Rose Project",
    desc: "Student-led public relations project promoting JUE energy through dance and performance.",
    image: "/images/jue-students.jpg",
    tag: "CULTURE"
  },
  {
    title: "International Library",
    desc: "Multilingual research facilities and collaborative study zones for global scholars.",
    image: "/images/why-jue.jpg",
    tag: "ACADEMICS"
  },
  {
    title: "Fukuoka Campus",
    desc: "Our main campus surrounded by nature, offering a serene environment for focused learning.",
    image: "/images/scholarship-jue.jpg",
    tag: "FUKUOKA"
  },
  {
    title: "Kobe Sannomiya",
    desc: "Urban campus in the vibrant port city of Kobe with access to Japan's business network.",
    image: "/images/career-jue.jpg",
    tag: "KOBE"
  }
];

const HighlightCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % highlightData.length);
        setIsAnimating(false);
      }, 400);
    }, 4500);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, [startAutoPlay]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + highlightData.length) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + highlightData.length) % highlightData.length;
      cards.push({ ...highlightData[idx], position: i, idx });
    }
    return cards;
  };

  const animClass = isAnimating
    ? direction === 'next' ? 'carousel-slide-out-left' : 'carousel-slide-out-right'
    : direction === 'next' ? 'carousel-slide-in-right' : 'carousel-slide-in-left';

  return (
    <div
      className="highlight-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-track">
        {getVisibleCards().map((card) => (
          <div
            key={card.idx}
            className={`carousel-card ${card.position === 0 ? 'card-active' : 'card-side'} ${card.position === 0 ? animClass : ''}`}
          >
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.title} />
              <div className="card-overlay" />
            </div>
            <div className="card-content">
              <span className="card-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const heroSliderImages = [
  // '/images/football_play.jpeg',
  '/images/hero.png',
  // '/images/graduate00.jpg',
  // '/images/LearningProgression01.jpg',
  // '/images/support04.jpg',
  // '/images/Undergraduate00.jpg',
  // '/images/why-jue.jpg'
];

const heroSubtitles = [
  "Vibrant sports and club activities",
  "JUE supports Indian students who want to study in Japan and build their careers through affordable tuition fees, scholarships, admission guidance, and career support.",
  "Special Scholarships for Indian Students",
  "Affordable Tuition Fees & Career Support in Japan",
  "Study with Experienced Professors and Students from 20+ Nationalities",
  "Rose cafe and modern campus facilities",
  "English friendly programs"
];

const programDetails = {
  "Department of Economics": "Learn to analyze complex markets, understand economic policies, and navigate the global financial landscape. Our economics program at JUE focuses on practical applications and international trade dynamics.",
  "Department of Management": "Master the art of leadership and organizational strategy. This course provides a deep dive into corporate efficiency, team building, and strategic decision-making for future global business leaders.",
  "Department of Commerce": "Explore the essentials of international trade, marketing, and accounting. We equip you with the technical skills and market insights necessary for success in the competitive global commercial sector.",
  "Department of Management Law": "Understand the intersection of business and legal frameworks. This unique program covers corporate governance, commercial law, and regulatory compliance essential for modern industrial management.",
  "Health & Sports Management": "Turn your passion for athletics into a career. Our program combines business acumen with specialized knowledge in sports facility operations, health promotion, and wellness industry management."
};

const journeySteps = [
  { title: "Apply Online", sub: "Submit application securely", color: "blue", align: "text-pos-top", t: 0.05 },
  { title: "Free Counseling", sub: "Personal guidance from our team", color: "blue", align: "text-pos-right", t: 0.20 },
  { title: "Document Check", sub: "Academic records are reviewed", color: "blue", align: "text-pos-left", t: 0.33 },
  { title: "Online Interview", sub: "Interaction with university", color: "blue", align: "text-pos-right", t: 0.46 },
  { title: "Receive Admission", sub: "Get official offer letter", color: "green", align: "text-pos-left", t: 0.58 },
  { title: "Connect with Students", sub: "Interact with current students", color: "blue", align: "text-pos-right", t: 0.70 },
  { title: "Visa & COE Support", sub: "Complete your visa process", color: "blue", align: "text-pos-left", t: 0.82 },
  { title: "Fly to Japan", sub: "Begin journey with confidence", color: "green", align: "text-pos-bottom", t: 0.95 }
];

const faqsList = [
  { q: "How do I apply?", a: "Submit your application securely through our online admission portal with the required documents." },
  { q: "How can I apply for a scholarship?", a: "Eligible international students can apply for JUE's special scholarships during the standard admission pipeline." },
  { q: "How do I apply for a visa?", a: "JUE provides comprehensive COE support and guides you through every step of the Japanese student visa process." },
  { q: "Are there vegetarian/halal food options?", a: "Yes, our cafeteria and local urban campuses are surrounded by diverse dining options, and we provide guidance for students with specific dietary needs." },
  { q: "What is the safety level in Japan?", a: "Japan is consistently ranked as one of the safest countries globally. Students can safely travel and live even late at night." },
  { q: "Can I work part-time while studying?", a: "International students are generally allowed to work up to 28 hours per week with a permit, offering great opportunities for cultural immersion." }
];

const specialSupportSteps2 = [
  { id: "visa", title: "Support for Visa and Admission", img: "/images/visa-jue.png" },
  { id: "english", title: "English Friendly Programs", img: "/images/language-jue.jpg" },
  { id: "meals", title: "Indian Meals Available", img: "/images/cafe00.jpg" },
  { id: "cities", title: "Study in Japan's Top Cities", img: "/images/fukuokacampus02.jpg" },
  { id: "clubs", title: "Club And Activities", img: "/images/clubs03.jpg" },
  { id: "accommodation", title: "Comfortable Accommodation", img: "/images/accommodation-jue.jpg" }
];

const supportSlides2 = {
  "visa": [
    { title: "Direct CoE Guidance", text: "Our International Office provides expert support in securing your Certificate of Eligibility, the first step for your Japanese student visa.", img: "/images/visa-1.png" },
    { title: "Document Preparation", text: "We assist Indian students with all financial and academic documentation required by the Japanese Immigration Services Agency.", img: "/images/visa-2.png" },
    { title: "Online Briefings", text: "Participate in mandatory pre-departure sessions where we explain the visa interview process and arrival logistics.", img: "/images/visa-3.png" },
    { title: "Embassy Support", text: "Get localized advice on visiting the Japanese Embassy in New Delhi or Consulates in Mumbai, Chennai, and Kolkata.", img: "/images/visa-4.png" },
    { title: "Arrival Logistics", text: "From CoE to Residence Card, JUE ensures your legal status in Japan is managed professionally from day one.", img: "/images/visa-5.png" }
  ],
  "english": [
    { title: "Global Classrooms", text: "Join diverse classes where core economics and management subjects are taught entirely in English by international faculty.", img: "/images/english-1.png" },
    { title: "Interactive Seminars", text: "Participate in small-group discussions and case studies conducted in English to build your global business vocabulary.", img: "/images/english-2.png" },
    { title: "Digital Resources", text: "Access a wide range of English-language journals, textbooks, and online research databases through the JUE library system.", img: "/images/english-3.png" },
    { title: "Expert Tutoring", text: "Work closely with bilingual professors who understand the needs of international students and provide academic guidance in English.", img: "/images/english-4.png" },
    { title: "Global Degree Path", text: "Graduate with a degree recognized worldwide, opening doors to careers in Japan, India, and beyond.", img: "/images/english-5.png" }
  ],
  "cities": [
    { title: "Tokyo: Global Hub", text: "Experience the heartbeat of Japan in Shibuya, Tokyo. Study at the center of world-class technology, fashion, and business.", img: "/images/cities-1.png" },
    { title: "Fukuoka: Asian Gateway", text: "Our main campus in Dazaifu, Fukuoka, offers a warm climate, lower living costs, and a high-quality international lifestyle.", img: "/images/cities-2.png" },
    { title: "Kobe: Business Port", text: "Study in the historical port city of Kobe, known for its international atmosphere and vibrant Sannomiya business district.", img: "/images/cities-3.png" },
    { title: "Modern Campus Life", text: "All JUE campuses feature state-of-the-art facilities, from glass-walled study lounges to high-tech computer labs.", img: "/images/cities-4.png" },
    { title: "Connected Japan", text: "Travel easily between Tokyo, Kobe, and Fukuoka using Japan's efficient Shinkansen bullet train network.", img: "/images/cities-5.png" }
  ],
  "meals": [
    { title: "Authentic Indian Thalis", text: "Savor the taste of home with traditional thalis featuring dal, paneer, and fresh vegetables prepared with authentic spices.", img: "/images/meals-1.png" },
    { title: "Cross-Cultural Dining", text: "Our cafeterias are social hubs where Indian and Japanese students share meals and build lifelong cross-cultural friendships.", img: "/images/meals-2.png" },
    { title: "Vegetarian Excellence", text: "JUE prioritizes dietary needs, offering a wide range of high-quality vegetarian and vegan meal options every day.", img: "/images/cafe00.jpg" },
    { title: "Healthy Campus Food", text: "All meals are prepared in hygienic, modern facilities with a focus on nutritional balance and student wellness.", img: "/images/cafe00.jpg" },
    { title: "Global Flavors", text: "Beyond Indian and Japanese cuisine, our dining halls offer variety to cater to students from over 20 different countries.", img: "/images/cafe00.jpg" }
  ],
  "accommodation": [
    { title: "Modern Dormitories", text: "Safe, clean, and fully furnished student residences are located within walking distance of all our campuses.", img: "/images/accommodation-jue.jpg" },
    { title: "Comfortable Rooms", text: "Each student room is equipped with high-speed internet, a study desk, and climate control for a productive living environment.", img: "/images/accommodation.png" },
    { title: "Shared Life", text: "Kitchen and lounge areas provide spaces to cook Indian meals together and bond with fellow international students.", img: "/images/accommodation01.jpg" },
    { title: "Secure Housing", text: "JUE housing features electronic keycard access and 24/7 on-call staff to ensure your safety and peace of mind.", img: "/images/fukuokacampus03.jpg" },
    { title: "Serene Surroundings", text: "Many of our residences are surrounded by green spaces and traditional Japanese gardens, offering a peaceful retreat after classes.", img: "/images/garden03.jpg" }
  ],
  "clubs": [
    { title: "Traditional Arts", text: "Join clubs for Kendo, Tea Ceremony, or Calligraphy to deeply immerse yourself in Japan's rich cultural heritage.", img: "/images/clubs03.jpg" },
    { title: "Sports & Fitness", text: "From soccer to basketball, our athletic clubs help you stay active and make friends through team-based competition.", img: "/images/clubs06.jpg" },
    { title: "Business Societies", text: "Participate in student-led organizations that focus on entrepreneurship, marketing, and global economic trends.", img: "/images/clubs08.jpg" },
    { title: "Global Networking", text: "The International Student Union hosts regular mixers, cultural festivals, and networking events for all JUE students.", img: "/images/clubs10.jpg" },
    { title: "Modern Facilities", text: "JUE provides high-quality gyms and courts for all student clubs to practice and host friendly matches.", img: "/images/basketball.png" }
  ],
  "safe": [
    { title: "Smiling Community", text: "Japan is one of the world's safest nations, and JUE provides a welcoming, high-trust environment for every student.", img: "/images/jue-students.jpg" },
    { title: "Secure Campuses", text: "Our campuses are well-lit and feature comprehensive security teams, ensuring a safe learning environment at any hour.", img: "/images/jue-open.jpg" },
    { title: "Health & Wellness", text: "Access on-campus medical checkups and counseling services to support your physical and emotional well-being throughout your studies.", img: "/images/support04.jpg" },
    { title: "Parental Peace of Mind", text: "We maintain regular contact with families and provide a secure support system so parents in India can feel confident.", img: "/images/why-parents.png" },
    { title: "Always Connected", text: "JUE's emergency support network and community mentors are available 24/7 to assist international students with any situation.", img: "/images/community.png" }
  ]
};

const indianChoiceSteps = [
  {
    title: "97% Employment Rate",
    text: "Japan faces a massive talent shortage. We provide dedicated career support, networking events, and internship placements to transition you into a corporate role.",
    icon: "💼"
  },
  {
    title: "Unbeatable ROI",
    text: "Gain a global-quality education at a significantly lower cost compared to the US, UK, or Australia. With strong career prospects after graduation, your investment translates into long-term value and growth.",
    icon: "💼"
  },
  {
    title: "Affordable Tuition & Scholarships",
    text: "Access world-class education without the financial burden. JUE offers competitive tuition fees along with scholarships and special financial support options tailored for students from India.",
    icon: "💼"
  },
  {
    title: "English-Friendly Programs",
    text: "English-medium classes are available for international students. In addition, Japanese language learning support is provided through two structured courses: a 12-month course and an 18-month course, helping students build language skills alongside their academic studies.",
    icon: "💼"
  }
];

const peaceOfMindData = {
  safety: {
    title: "Strictly Segregated Dormitories",
    desc: "Boys and girls are housed in entirely separate, access-controlled buildings. Curfews are monitored, and 24/7 resident wardens ensure complete security. Fukuoka itself consistently ranks as one of the safest cities in the world.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  food: {
    title: "Pure Vegetarian & Halal Options",
    desc: "We understand dietary needs. Our campus cafeterias offer authentic Indian flavors, including pure vegetarian and halal meals, ensuring students feel right at home while exploring Japanese cuisine.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  health: {
    title: "24/7 Campus Medical Care",
    desc: "Your child's health is our priority. With an on-campus clinic and 24/7 emergency support, students have immediate access to healthcare. We also provide comprehensive health insurance for all international students.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
};

const programImages = {
  "Department of Economics": "/images/Undergraduate00.jpg",
  "Department of Management": "/images/fukuokacampus02.jpg",
  "Department of Commerce": "/images/Internship06.jpg",
  "Department of Management Law": "/images/LearningProgression01.jpg",
  "Health & Sports Management": "/images/jue-students.jpg"
};

const JapanChoiceCarousel = () => {
  const images = [
    {
      title: "World-Class Safety",
      desc: "Experience one of the safest countries globally, where you can move freely with peace of mind. Japan's low crime rate and secure environment make it perfect for international students.",
      img: japan1
    },
    {
      title: "Stunning Natural Seasons",
      desc: "From cherry blossoms in spring to golden leaves in autumn, Japan's four distinct seasons offer breathtaking views and a unique connection to nature throughout the year.",
      img: japan2
    },
    {
      title: "Cutting-Edge Technology",
      desc: "Be at the forefront of global innovation. Study in a nation that leads the world in robotics and high-speed transportation systems like the Shinkansen.",
      img: japan3
    },
    {
      title: "Traditional Culture",
      desc: "Discover a harmonious blend of the old and new. Explore ancient shrines and participate in traditional ceremonies in a culture that deeply respects its rich history.",
      img: japan4
    },
    {
      title: "Authentic Culinary Delights",
      desc: "Enjoy a world-renowned food culture. From high-end sushi to affordable local ramen, Japan's cuisine is as diverse and high-quality as its education system.",
      img: japan5
    },
    {
      title: "24/7 Convenience",
      desc: "Life made easy with convenience stores on every corner and efficient services. Everything you need is accessible anytime, letting you focus on your studies.",
      img: japan6
    },
    {
      title: "Leading Education & Research",
      desc: "Enroll in world-class institutions known for academic rigour. JUE provides the tools and network needed to excel in the global and domestic market.",
      img: japan7
    },
    {
      title: "Vibrant City Life",
      desc: "Live in dynamic urban centers like Tokyo or Fukuoka. Enjoy endless entertainment, shopping, and networking opportunities in some of the world's most modern cities.",
      img: japan8
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const touchStartX = React.useRef(null);

  const prevSlide = () => {
    setIdx(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIdx(prev => (prev + 1) % images.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) nextSlide();
    else prevSlide();
  };

  return (
    <section
      className="japan-choice-section reveal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="japan-choice-title">
        <span className="light-blue">Why Choosing</span> <br className="mobile-only" /> <span className="navy-blue">JAPAN is the Right Choice</span>
      </h2>
      <div className="japan-carousel-container">
        <div
          className="japan-carousel-track"
          style={{
            transform: `translateX(calc(-${idx * 80}%))`
          }}
        >
          {images.map((item, i) => (
            <div
              key={item.title}
              className={`japan-carousel-item ${i === idx ? 'curr' : (i < idx ? 'prev' : 'next')}`}
            >
              <div className="japan-img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <p className="japan-img-caption">{item.title}</p>
              <p className="japan-img-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExploreJapanCarousel = () => {
  const images = [
    {
      title: "Electric Evenings",
      desc: "Dive into the neon-lit energy of Japan''s major cities, where the night brings a futuristic atmosphere and endless discovery.",
      img: expUrban
    },
    {
      title: "Gourmet Adventures",
      desc: "Savor the world''s most refined and diverse food scene. From street-side ramen to premium sushi, every meal is a cultural experience.",
      img: expFood
    },
    {
      title: "Pristine Nature",
      desc: "Discover the serene beauty of Japan''s seasonal landscapes. Find inspiration in the perfect balance of traditional gardens and majestic mountains.",
      img: expNature
    },
    {
      title: "Global Community",
      desc: "Join a melting pot of students from across the globe. Our libraries and social spaces are designed to foster international collaboration.",
      img: expStudent
    },
    {
      title: "Future-Ready Tech",
      desc: "Get hands-on with the world''s most advanced technology. Our labs offer students the opportunity to learn in the birthplace of robotics.",
      img: expTech
    },
    {
      title: "Timeless Traditions",
      desc: "Experience the soul of Japan through ancient tea ceremonies and local festivals that have been preserved for centuries.",
      img: expCulture
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const touchStartX = React.useRef(null);

  const prevSlide = () => {
    setIdx(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIdx(prev => (prev + 1) % images.length);
  };

  const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  };

  return (
    <section
      className="japan-choice-section reveal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ background: '#f9f9f9' }}
    >
      <h2 className="japan-choice-title">
        <span className="light-blue">Explore Life</span> <br className="mobile-only" /> <span className="navy-blue">at Japan</span>
      </h2>
      <div className="japan-carousel-container">
        <div
          className="japan-carousel-track"
          style={{ transform: `translateX(calc(-${idx * 80}%))` }}
        >
          {images.map((item, i) => (
            <div
              key={item.title}
              className={`japan-carousel-item ${i === idx ? 'curr' : (i < idx ? 'prev' : 'next')}`}
            >
              <div className="japan-img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <p className="japan-img-caption">{item.title}</p>
              <p className="japan-img-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseSection = () => {
  const chooseItems = [
    { title: "Affordable Tuition & Scholarships", img: "/images/why-parents.png" },
    { title: "English-Friendly Programs", img: "/images/why-japan.jpg" },
    { title: "Career & Internship Support", img: "/images/career-jue.jpg" },
    { title: "Modern City Campuses", img: "/images/why-jue.jpg" },
    { title: "Safe & Global Environment", img: "/images/jue-students.jpg" },
    { title: "Housing & Work Assistance", img: "/images/accommodation-jue.jpg" },
  ];

  return (
    <section className="why-choose-jue reveal">
      <div className="why-choose-header">
        <h2 className="why-choose-line1">Why Choose</h2>
        <h2 className="why-choose-line2">Japan University of Economics(JUE)</h2>
      </div>
      <div className="why-choose-grid">
        {chooseItems.map((item, idx) => (
          <div key={idx} className="choose-card">
            <div className="choose-img-box">
              <img src={item.img} alt={item.title} />
            </div>
            <p className="choose-caption">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const JourneySection = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Strict trigger: must be intersecting and we must have scrolled past the initial fold
      if (entry.isIntersecting && window.scrollY > 100) {
        setIsActive(true);
      }
    }, { threshold: 0.5 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isActive && animRef.current && animRef.current.beginElement) {
      animRef.current.beginElement();
    }
  }, [isActive]);

  // S-Curve Bezier Path
  const pathData = "M 20 85 C 80 85, 20 15, 80 15";

  // helper to get precise coordinates along cubic bezier for any t between 0 and 1
  const getBezierPoint = (t, p0, p1, p2, p3) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };

  return (
    <section className="journey-wrapper reveal" id="journey" ref={sectionRef}>
      <div className="journey-header">
        <h2>Your Journey from India to Japan</h2>
      </div>
      <div className="journey-container">
        {/* Maps */}
        <img src="/images/india_map-removebg-preview.png" alt="India" className="map-india" />
        <img src="/images/japan_map-removebg-preview.png" alt="Japan" className="map-japan" />

        <svg className="journey-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated Dotted Line */}
          <path
            id="flight-path"
            d={pathData}
            fill="none"
            stroke="#003B6F"
            strokeWidth="0.4"
            strokeDasharray="1.5, 1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Fixed Horizontal SVG Airplane animating over exact path - Stopping at end & Bigger size */}
          <image
            href="/images/airplane-removebg-preview.png"
            width="20"
            height="20"
            x="-10"
            y="-10"
            transform="rotate(30)"
            style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
          >
            <animateMotion
              ref={animRef}
              dur="12s"
              repeatCount="1"
              fill="freeze"
              path={pathData}
              begin="indefinite"
            />
          </image>
        </svg>

        {/* Dynamic Markers mathematically guaranteed to fall perfectly on the SVG cubic bezier path */}
        {journeySteps.map((step, idx) => {
          const x = getBezierPoint(step.t, 20, 80, 20, 80);
          const y = getBezierPoint(step.t, 85, 85, 15, 15);
          const dotColor = step.color === 'green' ? '#2ecc71' : '#3498db';

          return (
            <div
              key={idx}
              className="journey-marker"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: dotColor
              }}
            >
              <div
                className={`step-text-container ${step.align} ${isActive ? 'fade-in-on-pass' : ''}`}
                style={{
                  animationDelay: `${step.t * 12}s`, // Adjusted to match 12s airplane duration
                  opacity: 0 // Start hidden
                }}
              >
                <div className="step-title" style={{ color: dotColor }}>{step.title}</div>
                <div className="step-sub">{step.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const comparisonData = [
  { feature: "Total Cost", jue: "Low / Affordable", other: "Very High" },
  { feature: "Living Cost", jue: "Moderate", other: "High" },
  { feature: "Part-Time Jobs", jue: "Up to 28 hrs/week", other: "Usually 20 hrs/week" },
  { feature: "Work Opportunities After Study", jue: "High demand for skilled foreigners", other: "Competitive job market" },
  { feature: "Safety Rating", jue: "Among Top Safest Globally", other: "Moderate" },
  { feature: "Crime Rate", jue: "Very Low", other: "Moderate" },
  { feature: "Job Placement", jue: "Very High (Strong support)", other: "Depends on university" },
  { feature: "Placement Support", jue: "Structured & guided", other: "Limited / self-driven" },
];

const statsSets = [
  [
    { title: "Top Ranked University", value: "Study in Japan's Top Cities: Tokyo, Kobe or Fukuoka" },
    { title: "Ranked 2nd in Japan", value: "3,000+ Students from over 20 Countries" },
    { title: "English Friendly Classes", value: "Japanese Language Support Included in Programs" },
    { title: "50+ Years of Excellence", value: "Trusted University for Global Careers" }
  ],
  [
    { title: "World-Class Faculty", value: "EXPERIENCED PROFESSORS: Industry & Academic Experts" },
    { title: "Safe & Inclusive Campus", value: "GLOBAL STUDENT COMMUNITY: 20+ Countries" },
    { title: "Affordable Fee & Scholarship", value: "Special Grants & Support for Indian Students" },
    { title: "Global Alumni Network", value: "ALUMNI CONNECTIONS: Worldwide Community" }
  ]
];

const App = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [peaceTab, setPeaceTab] = useState('safety');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showStories, setShowStories] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedSupport, setSelectedSupport] = useState("visa");
  const [activeSupportSlide, setActiveSupportSlide] = useState(0);
  const [slideAnim, setSlideAnim] = useState('active');
  const [selectedSupport2, setSelectedSupport2] = useState("visa");
  const [activeSupportSlide2, setActiveSupportSlide2] = useState(0);
  const [slideAnim2, setSlideAnim2] = useState('active');

  useEffect(() => {
    setActiveSupportSlide2(0);
  }, [selectedSupport2]);

  const nextSupportSlide2 = () => {
    setSlideAnim2('exit');
    setTimeout(() => {
      const slides = supportSlides2[selectedSupport2];
      setActiveSupportSlide2((prev) => (prev + 1) % slides.length);
      setSlideAnim2('active');
    }, 300);
  };

  const prevSupportSlide2 = () => {
    setSlideAnim2('exit');
    setTimeout(() => {
      const slides = supportSlides2[selectedSupport2];
      setActiveSupportSlide2((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideAnim2('active');
    }, 300);
  };

  useEffect(() => {
    setActiveSupportSlide(0);
  }, [selectedSupport]);

  const nextSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev + 1) % slides.length);
      setSlideAnim('active');
    }, 300);
  };

  const prevSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideAnim('active');
    }, 300);
  };

  const [statSetIndex, setStatSetIndex] = useState(0);
  const [statAnim, setStatAnim] = useState('active');
  const [isStatsPaused, setIsStatsPaused] = useState(false);

  useEffect(() => {
    if (isStatsPaused) return;

    const statsTimer = setInterval(() => {
      setStatAnim('slide-out');
      setTimeout(() => {
        setStatSetIndex(prev => (prev + 1) % statsSets.length);
        setStatAnim('slide-in');
        setTimeout(() => {
          setStatAnim('active');
        }, 100);
      }, 500);
    }, 4000); // 4 seconds interval

    return () => clearInterval(statsTimer);
  }, [isStatsPaused]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSliderImages.length);
    }, 4000); // 4 seconds transition
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Small delay to ensure layout is stable before observing
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 }); // More responsive for general reveals

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 500); // 500ms delay to ensure page is settled

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {/* Sticky Apply Button */}
      <button className="sticky-apply-btn">APPLY NOW</button>

      {/* Main Navigation Bar [NEW] */}
      <header className="main-nav-bar">
        <div className="nav-container">
          <div className="nav-logo">JUE</div>
          <nav className="nav-menu">
            <a href="#home">HOME</a>
            <a href="#admission">ADMISSION</a>
            <a href="#courses">COURSES</a>
            <a href="#campus">CAMPUS LIFE</a>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
      <section className="hero" id="home">
        {/* Sliding background images */}
        {heroSliderImages.map((img, idx) => (
          <div
            key={idx}
            className={`hero-image-bg ${idx === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Directional gradient overlay */}
        <div className="hero-overlay" />


        {/* Main Body */}
        <div className="hero-body">
          {/* Top text */}
          <div className="hero-text">
            <p className="hero-eyebrow">Thinking of<br />studying abroad?</p>
            <h2 className="hero-headline">
              Then Why Not<br />
              <span className="hero-headline-bottom">
                Choose <span className="hero-japan-accent">Japan</span>
                <div className="hero-divider" />
                <div className="hero-subtitle">
                  Special Support for Indian Students
                </div>
              </span>
            </h2>
          </div>

          {/* Bottom badges */}
          <div className="hero-badges">
            <span className="hero-badge-gold">Avail FREE Counselling</span>
          </div>
        </div>
      </section>

      {/* Institutional Stats & Alumni Strip [NEW] */}
      <section className="institutional-stats-strip reveal">
        <div className="stats-main-grid">
          <div className="stat-item">
            <span className="stat-number">60+</span>
            <span className="stat-desc">Years Legacy</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">97%</span>
            <span className="stat-desc">Placement</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-desc">Countries Students</span>
          </div>
        </div>

        <div className="alumni-banner">
          <span className="alumni-label">OUR ALUMNI WORK AT</span>
          <div className="alumni-logos ticker-container">
            <div className="ticker-track">
              <span>Chikusui Canycom Inc &nbsp;|&nbsp; Apple &nbsp;|&nbsp; T. Rowe Price &nbsp;|&nbsp; Japan University of Economics &nbsp;|&nbsp; Déesse Cosmetics of Switzerland &nbsp;|&nbsp;</span>
              <span>Chikusui Canycom Inc &nbsp;|&nbsp; Apple &nbsp;|&nbsp; T. Rowe Price &nbsp;|&nbsp; Japan University of Economics &nbsp;|&nbsp; Déesse Cosmetics of Switzerland &nbsp;|&nbsp;</span>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Welcome Section [NEW] */}
      <section className="indian-welcome reveal">
        <h2 className="welcome-title">We welcome students from India </h2>
        <div className="welcome-container">
          <div className="welcome-text-container">
            <p className="welcome-text-bold">
              For over 60 years since 1956, the Tsuzuki Education Group has been developing individual expertise in the academic context and are willing to provide unlimited support in education.
            </p>
            <p className="welcome-text-normal">
              We are now one of the biggest educational corporations in Japan, having established six universities, twelve junior colleges and vocational schools, three high schools, a junior high school, and four kindergartens and nursery schools.
            </p>
          </div>
        </div>
      </section>

      {/* Navy Stats Section [NEW] */}
      <section
        className="navy-stats reveal"
        onMouseEnter={() => setIsStatsPaused(true)}
        onMouseLeave={() => setIsStatsPaused(false)}
        onTouchStart={() => setIsStatsPaused(true)}
        onTouchEnd={() => setIsStatsPaused(false)}
      >
        <div className="stats-grid">
          {statsSets[statSetIndex].map((stat, index) => (
            <div className="stats-block" key={index}>
              <div className="block-inner">
                <div className={`stats-slider-wrapper ${statAnim}`}>
                  <h3 className="block-title">{stat.title}</h3>
                  <div className="stat-detail">

                    <span className="stat-value">{stat.value}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome JUE Section [NEW] */}
      <section className="welcome-jue reveal">
        <h2 className="welcome-jue-title">Welcome to Japan University of Economics <br className="mobile-only" /> (JUE)</h2>
        <div className="video-section">
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/tB1vYUFAn5I?autoplay=1&mute=1&loop=1&playlist=tB1vYUFAn5I"
              title="JUE University Life"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Programs We Offer — Accordion Style [NEW] */}
      <section className="programs-accordion-section reveal" id="programs">
        <div className="accordion-wrapper">
          {/* Main Title Strip */}
          <div className="accordion-header-strip">
            <h2 className="accordion-main-title">PROGRAMS WE OFFER</h2>
          </div>

          <div className="accordion-items">
            {Object.keys(programDetails).map((prog) => (
              <div
                key={prog}
                className={`accordion-item ${selectedProgram === prog ? 'expanded' : ''}`}
              >
                <div
                  className="accordion-stripe"
                  onClick={() => setSelectedProgram(selectedProgram === prog ? null : prog)}
                >
                  <span className="stripe-title">{prog}</span>
                  <span className="stripe-icon">{selectedProgram === prog ? '−' : '+'}</span>
                </div>

                <div className="accordion-content">
                  <div className="content-inner">
                    <p className="program-desc">{programDetails[prog]}</p>
                    <button
                      className="learn-more-btn"
                      onClick={() => window.open('#', '_blank')}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Indian Students Choose Section [NEW] */}
      <section className="indian-students-choice-section reveal">
        <div className="section-container-small">
          <div className="choice-header">
            <h3 className="choice-eyebrow">Why Indian Students Choose</h3>
            <h2 className="choice-title">Japan University of Economics?</h2>
          </div>

          <div className="choice-cards-container">
            {indianChoiceSteps.map((step, index) => (
              <div key={index} className="choice-card-item">
                <div className="choice-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7H16V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7ZM10 5H14V7H10V5ZM20 19H4V9H20V19Z" fill="#111" />
                  </svg>
                </div>
                <div className="choice-content">
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choosing Japan Carousel Section [NEW] */}
      <JapanChoiceCarousel />

      {/* Explore Life at Japan Section [NEW] */}
      <ExploreJapanCarousel />

      {/* Institutional Comparison Table [NEW] */}
      <section className="comparison-section reveal">
        <div className="section-container">
          <h2 className="comparison-title">
            <span className="light-blue">Why JUE Japan</span> <br className="mobile-only" /> <span className="navy-blue">is the Smarter Choice</span>
          </h2>
          <div className="table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>JUE Japan</th>
                  <th>Other Countries</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="row-feature">{row.feature}</td>
                    <td className="row-jue">{row.jue}</td>
                    <td className="row-other">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* A Safe, Welcoming Home Section [NEW] */}
      <section className="safe-home-section reveal">
        <div className="section-container-small">
          <h2 className="safe-home-title">A Safe, Welcoming Home in Japan for Indian Students</h2>
          <p className="safe-home-intro">
            We offer a safe, welcoming, and supportive environment that understands the needs of Indian students and their families.
          </p>

          <div className="safe-home-checklist">
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <p><strong>Friendly Campus Community:</strong> We provide opportunities to build friendships with Japanese and international students in a welcoming environment.</p>
            </div>
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <p><strong>Mentor Support System:</strong> Dedicated mentor support to guide students academically and personally throughout their journey.</p>
            </div>
          </div>



          <button className="explore-campus-btn">Explore Campus Life</button>
        </div>
      </section>

      {/* News & Press Release — Swipe Carousel */}
      <section className="news-press-section reveal">
        <div className="section-container">
          <NewsCarousel title="News & Press Release" />
        </div>
      </section>

      {/* Highlights — Swipe Carousel */}
      <section className="highlights-jue-section reveal">
        <div className="section-container">
          <HighlightsCarousel title="Highlights" />
        </div>
      </section>

      {/* New Journey Section Implementation */}
      <JourneySection />

      {/* Special Support for Indian Students Section 2 [REDESIGNED] */}
      <section className="special-support-section2 reveal" id="special-support2">
        <div className="special-support-header2">
          <h2 className="special-support-line1">Special Support for</h2>
          <h2 className="special-support-line2">Indian Students</h2>
        </div>
        <div className="support-grid-rows2">
          {[0, 1, 2].map((rowIdx) => {
            const rowItems = specialSupportSteps2.slice(rowIdx * 2, rowIdx * 2 + 2);
            const isRowActive = rowItems.some(item => item.id === selectedSupport2);

            return (
              <React.Fragment key={rowIdx}>
                <div className="support-row-pair2">
                  {rowItems.map((step) => (
                    <div
                      key={step.id}
                      className={`support-card2 ${selectedSupport2 === step.id ? 'active-card-support2' : ''}`}
                      onClick={() => {
                        if (selectedSupport2 === step.id) {
                          setSelectedSupport2(null);
                        } else {
                          setSelectedSupport2(step.id);
                        }
                      }}
                    >
                      <div className="support-img-box2">
                        <img src={step.img} alt={step.title} />
                      </div>
                      <div className="support-info-box2">
                        <p>{step.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline Slider for this Row */}
                <div className={`row-slider-wrapper2 ${isRowActive ? 'expanded' : ''}`}>
                  {isRowActive && selectedSupport2 && supportSlides2[selectedSupport2] && (
                    <div className="about-program-container2 inline-slider2">
                      <div className="about-program-slider2 sub-carousel-container2">
                        <div className="support-detail-layout2">
                          <div className="image-carousel-unit2">
                            <div className="sub-arrow-container2">
                              <button className="sub-arrow2 left" onClick={prevSupportSlide2}>‹</button>
                              <div className={`about-program-image2 sub-image2 ${slideAnim2}`}>
                                <img src={supportSlides2[selectedSupport2][activeSupportSlide2].img} alt="Support" />
                              </div>
                              <button className="sub-arrow2 right" onClick={nextSupportSlide2}>›</button>
                            </div>
                            <div className="slide-dots-image-align2">
                              {supportSlides2[selectedSupport2].map((_, i) => (
                                <span key={i} className={`slide-dot2 ${i === activeSupportSlide2 ? 'active' : ''}`}></span>
                              ))}
                            </div>
                          </div>

                          <div className={`about-program-info2 sub-info2 ${slideAnim2}`}>
                            <h2 className="about-program-title2">{supportSlides2[selectedSupport2][activeSupportSlide2].title}</h2>
                            <div className="about-program-underline2"></div>
                            <p className="about-program-text2">
                              {supportSlides2[selectedSupport2][activeSupportSlide2].text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Total Peace of Mind Section [NEW] */}
      <section className="peace-of-mind reveal">
        <div className="section-container-small">
          <div className="peace-header">
            <span className="peace-badge">FOR FAMILIES</span>
            <h2 className="peace-main-title">Total Peace of Mind</h2>
            <p className="peace-subtitle">
              We understand sending your child abroad is daunting. JUE eliminates the risks.
            </p>
          </div>

          <div className="peace-tabs">
            <button
              className={`peace-tab-btn ${peaceTab === 'safety' ? 'active' : ''}`}
              onClick={() => setPeaceTab('safety')}
            >
              Safety & Housing
            </button>
            <button
              className={`peace-tab-btn ${peaceTab === 'food' ? 'active' : ''}`}
              onClick={() => setPeaceTab('food')}
            >
              Food & Culture
            </button>
            <button
              className={`peace-tab-btn ${peaceTab === 'health' ? 'active' : ''}`}
              onClick={() => setPeaceTab('health')}
            >
              Health & Support
            </button>
          </div>

          <div className="peace-content-card">
            <div className="peace-icon-wrapper">
              {peaceOfMindData[peaceTab].icon}
            </div>
            <h3 className="peace-card-title">{peaceOfMindData[peaceTab].title}</h3>
            <p className="peace-card-desc">{peaceOfMindData[peaceTab].desc}</p>
          </div>
        </div>
      </section>

      {/* Earn While You Learn Section [NEW] */}
      <section className="earn-while-learn reveal">
        <div className="yellow-strip top" />
        <div className="section-container-small">

          {/* Box 1: Earn While You Learn */}
          <div className="earn-info-box">
            <h2 className="box-title">Earn While You Learn</h2>
            <p className="box-text">
              Under Japanese law, international students can work 28 hours per week.
              Earn up to <strong>₹60,000/month</strong> to easily cover your living expenses.
            </p>
          </div>

          {/* Box 2: The Journey */}
          <div className="journey-info-box">
            <h2 className="box-title highlight">The "Zero to N1" Journey</h2>
            <p className="box-text">
              Don''t know Japanese? No problem. Our mandatory language integration program takes you from complete beginner to business-fluent (JLPT N1/N2) alongside your degree.
            </p>

            <div className="journey-box-divider"></div>

            <div className="journey-timeline-simple">
              <span className="year-mark">YEAR 1 : <span className="status-mark">BEGINNER</span></span>
              <span className="year-mark">YEAR 4 : <span className="status-mark">N1 BUSINESS FLUENT</span></span>
            </div>
          </div>

        </div>
        <div className="yellow-strip bottom" />
      </section>






      {/* Community Row Header [REFINED - RELOCATED] */}
      <section className="community-cta reveal" style={{ position: 'relative', overflow: 'visible' }}>
        <h2 className="community-home-text">
          <span className="white-text">Your concerns</span> <span className="green-highlight">NOW SOLVED</span>
          <span className="animated-emoji"></span>
        </h2>
      </section>

      {/* Why JUE / Why Japan Slider [RELOCATED BELOW HEADING] */}
      <section className="reveal" id="features">
        <FeatureSlider />
      </section>


      {/* Alumni Inspiration Section [NEW] */}
      <section className="alumni-inspiration-section reveal" id="mentors">
        <div className="alumni-content">
          <h2 className="alumni-title">Be inspired by our students and alumni</h2>
          <p className="alumni-subtitle">
            Discover how Education In JAPAN can give you unique opportunities for personal<br className="desktop-break" /> growth and career success.
          </p>
          <button
            className={`alumni-btn ${!showStories ? 'blink-btn' : ''}`}
            onClick={() => {
              if (!showStories) {
                setShowStories(true);
                setTimeout(() => document.getElementById('success').scrollIntoView({ behavior: 'smooth' }), 100);
              } else {
                setShowStories(false);
              }
            }}
          >
            {showStories ? 'Hide Student Stories' : 'Read Student Stories'}
          </button>
        </div>
      </section>



      {/* Success Stories Section [NEW] */}
      <section className="success-stories" id="success">
        {showStories && (
          <>
            <div className="success-row reveal active">
              <div className="success-img-box">
                <img src="/images/jue-students.jpg" alt="Student Presentation" />
              </div>
              <div className="success-pill">
                <strong>Kim Seong-min (Athlete)</strong><br />
                "JUE's disciplined campus prepared me perfectly for my professional career in sports."
              </div>
            </div>

            <div className="success-row reverse reveal active">
              <div className="success-img-box">
                <img src="/images/Undergraduate00.jpg" alt="Student Life" />
              </div>
              <div className="success-pill">
                <strong>Garkavenko Hanna (Industry)</strong><br />
                "JUE's career support gave me the tools to secure a rewarding career in Japan's industry."
              </div>
            </div>

            <div className="success-row reveal active">
              <div className="success-img-box">
                <img src="/images/fukuokacampus02.jpg" alt="Alumni Founder" />
              </div>
              <div className="success-pill">
                <strong>Kang Rae-soo (CEO)</strong><br />
                "The market insights I gained at JUE were the foundation for founding my own company."
              </div>
            </div>
          </>
        )}
      </section>
      {/* Join Our WhatsApp Community CTA Section [NEW] */}
      <section className="whatsapp-cta-section reveal">
        <div className="whatsapp-cta-banner">
          <div className="whatsapp-cta-text">
            Join Our whatsapp Community for <span className="whatsapp-green">UPDATES</span>
          </div>
          <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer" className="whatsapp-join-btn">
            JOIN NOW
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq reveal" id="faq">
        <div className="faq-header-strip">
          <h2>FAQs</h2>
        </div>
        <div className="faq-container-navy">
          <div className="faq-list">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item-container"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="faq-item">{faq.q}</div>
                {openFaqIndex === idx && (
                  <div className="faq-answer-static">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="thick-section-divider"></div>

      {/* Apply Now CTA */}
      <section className="apply-cta reveal">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join the next generation of global leaders at Japan University of Economics.</p>
        <button className="apply-btn">APPLY FOR ADMISSIONS</button>
      </section>

      {/* Institutional Redesigned Footer [MODIFIED/ENHANCED] */}
      <footer className="enhanced-footer" id="inquiry">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Campus Locations</h4>
            <ul>
              <li><strong>Fukuoka</strong>: Dazaifu City, Gojo</li>
              <li><strong>Tokyo Shibuya</strong>: Sakuragaoka-cho</li>
              <li><strong>Kobe Sannomiya</strong>: Kumoidori, Chuo-ku</li>
              <li><a href="https://www.jue.ac.jp/access/" target="_blank">Access Map & Directions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Admissions</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/for_applicant/" target="_blank">Enrollment Info</a></li>
              <li><a href="https://www.jue.ac.jp/en/ADMISSION/Scholarship.html" target="_blank">Scholarships</a></li>
              <li><a href="https://www.jue.ac.jp/group/" target="_blank">Tsuzuki Education Group</a></li>
              <li><a href="https://www.jue.ac.jp/sitemap/" target="_blank">Site Map</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Student Support</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/en/CAMPUSLIFE/Student_Support.html" target="_blank">International Center</a></li>
              <li><a href="https://www.jue.ac.jp/privacy/" target="_blank">Privacy Policy</a></li>
              <li><a href="https://www.jue.ac.jp/inquiry/" target="_blank">General Inquiry</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://www.jue.ac.jp/facebook/" target="_blank" className="social-icon">
                <img src={fbLogo} alt="Facebook" />
              </a>
              <a href="https://www.jue.ac.jp/instagram/" target="_blank" className="social-icon">
                <img src={igLogo} alt="Instagram" />
              </a>
              <a href="https://youtube.com/@nihonkeizaidaigaku?si=vMhfU4ZPgmoINR9V" target="_blank" className="social-icon">
                <img src={ytLogo} alt="YouTube" />
              </a>
              <a href="https://www.linkedin.com/school/%E6%97%A5%E6%9C%AC%E7%B5%8C%E6%B8%88%E5%A4%A7%E5%AD%A6/" target="_blank" className="social-icon">
                <img src={liLogo} alt="LinkedIn" />
              </a>
            </div>
            <p style={{ fontSize: '0.8rem', marginTop: '20px', opacity: 0.6 }}>
              Institutional Knowledge Base for Global Students.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Japan University of Economics. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chat Advisor */}
      <ChatWidget />
    </div>
  );
};

export default App;