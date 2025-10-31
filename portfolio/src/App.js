import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, ProgressBar, Modal, Alert, Carousel, Badge } from 'react-bootstrap';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaBars, FaTimes, FaDownload,
  FaReact, FaNodeJs, FaPython, FaDatabase, FaAws, FaFigma, FaCode,
  FaCertificate, FaMedal, FaHeart, FaBriefcase, FaUsers, FaBlog,
  FaThumbsUp, FaStar, FaComment, FaRobot, FaPaperPlane, FaTimesCircle,
  FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaExternalLinkAlt
} from 'react-icons/fa';
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdvancedPortfolio = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navExpanded, setNavExpanded] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState('light');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm Erti's AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [certificateDetails, setCertificateDetails] = useState({});
  const [blogInteractions, setBlogInteractions] = useState({});
  const [activeBlogTab, setActiveBlogTab] = useState('all');

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
  const tiltRef = useRef(null);
  const controls = useAnimation();
  const chatContainerRef = useRef(null);

  const chatbotResponses = {
    greeting: "Hello! I'm Erti's AI assistant. I can help you learn about his skills, projects, experience, or how to get in touch!",
    skills: "Erti specializes in: UI/UX Design, Figma, HTML CSS JS, PHP & MySQL, React JS, Java, React Native, Linux, Git, GitHub, WordPress, and many other technologies. Check the Skills section for details!",
    contact: "You can contact Erti through the contact form, email at ertihoxha874@gmail.com, or connect on LinkedIn.",
    experience: "Erti has experience in Full Stack Development, DevOps, Web Design, and various technical projects.",
    projects: "Featured projects include: HealthQueue Kosova, UBT High School SMIS, and Expenses Tracker System and many more. All built with modern technologies!",
    certifications: "Erti holds certifications in Full Stack Programming, International Summer Academy of Advanced IoT, DevOps Specialist, Web Development, Responsive Web Design, React Native, Backend Developer, Junior Java Developer, and more.",
    default: "I'm not sure about that. Feel free to ask about skills, experience, projects, certifications, or contact information!"
  };

  const quickOptions = [
    { label: "Skills", value: "skills" },
    { label: "Projects", value: "projects" },
    { label: "Experience", value: "experience" },
    { label: "Certifications", value: "certifications" },
    { label: "Contact", value: "contact" }
  ];

  const handleQuickOption = (option) => {
    const newMessage = { text: option.label, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      const response = chatbotResponses[option.value] || chatbotResponses.default;
      setChatMessages(prev => [...prev, { text: response, sender: 'bot', timestamp: new Date() }]);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newMessage = { text: userMessage, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase();
      let response = chatbotResponses.default;
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) response = chatbotResponses.greeting;
      else if (lowerMessage.includes('skill')) response = chatbotResponses.skills;
      else if (lowerMessage.includes('contact')) response = chatbotResponses.contact;
      else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) response = chatbotResponses.experience;
      else if (lowerMessage.includes('project')) response = chatbotResponses.projects;
      else if (lowerMessage.includes('certif')) response = chatbotResponses.certifications;
      
      setChatMessages(prev => [...prev, { text: response, sender: 'bot', timestamp: new Date() }]);
    }, 1000);
  };

  const certifications = [
    { 
      id: 1, 
      title: 'Full Stack Programming', 
      issuer: 'Tectigon Academy', 
      date: '2023', 
      icon: <FaCode />,
      details: {
        description: 'Comprehensive full-stack development program covering modern web technologies and freelance skills.',
        skills: ['UI/UX Design', 'Figma', 'HTML CSS JS', 'PHP & MySQL', 'React JS', 'Java', 'Freelance Boost'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 2, 
      title: 'International Summer Academy of Advanced IoT', 
      issuer: 'UBT', 
      date: '2023', 
      icon: <FaAws />,
      details: {
        description: 'Advanced training in IoT technologies, cloud solutions and scalable development methodologies.',
        skills: ['Advanced IoT', 'Cloud Solution', 'Scalable Development'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 3, 
      title: 'DevOps Specialist', 
      issuer: 'Digital School', 
      date: '2023', 
      icon: <FaDatabase />,
      details: {
        description: 'Specialized DevOps training focusing on modern infrastructure and automation practices.',
        skills: ['Linux', 'Git', 'GitHub', 'Server Configuration', 'Nginx', 'Databases', 'Scripting', 'Containerization', 'Automation', 'Modern Infrastructure'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 4, 
      title: 'Web Development', 
      issuer: 'Sololearn', 
      date: '2022', 
      icon: <FaCode />,
      details: {
        description: 'Fundamental web development certification covering core frontend technologies.',
        skills: ['HTML CSS JS'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 5, 
      title: 'Responsive Web Design', 
      issuer: 'freeCodeCamp', 
      date: '2022', 
      icon: <FaFigma />,
      details: {
        description: 'Certification in creating responsive and accessible web designs.',
        skills: ['HTML CSS'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 6, 
      title: 'React Native', 
      issuer: 'Digital School', 
      date: '2023', 
      icon: <FaReact />,
      details: {
        description: 'Mobile app development certification using React Native framework.',
        skills: ['React Native'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 7, 
      title: 'Junior Tech Innovator', 
      issuer: 'Digital School', 
      date: '2023', 
      icon: <FaCode />,
      details: {
        description: 'Comprehensive technology innovation program covering multiple cutting-edge domains.',
        skills: ['Online Streaming', 'Artificial Intelligence (AI)', 'Cybersecurity', '3D Game Development', 'Creating AI-powered projects', 'AI-driven Entrepreneurship'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 8, 
      title: 'Backend Developer', 
      issuer: 'Digital School', 
      date: '2023', 
      icon: <FaNodeJs />,
      details: {
        description: 'Backend development specialization focusing on server-side technologies.',
        skills: ['PHP & MySQL', 'WordPress'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 9, 
      title: 'Junior IT & Media Technician', 
      issuer: 'Digital School', 
      date: '2022', 
      icon: <FaCode />,
      details: {
        description: 'Comprehensive IT and media technical training program.',
        skills: ['Web Design', 'Computer Networking', 'Cybersecurity', 'Entrepreneurship', 'Audio/Video editing', 'Computer Architecture'],
        validity: 'Lifetime',
        link: '#'
      }
    },
    { 
      id: 10, 
      title: 'Junior Java Developer', 
      issuer: 'Digital School', 
      date: '2023', 
      icon: <FaCode />,
      details: {
        description: 'Java programming and development fundamentals certification.',
        skills: ['Java'],
        validity: 'Lifetime',
        link: '#'
      }
    }
  ];

  
  

  // Updated skills with all your technologies
  const skills = [
    { name: 'React/Next.js', level: 90, icon: <FaReact />, color: '#61DAFB' },
    { name: 'UI/UX Design', level: 85, icon: <FaFigma />, color: '#F24E1E' },
    { name: 'HTML/CSS/JS', level: 95, icon: <FaCode />, color: '#F7DF1E' },
    { name: 'PHP & MySQL', level: 88, icon: <FaDatabase />, color: '#777BB4' },
    { name: 'Java', level: 82, icon: <FaCode />, color: '#ED8B00' },
    { name: 'React Native', level: 80, icon: <FaReact />, color: '#61DAFB' },
    { name: 'Linux/Git', level: 85, icon: <FaCode />, color: '#F05032' },
    { name: 'WordPress', level: 78, icon: <FaCode />, color: '#21759B' }
  ];

  const experiences = [
    { 
      title: 'Full Stack Developer Intern', 
      company: 'Tectigon Academy', 
      period: '2025', 
      description: 'Completed comprehensive full-stack programming training with focus on modern web technologies and freelance development.',
      technologies: ['UI/UX Design', 'Figma', 'HTML CSS JS', 'PHP & MySQL', 'React JS', 'MongoDb'],
      achievements: ['Mastered full-stack development', 'Gained freelance skills', 'Built multiple projects']
    },
    { 
      title: 'Graphic Design Intern', 
      company: 'Adliens', 
      period: '2024', 
      description: 'Advanced training in Graphic Design and Social Media.',
      technologies: ['Adobe Photoshop'],
      achievements: ['Learned advanced Graphic Design Concepts']
    }
  ];
   
  const roadmap = [
  {
    year: '2022',
    title: 'Started Web Development',
    desc: 'Mastered HTML, CSS, JavaScript, and Responsive Design fundamentals.',
    icon: <FaCode />
  },
  {
    year: '2022',
    title: 'Digital School IT Program',
    desc: 'Learned Networking, Cybersecurity, Media Tech, and Computer Architecture.',
    icon: <FaBriefcase />
  },
  {
    year: '2023',
    title: 'Full Stack & Mobile Development',
    desc: 'PHP, MySQL, React, React Native – built real-world applications.',
    icon: <FaReact />
  },
  {
    year: '2023',
    title: 'DevOps & IoT Academy',
    desc: 'Linux, Git, Automation, Cloud Solutions, and Scalable IoT systems.',
    icon: <FaAws />
  },
  {
    year: '2024+',
    title: 'Future: AI & Leadership',
    desc: 'Machine Learning, Microservices, System Design, and Tech Leadership.',
    icon: <FaRobot />
  }
];

  const projects = [
    {
      id: 1, 
      title: 'HealthQueue Kosova', 
      description: 'A comprehensive healthcare management system for optimizing patient queues and medical services.',
      detailedDescription: 'This project revolutionizes healthcare management with real-time queue optimization, patient tracking, and medical service coordination. Built with modern technologies for scalability and performance.',
      images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80'],
      video: null,
      github: 'https://github.com/username/healthqueue',
      liveDemo: '#',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
      features: ['Real-time Queue Management', 'Patient Tracking', 'Appointment Scheduling', 'Medical Analytics']
    },
    {
      id: 2, 
      title: 'UBT High School SMIS', 
      description: 'Student Management Information System for UBT High School with comprehensive administrative features.',
      detailedDescription: 'Advanced school management system handling student records, academic performance, attendance tracking, and administrative tasks with intuitive user interface.',
      images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'],
      video: null,
      github: 'https://github.com/username/smis',
      liveDemo: '#',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      features: ['Student Records', 'Grade Management', 'Attendance Tracking', 'Report Generation']
    },
    {
      id: 3, 
      title: 'Expenses Tracker System', 
      description: 'Personal finance management application with advanced analytics and budgeting features.',
      detailedDescription: 'Comprehensive expense tracking system with budget planning, financial analytics, and reporting capabilities. Helps users manage their finances effectively.',
      images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80'],
      video: null,
      github: 'https://github.com/username/expenses-tracker',
      liveDemo: '#',
      technologies: ['React Native', 'Firebase', 'Chart.js', 'Redux'],
      features: ['Expense Tracking', 'Budget Planning', 'Financial Reports', 'Multi-platform Support']
    }
  ];

  

  const stats = [
    { number: '10+', label: 'Completed Projects' },
    { number: '10+', label: 'Certifications' },
    { number: '15+', label: 'Technologies' },
    { number: '100%', label: 'Dedication' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    const handleTiltEffect = (e) => {
      if (!tiltRef.current) return;
      const rect = tiltRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 20;
      const tiltY = -(x / rect.width) * 20;
      tiltRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const resetTiltEffect = () => {
      if (tiltRef.current) {
        tiltRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', handleTiltEffect);
    document.addEventListener('mouseleave', resetTiltEffect);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleTiltEffect);
      document.removeEventListener('mouseleave', resetTiltEffect);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setValidated(false);
    setTimeout(() => setFormStatus(null), 5000);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };



  const navbarVariants = { hidden: { y: -100 }, visible: { y: 0, transition: { duration: 0.5 } } };
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };
  const staggerChildren = { visible: { transition: { staggerChildren: 0.2 } } };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setNavExpanded(false);
  };

  return (
    <div style={{ 
      background: theme === 'light' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)', 
      color: theme === 'light' ? '#1A202C' : '#F7FAFC', 
      transition: 'background 0.3s ease',
      minHeight: '100vh'
    }}>
      
    {/* Navigation – Clean, Animated, No Theme */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={navbarVariants}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrollPosition > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: scrollPosition > 50 ? 'blur(20px)' : 'none',
    borderBottom: scrollPosition > 50 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
    padding: '12px 0',
    transition: 'all 0.4s ease',
    boxShadow: scrollPosition > 50 ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
  }}
>
  <Navbar expand="lg" expanded={navExpanded} onToggle={setNavExpanded} variant="light">
    <Container>
      {/* Brand */}
      <Navbar.Brand
        onClick={() => scrollToSection('home')}
        style={{
          fontWeight: 'bold',
          fontSize: '1.6rem',
          cursor: 'pointer',
          color: '#2D3748',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ERTI HOXHA
      </Navbar.Brand>

      {/* Toggle Button */}
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{
          border: 'none',
          padding: '8px'
        }}
      >
        {navExpanded ? (
          <FaTimes size={20} color="#2D3748" />
        ) : (
          <FaBars size={20} color="#2D3748" />
        )}
      </Navbar.Toggle>

      {/* Nav Links */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto" style={{ gap: '8px' }}>
          {[
            'home',
            'about',
            'experience',
            'skills',
            'certifications',
            'roadmap',
            'projects',
            'contact'
          ].map((section) => (
            <Nav.Link
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                color: '#2D3748',
                fontWeight: '500',
                fontSize: '1rem',
                padding: '8px 18px',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2D3748';
              }}
            >
              {section === 'roadmap' ? 'Journey' : section.charAt(0).toUpperCase() + section.slice(1)}
              {/* Animated Underline */}
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  transition: 'all 0.3s ease',
                  transform: 'translateX(-50%)'
                }}
                className="underline-animation"
              />
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</motion.div>
      {/* Hero Section */}
      <section id="home" style={{ 
        background: theme === 'light' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)', 
        color: '#FFFFFF', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative',
        padding: '100px 0'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 120 }}>
                <motion.div style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  padding: '8px 20px', 
                  borderRadius: '50px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  marginBottom: '2rem', 
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }} whileHover={{ scale: 1.05 }}>
                  <FaHeart style={{ marginRight: '8px' }} /> Passionate Full Stack Developer
                </motion.div>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: '800', 
                  color: '#FFFFFF',
                  lineHeight: '1.2',
                  marginBottom: '1.5rem'
                }}>
                  Creating <span style={{ 
                    background: 'linear-gradient(45deg, #FFFFFF, #F0C4D8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Digital</span> Experiences
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ 
                  fontSize: '1.3rem', 
                  opacity: '0.9', 
                  color: '#FFFFFF', 
                  marginBottom: '3rem',
                  lineHeight: '1.6'
                }}>
                  Specializing in modern web applications, mobile development, and innovative digital solutions with focus on user experience and cutting-edge technologies.
                </motion.p>
                <motion.div variants={staggerChildren} initial="hidden" animate="visible" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '2rem', 
                  marginBottom: '3rem' 
                }}>
                  {stats.map((stat, index) => (
                    <motion.div key={index} variants={fadeIn} style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: '700', 
                        color: '#FFFFFF',
                        marginBottom: '0.5rem'
                      }}>{stat.number}</div>
                      <div style={{ 
                        fontSize: '1rem', 
                        opacity: '0.8', 
                        color: '#FFFFFF' 
                      }}>{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '2px solid rgba(255, 255, 255, 0.3)', 
                      padding: '15px 35px', 
                      borderRadius: '50px', 
                      color: '#FFFFFF', 
                      fontWeight: '600', 
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      fontSize: '1rem'
                    }} 
                    onClick={() => scrollToSection('projects')}
                  >
                    View Projects
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    style={{ 
                      background: '#FFFFFF',
                      border: '2px solid #FFFFFF', 
                      padding: '15px 35px', 
                      borderRadius: '50px', 
                      color: '#667eea', 
                      fontWeight: '600', 
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }} 
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </motion.button>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div 
                ref={tiltRef} 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1.2, delay: 0.3, type: 'spring' }} 
                style={{ position: 'relative', height: '500px' }}
              >
                <motion.div 
                  animate={controls} 
                  onHoverStart={() => controls.start({ rotateY: 10 })} 
                  onHoverEnd={() => controls.start({ rotateY: 0 })} 
                  style={{ 
                    position: 'absolute', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    backdropFilter: 'blur(20px)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '20px', 
                    padding: '20px', 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', 
                    width: '300px', 
                    height: '200px', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 3 
                  }}
                >
                  <div style={{ background: 'rgba(26, 32, 44, 0.8)', borderRadius: '10px', overflow: 'hidden', height: '100%' }}>
                    <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></span>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></span>
                      </div>
                      <div style={{ color: '#F7FAFC', fontSize: '0.9rem' }}>portfolio.jsx</div>
                    </div>
                    <div style={{ padding: '15px', color: '#F7FAFC', fontFamily: '"Courier New", monospace', fontSize: '0.8rem' }}>
                      <pre>{`function Portfolio() {
  return (
    <div className="portfolio">
      <Skills expertise="Advanced" />
      <Projects count="20+" />
      <Passion level="Maximum" />
    </div>
  );
}`}</pre>
                    </div>
                  </div>
                </motion.div>
                {[
                  { icon: <FaReact />, text: 'React Expert', top: '20%', right: '10%' }, 
                  { icon: <FaCode />, text: 'Full Stack', bottom: '20%', left: '10%' }, 
                  { icon: <FaFigma />, text: 'UI/UX Design', top: '40%', left: '5%' }
                ].map((card, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.2 }} 
                    whileHover={{ scale: 1.1 }}
                    style={{ 
                      position: 'absolute', 
                      background: 'rgba(255, 255, 255, 0.1)', 
                      backdropFilter: 'blur(20px)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)', 
                      borderRadius: '15px', 
                      padding: '15px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '100px', 
                      height: '100px', 
                      animation: `float 3s ease-in-out infinite ${i}s`, 
                      color: '#FFFFFF', 
                      fontSize: '1.5rem',
                      ...card 
                    }}
                  >
                    {card.icon}
                    <span style={{ fontSize: '0.7rem', marginTop: '8px', textAlign: 'center' }}>{card.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }} 
            style={{ 
              position: 'absolute', 
              bottom: '30px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              color: '#FFFFFF', 
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
            onClick={() => scrollToSection('about')}
          >
            Scroll Down ▼
          </motion.div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ 
        background: theme === 'light' ? '#FFFFFF' : '#2D3748', 
        color: theme === 'light' ? '#2D3748' : '#F7FAFC' 
      }}>
        <Container>
          <motion.div variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeIn} style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              color: theme === 'light' ? '#667eea' : '#CBD5E0', 
              position: 'relative', 
              display: 'inline-block', 
              marginBottom: '3rem', 
              textAlign: 'center',
              width: '100%'
            }}>
              About <span style={{ 
                background: theme === 'light' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #CBD5E0, #A0AEC0)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Me</span>
              <span style={{ 
                position: 'absolute', 
                bottom: '-10px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: '80px', 
                height: '4px', 
                background: theme === 'light' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #CBD5E0, #A0AEC0)', 
                borderRadius: '2px' 
              }}></span>
            </motion.h2>
            <Row className="align-items-center mt-5">
              <Col lg={6}>
                <motion.div variants={fadeIn} style={{ 
                  position: 'relative', 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
                }} whileHover={{ scale: 1.02 }}>
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4D03AQG7mmhkm00W3A/profile-displayphoto-scale_400_400/B4DZolqVwNGwAk-/0/1761568448745?e=1763596800&v=beta&t=-dOqCC23BYNJlXF46y43L8-LRi77WvVXGl56mh-neag" 
                    alt="About me" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                    opacity: '0.1' 
                  }}></div>
                </motion.div>
              </Col>
              <Col lg={6}>
                <motion.p variants={fadeIn} style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8', 
                  color: theme === 'light' ? '#4A5568' : '#CBD5E0',
                  marginBottom: '2rem'
                }}>
                  I'm a passionate full-stack developer with expertise in modern web technologies, mobile development, and innovative digital solutions. My journey includes comprehensive training in full-stack programming, DevOps, IoT technologies, and various specialized certifications that equip me to tackle complex challenges and deliver exceptional user experiences.
                </motion.p>
                <motion.div variants={staggerChildren} style={{ margin: '2rem 0' }}>
                  {[
                    { icon: <FaCode />, title: 'Clean Code', desc: 'I write organized, maintainable, and well-documented code following best practices' },
                    { icon: <FaHeart />, title: 'Passion for Learning', desc: 'Continuously exploring new technologies and staying updated with industry trends' },
                    { icon: <FaMedal />, title: 'Quality Focused', desc: 'Committed to delivering high-performance, user-centric solutions that exceed expectations' }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeIn} 
                      whileHover={{ x: 10 }} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        marginBottom: '1.5rem', 
                        padding: '1.5rem', 
                        background: theme === 'light' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.2)', 
                        borderRadius: '15px',
                        border: theme === 'light' ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      <div style={{ 
                        fontSize: '1.5rem', 
                        marginRight: '1rem', 
                        color: theme === 'light' ? '#667eea' : '#CBD5E0' 
                      }}>{feature.icon}</div>
                      <div>
                        <h5 style={{ 
                          marginBottom: '0.5rem', 
                          fontWeight: '600', 
                          color: theme === 'light' ? '#2D3748' : '#F7FAFC' 
                        }}>{feature.title}</h5>
                        <p style={{ 
                          marginBottom: 0, 
                          fontSize: '0.9rem', 
                          color: theme === 'light' ? '#4A5568' : '#CBD5E0',
                          lineHeight: '1.6'
                        }}>{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
               
               
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-5" style={{ 
        background: theme === 'light' ? '#F7FAFC' : '#4A5568', 
        color: theme === 'light' ? '#2D3748' : '#F7FAFC' 
      }}>
        <Container>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              color: theme === 'light' ? '#667eea' : '#CBD5E0', 
              position: 'relative', 
              display: 'inline-block', 
              marginBottom: '3rem', 
              textAlign: 'center',
              width: '100%'
            }}
          >
            Professional <span style={{ 
              background: theme === 'light' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #CBD5E0, #A0AEC0)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>Experience</span>
            <span style={{ 
              position: 'absolute', 
              bottom: '-10px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '80px', 
              height: '4px', 
              background: theme === 'light' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #CBD5E0, #A0AEC0)', 
              borderRadius: '2px' 
            }}></span>
          </motion.h2>
          <motion.div variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginTop: '3rem' }}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn} 
                whileHover={{ scale: 1.02 }} 
                style={{ 
                  marginBottom: '2rem', 
                  padding: '2rem', 
                  background: theme === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '20px', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: theme === 'light' ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <FaBriefcase style={{ 
                    fontSize: '1.5rem', 
                    color: theme === 'light' ? '#667eea' : '#CBD5E0', 
                    marginRight: '1rem',
                    marginTop: '5px'
                  }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontWeight: '700', 
                      color: theme === 'light' ? '#2D3748' : '#F7FAFC', 
                      marginBottom: '0.5rem',
                      fontSize: '1.3rem'
                    }}>{exp.title}</h4>
                    <h5 style={{ 
                      color: theme === 'light' ? '#667eea' : '#CBD5E0', 
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>{exp.company}</h5>
                    <p style={{ 
                      opacity: '0.8', 
                      marginBottom: '1rem', 
                      color: theme === 'light' ? '#4A5568' : '#CBD5E0',
                      fontSize: '0.9rem'
                    }}>{exp.period}</p>
                  </div>
                </div>
                <p style={{ 
                  color: theme === 'light' ? '#4A5568' : '#CBD5E0', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.7'
                }}>{exp.description}</p>
                <div className="mb-3">
                  <strong style={{ 
                    color: theme === 'light' ? '#2D3748' : '#F7FAFC',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>Technologies:</strong>
                  <div className="mt-1">
                    {exp.technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        className="me-1 mb-1" 
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: '#FFFFFF',
                          padding: '8px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <strong style={{ 
                    color: theme === 'light' ? '#2D3748' : '#F7FAFC',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>Key Achievements:</strong>
                  <ul style={{ 
                    color: theme === 'light' ? '#4A5568' : '#CBD5E0', 
                    marginBottom: 0, 
                    paddingLeft: '1.2rem',
                    lineHeight: '1.7'
                  }}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5" style={{ 
        background: theme === 'light' ? '#FFFFFF' : '#2D3748', 
        color: theme === 'light' ? '#2D3748' : '#F7FAFC' 
      }}>
        <Container>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              color: theme === 'light' ? '#667eea' : '#CBD5E0', 
              position: 'relative', 
              display: 'inline-block', 
              marginBottom: '3rem', 
              textAlign: 'center',
              width: '100%'
            }}
          >
            Technical <span style={{ 
              background: theme === 'light' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #CBD5E0, #A0AEC0)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>Skills</span>
            <span style={{ 
              position: 'absolute', 
              bottom: '-10px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '80px', 
              height: '4px', 
              background: theme === 'light' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #CBD5E0, #A0AEC0)', 
              borderRadius: '2px' 
            }}></span>
          </motion.h2>
          <Row className="mt-5">
            {skills.map((skill, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }} 
                  whileHover={{ scale: 1.05 }}
                >
                  <Card style={{ 
                    border: 'none', 
                    borderRadius: '20px', 
                    background: theme === 'light' ? '#F7FAFC' : 'rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    transition: 'all 0.3s ease'
                  }}>
                    <Card.Body className="text-center" style={{ padding: '2rem 1.5rem' }}>
                      <motion.div 
                        whileHover={{ rotate: 360 }} 
                        transition={{ duration: 0.5 }} 
                        style={{ 
                          fontSize: '3rem', 
                          marginBottom: '1.5rem', 
                          color: skill.color 
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      <Card.Title style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: '700', 
                        color: theme === 'light' ? '#2D3748' : '#F7FAFC',
                        marginBottom: '1rem'
                      }}>
                        {skill.name}
                      </Card.Title>
                      <div style={{ position: 'relative' }}>
                        <ProgressBar 
                          now={skill.level} 
                          style={{ 
                            height: '10px', 
                            background: theme === 'light' ? '#E2E8F0' : 'rgba(255, 255, 255, 0.2)', 
                            borderRadius: '10px',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <ProgressBar 
                            now={skill.level} 
                            style={{ 
                              background: `linear-gradient(135deg, ${skill.color}, ${skill.color}99)`,
                              borderRadius: '10px'
                            }}
                          />
                        </ProgressBar>
                        <span style={{ 
                          fontSize: '1rem', 
                          fontWeight: '700', 
                          color: theme === 'light' ? '#2D3748' : '#F7FAFC' 
                        }}>
                          {skill.level}%
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

 {/* Certifications Section – Professional Redesign */}
<section id="certifications" className="py-5" style={{ background: '#F8F9FA' }}>
  <Container>
    {/* Section Title */}
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: '4rem',
        letterSpacing: '-0.02em'
      }}
    >
      <span style={{ color: '#667eea', fontWeight: '800' }}>Certified</span>{' '}
      <span style={{ color: '#4A5568' }}>Expertise</span>
    </motion.h2>

    {/* Certifications Grid */}
    <Row className="g-4">
      {certifications.map((cert, index) => (
        <Col lg={4} md={6} key={cert.id}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Card
              style={{
                border: 'none',
                borderRadius: '16px',
                background: '#FFFFFF',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'visible',
                position: 'relative'
              }}
            >
              {/* Icon Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  zIndex: 2
                }}
              >
                {cert.icon}
              </div>

              <Card.Body style={{ padding: '2.5rem 1.5rem 1.5rem', textAlign: 'center' }}>
                {/* Title */}
                <h5
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1A1A1A',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}
                >
                  {cert.title}
                </h5>

                {/* Issuer */}
                <p
                  style={{
                    color: '#667eea',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {cert.issuer}
                </p>

                {/* Date */}
                <div
                  style={{
                    background: '#F1F5F9',
                    color: '#475569',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    display: 'inline-block'
                  }}
                >
                  {cert.date}
                </div>

                {/* Action Button */}
                <Button
                  size="sm"
                  onClick={() =>
                    setCertificateDetails((prev) => ({
                      ...prev,
                      [cert.id]: !prev[cert.id]
                    }))
                  }
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    padding: '10px 16px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {certificateDetails[cert.id] ? 'Hide Details' : 'View Details'}
                </Button>

                {/* Expandable Details */}
                <AnimatePresence>
                  {certificateDetails[cert.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          paddingTop: '1rem',
                          borderTop: '1px solid #E2E8F0'
                        }}
                      >
                        {/* Description */}
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748B',
                            marginBottom: '1rem',
                            lineHeight: '1.5'
                          }}
                        >
                          {cert.details.description}
                        </p>

                        {/* Skills */}
                        <div style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ 
                            color: '#1A1A1A', 
                            fontSize: '0.8rem', 
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600'
                          }}>
                            Key Skills
                          </strong>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {cert.details.skills.map((skill, i) => (
                              <span
                                key={i}
                                style={{
                                  background: '#EFF6FF',
                                  color: '#3B82F6',
                                  padding: '2px 8px',
                                  borderRadius: '8px',
                                  fontSize: '0.7rem',
                                  fontWeight: '500'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Validity */}
                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: '#64748B',
                            margin: '0.5rem 0'
                          }}
                        >
                          <strong style={{ color: '#1A1A1A' }}>Valid:</strong>{' '}
                          <span style={{ color: '#10B981' }}>{cert.details.validity}</span>
                        </p>

                        {/* Verify Button */}
                        <Button
                          variant="link"
                          href={cert.details.link}
                          target="_blank"
                          size="sm"
                          style={{
                            color: '#667eea',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            padding: '0',
                            textDecoration: 'none'
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Verify Certificate
                            <span style={{ fontSize: '0.6rem' }}>→</span>
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>
</section>
{/* Roadmap – Your Learning Journey */}
<section id="roadmap" className="py-5" style={{ background: '#FFFFFF' }}>
  <Container>
    {/* Section Title */}
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: '4rem',
        letterSpacing: '-0.02em'
      }}
    >
      My <span style={{ color: '#667eea', fontWeight: '800' }}>Learning Journey</span>
    </motion.h2>

    {/* Timeline Container */}
    <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '2rem 0' }}>
      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '3px',
          background: 'linear-gradient(to bottom, #667eea, #764ba2)',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
          zIndex: 0
        }}
      />

      {/* Timeline Items */}
      {roadmap.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          style={{
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            paddingLeft: index % 2 === 0 ? 0 : '50%',
            paddingRight: index % 2 === 0 ? '50%' : 0,
            position: 'relative'
          }}
        >
          {/* Timeline Node */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              [index % 2 === 0 ? 'right' : 'left']: '-68px',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              background: '#FFFFFF',
              border: '4px solid #667eea',
              borderRadius: '50%',
              boxShadow: '0 0 0 6px rgba(102, 126, 234, 0.2)',
              zIndex: 2
            }}
          />

          {/* Card */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            style={{
              background: '#FFFFFF',
              padding: '1.75rem 1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxWidth: '420px',
              width: '100%',
              position: 'relative',
              border: '1px solid #E2E8F0'
            }}
          >
            {/* Year */}
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#667eea',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem'
              }}
            >
              {item.year}
            </div>

            {/* Title */}
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1A1A1A',
                marginBottom: '0.75rem',
                lineHeight: '1.4'
              }}
            >
              {item.title}
            </h4>

            {/* Description */}
            <p
              style={{
                fontSize: '0.9rem',
                color: '#64748B',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}
            >
              {item.desc}
            </p>

            {/* Icon */}
            <div
              style={{
                fontSize: '1.8rem',
                color: '#667eea',
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'
              }}
            >
              {item.icon}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </Container>
</section>
 {/* Projects Section – Professional, No Image, No GitHub */}
<section id="projects" className="py-5" style={{ background: '#FFFFFF' }}>
  <Container>
    {/* Section Title */}
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: '4rem',
        letterSpacing: '-0.02em'
      }}
    >
      <span style={{ color: '#667eea', fontWeight: '800' }}>Featured</span> Projects
    </motion.h2>

    {/* Projects Grid */}
    <Row className="g-4">
      {projects.map((project, index) => (
        <Col lg={4} md={6} key={project.id}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Card
              style={{
                border: 'none',
                borderRadius: '16px',
                background: '#FFFFFF',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #E2E8F0'
              }}
            >
              {/* Project Icon / Placeholder */}
              <div
                style={{
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '2rem',
                  borderRadius: '16px 16px 0 0'
                }}
              >
                <FaCode />
              </div>

              <Card.Body style={{ padding: '1.75rem 1.5rem' }}>
                {/* Title */}
                <h5
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1A1A1A',
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}
                >
                  {project.title}
                </h5>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#64748B',
                    marginBottom: '1.25rem',
                    lineHeight: '1.6',
                    flexGrow: 1
                  }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#EFF6FF',
                          color: '#3B82F6',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        style={{
                          background: '#F8FAFC',
                          color: '#64748B',
                          padding: '4px 8px',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          border: '1px dashed #CBD5E1'
                        }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  size="sm"
                  onClick={() => openProjectModal(project)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    padding: '10px 16px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>
</section>
      {/* Get in Touch – Professional & Clean */}
<section id="contact" className="py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#FFFFFF' }}>
  <Container>
    {/* Section Title */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em'
      }}
    >
      Let's <span style={{ fontWeight: '800' }}>Collaborate</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        fontSize: '1.1rem',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 3rem',
        opacity: '0.9',
        lineHeight: '1.6'
      }}
    >
      Have a project in mind? I'm open to freelance work, full-time opportunities, or just a chat about tech.
    </motion.p>

    {/* Contact Card */}
    <Row className="justify-content-center">
      <Col lg={8} md={10}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          whileHover={{ y: -5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Email CTA */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-block' }}
            >
              <Button
                href="mailto:ertihoxha874@gmail.com"
                size="lg"
                style={{
                  background: '#FFFFFF',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px 36px',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#667eea';
                }}
              >
                <FaEnvelope style={{ marginRight: '10px', fontSize: '1.2rem' }} />
                ertihoxha874@gmail.com
              </Button>
            </motion.div>
          </div>

         

          {/* Social Links */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.9rem', opacity: '0.8', marginBottom: '1rem' }}>
              Or connect with me on:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              {[
                { icon: <FaGithub />, href: 'https://github.com/ertihoxha5', label: 'GitHub' },
                { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/erti-hoxha-0b8726281/?trk=opento_sprofile_topcard', label: 'LinkedIn' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.3rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </Col>
    </Row>
  </Container>
</section>
      {/* Footer */}
      <footer style={{ 
        background: theme === 'light' ? '#2D3748' : '#4A5568', 
        color: '#FFFFFF', 
        padding: '3rem 0 2rem', 
        position: 'relative' 
      }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <motion.h4 
                whileHover={{ scale: 1.05 }} 
                style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  marginBottom: '1rem' 
                }}
              >
                <span style={{ fontSize: '2rem', marginRight: '10px' }}>🚀</span> Erti Hoxha
              </motion.h4>
              <p style={{ color: '#CBD5E0', marginBottom: '2rem' }}>
                Crafting Tomorrow's Digital Experiences Today
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1.5rem', 
                margin: '2rem 0' 
              }}>
                {[<FaGithub />, <FaLinkedin />,  <FaEnvelope />].map((icon, i) => (
                  <motion.a 
                    key={i} 
                    whileHover={{ scale: 1.2, y: -5 }} 
                    transition={{ duration: 0.3 }} 
                    href="#" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#FFFFFF', 
                      fontSize: '1.3rem', 
                      textDecoration: 'none',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
              <p style={{ 
                opacity: '0.7', 
                fontSize: '0.9rem', 
                color: '#CBD5E0', 
                marginTop: '2rem' 
              }}>
                &copy; {new Date().getFullYear()} Erti Hoxha. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <Modal 
            show={showProjectModal} 
            onHide={() => setShowProjectModal(false)} 
            size="lg" 
            centered
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }} 
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Modal.Header 
                closeButton 
                style={{ 
                  background: theme === 'light' ? '#667eea' : '#4A5568', 
                  color: '#FFFFFF', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <Modal.Title style={{ fontWeight: '700' }}>
                  {selectedProject?.title} Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ 
                background: theme === 'light' ? '#FFFFFF' : '#2D3748', 
                color: theme === 'light' ? '#2D3748' : '#F7FAFC',
                borderRadius: '0 0 15px 15px'
              }}>
                <Carousel style={{ marginBottom: '2rem' }}>
                  {selectedProject?.images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img 
                        className="d-block w-100" 
                        src={img} 
                        alt={`Project slide ${i}`} 
                        style={{ 
                          height: '300px', 
                          objectFit: 'cover', 
                          borderRadius: '10px' 
                        }} 
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                {selectedProject?.video && (
                  <div style={{ marginBottom: '2rem' }}>
                    <iframe 
                      width="100%" 
                      height="300" 
                      src={selectedProject.video} 
                      title="Project Video" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ borderRadius: '10px' }}
                    ></iframe>
                  </div>
                )}
                <p style={{ 
                  lineHeight: '1.6', 
                  marginBottom: '2rem',
                  color: theme === 'light' ? '#4A5568' : '#CBD5E0'
                }}>
                  {selectedProject?.detailedDescription}
                </p>
                
                <div className="mb-3">
                  <strong style={{ color: theme === 'light' ? '#2D3748' : '#F7FAFC' }}>
                    Technologies Used:
                  </strong>
                  <div className="mt-2">
                    {selectedProject?.technologies.map((tech, i) => (
                      <Badge 
                        key={i} 
                        className="me-1 mb-1" 
                        style={{ 
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: '#FFFFFF',
                          padding: '8px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <strong style={{ color: theme === 'light' ? '#2D3748' : '#F7FAFC' }}>
                    Key Features:
                  </strong>
                  <ul className="mt-2" style={{ color: theme === 'light' ? '#4A5568' : '#CBD5E0' }}>
                    {selectedProject?.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex gap-2">
                  <Button 
                    variant="primary" 
                    href={selectedProject?.github} 
                    target="_blank"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: '500',
                      padding: '10px 20px'
                    }}
                  >
                    <FaGithub className="me-2" />
                    View Code
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    href={selectedProject?.liveDemo} 
                    target="_blank"
                    style={{ 
                      borderColor: '#667eea',
                      color: '#667eea',
                      borderRadius: '20px',
                      fontWeight: '500',
                      padding: '10px 20px'
                    }}
                  >
                    <FaExternalLinkAlt className="me-2" />
                    Live Demo
                  </Button>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <Modal 
        show={showContactModal} 
        onHide={() => setShowContactModal(false)} 
        centered
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <Modal.Header 
          closeButton 
          style={{ 
            background: theme === 'light' ? '#667eea' : '#4A5568', 
            color: '#FFFFFF', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px 15px 0 0'
          }}
        >
          <Modal.Title style={{ fontWeight: '700' }}>
            More Ways to Connect
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          background: theme === 'light' ? '#FFFFFF' : '#2D3748', 
          color: theme === 'light' ? '#2D3748' : '#F7FAFC',
          borderRadius: '0 0 15px 15px'
        }}>
          <p style={{ marginBottom: '1.5rem', color: theme === 'light' ? '#4A5568' : '#CBD5E0' }}>
            Reach out for projects, collaborations, or just to say hi!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p>
              <strong>Email:</strong> 
              <a 
                href="mailto:ertihoxha874@gmail.com" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  marginLeft: '0.5rem'
                }}
              >
                ertihoxha874@gmail.com
              </a>
            </p>
        
          </div>
        </Modal.Body>
      </Modal>

      {/* Chatbot Component */}
      <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050 }}>
        {/* Chatbot Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatbotOpen(!chatbotOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaRobot />
        </motion.button>

        {/* Chatbot Window */}
        <AnimatePresence>
          {chatbotOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'absolute',
                bottom: '70px',
                right: '0',
                width: '350px',
                height: '500px',
                background: theme === 'light' ? '#FFFFFF' : '#2D3748',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                border: `1px solid ${theme === 'light' ? '#E2E8F0' : '#4A5568'}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Chat Header */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div className="d-flex align-items-center">
                  <FaRobot style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
                  <strong>Erti's Assistant</strong>
                </div>
                <Button
                  variant="link"
                  onClick={() => setChatbotOpen(false)}
                  style={{ color: 'white', padding: 0, border: 'none' }}
                >
                  <FaTimesCircle />
                </Button>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                style={{
                  flex: 1,
                  padding: '1rem',
                  overflowY: 'auto',
                  background: theme === 'light' ? '#F7FAFC' : '#4A5568'
                }}
              >
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '0.75rem 1rem',
                        borderRadius: '18px',
                        background: message.sender === 'user' 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)'
                          : (theme === 'light' ? '#E2E8F0' : '#718096'),
                        color: message.sender === 'user' ? 'white' : (theme === 'light' ? '#2D3748' : '#F7FAFC'),
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}
                    >
                      {message.text}
                      <div style={{
                        fontSize: '0.7rem',
                        opacity: 0.7,
                        marginTop: '0.25rem',
                        textAlign: message.sender === 'user' ? 'right' : 'left'
                      }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Options */}
              <div style={{
                padding: '0.5rem 1rem',
                borderTop: `1px solid ${theme === 'light' ? '#E2E8F0' : '#4A5568'}`,
                background: theme === 'light' ? '#FFFFFF' : '#2D3748'
              }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {quickOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickOption(option)}
                      style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '15px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        color: '#667eea',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '1rem',
                borderTop: `1px solid ${theme === 'light' ? '#E2E8F0' : '#4A5568'}`,
                background: theme === 'light' ? '#FFFFFF' : '#2D3748'
              }}>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Ask me anything..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    style={{
                      background: theme === 'light' ? '#F7FAFC' : '#4A5568',
                      border: `1px solid ${theme === 'light' ? '#E2E8F0' : '#718096'}`,
                      color: theme === 'light' ? '#2D3748' : '#F7FAFC',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      padding: '10px 15px'
                    }}
                  />
                  <Button
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!userMessage.trim()}
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '45px',
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaPaperPlane size={14} />
                  </Button>
                </div>
                <small style={{
                  color: theme === 'light' ? '#4A5568' : '#CBD5E0',
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '0.5rem'
                }}>
                  Tap options above or type your question
                </small>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .hover-show { opacity: 0; transition: opacity 0.3s ease; }
        .card:hover .hover-show { opacity: 1; }
        .card-img-hover { transition: transform 0.3s ease; }
        .card:hover .card-img-hover { transform: scale(1.05); }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .form-control::placeholder { color: rgba(255, 255, 255, 0.6); }
        .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #FFFFFF;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};

export default AdvancedPortfolio;
