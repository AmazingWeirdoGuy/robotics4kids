import { motion } from "framer-motion";
import { Mail, Globe, Heart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <div>
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-6">{t("Reach Out")}</p>
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] mb-8 text-slate-900">{t("Get in Touch")}</h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-16">
                {t("Interested in partnering with R4K or supporting our mission of bringing robotics education to children across ASEAN?")}
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1 text-slate-900">{t("Email")}</h3>
                    <a href="mailto:17924@students.isb.ac.th" className="text-sm text-slate-500 hover:text-blue-600 transition-colors" data-testid="link-email">
                      17924@students.isb.ac.th
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1 text-slate-900">{t("Website")}</h3>
                    <a href="https://www.r4kclub.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-blue-600 transition-colors" data-testid="link-website">
                      www.r4kclub.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                    <Heart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1 text-slate-900">{t("Support")}</h3>
                    <p className="text-sm text-slate-500">
                      {t("Donations for teaching materials and student coach tuition")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 border-t border-slate-200 pt-12">
                <h3 className="text-xs font-semibold tracking-[0.3em] uppercase mb-6 text-blue-600/60">{t("Partnership Opportunities")}</h3>
                <ul className="space-y-4">
                  {[
                    "Become a partner school",
                    "Sponsor robotics equipment",
                    "Support student coach scholarships",
                    "Volunteer as a teacher advisor",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-500" data-testid={`text-partnership-${i}`}>
                      <ArrowRight className="w-3 h-3 flex-shrink-0 text-blue-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 }}
              className="bg-white p-6 md:p-10 border border-slate-200 rounded-xl card-glow"
            >
              <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 border border-blue-200">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600/60 mb-4">{t("Work Email")}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4 text-slate-900">{t("Let’s work together")}</h2>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-8">
                  {t("For partnerships, support, and other work-related inquiries, email us directly.")}
                </p>
                <a
                  href="mailto:17924@students.isb.ac.th"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  data-testid="link-footer-contact-email"
                >
                  17924@students.isb.ac.th
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
