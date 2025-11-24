import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/high_school_robotics_team_building_a_sleek_robot_in_a_bright_lab.png";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Robotics Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-black/90 dark:via-black/70" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200">
            Established 2025
          </span>
          <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-6 text-foreground">
            Robotics for <span className="text-primary">Kids</span>
            <br />
            <span className="text-4xl md:text-6xl opacity-80">Innovating Tomorrow.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            We are a group of high school students sharing our passion for robotics and programming with the next generation of innovators.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-xl shadow-primary/25">
                Join the Team
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 bg-white/50 backdrop-blur border-white/40 hover:bg-white/80">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
