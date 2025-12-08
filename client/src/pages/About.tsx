import { motion } from "framer-motion";
import { Target, Users, Repeat, MapPin, Calendar, Award, Code, BookOpen, UserCheck } from "lucide-react";

const teamCategories = [
  {
    title: "Officers",
    icon: Award,
    color: "bg-blue-100 text-blue-600",
    members: [
      { name: "Officer Name 1", role: "President" },
      { name: "Officer Name 2", role: "Vice President" },
      { name: "Officer Name 3", role: "Secretary" },
    ]
  },
  {
    title: "Website Development",
    icon: Code,
    color: "bg-purple-100 text-purple-600",
    members: [
      { name: "Developer Name 1", role: "Lead Developer" },
      { name: "Developer Name 2", role: "Developer" },
    ]
  },
  {
    title: "Faculty Advisors",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    members: [
      { name: "Advisor Name 1", role: "Faculty Advisor" },
      { name: "Advisor Name 2", role: "Faculty Advisor" },
    ]
  },
  {
    title: "Active Members",
    icon: UserCheck,
    color: "bg-cyan-100 text-cyan-600",
    members: [
      { name: "Member Name 1", role: "Active Member" },
      { name: "Member Name 2", role: "Active Member" },
      { name: "Member Name 3", role: "Active Member" },
      { name: "Member Name 4", role: "Active Member" },
    ]
  },
];

const schools = [
  { year: "2018", name: "Prasert Islam School", location: "Nonthaburi, Thailand", note: "& 2022 revisit" },
  { year: "2020", name: "Schools of Hope Foundation", location: "Myanmar-Thai Border", note: "For Myanmar Immigrant Children" },
  { year: "2020", name: "Phimai Vithaya School", location: "Nakhon Ratchasima, Thailand", note: "" },
  { year: "2022", name: "Wat Tsai Yai School", location: "Nonthaburi, Thailand", note: "" },
  { year: "2022", name: "Wat Lad Pla Duk School", location: "Nonthaburi, Thailand", note: "" },
  { year: "2022", name: "Xavier School San Juan", location: "Philippines", note: "" },
  { year: "2022", name: "Xavier School Nuvali", location: "Philippines", note: "" },
  { year: "2022", name: "UP Integrated School", location: "Philippines", note: "University of Philippines" },
  { year: "2023", name: "Pasatipatai School", location: "Luang Prabang, Laos", note: "" },
];

export default function About() {
  return (
    <div className="pt-10">
      <div className="container mx-auto px-4 md:px-6 mb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Robotics for Kids</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are a group of high school students who want to share our knowledge about robotics with other children, providing opportunities to learn robotics and programming.
          </p>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Founders</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Experienced Leaders</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our founders include a Thailand representative for International Youth Robot Competition (IYRC) in Korea, as well as 2-time National VEX Robotics Champion and 2-time Thailand Representative to the VEX Robotics World Championships in the US. Another founder is studying for a high school major in Artificial Intelligence (AI).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acknowledging the rapid development of technology in the modern world, the significance of programming knowledge is now greater than ever.
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://r4kclub.com//storage/284/61ebc709cb961_banner.jpg" 
                alt="R4K Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "Robotics for Kids (R4K) was created with the goal of providing technology equity in the form of giving equal access to robotics and programming knowledge to children in Thailand, and in other ASEAN countries.",
            },
            {
              icon: Users,
              title: "How We Work",
              desc: "We contact and partner with local schools, get 1-2 teachers to become R4K school advisors, donate necessary equipment, and teach students to become student coaches.",
            },
            {
              icon: Repeat,
              title: "Coach the Coach",
              desc: "Student coaches then teach and share their gained knowledge with other children by organizing group lessons. Through this impact model, we create sustainable tech-inclusion environments.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
              data-testid={`about-card-${i}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-primary flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Accomplishments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Accomplishments Since 2018</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Established a network of 9 schools in 4 countries. Developed Micro:bit, Raspberry Pi and LEGO EV3 courses to train 100+ change agents: 24 R4K school advisors, 26 student coaches, and 60+ R4K student graduates.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "9", label: "Partner Schools" },
            { value: "24", label: "School Advisors" },
            { value: "26", label: "Student Coaches" },
            { value: "60+", label: "Student Graduates" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl text-center"
              data-testid={`accomplishment-${i}`}
            >
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-2">{stat.value}</h3>
              <p className="text-muted-foreground font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-12">
            Meet the dedicated individuals who make R4K possible.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl"
                data-testid={`team-category-${i}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.members.map((member, j) => (
                    <div 
                      key={j} 
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                      data-testid={`team-member-${i}-${j}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* School Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-center">List of R4K Schools</h2>
          <div className="space-y-4">
            {schools.map((school, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl flex flex-wrap items-center gap-4"
                data-testid={`school-${i}`}
              >
                <div className="flex items-center gap-3 min-w-[100px]">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">{school.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg">{school.name}</h3>
                  {school.note && <span className="text-sm text-muted-foreground">({school.note})</span>}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{school.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
