import React from "react";
import { FaBriefcase, FaBalanceScale, FaUsers, FaShieldAlt, FaHome, FaGavel , FaGlobe,FaClipboardList, FaLightbulb} from "react-icons/fa";
import "./PracticeAreas.css"; // Your CSS styles

const PracticeAreas = () => {
const areas = [
  {
    icon: <FaBriefcase size={32} color="#2563EB" />,
    title: "Business Law",
    desc: "Corporate formation, contracts, compliance, and commercial litigation",
    stats: ["850+ lawyers", "Avg $350/hr"],
  },
  {
    icon: <FaBalanceScale size={32} color="#2563EB" />,
    title: "Personal Injury",
    desc: "Auto accidents, medical malpractice, and workplace injuries",
    stats: ["720+ lawyers", "Avg $400/hr"],
  },
  {
    icon: <FaUsers size={32} color="#2563EB" />,
    title: "Family Law",
    desc: "Divorce, custody, adoption, and domestic relations",
    stats: ["650+ lawyers", "Avg $300/hr"],
  },
  {
    icon: <FaShieldAlt size={32} color="#2563EB" />,
    title: "Criminal Defense",
    desc: "DUI, drug charges, white collar crimes, and appeals",
    stats: ["580+ lawyers", "Avg $450/hr"],
  },
  {
    icon: <FaHome size={32} color="#2563EB" />,
    title: "Real Estate",
    desc: "Property transactions, zoning, and real estate litigation",
    stats: ["420+ lawyers", "Avg $275/hr"],
  },
  {
    icon: <FaGavel size={32} color="#2563EB" />,
    title: "Employment Law",
    desc: "Workplace discrimination, wrongful termination, and labor disputes",
    stats: ["380+ lawyers", "Avg $325/hr"],
  },
  // New ones from screenshot
  {
    icon: <FaGlobe size={32} color="#2563EB" />,
    title: "Immigration",
    desc: "Visas, citizenship, deportation defense, and asylum cases",
    stats: ["290+ lawyers"],
  },
  {
    icon: <FaClipboardList size={32} color="#2563EB" />,
    title: "Estate Planning",
    desc: "Wills, trusts, probate, and estate administration",
    stats: ["340+ lawyers"],
  },
  {
    icon: <FaLightbulb size={32} color="#2563EB" />,
    title: "Intellectual Property",
    desc: "Patents, trademarks, copyrights, and IP litigation",
    stats: ["220+ lawyers"],
  },
];


  return (
    <section className="practice-areas">
      <h2 className="pa-title">Practice areas we cover</h2>
      <p className="pa-subtitle">
        Find specialized legal expertise across all major practice areas with verified professionals.
      </p>

      <div className="pa-cards">
        {areas.map((area, index) => (
          <div className="pa-card" key={index}>
            <div className="pa-icon">{area.icon}</div>
            <h3 className="pa-card-title">{area.title}</h3>
            <p className="pa-card-desc">{area.desc}</p>
            <div className="pa-card-footer">
              <span>{area.stats[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <div class="button-container">
  <button class="view-all-btn">View all practice areas</button>
</div>

    </section>
  );
};

export default PracticeAreas;
