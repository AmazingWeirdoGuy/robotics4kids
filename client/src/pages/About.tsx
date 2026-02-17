import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
import founderKris from "@assets/image_1771259753861.png";
import founderTan from "@assets/image_1771259784308.png";
import founderBlu from "@assets/image_1771259788803.png";

interface Member {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string;
  email: string;
}

interface MembersData {
  officers: Member[];
  websiteManagers: Member[];
  facultyAdvisors: Member[];
  activeMembers: Member[];
}

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

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2);
}

function TeamDropdown({ title, count, id, children, defaultOpen = false }: { title: string; count: number; id: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-slate-200 rounded-xl overflow-hidden card-glow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 bg-white hover:bg-slate-50 transition-colors duration-300 cursor-pointer"
        data-testid={`button-toggle-${id}`}
      >
        <div className="flex items-center gap-4">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-heading font-semibold text-slate-900 text-sm tracking-wide uppercase">{title}</span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{count}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-blue-600/60" />
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
            <div className="bg-slate-50 border-t border-slate-200">
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
    <div className="flex items-center gap-4 px-5 md:px-6 py-4 border-b border-slate-200/60 last:border-b-0 hover:bg-white/60 transition-colors duration-200" data-testid={testId}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600/60 font-heading text-xs font-semibold overflow-hidden border border-blue-200/50 flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm text-slate-900 truncate">{name}</p>
        {subtitle && <p className="text-xs text-blue-600/60 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function About() {
  const [members, setMembers] = useState<MembersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/members.json")
      .then(r => r.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const officers = members?.officers ?? [];
  const websiteManagers = members?.websiteManagers ?? [];
  const facultyAdvisors = members?.facultyAdvisors ?? [];
  const activeMembers = members?.activeMembers ?? [];

  return (
    <div>
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-6">About R4K</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] mb-8 text-slate-900">
              Robotics for Kids
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              We are a group of high school students who want to share our knowledge about robotics with other children, providing opportunities to learn robotics and programming.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Origins</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-slate-900">Experienced Leaders</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Our founders include a Thailand representative for International Youth Robot Competition (IYRC) in Korea, as well as 2-time National VEX Robotics Champion and 2-time Thailand Representative to the VEX Robotics World Championships in the US.
              </p>
              <p className="text-slate-500 leading-relaxed">
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
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-8">Founders</p>
              <div className="flex justify-center gap-6 md:gap-8">
              {[
                { img: founderKris, name: "Kris (Ken) Terdprisant" },
                { img: founderTan, name: "Prompiriya (Tan) Jongrengpian" },
                { img: founderBlu, name: "Blu Francia" },
              ].map((founder, i) => (
                <div key={i} className="text-center" data-testid={`founder-${i}`}>
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-blue-200 shadow-lg shadow-blue-100 mx-auto mb-3">
                    <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-600 font-heading font-medium max-w-[100px] mx-auto leading-tight">{founder.name}</p>
                </div>
              ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
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
                className="bg-white border border-slate-200 p-10 md:p-14 card-glow rounded-xl"
                data-testid={`about-card-${i}`}
              >
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600/50 mb-6">0{i + 1}</p>
                <h3 className="font-heading text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Since 2018</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">Accomplishments</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden">
            {[
              { value: 9, suffix: "", label: "Partner Schools" },
              { value: 24, suffix: "", label: "School Advisors" },
              { value: 26, suffix: "", label: "Student Coaches" },
              { value: 60, suffix: "+", label: "Student Graduates" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-10 md:p-14 text-center"
                data-testid={`accomplishment-${i}`}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-slate-900">
                  <CountUp target={stat.value} suffix={stat.suffix} duration={2} />
                </h3>
                <p className="text-sm text-slate-500 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="text-center mb-24">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">People</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">Our Team</h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading team data...</div>
          ) : (
            <div className="space-y-3 max-w-3xl mx-auto">
              <TeamDropdown title="Officers" count={officers.length} id="officers" defaultOpen>
                {officers.map((m, i) => (
                  <PersonRow key={m.id} name={m.name} subtitle={m.title} image={m.photo} initials={getInitials(m.name)} testId={`officer-${i}`} />
                ))}
              </TeamDropdown>

              <TeamDropdown title="Website Development" count={websiteManagers.length} id="webdev" defaultOpen>
                {websiteManagers.map((m, i) => (
                  <PersonRow key={m.id} name={m.name} subtitle={m.title} image={m.photo} initials={getInitials(m.name)} testId={`webdev-${i}`} />
                ))}
              </TeamDropdown>

              <TeamDropdown title="Faculty Advisors" count={facultyAdvisors.length} id="advisors">
                {facultyAdvisors.map((m, i) => (
                  <PersonRow key={m.id} name={m.name} subtitle={m.title} image={m.photo} initials={getInitials(m.name)} testId={`advisor-${i}`} />
                ))}
              </TeamDropdown>

              <TeamDropdown title="Active Members" count={activeMembers.length} id="members">
                {activeMembers.map((m, i) => (
                  <PersonRow key={m.id} name={m.name} subtitle={m.title} image={m.photo} initials={getInitials(m.name)} testId={`member-${i}`} />
                ))}
              </TeamDropdown>
            </div>
          )}
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-4">Network</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">R4K Schools</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-blue-300 to-transparent" />

            {schools.map((school, i) => {
              const isLeft = i % 2 === 0;
              const prevYear = i > 0 ? schools[i - 1].year : null;
              const showYear = school.year !== prevYear;

              return (
                <div key={i} className="relative" data-testid={`school-${i}`}>
                  {showYear && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="relative flex items-center mb-6 mt-2 first:mt-0"
                    >
                      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 ml-[7px] md:ml-0 z-10">
                        <div className="bg-blue-600 text-white font-heading font-bold text-sm px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/25">
                          {school.year}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`relative flex items-start mb-8 md:mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                  >
                    <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-5 z-10">
                      <div className="w-[9px] h-[9px] rounded-full bg-blue-500 ring-4 ring-white shadow-sm shadow-blue-400/30" />
                    </div>

                    <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-10 md:pl-0`}>
                      <div className={`group bg-white border border-slate-200 p-5 md:p-6 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all duration-300 card-glow`}>
                        <h3 className="font-heading font-semibold text-slate-900 text-[15px] mb-1.5">{school.name}</h3>
                        {school.note && <p className="text-xs text-blue-600/60 mb-2">{school.note}</p>}
                        <div className={`flex items-center gap-2 text-slate-400 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="text-xs tracking-wide">{school.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block flex-1" />
                  </motion.div>
                </div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative flex items-center mt-2"
            >
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 ml-[3px] md:ml-0 z-10">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">...</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
