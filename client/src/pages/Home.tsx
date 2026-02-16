import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, GraduationCap, BookOpen, Calendar, Trophy, MapPin, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { newsData } from "@/data/newsData";

const iconMap: Record<string, typeof Trophy> = {
  Trophy,
  Calendar,
  Heart,
  MapPin,
  Zap,
};

export default function Hero() {
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200">
              Established 2018
            </span>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-6 text-foreground">
              Robotics for <span className="text-primary">Kids</span>
              <br />
              <span className="text-4xl md:text-6xl opacity-80">Technology Equity.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We are a group of high school students sharing our knowledge about robotics and programming with children across Thailand and ASEAN.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-xl shadow-primary/25" data-testid="button-join">
                  Partner With Us
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 bg-white/50 backdrop-blur border-white/40 hover:bg-white/80" data-testid="button-learn-more">
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
      </section>

      {/* Progress & Impacts Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Progress & Impact</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              R4K is now in 9 schools across Thailand, Myanmar, Philippines and Laos. We have grown into a network of 100+ student coaches and teacher advisors, supported by 17 strong core club members.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Globe, label: "Countries", value: "4", color: "text-blue-500" },
              { icon: MapPin, label: "Partner Schools", value: "9", color: "text-green-500" },
              { icon: Users, label: "Coaches & Advisors", value: "100+", color: "text-purple-500" },
              { icon: GraduationCap, label: "Core Members", value: "17", color: "text-cyan-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl text-center"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Our Courses Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Education</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Courses</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Providing kids with the fun experience of robotics and programming foundations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Micro:bit Tiny:bit",
                desc: "Overview and three classes outlining the basics of robotic programming using the Yahboom Tiny:bit smart robot and BBC Micro:bit chip.",
                image: "https://r4kclub.com//storage/412/63eb4945953b2_18C04C53-2D7A-4242-9C6F-48BDBEB3315E.jpeg",
                link: "https://docs.google.com/presentation/d/1OflKdwVpcN1dVqpK6EKd71--vB7qQP4f-RI5MU_bDTc/edit?usp=sharing"
              },
              {
                title: "LEGO EV3",
                desc: "Five class curriculum outlining the basics of robotics programming using the Lego Mindstorms EV3 robot.",
                image: "https://r4kclub.com//storage/413/63eb4a29a3332_F24EFC0F-7809-4232-9BB0-FE73CC083C86.jpeg",
                link: "https://docs.google.com/presentation/d/13-g4edxw7CDdy4v-hbmjic7MD3ebHB5eBGfPxhVoHOE/edit"
              },
              {
                title: "Raspberry Pi",
                desc: "Thai language Raspberry Pi course with labs and assignments.",
                image: "https://r4kclub.com//storage/88/5fd6eaaff0299_870x400_08.jpg",
                link: "https://drive.google.com/file/d/14_mnA1poyv9cjoB9onj6YppqP5oegOP7/view?usp=sharing"
              },
              {
                title: "Micro:bit Zoom:bit",
                desc: "A course outlining the basics of robotics programming, based on the Micro:bit Zoom:bit platform.",
                image: "https://r4kclub.com//storage/615/65e561fe5fba4_zoombit-v2-TH-800x800.png",
                link: "https://docs.google.com/presentation/d/1ndA06pSGkPt7QtOgQYFrn9nsLddMeT5E7ypqfLsIKIU/edit?usp=sharing"
              },
            ].map((course, i) => (
              <motion.a
                key={i}
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow"
                data-testid={`course-${i}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{course.desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    View Course <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Our Activities Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Activities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our activities comprise fundraising and setting up R4K clubs at partner schools, both are of non-profit nature.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Wat Sai Yai School, Nonthaburi",
                image: "https://r4kclub.com//storage/409/63eb476bbef6c_A4FD0D92-1673-4614-8D95-B04FC928CEE5.jpeg",
                location: "Thailand"
              },
              {
                title: "Xavier Schools & UP Integrated School",
                image: "https://r4kclub.com//storage/410/63eb47a3738b7_9832607F-1C44-40F4-AC7D-C4C66AA7EE45.jpeg",
                location: "Philippines"
              },
              {
                title: "Pasatipatai School, Luang Prabang",
                image: "https://r4kclub.com//storage/541/6437b232e28a1_7ar4k.jpeg",
                location: "Laos"
              },
              {
                title: "Wat Lat Pla Duk School, Nonthaburi",
                image: "https://r4kclub.com//storage/596/65e40c83d562b_R4K-Wat-Lat-Pla-Duk.jpg",
                location: "Thailand"
              },
              {
                title: "Fundraising Activities in Bangkok",
                image: "https://r4kclub.com//storage/219/5fe6d96848b0a_12.jpg",
                location: "Thailand"
              },
              {
                title: "Prasert Islam School, Nonthaburi",
                image: "https://r4kclub.com//storage/175/5fe015a49416b_800x600_04.jpg",
                location: "Thailand"
              },
              {
                title: "Schools of Hope Foundation",
                image: "https://r4kclub.com//storage/133/5fd71ee2030c3_16.jpg",
                location: "Myanmar-Thai Border"
              },
              {
                title: "Phimai Vithaya School, Nakhon Ratchasima",
                image: "https://r4kclub.com//storage/239/5fe98012bfd74_IMG_5169.JPG",
                location: "Thailand"
              },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg"
                data-testid={`activity-${i}`}
              >
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-blue-300 text-xs font-medium mb-1">{activity.location}</span>
                  <h3 className="text-white text-sm font-bold line-clamp-2">{activity.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Latest News</h2>
              <p className="text-muted-foreground text-lg">Follow our latest news and announcements here.</p>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="hidden md:flex group" data-testid="button-view-all-news">
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
                    data-testid={`news-${item.id}`}
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
              <Button variant="outline" className="w-full" data-testid="button-view-all-news-mobile">View All News</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              We are now open for donations for the purchase of materials needed for teaching and for student coach's tuition.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg h-14" data-testid="button-donate">
                Make a Donation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
