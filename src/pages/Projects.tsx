
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart2, Rocket, Gamepad2, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
    caption: string;
  }[];
  icon: keyof typeof icons;
  techStack: string[];
  problem: string;
  solution: string;
  impact: {
    metrics: {
      label: string;
      before: number;
      after: number;
    }[];
    stats: {
      value: string;
      label: string;
    }[];
  };
}

const icons = {
  chart: BarChart2,
  rocket: Rocket,
  game: Gamepad2,
};

const projects: Project[] = [
  {
    id: 1,
    title: "Dune Wizard",
    subtitle: "Web3 Analytics Dashboard",
    description: "Advanced analytics platform for blockchain data visualization and insights",
    image: "/placeholder.svg",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Dashboard Overview'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Analytics Interface'
      }
    ],
    icon: "chart",
    techStack: ["DuneSQL", "React", "TypeScript", "GraphQL", "Web3.js"],
    problem: "Complex blockchain data was difficult to analyze and visualize for non-technical users",
    solution: "Created an intuitive dashboard with AI-powered query generation and real-time visualizations",
    impact: {
      metrics: [
        { label: "Query Time", before: 120, after: 15 },
        { label: "User Adoption", before: 100, after: 850 },
        { label: "Data Points", before: 1000, after: 5000 }
      ],
      stats: [
        { value: "85%", label: "Reduction in analysis time" },
        { value: "8.5x", label: "Increase in user base" },
        { value: "5x", label: "More data coverage" }
      ]
    }
  },
  {
    id: 2,
    title: "BatchSmarter",
    subtitle: "AI-Powered Logistics Automation",
    description: "Intelligent automation platform for logistics and supply chain operations",
    image: "/placeholder.svg",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Logistics Dashboard'
      },
      {
        type: 'video',
        url: '/placeholder.svg',
        caption: 'Route Optimization Demo'
      }
    ],
    icon: "rocket",
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    problem: "Manual logistics processes were causing delays and errors in operations",
    solution: "Implemented AI-driven automation for route optimization and resource allocation",
    impact: {
      metrics: [
        { label: "Processing Time", before: 180, after: 30 },
        { label: "Error Rate", before: 15, after: 2 },
        { label: "Cost Savings", before: 1000, after: 4000 }
      ],
      stats: [
        { value: "83%", label: "Faster processing" },
        { value: "87%", label: "Fewer errors" },
        { value: "75%", label: "Cost reduction" }
      ]
    }
  },
  {
    id: 3,
    title: "Web3 GameFi Ops",
    subtitle: "Gaming Community Platform",
    description: "Comprehensive operations platform for Web3 gaming communities",
    image: "/placeholder.svg",
    media: [
      {
        type: 'gif',
        url: '/placeholder.svg',
        caption: 'Community Dashboard'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Analytics Overview'
      }
    ],
    icon: "game",
    techStack: ["Solidity", "React", "Node.js", "MongoDB", "Web3.js"],
    problem: "Scaling gaming communities while maintaining engagement was challenging",
    solution: "Built automated tools for community management and player analytics",
    impact: {
      metrics: [
        { label: "Active Users", before: 10000, after: 80000 },
        { label: "Engagement", before: 20, after: 75 },
        { label: "Revenue", before: 10000, after: 50000 }
      ],
      stats: [
        { value: "8x", label: "Community growth" },
        { value: "275%", label: "Engagement increase" },
        { value: "400%", label: "Revenue growth" }
      ]
    }
  }
];

// Duplicate projects with new IDs
const duplicatedProjects = [
  ...projects,
  ...projects.map(project => ({
    ...project,
    id: project.id + 3,
    title: `${project.title} 2.0`
  }))
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 fade-in">Case Studies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {duplicatedProjects.map((project, index) => {
            const IconComponent = icons[project.icon];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className="h-full hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-video w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-2xl font-semibold">{project.title}</h2>
                        <p className="text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {selectedProject.icon && icons[selectedProject.icon] && (
                      <div className="w-6 h-6 text-primary">
                        {React.createElement(icons[selectedProject.icon])}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2>{selectedProject.title}</h2>
                    <p className="text-base font-normal text-muted-foreground">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">The Challenge</h3>
                    <p className="text-muted-foreground">{selectedProject.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">The Solution</h3>
                    <p className="text-muted-foreground">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Media Gallery</h3>
                  <div className="grid gap-4">
                    {selectedProject.media.map((item, index) => (
                      <div key={index} className="space-y-2">
                        {item.type === 'video' ? (
                          <video
                            src={item.url}
                            controls
                            className="w-full rounded-lg"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full rounded-lg"
                          />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Impact & Results</h3>
                  <div className="h-[300px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedProject.impact.metrics}>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="before" fill="#94a3b8" name="Before" />
                        <Bar dataKey="after" fill="hsl(var(--primary))" name="After" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.impact.stats.map((stat, i) => (
                      <HoverCard key={i}>
                        <HoverCardTrigger>
                          <div className="p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="text-sm">
                            Click to learn more about this metric
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
}
