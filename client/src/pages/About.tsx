import { motion } from "framer-motion";
import aboutImage from "@assets/generated_images/close_up_detail_of_a_futuristic_robot_hand.png";

export default function About() {
  return (
    <div className="pt-10">
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that technology is the tool, but people are the solution. Our goal is to democratize access to robotics education.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={aboutImage} alt="Robotics Hand" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium text-lg">Engineering the future, one bot at a time.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                title: "Education First",
                desc: "We host weekly workshops for middle school students to learn the basics of mechanics and code.",
              },
              {
                title: "Community Driven",
                desc: "Our club is open to everyone. We believe diversity drives innovation in engineering.",
              },
              {
                title: "Competitive Spirit",
                desc: "We participate in regional and national robotics competitions, pushing our skills to the limit.",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl">
                <h3 className="font-heading text-2xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
