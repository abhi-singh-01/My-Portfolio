import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaJava,
  FaLinux,
} from 'react-icons/fa';
import {
  SiMongodb as MongoIcon,
  SiExpress as ExpressIcon,
  SiTailwindcss as TailwindIcon,
  SiRedux as ReduxIcon,
  SiFirebase as FirebaseIcon,
  SiSpringboot as SpringBootIcon,
  SiMysql as MysqlIcon,
  SiGraphql as GraphqlIcon,
  SiMui as MaterialUIIcon,
  SiBootstrap as BootstrapIcon,
  SiApachekafka as KafkaIcon,
  SiRedis as RedisIcon,
  SiTypescript as TypescriptIcon,
  SiC as CIcon,
  SiPostgresql as PostgresqlIcon,
  SiNumpy as NumpyIcon,
  SiPandas as PandasIcon,
  SiPytorch as PytorchIcon,
  SiLangchain as LangchainIcon,
  SiOpenai as OpenaiIcon,
  SiScikitlearn as ScikitLearnIcon,
  SiOpencv as OpencvIcon,
  SiHuggingface as HuggingfaceIcon,
  SiFramer as FramerMotionIcon,
  SiNestjs as NestjsIcon,
  SiNextdotjs as NextjsIcon,
  SiGooglecloud as GcpIcon,
  SiCloudinary as CloudinaryIcon,
  SiKubernetes as KubernetesIcon,
  SiRabbitmq as RabbitmqIcon,
  SiFastapi as FastapiIcon,
  SiDjango as DjangoIcon,
  SiPrisma as PrismaIcon,
} from 'react-icons/si';
import './Skills.css';

// Move static data outside component to prevent recreation
const skills = [
  { name: 'React', icon: FaReact, proficiency: 90, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, proficiency: 85, color: '#339933' },
  { name: 'JavaScript (ES6+)', icon: FaJs, proficiency: 90, color: '#F7DF1E' },
  { name: 'Java', icon: FaJava, proficiency: 85, color: '#007396' },
  { name: 'Spring Boot', icon: SpringBootIcon, proficiency: 80, color: '#6DB33F' },
  { name: 'MongoDB', icon: MongoIcon, proficiency: 80, color: '#47A248' },
  { name: 'MySQL', icon: MysqlIcon, proficiency: 80, color: '#4479A1' },
  { name: 'Express', icon: ExpressIcon, proficiency: 85, color: '#000000' },
  { name: 'Python', icon: FaPython, proficiency: 75, color: '#3776AB' },
  { name: 'Git', icon: FaGitAlt, proficiency: 85, color: '#F05032' },
  { name: 'Docker', icon: FaDocker, proficiency: 70, color: '#2496ED' },
  { name: 'AWS', icon: FaAws, proficiency: 65, color: '#FF9900' },
  { name: 'Redux', icon: ReduxIcon, proficiency: 80, color: '#764ABC' },
  { name: 'Tailwind CSS', icon: TailwindIcon, proficiency: 85, color: '#06B6D4' },
  { name: 'Material UI', icon: MaterialUIIcon, proficiency: 80, color: '#007FFF' },
  { name: 'Bootstrap', icon: BootstrapIcon, proficiency: 85, color: '#7952B3' },
  { name: 'Firebase', icon: FirebaseIcon, proficiency: 75, color: '#FFCA28' },
  { name: 'GraphQL', icon: GraphqlIcon, proficiency: 75, color: '#E10098' },
  { name: 'Kafka', icon: KafkaIcon, proficiency: 70, color: '#231F20' },
  { name: 'Linux', icon: FaLinux, proficiency: 80, color: '#FCC624' },
  { name: 'Redis', icon: RedisIcon, proficiency: 75, color: '#DC382D' },
  { name: 'TypeScript', icon: TypescriptIcon, proficiency: 80, color: '#3178C6' },
  { name: 'C', icon: CIcon, proficiency: 75, color: '#A8B9CC' },
  { name: 'PostgreSQL', icon: PostgresqlIcon, proficiency: 75, color: '#4169E1' },
  { name: 'NumPy', icon: NumpyIcon, proficiency: 75, color: '#013243' },
  { name: 'Pandas', icon: PandasIcon, proficiency: 75, color: '#150458' },
  { name: 'PyTorch', icon: PytorchIcon, proficiency: 70, color: '#EE4C2C' },
  { name: 'LangChain', icon: LangchainIcon, proficiency: 70, color: '#1C3C3C' },
  { name: 'OpenAI', icon: OpenaiIcon, proficiency: 75, color: '#412991' },
  { name: 'Scikit-learn', icon: ScikitLearnIcon, proficiency: 70, color: '#F7931E' },
  { name: 'OpenCV', icon: OpencvIcon, proficiency: 70, color: '#5C3EE8' },
  { name: 'Hugging Face', icon: HuggingfaceIcon, proficiency: 70, color: '#FFD21E' },
  { name: 'Framer Motion', icon: FramerMotionIcon, proficiency: 80, color: '#0055FF' },
  { name: 'NestJS', icon: NestjsIcon, proficiency: 75, color: '#E0234E' },
  { name: 'Next.js', icon: NextjsIcon, proficiency: 80, color: '#000000' },
  { name: 'GCP', icon: GcpIcon, proficiency: 65, color: '#4285F4' },
  { name: 'Cloudinary', icon: CloudinaryIcon, proficiency: 75, color: '#3448C5' },
  { name: 'Kubernetes', icon: KubernetesIcon, proficiency: 65, color: '#326CE5' },
  { name: 'RabbitMQ', icon: RabbitmqIcon, proficiency: 70, color: '#FF6600' },
  { name: 'FastAPI', icon: FastapiIcon, proficiency: 75, color: '#009688' },
  { name: 'Django', icon: DjangoIcon, proficiency: 70, color: '#092E20' },
  { name: 'Prisma', icon: PrismaIcon, proficiency: 75, color: '#2D3748' },
];

const categories = {
  Languages: ['C', 'Java', 'JavaScript (ES6+)', 'Python', 'TypeScript'],
  'AI/ML': ['Hugging Face', 'LangChain', 'NumPy', 'OpenAI', 'OpenCV', 'Pandas', 'PyTorch', 'Scikit-learn'],
  Frontend: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'Material UI', 'Bootstrap', 'Redux'],
  Backend: ['Node.js', 'Express', 'NestJS', 'Spring Boot', 'FastAPI', 'Django', 'GraphQL', 'Kafka', 'RabbitMQ'],
  Database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis', 'Prisma'],
  Tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Cloudinary', 'Linux'],
};

// Move animation variants outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Skills = memo(() => {
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  // Memoize category skills filtering
  const categorySkillsMap = useMemo(() => {
    const map = {};
    Object.entries(categories).forEach(([category, skillNames]) => {
      map[category] = skills.filter(skill => skillNames.includes(skill.name));
    });
    return map;
  }, []);

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.div
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {Object.entries(categories).map(([category]) => {
            const categorySkills = categorySkillsMap[category];

            return (
              <motion.div
                key={category}
                className="skill-category"
                variants={itemVariants}
              >
                <h3 className="category-title">{category}</h3>
                <div className="skills-grid">
                  {categorySkills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="skill-card"
                        whileHover={{ scale: 1.1, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="skill-icon" style={{ color: skill.color }}>
                          <IconComponent />
                        </div>
                        <h4>{skill.name}</h4>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-progress"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <span className="skill-percentage">{skill.proficiency}%</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;


