import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div>
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="mb-16"
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-blue-600 mb-6">Legal</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] text-slate-900 mb-6">Terms of Service</h1>
            <p className="text-sm text-slate-400">Last updated: January 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-10"
          >
            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">1. About R4K</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Robotics for Kids (R4K) is a student-led non-profit organization dedicated to providing robotics and programming education to children across Thailand and ASEAN. This website serves as an informational platform about our mission, programs, and activities.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">2. Use of Website</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                By accessing and using this website, you agree to comply with these Terms of Service. This website is provided for informational purposes only. You may browse, share, and reference the content on this site for personal, educational, or non-commercial purposes.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">3. Intellectual Property</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                All content on this website, including text, images, logos, and graphics, is the property of Robotics for Kids (R4K) or its content creators. You may not reproduce, distribute, or use any content from this website for commercial purposes without prior written consent from R4K.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">4. Donations</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Donations made to R4K are voluntary and used to support our educational programs, including teaching materials and student coach tuition. R4K is committed to transparency in how donations are allocated and utilized.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">5. External Links</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                This website may contain links to external websites or third-party services. R4K is not responsible for the content, privacy practices, or availability of these external sites. Accessing external links is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">6. Privacy</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                R4K respects your privacy. We do not collect personal data through this website unless you voluntarily provide it through our contact form. Any information submitted through the contact form will only be used to respond to your inquiry and will not be shared with third parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">7. Disclaimer</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                This website and its content are provided "as is" without warranties of any kind. R4K makes no guarantees regarding the accuracy, completeness, or reliability of the information presented. R4K shall not be held liable for any damages arising from the use of this website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">8. Changes to Terms</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                R4K reserves the right to update or modify these Terms of Service at any time. Changes will be reflected on this page with an updated revision date. Continued use of this website after changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">9. Contact</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:contact@r4kclub.com" className="text-blue-600 hover:underline">contact@r4kclub.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
