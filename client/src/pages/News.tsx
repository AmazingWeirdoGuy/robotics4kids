import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Trophy, Zap, Heart, ChevronDown, ArrowLeft } from "lucide-react";

const iconMap: Record<string, typeof Trophy> = { Trophy, Calendar, Zap, MapPin, Heart };

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

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/news.json")
      .then(r => r.json())
      .then(data => {
        setNewsData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <section className="py-32 bg-gradient-to-b from-[hsl(222,22%,12%)] to-[hsl(222,22%,10%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="max-w-2xl mb-20"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-400 mb-6">Updates</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] text-white">Latest News</h1>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-white/40">Loading news...</p>
            </div>
          ) : newsData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40">No news items yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {newsData.map((item, index) => {
                const Icon = iconMap[item.iconName] || Trophy;
                const isExpanded = expandedId === item.id;
                const hasContent = item.content && item.content.trim().length > 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className={`bg-[hsl(222,20%,14%)] border rounded-lg overflow-hidden transition-all duration-500 ${isExpanded ? "border-blue-500/20 shadow-lg shadow-blue-500/5" : "border-blue-500/8 card-glow card-glow-hover"}`}
                    data-testid={`news-card-${item.id}`}
                  >
                    <div className="flex flex-col md:flex-row group">
                      {item.image && (
                        <div className="md:w-80 aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                        </div>
                      )}
                      <div
                        className={`p-8 md:p-10 flex-1 ${hasContent ? "cursor-pointer hover:bg-white/[0.02] transition-colors duration-300" : ""}`}
                        onClick={() => hasContent && toggleExpand(item.id)}
                        data-testid={`news-toggle-${item.id}`}
                      >
                        <div className="flex items-center gap-4 mb-5">
                          <Icon className="w-4 h-4 text-blue-400" />
                          <span className="text-xs tracking-wide uppercase text-white/40">{item.category}</span>
                          <span className="text-xs text-white/25 ml-auto">{item.date}</span>
                        </div>
                        <h3 className="font-heading text-2xl font-semibold mb-4 leading-snug text-white">{item.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                        {hasContent && (
                          <div className="flex items-center gap-2 mt-6">
                            <span className="text-xs font-medium tracking-wide uppercase text-blue-400">
                              {isExpanded ? "Close" : "Read More"}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-4 h-4 text-blue-400" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && hasContent && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-blue-500/10">
                            <div className="p-8 md:p-10 md:pl-16 max-w-3xl">
                              <div className="prose prose-invert prose-sm max-w-none">
                                {item.content.split("\n").map((paragraph, pIndex) => {
                                  const trimmed = paragraph.trim();
                                  if (!trimmed) return null;
                                  if (trimmed.startsWith("# ")) {
                                    return <h2 key={pIndex} className="font-heading text-xl font-bold text-white mt-8 mb-4 first:mt-0">{trimmed.slice(2)}</h2>;
                                  }
                                  if (trimmed.startsWith("## ")) {
                                    return <h3 key={pIndex} className="font-heading text-lg font-semibold text-white mt-6 mb-3">{trimmed.slice(3)}</h3>;
                                  }
                                  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                                    return (
                                      <div key={pIndex} className="flex gap-3 mb-2">
                                        <span className="text-blue-400 mt-1.5 flex-shrink-0">•</span>
                                        <p className="text-white/50 leading-relaxed text-sm">{trimmed.slice(2)}</p>
                                      </div>
                                    );
                                  }
                                  if (trimmed.startsWith("![") && trimmed.includes("](")) {
                                    const urlMatch = trimmed.match(/\]\((.+?)\)/);
                                    const altMatch = trimmed.match(/\[(.+?)\]/);
                                    if (urlMatch) {
                                      return (
                                        <div key={pIndex} className="my-6 rounded-lg overflow-hidden">
                                          <img src={urlMatch[1]} alt={altMatch?.[1] || ""} className="w-full rounded-lg" />
                                          {altMatch?.[1] && <p className="text-xs text-white/30 mt-2">{altMatch[1]}</p>}
                                        </div>
                                      );
                                    }
                                  }
                                  return <p key={pIndex} className="text-white/50 leading-relaxed text-sm mb-4">{trimmed}</p>;
                                })}
                              </div>

                              <button
                                onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
                                className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                data-testid={`news-close-${item.id}`}
                              >
                                <ArrowLeft className="w-3 h-3" /> Close Article
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
