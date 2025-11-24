import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Zap } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Regional Championship Win!",
    date: "Nov 20, 2025",
    category: "Competition",
    desc: "Our team took home the gold at the Regional Robotics Championship this weekend. The autonomous mode performed perfectly.",
    icon: Trophy,
  },
  {
    id: 2,
    title: "Upcoming Workshop Series",
    date: "Dec 05, 2025",
    category: "Events",
    desc: "Join us for a 4-week introduction to Python programming for robotics. Open to all students aged 12-16.",
    icon: Calendar,
  },
  {
    id: 3,
    title: "New Lab Equipment Arrived",
    date: "Nov 15, 2025",
    category: "Update",
    desc: "We just received our new 3D printers and CNC machine. Big thanks to our sponsors for making this possible.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Community Outreach Day",
    date: "Oct 28, 2025",
    category: "Community",
    desc: "We visited the local elementary school to demonstrate our latest robot and inspire young engineers.",
    icon: MapPin,
  },
];

export default function News() {
  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl font-bold mb-4">Latest News</h1>
          <p className="text-muted-foreground text-lg">Stay updated with our latest achievements and events.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
                  {item.date}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
