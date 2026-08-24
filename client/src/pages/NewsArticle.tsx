import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { Calendar, MapPin, Trophy, Zap, Heart, ArrowLeft, Clock } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";

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

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderContent(content: string) {
  return content.split("\n").map((paragraph, pIndex) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return <div key={pIndex} className="h-3" />;
    if (trimmed.startsWith("# ")) {
      return (
        <motion.h2
          key={pIndex}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mt-14 mb-5 first:mt-0"
        >
          {trimmed.slice(2)}
        </motion.h2>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <motion.h3
          key={pIndex}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-xl md:text-2xl font-semibold text-slate-900 mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </motion.h3>
      );
    }
    if (trimmed.startsWith("### ")) {
      return <h4 key={pIndex} className="font-heading text-lg font-semibold text-slate-800 mt-8 mb-3">{trimmed.slice(4)}</h4>;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <div key={pIndex} className="flex gap-4 mb-3 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
          <p className="text-slate-600 leading-[1.8] text-[15px]">{trimmed.slice(2)}</p>
        </div>
      );
    }
    if (trimmed.startsWith("![") && trimmed.includes("](")) {
      const urlMatch = trimmed.match(/\]\((.+?)\)/);
      const altMatch = trimmed.match(/\[(.+?)\]/);
      if (urlMatch) {
        return (
          <motion.figure
            key={pIndex}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-10 -mx-2 md:-mx-8"
          >
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <ResponsiveImage src={urlMatch[1]} alt={altMatch?.[1] || ""} className="w-full" />
            </div>
            {altMatch?.[1] && altMatch[1] !== "image" && (
              <figcaption className="text-xs text-slate-400 mt-3 text-center italic">{altMatch[1]}</figcaption>
            )}
          </motion.figure>
        );
      }
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={pIndex} className="border-l-2 border-blue-400 pl-6 my-8 py-1">
          <p className="text-slate-500 leading-[1.8] italic text-[15px]">{trimmed.slice(2)}</p>
        </blockquote>
      );
    }
    return <p key={pIndex} className="text-slate-600 leading-[1.85] mb-5 text-[15px]">{trimmed}</p>;
  });
}

export default function NewsArticle() {
  const [, params] = useRoute("/news/:id");
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/data/news.json")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        setAllNews(data);
        const found = data.find(item => item.id === Number(params?.id));
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-8">This article doesn't exist or has been removed.</p>
          <Link href="/news">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-back-to-news">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[article.iconName] || Trophy;
  const readTime = estimateReadTime(article.description + " " + article.content);
  const currentIndex = allNews.findIndex(n => n.id === article.id);
  const nextArticle = currentIndex >= 0 && currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
  const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;

  return (
    <div className="bg-white">
      {article.image ? (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full"
          >
            <ResponsiveImage
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/news">
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/60 hover:text-white transition-colors cursor-pointer mb-6 block" data-testid="link-back-to-news">
                    <ArrowLeft className="w-3 h-3" /> News
                  </span>
                </Link>

                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full">
                    <Icon className="w-3 h-3" /> {article.category}
                  </span>
                  <span className="text-white/50 text-xs">{article.date}</span>
                  <span className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-1 text-white/50 text-xs">
                    <Clock className="w-3 h-3" /> {readTime} min read
                  </span>
                </div>

                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] text-white" data-testid="text-article-title">
                  {article.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-32 pb-8 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/news">
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600 hover:text-blue-700 transition-colors cursor-pointer mb-8 block" data-testid="link-back-to-news">
                  <ArrowLeft className="w-3 h-3" /> News
                </span>
              </Link>
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full">
                  <Icon className="w-3 h-3" /> {article.category}
                </span>
                <span className="text-slate-400 text-xs">{article.date}</span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                  <Clock className="w-3 h-3" /> {readTime} min read
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] text-slate-900" data-testid="text-article-title">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      )}

      <section className="relative z-10">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mt-10 mb-12 font-light" data-testid="text-article-description">
              {article.description}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-transparent mb-12" />
          </motion.div>

          {article.content && article.content.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="article-content"
            >
              {renderContent(article.content)}
            </motion.div>
          )}

          {(prevArticle || nextArticle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-t border-slate-200 mt-20 pt-12 pb-6"
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600/50 mb-8">More Articles</p>
              <div className={`grid gap-4 ${prevArticle && nextArticle ? "md:grid-cols-2" : "md:grid-cols-1 max-w-md"}`}>
                {prevArticle && (
                  <Link href={`/news/${prevArticle.id}`}>
                    <div className="group bg-slate-50 border border-slate-200 rounded-xl p-6 hover:bg-white hover:border-blue-200 transition-all duration-300 cursor-pointer" data-testid={`link-prev-article-${prevArticle.id}`}>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                        <ArrowLeft className="w-3 h-3" /> Previous
                      </p>
                      <h4 className="font-heading font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">{prevArticle.title}</h4>
                      <p className="text-xs text-slate-400 mt-2">{prevArticle.date}</p>
                    </div>
                  </Link>
                )}
                {nextArticle && (
                  <Link href={`/news/${nextArticle.id}`}>
                    <div className={`group bg-slate-50 border border-slate-200 rounded-xl p-6 hover:bg-white hover:border-blue-200 transition-all duration-300 cursor-pointer ${!prevArticle ? "" : "text-right"}`} data-testid={`link-next-article-${nextArticle.id}`}>
                      <p className={`text-xs text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2 ${!prevArticle ? "" : "justify-end"}`}>
                        Next <ArrowLeft className="w-3 h-3 rotate-180" />
                      </p>
                      <h4 className="font-heading font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">{nextArticle.title}</h4>
                      <p className="text-xs text-slate-400 mt-2">{nextArticle.date}</p>
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          )}

          <div className="border-t border-slate-200 mt-10 pt-10 pb-20">
            <Link href="/news">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-back-to-news-bottom">
                <ArrowLeft className="w-3 h-3" /> All News
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
