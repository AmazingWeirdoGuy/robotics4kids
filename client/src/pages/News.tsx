import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Zap, Heart } from "lucide-react";
import { newsData } from "@/data/newsData";

const iconMap: Record<string, typeof Trophy> = { Trophy, Calendar, Zap, MapPin, Heart };

export default function News() {
  return (
    <div>
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-2xl mb-20"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-6">Updates</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] text-white">Latest News</h1>
          </motion.div>

          {newsData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40">No news items yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-px bg-white/5">
              {newsData.map((item, index) => {
                const Icon = iconMap[item.iconName] || Trophy;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="bg-[hsl(220,18%,10%)] group"
                    data-testid={`news-card-${item.id}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {item.image && (
                        <div className="md:w-80 aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                        </div>
                      )}
                      <div className="p-8 md:p-10 flex-1">
                        <div className="flex items-center gap-4 mb-5">
                          <Icon className="w-4 h-4 text-blue-400/60" />
                          <span className="text-xs tracking-wide uppercase text-white/40">{item.category}</span>
                          <span className="text-xs text-white/30 ml-auto">{item.date}</span>
                        </div>
                        <h3 className="font-heading text-2xl font-semibold mb-4 leading-snug text-white">{item.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
