import React from 'react';
import './CompanyPricing.css';
import { Check, FileText, Users, BadgeCheck, Star, ShieldCheck, TrendingUp, Infinity } from 'lucide-react';

const plans = [
  {
    name: "Free Plan",
    price: "Free",
    features: {
      limits: [
        { text: "2 internship postings/month", icon: <FileText size={18} color="#78A083" /> },
        { text: "10 intern profile views/month", icon: <Users size={18} color="#6096B4" /> },
      ],
      benefits: [
        { text: "Paid internships only", icon: <ShieldCheck size={18} color="#78A083" /> },
        { text: "Ideal for occasional hiring", icon: <Star size={18} color="#6096B4" /> },
        { text: "Try the platform risk-free", icon: <TrendingUp size={18} color="#78A083" /> },
      ],
    },
    highlight: false,
  },
  {
    name: "Genesis",
    price: "₹699/month",
    features: {
      limits: [
        { text: "5 postings/month", icon: <FileText size={18} color="#78A083" /> },
        { text: "30 profile views/month", icon: <Users size={18} color="#6096B4" /> },
      ],
      benefits: [
        { text: "Verified Employer Badge", icon: <BadgeCheck size={18} color="#78A083" /> },
        { text: "Affordable for growing startups", icon: <Star size={18} color="#6096B4" /> },
        { text: "Save ₹989/year on annual plan", icon: <TrendingUp size={18} color="#78A083" /> },
      ],
    },
    highlight: false,
  },
  {
    name: "Ascend",
    price: "₹1,499/month",
    features: {
      limits: [
        { text: "15 postings/month", icon: <FileText size={18} color="#78A083" /> },
        { text: "150 profile views/month", icon: <Users size={18} color="#6096B4" /> },
      ],
      benefits: [
        { text: "Perfect for scaling recruitment", icon: <Star size={18} color="#6096B4" /> },
        { text: "Great for multi-department hiring", icon: <Users size={18} color="#78A083" /> },
        { text: "Save ₹2,589/year on annual plan", icon: <TrendingUp size={18} color="#78A083" /> },
      ],
    },
    highlight: true,
  },
  {
    name: "Titan",
    price: "₹4,999/month",
    features: {
      limits: [
        { text: "Unlimited postings", icon: <Infinity size={18} color="#78A083" /> },
        { text: "Unlimited profile views", icon: <Infinity size={18} color="#6096B4" /> },
      ],
      benefits: [
        { text: "Full hiring freedom", icon: <ShieldCheck size={18} color="#78A083" /> },
        { text: "Best for high-volume recruitment", icon: <Star size={18} color="#6096B4" /> },
        { text: "Save ₹5,989/year on annual plan", icon: <TrendingUp size={18} color="#78A083" /> },
      ],
    },
    highlight: false,
  },
];

const CompanyPricing = () => {

  return (
    <div className="pricing-container">
      <h1 className="pricing-header">Choose Your Company Plan</h1>
      <div className="plans-wrapper" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>
        {plans.map((plan, idx) => {
          let cardClass = "pricing-card";
          if (plan.highlight) cardClass += " highlight";
          if (plan.name === "Free Plan") cardClass += " free";
          return (
            <div className={cardClass} key={idx}>
              {plan.name === "Ascend" && (
                <div className="badge">Most Popular</div>
              )}
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-price">{plan.price}</p>
              <ul className="plan-details">
                {/* Posting limits */}
                {plan.features.limits.map((item, i) => (
                  <li key={"limit-"+i}>{item.icon} {item.text}</li>
                ))}
                {/* Benefits */}
                {plan.features.benefits.map((item, i) => (
                  <li key={"benefit-"+i}>{item.icon} {item.text}</li>
                ))}
              </ul>
              <button className="select-btn">Select Plan</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyPricing;
