import React from "react";
import "./RelatedTopics.css";

const RelatedTopics = () => {
  const topics = [
    "Alimony",
    "Uncontested divorce",
    "No-fault divorce",
    "Legal separation and divorce",
    "Do-it-yourself divorce",
    "Child custody",
    "Child support",
    "Filing for divorce",
    "Dividing assets in a divorce",
    "Alternatives to divorce",
    "Divorce and family",
    "Divorce court",
    "Divorce papers",
    "Working with a Divorce Lawyer",
  ];

  return (
    <div className="related-topics-wrapper">
      <h2 className="related-heading">Explore Related Topics</h2>
      <div className="related-underline"></div>
      <div className="related-topics-container">
        {topics.map((topic, index) => (
          <button key={index} className="related-topic-btn">
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedTopics;
