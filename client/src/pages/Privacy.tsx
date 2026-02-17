import { motion } from "framer-motion";

export default function Privacy() {
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
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] text-slate-900 mb-6">Privacy Policy</h1>
            <p className="text-sm text-slate-400">Last updated: January 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-10"
          >
            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Robotics for Kids (R4K) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard any information when you visit our website. By using this website, you agree to the practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                We may collect the following types of information:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong className="text-slate-700">Contact Information:</strong> Name, email address, and any other information you voluntarily provide through our contact form.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong className="text-slate-700">Usage Data:</strong> General, non-identifying information such as pages visited, time spent on the site, and browser type, collected automatically through standard web technologies.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                Any information we collect is used solely for the following purposes:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  To respond to your inquiries submitted through the contact form
                </li>
                <li className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  To improve our website and user experience
                </li>
                <li className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  To communicate updates about our programs and activities
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">4. Data Sharing</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                R4K does not sell, trade, or rent your personal information to third parties. We may share information only when required by law or to protect the rights and safety of R4K, its members, or the public.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">5. Cookies</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                This website may use cookies or similar technologies to enhance your browsing experience. Cookies are small data files stored on your device. You can choose to disable cookies through your browser settings, though this may affect certain features of the website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">6. Third-Party Services</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our website may contain links to third-party websites or use third-party services (such as Google Forms for contact submissions). These services have their own privacy policies, and R4K is not responsible for their practices. We encourage you to review the privacy policies of any third-party services you interact with.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">7. Children's Privacy</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                R4K is dedicated to educating children, and we take their privacy seriously. We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child has provided personal information to us, please contact us so we can promptly remove it.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">8. Data Security</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We take reasonable measures to protect any information collected through this website. However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                R4K reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">10. Contact Us</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
                <a href="mailto:contact@r4kclub.com" className="text-blue-600 hover:underline">contact@r4kclub.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
