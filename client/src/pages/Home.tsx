import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, GraduationCap, MapPin, Calendar, Trophy, Zap, Heart } from "lucide-react";
import { Link } from "wouter";
import { newsData } from "@/data/newsData";
import heroRobot from "@assets/image_1771215214856.png";

const iconMap: Record<string, typeof Trophy> = { Trophy, Calendar, Heart, MapPin, Zap };

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Home() {
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <section className="min-h-[100vh] flex items-center relative overflow-hidden bg-gradient-to-br from-[hsl(222,30%,12%)] via-[hsl(222,22%,10%)] to-[hsl(220,28%,8%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="flex-1"
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-8">Established 2018</p>
              <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-8 text-white">
                Robotics
                <br />
                <span className="text-gradient-blue">for Kids</span>
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-md mb-10">
                High school students sharing robotics and programming knowledge with children across Thailand and ASEAN.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/contact">
                  <span className="inline-flex items-center text-sm font-medium tracking-wide uppercase bg-blue-600 text-white px-8 py-4 hover:bg-blue-500 transition-colors duration-300 cursor-pointer shadow-lg shadow-blue-600/20" data-testid="button-join">
                    Partner With Us
                  </span>
                </Link>
                <Link href="/about">
                  <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-white/50 hover:text-blue-400 transition-all duration-300 cursor-pointer" data-testid="button-learn-more">
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
              <img src={heroRobot} alt="R4K Robot" className="w-full max-w-sm md:max-w-md object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.2)]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(222,20%,14%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Impact</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">Our Progress</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              A growing network across 4 countries, 9 schools, and 100+ coaches and advisors.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-blue-500/10 rounded-lg overflow-hidden">
            {[
              { icon: Globe, label: "Countries", value: "4" },
              { icon: MapPin, label: "Partner Schools", value: "9" },
              { icon: Users, label: "Coaches & Advisors", value: "100+" },
              { icon: GraduationCap, label: "Core Members", value: "17" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[hsl(222,20%,16%)] p-10 md:p-14"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <stat.icon className="w-5 h-5 text-blue-400 mb-6" />
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</h3>
                <p className="text-sm text-white/40 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-[hsl(220,22%,18%)] to-[hsl(222,20%,14%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Education</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-white">Our Courses</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Micro:bit Tiny:bit", desc: "Basics of robotic programming using the Yahboom Tiny:bit smart robot and BBC Micro:bit.", image: "https://r4kclub.com//storage/412/63eb4945953b2_18C04C53-2D7A-4242-9C6F-48BDBEB3315E.jpeg", link: "https://docs.google.com/presentation/d/1OflKdwVpcN1dVqpK6EKd71--vB7qQP4f-RI5MU_bDTc/edit?usp=sharing" },
              { title: "LEGO EV3", desc: "Five class curriculum outlining the basics of robotics programming using LEGO Mindstorms EV3.", image: "https://r4kclub.com//storage/413/63eb4a29a3332_F24EFC0F-7809-4232-9BB0-FE73CC083C86.jpeg", link: "https://docs.google.com/presentation/d/13-g4edxw7CDdy4v-hbmjic7MD3ebHB5eBGfPxhVoHOE/edit" },
              { title: "Raspberry Pi", desc: "Thai language Raspberry Pi course with hands-on labs and assignments.", image: "https://r4kclub.com//storage/88/5fd6eaaff0299_870x400_08.jpg", link: "https://drive.google.com/file/d/14_mnA1poyv9cjoB9onj6YppqP5oegOP7/view?usp=sharing" },
              { title: "Micro:bit Zoom:bit", desc: "Robotics programming fundamentals based on the Micro:bit Zoom:bit platform.", image: "https://r4kclub.com//storage/615/65e561fe5fba4_zoombit-v2-TH-800x800.png", link: "https://docs.google.com/presentation/d/1ndA06pSGkPt7QtOgQYFrn9nsLddMeT5E7ypqfLsIKIU/edit?usp=sharing" },
            ].map((course, i) => (
              <motion.a
                key={i}
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-[hsl(222,20%,14%)] border border-blue-500/8 card-glow card-glow-hover transition-all duration-500 rounded-lg overflow-hidden"
                data-testid={`course-${i}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-100" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-heading text-lg font-semibold mb-2 text-white">{course.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{course.desc}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 group-hover:gap-3 transition-all duration-300">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(222,22%,10%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Community</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-white">Our Activities</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 rounded-lg overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,8%)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                  <p className="text-blue-300 text-xs tracking-wide uppercase mb-1">{activity.location}</p>
                  <h3 className="text-white text-sm font-medium">{activity.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-[hsl(222,20%,16%)] to-[hsl(222,20%,14%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Updates</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Latest News</h2>
            </motion.div>
            <Link href="/news">
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" data-testid="button-view-all-news">
                All News <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {latestNews.length > 0 ? latestNews.map((item, i) => {
              const Icon = iconMap[item.iconName] || Trophy;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-[hsl(222,20%,14%)] border border-blue-500/8 p-8 md:p-10 group card-glow card-glow-hover transition-all duration-500 rounded-lg"
                  data-testid={`news-${item.id}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-xs tracking-wide uppercase text-white/40">{item.category}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 leading-snug text-white">{item.title}</h3>
                  <p className="text-sm text-white/35 mb-6">{item.date}</p>
                  <Link href="/news" data-testid={`link-read-news-${item.id}`}>
                    <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 group-hover:gap-3 transition-all duration-300 cursor-pointer">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              );
            }) : (
              <div className="col-span-3 bg-[hsl(222,20%,14%)] text-center py-20 text-white/40 rounded-lg">No news yet.</div>
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400" data-testid="button-view-all-news-mobile">View All News <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-[hsl(220,35%,18%)] via-[hsl(222,28%,14%)] to-[hsl(224,30%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center relative z-10">
          <motion.div {...fadeUp}>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-8">Support</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-gradient">Support Our Mission</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed">
              We are open for donations for teaching materials and student coach tuition.
            </p>
            <Link href="/contact">
              <span className="inline-flex items-center text-sm font-medium tracking-wide uppercase bg-blue-600 text-white px-8 py-4 hover:bg-blue-500 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-600/25" data-testid="button-donate">
                Make a Donation
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
