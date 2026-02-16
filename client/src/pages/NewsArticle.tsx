import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { Calendar, MapPin, Trophy, Zap, Heart, ArrowLeft } from "lucide-react";

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

function renderContent(content: string) {
  return content.split("\n").map((paragraph, pIndex) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return <div key={pIndex} className="h-4" />;
    if (trimmed.startsWith("# ")) {
      return <h2 key={pIndex} className="font-heading text-2xl md:text-3xl font-bold text-white mt-10 mb-5 first:mt-0">{trimmed.slice(2)}</h2>;
    }
    if (trimmed.startsWith("## ")) {
      return <h3 key={pIndex} className="font-heading text-xl md:text-2xl font-semibold text-white mt-8 mb-4">{trimmed.slice(3)}</h3>;
    }
    if (trimmed.startsWith("### ")) {
      return <h4 key={pIndex} className="font-heading text-lg font-semibold text-white mt-6 mb-3">{trimmed.slice(4)}</h4>;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <div key={pIndex} className="flex gap-3 mb-2 ml-2">
          <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
          <p className="text-white/55 leading-relaxed">{trimmed.slice(2)}</p>
        </div>
      );
    }
    if (trimmed.startsWith("![") && trimmed.includes("](")) {
      const urlMatch = trimmed.match(/\]\((.+?)\)/);
      const altMatch = trimmed.match(/\[(.+?)\]/);
      if (urlMatch) {
        return (
          <figure key={pIndex} className="my-8">
            <img src={urlMatch[1]} alt={altMatch?.[1] || ""} className="w-full rounded-lg" />
            {altMatch?.[1] && altMatch[1] !== "image" && (
              <figcaption className="text-xs text-white/30 mt-3 text-center">{altMatch[1]}</figcaption>
            )}
          </figure>
        );
      }
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={pIndex} className="border-l-2 border-blue-500/30 pl-5 my-6">
          <p className="text-white/50 leading-relaxed italic">{trimmed.slice(2)}</p>
        </blockquote>
      );
    }
    return <p key={pIndex} className="text-white/55 leading-relaxed mb-5 text-[15px]">{trimmed}</p>;
  });
}

export default function NewsArticle() {
  const [, params] = useRoute("/news/:id");
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/news.json")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        const found = data.find(item => item.id === Number(params?.id));
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(222,22%,10%)]">
        <p className="text-white/40">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(222,22%,10%)]">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white/40 mb-8">This article doesn't exist or has been removed.</p>
          <Link href="/news">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" data-testid="link-back-to-news">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[article.iconName] || Trophy;

  return (
    <div>
      {article.image && (
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-[hsl(222,22%,8%)]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,22%,10%)] via-[hsl(222,22%,10%)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,22%,10%)]/50 to-transparent h-32" />
        </div>
      )}

      <section className={`bg-[hsl(222,22%,10%)] ${article.image ? "-mt-32 relative z-10" : "pt-32"}`}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href="/news">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 hover:text-blue-300 transition-colors cursor-pointer mb-8 block" data-testid="link-back-to-news">
                <ArrowLeft className="w-3 h-3" /> Back to News
              </span>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-xs tracking-wide uppercase text-blue-400 font-medium">{article.category}</span>
              <span className="text-xs text-white/25">{article.date}</span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight tracking-[-0.02em] text-white mb-6" data-testid="text-article-title">
              {article.title}
            </h1>

            <p className="text-lg text-white/45 leading-relaxed mb-12" data-testid="text-article-description">
              {article.description}
            </p>
          </motion.div>

          {article.content && article.content.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="border-t border-blue-500/10 pt-10">
                {renderContent(article.content)}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-blue-500/10 mt-16 pt-10 pb-20"
          >
            <Link href="/news">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" data-testid="link-back-to-news-bottom">
                <ArrowLeft className="w-3 h-3" /> Back to All News
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
