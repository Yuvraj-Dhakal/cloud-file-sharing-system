import { FaCheckCircle } from "react-icons/fa";
import "../styles/Pricing.css";

function Pricing() {

  const plans = [
    {
      name: "Free",
      storage: "1 GB",
      popular: false,
      features: [
        "Cloud Upload",
        "Secure Download",
        "QR Sharing",
        "Basic Support",
      ],
    },
    {
      name: "Student",
      storage: "10 GB",
      popular: true,
      features: [
        "Everything in Free",
        "Password Protected Sharing",
        "Expiring Links",
        "Priority Upload",
      ],
    },
    {
      name: "Professional",
      storage: "100 GB",
      popular: false,
      features: [
        "Everything in Student",
        "Large File Support",
        "Storage Analytics",
        "Priority Support",
      ],
    },
  ];

  return (
    <section id="pricing" className="pricing-section">

      <div className="container">

        <div className="pricing-header">

          <h2>Choose Your Plan</h2>

          <p>
            Flexible plans designed for students,
            professionals and growing businesses.
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