import React from "react";
import "./CallToAction.css";

const CallToAction = () => {

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>
          Ready to find your <span>legal solution?</span>
        </h2>

        <p className="cta-subtitle">
          Join thousands of clients who’ve successfully resolved their legal matters through our trusted platform.
        </p>

        <p className="cta-footnote">
          Free to use · 5,000+ verified lawyers · Average 2-hour response time
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
