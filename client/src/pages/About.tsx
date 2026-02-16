import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

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

function PersonCard({ name, subtitle, image, initials }: { name: string; subtitle?: string; image: string; initials: string }) {
  return (
    <div className="text-center">
      <div className="w-28 h-28 mx-auto rounded-full bg-[hsl(220,16%,16%)] flex items-center justify-center text-blue-400/40 font-heading text-xl font-semibold mb-4 overflow-hidden border border-white/5">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <p className="font-heading font-semibold text-sm text-white">{name}</p>
      {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function About() {
  return (
    <div>
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-6">About R4K</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] mb-8 text-white">
              Robotics for Kids
            </h1>
            <p className="text-xl text-white/40 leading-relaxed">
              We are a group of high school students who want to share our knowledge about robotics with other children, providing opportunities to learn robotics and programming.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(220,18%,8%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-4">Origins</p>
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
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://r4kclub.com//storage/284/61ebc709cb961_banner.jpg" alt="R4K Team" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(220,16%,12%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
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
                className="bg-[hsl(220,18%,10%)] p-10 md:p-14"
                data-testid={`about-card-${i}`}
              >
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/50 mb-6">0{i + 1}</p>
                <h3 className="font-heading text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(220,18%,8%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-4">Since 2018</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Accomplishments</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
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
                className="bg-[hsl(220,18%,10%)] p-10 md:p-14 text-center"
                data-testid={`accomplishment-${i}`}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</h3>
                <p className="text-sm text-white/40 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-4">People</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Team</h2>
          </motion.div>

          <div className="space-y-24">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-12 text-white/40">Officers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-3xl mx-auto">
                {officers.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} data-testid={`officer-${i}`}>
                    <PersonCard name={`${m.firstName} ${m.lastName}`} subtitle={m.role} image={m.image} initials={`${m.firstName[0]}${m.lastName[0]}`} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-12 text-white/40">Website Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-3xl mx-auto">
                {webDevelopment.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} data-testid={`webdev-${i}`}>
                    <PersonCard name={`${m.firstName} ${m.lastName}`} subtitle={m.role} image={m.image} initials={`${m.firstName[0]}${m.lastName[0]}`} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-12 text-white/40">Faculty Advisors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-3xl mx-auto">
                {facultyAdvisors.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} data-testid={`advisor-${i}`}>
                    <PersonCard name={m.name} image={m.image} initials={m.name.split(' ').map(n => n[0]).join('').slice(0, 2)} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-center mb-12 text-white/40">Active Members</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-3xl mx-auto">
                {activeMembers.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} data-testid={`member-${i}`}>
                    <PersonCard name={m.name} image={m.image} initials={m.name.split(' ').map(n => n[0]).join('').slice(0, 2)} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[hsl(220,18%,8%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-4">Network</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">R4K Schools</h2>
          </motion.div>

          <div className="space-y-px">
            {schools.map((school, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[hsl(220,18%,10%)] p-6 md:p-8 flex flex-wrap items-center gap-6 group hover:bg-[hsl(220,18%,13%)] transition-colors duration-300"
                data-testid={`school-${i}`}
              >
                <div className="flex items-center gap-3 min-w-[100px]">
                  <Calendar className="w-4 h-4 text-blue-400/50" />
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
