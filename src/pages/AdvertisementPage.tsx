import React from 'react';

/**
 * AdvertisementPage component for Pothole Indi
 * Provides information about advertising opportunities
 */
const AdvertisementPage: React.FC = () => {
  const adPackages = [
    {
      name: "Premium Package",
      price: "₹15,000/month",
      features: [
        "Homepage banner + sidebar ads",
        "10,000+ monthly impressions",
        "Targeted Indian audience",
        "Road safety focused demographic",
        "Priority placement",
        "Monthly performance report"
      ]
    },
    {
      name: "Custom Solution",
      price: "Custom Pricing",
      features: [
        "Tailored advertising solutions",
        "Dedicated account manager",
        "Custom placements",
        "Advanced targeting options",
        "Comprehensive analytics",
        "Flexible pricing based on goals"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Advertise with Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reach a highly engaged audience of citizens passionate about road safety and infrastructure improvement across India.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K</div>
            <div className="text-gray-600">Monthly Visitors</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Mobile Users</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">72%</div>
            <div className="text-gray-600">Returning Visitors</div>
          </div>
        </div>

        {/* Ad Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Advertising Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {adPackages.map((pkg, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl ${
                  index === 0 ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {index === 0 && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-black mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-3 px-6 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Why Advertise With Us */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Why Advertise with Pothole Indi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Highly Engaged Audience</h3>
              <p className="text-gray-600 mb-4">
                Our users are passionate about road safety and infrastructure improvement. They're actively engaged 
                in making a difference in their communities.
              </p>
              <h3 className="text-xl font-bold text-black mb-4">Targeted Demographics</h3>
              <p className="text-gray-600 mb-4">
                Our audience consists of concerned citizens across urban and rural India who care about public infrastructure 
                and are likely to support businesses that align with these values.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Trust and Credibility</h3>
              <p className="text-gray-600 mb-4">
                As a platform dedicated to public good, we've built trust with our audience. Your brand association 
                with our mission enhances your credibility.
              </p>
              <h3 className="text-xl font-bold text-black mb-4">Cost-Effective Solutions</h3>
              <p className="text-gray-600 mb-4">
                Our advertising packages offer excellent value for money with competitive pricing and high engagement rates 
                compared to traditional advertising channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementPage;