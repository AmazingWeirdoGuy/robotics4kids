import { motion } from "framer-motion";
import { Mail, Globe, Heart } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Interested in partnering with R4K or want to support our mission of bringing robotics education to children across ASEAN?
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Email Us</h3>
                  <a href="mailto:contact@r4kclub.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                    contact@r4kclub.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Website</h3>
                  <a href="https://www.r4kclub.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-website">
                    www.r4kclub.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">Support</h3>
                  <p className="text-muted-foreground">
                    Donations for teaching materials and student coach tuition
                  </p>
                </div>
              </div>
            </div>

            {/* Partnership Info */}
            <div className="mt-12 glass-card p-6 rounded-2xl">
              <h3 className="font-heading font-bold text-lg mb-3">Partnership Opportunities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Become a partner school</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Sponsor robotics equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Support student coach scholarships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Volunteer as a teacher advisor</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 md:p-6 rounded-3xl"
          >
            <h2 className="font-heading text-2xl font-bold mb-4 text-center">Contact Form</h2>
            <p className="text-muted-foreground text-center mb-6">
              Fill out the form below and we'll get back to you soon.
            </p>
            
            {/* Embedded Google Form */}
            <div className="w-full rounded-2xl overflow-hidden bg-white">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdExample/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="Contact Form"
                data-testid="google-form"
              >
                Loading…
              </iframe>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4">
              Alternatively, email us directly at{" "}
              <a href="mailto:contact@r4kclub.com" className="text-primary hover:underline">
                contact@r4kclub.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
