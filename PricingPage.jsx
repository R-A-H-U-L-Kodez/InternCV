import React from 'react';
import './PricingPage.css';
import { Check, CreditCard, Mail, Percent, Unlock, Ban, Sparkle, BarChart, Pin, Star } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="pricing-container">
      <h1 className="pricing-header">Choose Your Plan</h1>
      <div className="pricing-table">
        {/* Free Plan */}
        <div className="pricing-card free">
          <h2 className="plan-name">Free Plan <span className="plan-desc">(Interns)</span></h2>
          <p className="plan-price">₹0<span style={{fontSize:'1rem',fontWeight:400}}>/month</span></p>
          <ul className="plan-details">
            <li><CreditCard size={18} color="#78A083" /> 5 credits/month (reset on 1st)</li>
            <li><Mail size={18} color="#6096B4" /> 1 credit = 1 internship application</li>
            <li><Percent size={18} color="#78A083" /> 10%–20% success fee on paid internships</li>
          </ul>
          <button className="select-btn">Start for Free</button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card highlight">
          <div className="badge">Most Popular</div>
          <h2 className="plan-name">Premium Plan <span className="plan-desc">(Interns)</span></h2>
          <p className="plan-price">₹198<span style={{fontSize:'1rem',fontWeight:400}}>/month</span></p>
          <ul className="plan-details">
            <li><Unlock size={18} color="#78A083" /> Unlimited internship applications</li>
            <li><Ban size={18} color="#6096B4" /> No success fee on stipend</li>
            <li><Sparkle size={18} color="#78A083" /> AI-powered resume builder</li>
            <li><BarChart size={18} color="#6096B4" /> Personalized skill assessments</li>
            <li><Pin size={18} color="#78A083" /> Priority placement in searches</li>
            <li><Star size={18} color="#6096B4" /> Access to premium opportunities</li>
          </ul>
          <button className="select-btn">Upgrade to Premium</button>
        </div>
      </div>

      {/* Demo Internships Section */}
      <div className="demo-section">
        <h2>Example Internship Opportunities</h2>
        <div className="internships">
          <div className="internship-card">
            <h3>Frontend Developer Intern</h3>
            <p>Company: CodeWave</p>
            <p>Stipend: ₹8,000/month</p>
            <p>Duration: 3 months</p>
          </div>
          <div className="internship-card">
            <h3>Data Analyst Intern</h3>
            <p>Company: DataNest</p>
            <p>Stipend: ₹12,000/month</p>
            <p>Duration: 6 months</p>
          </div>
          <div className="internship-card">
            <h3>Cybersecurity Intern</h3>
            <p>Company: SecureTrack</p>
            <p>Stipend: ₹10,000/month</p>
            <p>Duration: 2 months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

