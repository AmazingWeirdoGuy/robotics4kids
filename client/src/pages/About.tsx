import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown, Users } from "lucide-react";
import { useState } from "react";
import founderKris from "@assets/image_1771259753861.png";
import founderTan from "@assets/image_1771259784308.png";
import founderBlu from "@assets/image_1771259788803.png";

const officers = [
  { firstName: "First", lastName: "Last", role: "President", image: "" },
  { firstName: "First", lastName: "Last", role: "Vice President", image: "" },
  { firstName: "First", lastName: "Last", role: "Secretary", image: "" },
];

const webDevelopment = [
  { firstName: "First", lastName: "Last", role: "Lead Developer", image: "" },
  { firstName: "First", lastName: "Last", role: "Developer", image: "" },
];

const facultyAdvisors = [
  { name: "Faculty Advisor Name", image: "" },
  { name: "Faculty Advisor Name", image: "" },
];

const activeMembers = [
  { name: "Active Member Name", image: "" },
  { name: "Active Member Name", image: "" },
  { name: "Active Member Name", image: "" },
  { name: "Active Member Name", image: "" },
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

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

function TeamDropdown({ title, count, id, children }: { title: string; count: number; id: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-blue-500/8 rounded-lg overflow-hidden card-glow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 bg-[hsl(222,20%,14%)] hover:bg-[hsl(222,20%,16%)] transition-colors duration-300 cursor-pointer"
        data-testid={`button-toggle-${id}`}
      >
        <div className="flex items-center gap-4">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="font-heading font-semibold text-white text-sm tracking-wide uppercase">{title}</span>
          <span className="text-xs text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full">{count}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-blue-400/60" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-[hsl(222,20%,12%)] border-t border-blue-500/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PersonRow({ name, subtitle, image, initials, testId }: { name: string; subtitle?: string; image: string; initials: string; testId: string }) {
  return (
    <div className="flex items-center gap-4 px-5 md:px-6 py-4 border-b border-white/3 last:border-b-0 hover:bg-white/[0.02] transition-colors duration-200" data-testid={testId}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(220,20%,22%)] to-[hsl(222,22%,16%)] flex items-center justify-center text-blue-400/50 font-heading text-xs font-semibold overflow-hidden border border-blue-500/10 flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-white truncate">{name}</p>
        {subtitle && <p className="text-xs text-blue-300/40 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <section className="py-32 bg-gradient-to-b from-[hsl(222,22%,12%)] to-[hsl(222,22%,10%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-6">About R4K</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] mb-8 text-white">
              Robotics for Kids
            </h1>
            <p className="text-xl text-white/45 leading-relaxed">
              We are a group of high school students who want to share our knowledge about robotics with other children, providing opportunities to learn robotics and programming.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(222,20%,16%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Origins</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-white">Experienced Leaders</h2>
              <p className="text-white/40 leading-relaxed mb-6">
                Our founders include a Thailand representative for International Youth Robot Competition (IYRC) in Korea, as well as 2-time National VEX Robotics Champion and 2-time Thailand Representative to the VEX Robotics World Championships in the US.
              </p>
              <p className="text-white/40 leading-relaxed">
                Acknowledging the rapid development of technology in the modern world, the significance of programming knowledge is now greater than ever.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-8">Founders</p>
              <div className="flex justify-center gap-6 md:gap-8">
              {[
                { img: founderKris, name: "Kris (Ken) Terdprisant" },
                { img: founderTan, name: "Prompiriya (Tan) Jongrengpian" },
                { img: founderBlu, name: "Blu Francia" },
              ].map((founder, i) => (
                <div key={i} className="text-center" data-testid={`founder-${i}`}>
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-blue-500/15 shadow-lg shadow-blue-500/10 mx-auto mb-3">
                    <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-white/60 font-heading font-medium max-w-[100px] mx-auto leading-tight">{founder.name}</p>
                </div>
              ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-[hsl(220,22%,18%)] to-[hsl(222,20%,14%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Our Mission", desc: "Robotics for Kids (R4K) was created with the goal of providing technology equity in the form of giving equal access to robotics and programming knowledge to children in Thailand, and in other ASEAN countries." },
              { title: "How We Work", desc: "We contact and partner with local schools, get 1-2 teachers to become R4K school advisors, donate necessary equipment, and teach students to become student coaches." },
              { title: "Coach the Coach", desc: "Student coaches then teach and share their gained knowledge with other children by organizing group lessons. Through this impact model, we create sustainable tech-inclusion environments." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[hsl(222,20%,14%)] border border-blue-500/8 p-10 md:p-14 card-glow rounded-lg"
                data-testid={`about-card-${i}`}
              >
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/60 mb-6">0{i + 1}</p>
                <h3 className="font-heading text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(222,20%,14%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Since 2018</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Accomplishments</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-blue-500/10 rounded-lg overflow-hidden">
            {[
              { value: "9", label: "Partner Schools" },
              { value: "24", label: "School Advisors" },
              { value: "26", label: "Student Coaches" },
              { value: "60+", label: "Student Graduates" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[hsl(222,20%,16%)] p-10 md:p-14 text-center"
                data-testid={`accomplishment-${i}`}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</h3>
                <p className="text-sm text-white/40 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-[hsl(222,22%,12%)] to-[hsl(222,22%,10%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">People</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Team</h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <TeamDropdown title="Officers" count={officers.length} id="officers">
              {officers.map((m, i) => (
                <PersonRow key={i} name={`${m.firstName} ${m.lastName}`} subtitle={m.role} image={m.image} initials={`${m.firstName[0]}${m.lastName[0]}`} testId={`officer-${i}`} />
              ))}
            </TeamDropdown>

            <TeamDropdown title="Website Development" count={webDevelopment.length} id="webdev">
              {webDevelopment.map((m, i) => (
                <PersonRow key={i} name={`${m.firstName} ${m.lastName}`} subtitle={m.role} image={m.image} initials={`${m.firstName[0]}${m.lastName[0]}`} testId={`webdev-${i}`} />
              ))}
            </TeamDropdown>

            <TeamDropdown title="Faculty Advisors" count={facultyAdvisors.length} id="advisors">
              {facultyAdvisors.map((m, i) => (
                <PersonRow key={i} name={m.name} image={m.image} initials={m.name.split(' ').map(n => n[0]).join('').slice(0, 2)} testId={`advisor-${i}`} />
              ))}
            </TeamDropdown>

            <TeamDropdown title="Active Members" count={activeMembers.length} id="members">
              {activeMembers.map((m, i) => (
                <PersonRow key={i} name={m.name} image={m.image} initials={m.name.split(' ').map(n => n[0]).join('').slice(0, 2)} testId={`member-${i}`} />
              ))}
            </TeamDropdown>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(222,20%,16%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-4">Network</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">R4K Schools</h2>
          </motion.div>

          <div className="space-y-2">
            {schools.map((school, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[hsl(222,20%,14%)] border border-blue-500/5 p-6 md:p-8 flex flex-wrap items-center gap-6 group hover:bg-[hsl(222,20%,18%)] hover:border-blue-500/15 transition-all duration-300 rounded-lg"
                data-testid={`school-${i}`}
              >
                <div className="flex items-center gap-3 min-w-[100px]">
                  <Calendar className="w-4 h-4 text-blue-400/60" />
                  <span className="font-heading font-semibold text-sm text-white">{school.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-white">{school.name}</h3>
                  {school.note && <span className="text-xs text-white/30">{school.note}</span>}
                </div>
                <div className="flex items-center gap-2 text-white/30">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs tracking-wide">{school.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
