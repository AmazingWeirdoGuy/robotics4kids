import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Award, BookOpen, Calendar, Trophy, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { newsData } from "@/data/newsData";
import heroImage from "@assets/generated_images/high_school_robotics_team_building_a_sleek_robot_in_a_bright_lab.png";
import workshopImage from "@assets/generated_images/robotics_workshop_with_kids_coding.png";
import competitionImage from "@assets/generated_images/robotics_competition_arena.png";

const iconMap: Record<string, typeof Trophy> = {
  Trophy,
  Calendar,
  TrendingUp,
  MapPin,
  Zap,
};

export default function Hero() {
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Robotics Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-black/90 dark:via-black/70" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200">
              Established 2025
            </span>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-6 text-foreground">
              Robotics for <span className="text-primary">Kids</span>
              <br />
              <span className="text-4xl md:text-6xl opacity-80">Innovating Tomorrow.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We are a group of high school students sharing our passion for robotics and programming with the next generation of innovators.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-xl shadow-primary/25">
                  Join the Team
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 bg-white/50 backdrop-blur border-white/40 hover:bg-white/80">
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Progress & Impacts Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Progress & Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Since our founding, we've been dedicated to making a measurable difference in our community through STEM education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Students Reached", value: "500+", color: "text-blue-500" },
              { icon: Award, label: "Awards Won", value: "15", color: "text-purple-500" },
              { icon: TrendingUp, label: "Workshops Hosted", value: "40+", color: "text-cyan-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-white/80 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-lg ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-5xl font-bold font-heading mb-2">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Course Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Education</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Our Course Curriculum</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We've developed a comprehensive curriculum designed to take students from zero to hero in robotics. Our courses cover mechanics, electronics, and programming.
              </p>
              
              <div className="space-y-6 mb-8">
                {[
                  { title: "Intro to Python", desc: "Learn the language of the future with hands-on coding." },
                  { title: "Mechanical Engineering", desc: "Design and build robot chassis and mechanisms." },
                  { title: "Sensors & Logic", desc: "Make robots smarter with autonomous decision making." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/contact">
                <Button className="rounded-full px-8 py-6 shadow-lg shadow-primary/20">Enroll in a Course</Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <img src={workshopImage} alt="Students learning" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">98%</p>
                    <p className="text-sm text-muted-foreground">Student Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Activities Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Activities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Beyond the classroom, we engage in competitions, hackathons, and community events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl aspect-video shadow-xl"
            >
              <img src={competitionImage} alt="Competition" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Robotics Competitions</h3>
                <p className="text-white/80">Testing our skills against the best teams in the region.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-video shadow-xl"
            >
              <img src={workshopImage} alt="Workshop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Community Workshops</h3>
                <p className="text-white/80">Teaching local kids the fundamentals of STEM.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Latest News</h2>
              <p className="text-muted-foreground text-lg">Updates from the R4K team.</p>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="hidden md:flex group">
                View All News <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.length > 0 ? (
              latestNews.map((item, i) => {
                const Icon = iconMap[item.iconName] || Trophy;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 rounded-2xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-50 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.date}</p>
                    <Link href="/news">
                      <span className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No news items yet. Check back soon!
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <Button variant="outline" className="w-full">View All News</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
