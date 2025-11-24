import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { NewsItem } from "@shared/schema";

const iconMap: Record<string, typeof Trophy> = {
  Trophy,
  Calendar,
  Zap,
  MapPin,
};

export default function News() {
  const { data: newsItems = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="pt-10 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

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

        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No news items yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {newsItems.map((item, index) => {
              const Icon = iconMap[item.iconName] || Trophy;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-8 rounded-2xl group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
