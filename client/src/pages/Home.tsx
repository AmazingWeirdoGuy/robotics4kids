import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, GraduationCap, MapPin, Calendar, Trophy, Zap, Heart } from "lucide-react";

function CountUp({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepTime = (duration * 1000) / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
import { Link } from "wouter";
import heroRobot from "@assets/image_1771215214856.png";

const iconMap: Record<string, typeof Trophy> = { Trophy, Calendar, Heart, MapPin, Zap };

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  content: string;
  iconName: string;
  image: string;
}

interface Program {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export default function Home() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/news.json").then(r => r.json()),
      fetch("/data/programs.json").then(r => r.json()),
    ]).then(([news, progs]) => {
      setNewsItems(news);
      setPrograms(progs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const latestNews = newsItems.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <section className="min-h-[100vh] flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="flex-1"
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-8">Established 2018</p>
              <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-8 text-slate-900">
                Robotics
                <br />
                <span className="text-gradient-blue">for Kids</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-10">
                High school students sharing robotics and programming knowledge with children across Thailand and ASEAN.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/contact">
                  <span className="inline-flex items-center text-sm font-medium tracking-wide uppercase bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer shadow-lg shadow-blue-600/20" data-testid="button-join">
                    Partner With Us
                  </span>
                </Link>
                <Link href="/about">
                  <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-slate-500 hover:text-blue-600 transition-all duration-300 cursor-pointer" data-testid="button-learn-more">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <img src={heroRobot} alt="R4K Robot" className="w-full max-w-sm md:max-w-md object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.15)]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Impact</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6 text-slate-900">Our Progress</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A growing network across 4 countries, 9 schools, and 100+ coaches and advisors.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden">
            {[
              { icon: Globe, label: "Countries", value: 4, suffix: "" },
              { icon: MapPin, label: "Partner Schools", value: 9, suffix: "" },
              { icon: Users, label: "Coaches & Advisors", value: 100, suffix: "+" },
              { icon: GraduationCap, label: "Core Members", value: 17, suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-10 md:p-14"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <stat.icon className="w-5 h-5 text-blue-600 mb-6" />
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-slate-900">
                  <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                </h3>
                <p className="text-sm text-slate-500 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Education</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-slate-900">Our Courses</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((course, i) => (
              <motion.a
                key={course.id}
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-white border border-slate-200 card-glow card-glow-hover transition-all duration-500 rounded-xl overflow-hidden"
                data-testid={`course-${i}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-heading text-lg font-semibold mb-2 text-slate-900">{course.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{course.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600 group-hover:gap-3 transition-all duration-300">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Community</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-slate-900">Our Activities</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 rounded-xl overflow-hidden">
            {[
              { title: "Wat Sai Yai School", image: "https://r4kclub.com//storage/409/63eb476bbef6c_A4FD0D92-1673-4614-8D95-B04FC928CEE5.jpeg", location: "Thailand" },
              { title: "Xavier Schools & UP Integrated", image: "https://r4kclub.com//storage/410/63eb47a3738b7_9832607F-1C44-40F4-AC7D-C4C66AA7EE45.jpeg", location: "Philippines" },
              { title: "Pasatipatai School", image: "https://r4kclub.com//storage/541/6437b232e28a1_7ar4k.jpeg", location: "Laos" },
              { title: "Wat Lat Pla Duk School", image: "https://r4kclub.com//storage/596/65e40c83d562b_R4K-Wat-Lat-Pla-Duk.jpg", location: "Thailand" },
              { title: "Fundraising in Bangkok", image: "https://r4kclub.com//storage/219/5fe6d96848b0a_12.jpg", location: "Thailand" },
              { title: "Prasert Islam School", image: "https://r4kclub.com//storage/175/5fe015a49416b_800x600_04.jpg", location: "Thailand" },
              { title: "Schools of Hope Foundation", image: "https://r4kclub.com//storage/133/5fd71ee2030c3_16.jpg", location: "Myanmar Border" },
              { title: "Phimai Vithaya School", image: "https://r4kclub.com//storage/239/5fe98012bfd74_IMG_5169.JPG", location: "Thailand" },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden aspect-square"
                data-testid={`activity-${i}`}
              >
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                  <p className="text-blue-300 text-xs tracking-wide uppercase mb-1">{activity.location}</p>
                  <h3 className="text-white text-sm font-medium">{activity.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Updates</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">Latest News</h2>
            </motion.div>
            <Link href="/news">
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" data-testid="button-view-all-news">
                All News <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {loading ? (
              <div className="col-span-3 bg-white text-center py-20 text-slate-400 rounded-xl border border-slate-200">Loading...</div>
            ) : latestNews.length > 0 ? latestNews.map((item, i) => {
              const Icon = iconMap[item.iconName] || Trophy;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-white border border-slate-200 p-8 md:p-10 group card-glow card-glow-hover transition-all duration-500 rounded-xl"
                  data-testid={`news-${item.id}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-xs tracking-wide uppercase text-slate-400">{item.category}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 leading-snug text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-6">{item.date}</p>
                  <Link href={`/news/${item.id}`} data-testid={`link-read-news-${item.id}`}>
                    <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600 group-hover:gap-3 transition-all duration-300 cursor-pointer">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              );
            }) : (
              <div className="col-span-3 bg-white text-center py-20 text-slate-400 rounded-xl border border-slate-200">No news yet.</div>
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600" data-testid="button-view-all-news-mobile">View All News <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-12 md:p-20 text-center card-glow">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-6">Support</p>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-slate-900">Support Our Mission</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
                We are open for donations for teaching materials and student coach tuition.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center text-sm font-medium tracking-wide uppercase bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-600/20" data-testid="button-donate">
                  Make a Donation
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
