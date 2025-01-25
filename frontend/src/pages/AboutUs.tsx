import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <section className="about-us section">
      <div className="container">
        <h1 className="section-title">About Us</h1>
        <div className="about-content">
          <div className="about-image">
            <img
              src="https://placehold.co/800x500"
              alt="Our Team"
              className="team-photo"
            />
          </div>
          <div className="about-text">
            <p className="lead">We are a passionate team dedicated to providing the best dropshipping solutions.</p>
            <p>With years of experience in e-commerce, we've built a reliable network of suppliers and streamlined logistics to ensure fast delivery and excellent customer service.</p>
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-subtitle">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://placehold.co/300x300"
                alt="Team Member 1"
                className="member-photo"
              />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img
                src="https://placehold.co/300x300"
                alt="Team Member 2"
                className="member-photo"
              />
              <h3>Jane Smith</h3>
              <p>Operations Manager</p>
            </div>
            <div className="team-member">
              <img
                src="https://placehold.co/300x300"
                alt="Team Member 3"
                className="member-photo"
              />
              <h3>Mike Johnson</h3>
              <p>Marketing Director</p>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h2 className="section-subtitle">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">Customer Focus</div>
            <div className="value-card">Innovation</div>
            <div className="value-card">Integrity</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;