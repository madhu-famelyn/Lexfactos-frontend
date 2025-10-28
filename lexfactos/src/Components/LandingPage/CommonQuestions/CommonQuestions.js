import React, { useState } from "react";
import "./CommonQuestions.css";
import { IoIosArrowDown } from "react-icons/io"; // import arrow icon


const questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
];

const CommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="questions-section">
      {/* <h2 className="questions-title">Common questions</h2>
      <p>Everything you need to know about finding and working with lawyers on our
platform.</p>
      <div className="questions-container">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`question-card ${
              openIndex === index ? "open" : ""
            }`}
            onClick={() => toggleQuestion(index)}
          >
 <div className="question-header">
  <span className="question-text">{question}</span>
  <IoIosArrowDown
    className={`arrow-icon ${openIndex === index ? "rotate" : ""}`}
  />
</div>

            {openIndex === index && (
              <div className="question-body">
                This is the answer or more info for {question}.
              </div>
            )}
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default CommonQuestions;
