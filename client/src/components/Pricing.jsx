import { FaCheckCircle } from "react-icons/fa";
import "../styles/Pricing.css";

function Pricing() {

const plans = [
  {
    name: "Basic",
    storage: "100 MB",
    popular: false,
    features: [
      "Cloud File Upload",
      "Secure Download",
      "File Management",
      "User Authentication",
    ],
  },
  {
    name: "Standard",
    storage: "Cloud Storage",
    popular: true,
    features: [
      "Everything in Basic",
      "Google Authentication",
      "File Organization",
      "Secure Sharing",
    ],
  },
  {
    name: "Advanced",
    storage: "Coming Soon",
    popular: false,
    features: [
      "Large File Support",
      "Advanced Sharing",
      "Analytics",
      "More Storage",
    ],
  },
];
  return (
    <section id="pricing" className="pricing-section">

      <div className="container">

        <div className="pricing-header">

          <h2>Simple Cloud Storage Experience</h2>

<p>
  YuvNext provides secure file storage and sharing
  features for students, professionals, and everyday users.
</p>

        </div>

        <div className="row g-4">

          {plans.map((plan, index) => (

            <div
              className="col-lg-4"
              key={index}
            >

              <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>

                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <h3 className="plan-name">
                  {plan.name}
                </h3>

                <div className="plan-storage">
                  {plan.storage}
                </div>

                <ul className="plan-features">

                  {plan.features.map((feature, i) => (

                    <li key={i}>

                      <FaCheckCircle />

                      {feature}

                    </li>

                  ))}

                </ul>

                <button className="btn btn-primary plan-button">
                  Get Started
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Pricing;