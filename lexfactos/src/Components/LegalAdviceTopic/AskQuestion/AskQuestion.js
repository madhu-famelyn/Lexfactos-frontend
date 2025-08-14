import React from "react";
import "./AskQuestion.css";

const AskQuestion = () => {
  return (
    <div className="ask-question-section">
      <div className="ask-question-text">
        <h2>
          Can't find what you're looking for? Ask your own question - for free!
        </h2>
        <div className="ask-question-underline"></div>
        <p>
          Ask your anonymous question and get free answers from experienced lawyers.
        </p>
      </div>
      <div className="ask">
<div className="ask-question-form">
  <textarea
    placeholder='Start your question with "How", "What", "Why", "Can I", etc.'
  ></textarea>
</div>

<div className="button-wrapper">
  <button type="button" className="submit-question-btn">
    Submit Question
  </button>
</div>


      </div>
    </div>
  );
};

export default AskQuestion;
