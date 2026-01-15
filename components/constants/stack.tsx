import { 
    Code2, Server, Cloud, Cpu, 
    Database, Layout
} from "lucide-react";

export const stack = [
    {
        category: "Languages",
        description: "The core tools I use to solve algorithmic challenges and build type-safe, efficient logic.",
        icon: <Code2 className="w-5 h-5" />,
        items: [
            { name: "Java", detail: "The primary language I use for building microservices and backend logic." },
            { name: "TypeScript", detail: "My choice for building reliable, type-safe web applications." },
            { name: "Python", detail: "Utilized for automation scripts, AWS Lambda, and AI research projects." },
            { name: "C/C++", detail: "My foundation for competitive programming (LeetCode Guardian & Codeforces Expert)." },
            { name: "SQL", detail: "Working with PostgreSQL to design and query relational databases." }
        ]
    },
    {
        category: "Frontend",
        description: "Building responsive and fast user interfaces using modern web frameworks.",
        icon: <Layout className="w-5 h-5" />,
        items: [
            { name: "React.js", detail: "Creating interactive components and managing state in web apps." },
            { name: "Next.js", detail: "Used for this portfolio to leverage Server-Side Rendering and fast load times." },
            { name: "Tailwind CSS", detail: "My go-to framework for rapid, responsive, and clean UI styling." },
            { name: "Vite", detail: "The build tool I used for my CodeArena project to ensure a fast dev experience." }
        ]
    },
    {
        category: "Backend & Microservices",
        description: "Developing the server-side logic and distributed systems that power modern apps.",
        icon: <Server className="w-5 h-5" />,
        items: [
            { name: "Spring Boot", detail: "Used at Publicis Sapient to develop microservices with improved API latency." },
            { name: "Express.js", detail: "Leveraged for fast development and lightweight Node.js backend services." },
            { name: "Kafka", detail: "Implemented an asynchronous pipeline to decouple services in my coding platform project." },
            { name: "REST APIs", detail: "Building and integrating standardized endpoints for seamless data flow." }
        ]
    },
    {
        category: "Databases",
        description: "Storing and managing data efficiently using both Relational and NoSQL solutions.",
        icon: <Database className="w-5 h-5" />,
        items: [
            { name: "PostgreSQL", detail: "The database I use for structured data and complex relationships." },
            { name: "MongoDB", detail: "Used for flexible data storage in my rapid-prototyping projects." },
            { name: "Redis", detail: "Implemented for distributed caching to boost application performance." }
        ]
    },
    {
        category: "Cloud & DevOps",
        description: "Deploying applications and automating workflows for reliable software delivery.",
        icon: <Cloud className="w-5 h-5" />,
        items: [
            { name: "AWS", detail: "Certified Cloud Practitioner; experienced with EC2, S3, and serverless functions." },
            { name: "Docker", detail: "Containerizing applications to ensure they run consistently across environments." },
            { name: "Kubernetes", detail: "Learning and applying orchestration for scalable container deployments." },
            { name: "Jenkins", detail: "Establishing CI/CD pipelines to automate testing and deployment." }
        ]
    },
    {
        category: "System Design",
        description: "Exploring advanced concepts in distributed logic and system observability.",
        icon: <Cpu className="w-5 h-5" />,
        items: [
            { name: "Distributed Systems", detail: "Studying and implementing decentralized logic for fault-tolerant apps." },
            { name: "Monitoring", detail: "Using Grafana and Loki to keep track of system health and logs." }
        ]
    }
];