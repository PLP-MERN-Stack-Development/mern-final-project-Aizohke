import React from "react";
import { Shield, Heart, Users, Target } from "lucide-react";

// About Page
const AboutPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About VaxTrack & Prevent</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Revolutionizing child healthcare through intelligent vaccination
            tracking and parental support.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To ensure no child misses critical vaccinations by empowering
              parents with technology, education, and access to healthcare
              resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                What We Do
              </h3>
              <p className="text-gray-600 mb-4">
                VaxTrack & Prevent is a comprehensive platform that helps
                parents manage their children's vaccination schedules, track
                progress, and connect with healthcare providers seamlessly.
              </p>
              <p className="text-gray-600">
                Our AI-powered assistant provides reliable information, while
                our real-time communication tools bridge the gap between parents
                and medical professionals.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Why It Matters
              </h3>
              <p className="text-gray-600 mb-4">
                Every year, millions of children miss essential vaccinations due
                to forgotten schedules, lack of access to information, or
                logistical challenges.
              </p>
              <p className="text-gray-600">
                We're changing that by making vaccination management simple,
                accessible, and reliable for families everywhere.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                desc: "Child health and data security prioritized",
              },
              {
                icon: Heart,
                title: "Compassionate",
                desc: "Understanding modern parent needs",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Supportive networks for caregivers",
              },
              {
                icon: Target,
                title: "Impact Driven",
                desc: "Improving vaccination rates",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold mb-2 text-gray-900">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
