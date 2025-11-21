import React, { useState } from "react";
import {
  CheckCircle,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Book,
} from "lucide-react";

// Vaccine Info Page
const VaccineInfoPage = ({ navigate }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const schedules = [
    { age: "Birth", vaccines: ["BCG", "Hepatitis B", "OPV 0"] },
    {
      age: "6 Weeks",
      vaccines: ["DTaP 1", "IPV 1", "Hib 1", "PCV 1", "Rota 1"],
    },
    {
      age: "10 Weeks",
      vaccines: ["DTaP 2", "IPV 2", "Hib 2", "PCV 2", "Rota 2"],
    },
    {
      age: "14 Weeks",
      vaccines: ["DTaP 3", "IPV 3", "Hib 3", "PCV 3", "Rota 3"],
    },
    { age: "9 Months", vaccines: ["Measles 1", "Yellow Fever"] },
    {
      age: "18 Months",
      vaccines: ["DTaP Booster", "Measles 2", "IPV Booster"],
    },
  ];

  const myths = [
    {
      question: "Vaccines cause autism",
      answer:
        "FALSE. Multiple large-scale studies have thoroughly debunked this myth. There is no link between vaccines and autism. The original fraudulent study was retracted and the author lost his medical license.",
    },
    {
      question: "Natural immunity is better than vaccines",
      answer:
        "FALSE. While natural infection may provide immunity, it comes with serious risks including complications, permanent disability, or death. Vaccines provide immunity safely without these dangers.",
    },
    {
      question: "Too many vaccines overload the immune system",
      answer:
        "FALSE. Children's immune systems handle thousands of antigens daily. Modern vaccines contain far fewer antigens than older versions, and the immune system can easily handle them.",
    },
    {
      question: "Vaccines contain dangerous ingredients",
      answer:
        "FALSE. Vaccine ingredients are rigorously tested and used in tiny, safe amounts. For example, formaldehyde (used to inactivate viruses) is produced naturally in larger amounts by your own body.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Book className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vaccine Information Center
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Evidence-based resources, myth-busting, and comprehensive
            information about childhood vaccinations
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Vaccine Schedule */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Standard Vaccination Schedule
            </h2>
          </div>

          <div className="space-y-3">
            {schedules.map((schedule, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="font-bold text-blue-600 w-32 text-lg">
                  {schedule.age}
                </div>
                <div className="flex flex-wrap gap-2">
                  {schedule.vaccines.map((vaccine, vIdx) => (
                    <span
                      key={vIdx}
                      className="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {vaccine}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-blue-900">
              <strong>Important:</strong> This is a general schedule based on
              WHO and CDC guidelines. Your healthcare provider may recommend
              variations based on your child's health and local requirements.
            </p>
          </div>
        </section>

        {/* Myths & Facts */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Common Vaccine Myths Debunked
            </h2>
          </div>

          <div className="space-y-4">
            {myths.map((myth, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-lg">
                    MYTH: {myth.question}
                  </span>
                  {openAccordion === idx ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>

                {openAccordion === idx && (
                  <div className="p-5 bg-white border-t-2 border-gray-200">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {myth.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Side Effects */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Side Effects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50">
              <h3 className="text-xl font-bold mb-4 text-green-900">
                Common (Normal Reactions)
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Low-grade fever (37.5-38°C)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Soreness or redness at injection site</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mild fussiness or fatigue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Temporary loss of appetite</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t-2 border-green-200">
                <p className="font-semibold text-green-900">
                  Duration: 24-48 hours
                </p>
                <p className="text-sm text-green-800 mt-1">
                  Action: Rest, fluids, cool compress
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg border-2 border-red-200 bg-red-50">
              <h3 className="text-xl font-bold mb-4 text-red-900">
                Rare (Contact Doctor)
              </h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>High fever (over 39°C)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Severe allergic reaction</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Seizures or convulsions</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unusual crying (3+ hours)</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t-2 border-red-200">
                <p className="font-semibold text-red-900">
                  Action: Immediate medical attention
                </p>
                <p className="text-sm text-red-800 mt-1">
                  Call your doctor or go to emergency room
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VaccineInfoPage;
