import React, { useState } from "react";
import "./Home.css";
import Navbar from './Navbar'

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    { title: "Mission", content: "To provide an excellent academic foundation by fostering a passion for learning, creativity, and innovation. We are committed to nurturing ethical values, scientific temperament, and leadership skills among students to help them become responsible citizens and future leaders in a rapidly evolving world." },
    { title: "Vision", content: "To be a center of excellence in education, empowering students with knowledge, skills, and ethical values to become future leaders, innovators, and responsible global citizens. We strive to create an inclusive and inspiring learning environment that nurtures creativity, critical thinking, and a passion for lifelong learning." },
    { title: "Academic Excellence", content: "To foster a culture of academic rigor, intellectual curiosity, and innovation, ensuring that students develop the knowledge and skills necessary to excel in higher education and beyond. We are committed to providing a dynamic learning environment that promotes excellence in science, technology, engineering, mathematics (STEM), and humanities, while also nurturing creativity, problem-solving, and leadership skills." },
    { title: "Caring Community", content: "To create a nurturing and inclusive environment where students, teachers, and staff support and respect one another. We believe in fostering empathy, kindness, and teamwork, ensuring every student feels valued and empowered to grow academically, socially, and emotionally." },
    { title: "Rich Heritage", content: "Rooted in a legacy of academic excellence and innovation, CUET School and College upholds a tradition of nurturing bright minds, fostering leadership, and contributing to national and global progress. Our rich heritage is built upon a strong foundation of discipline, integrity, and a commitment to lifelong learning." },
  ];

  return (
    <div>
      <Navbar />
      {/* Home Section */}
      <div className="home1">
        <div className="left">
          <h1>Quality Education</h1>
          <h2>Dedicated to building a child's capacity to change the world through fostering a love of learning.</h2>
          <div className="line"></div>
          <p>"Learn, grow, and soar."</p>
        </div>
        <img src="/images/cuet.jpg" alt="My homepage" style={{ width: "50%", height: "auto" }} />
      </div>

      {/* Goal Section */}
      <div className="our-goal">
        <h2 className="section-title">OUR GOAL</h2>
        <p className="goal-description">
          At CEUSC, your child will be happy, healthy, free to be creative, think outside the box, navigate interconnected 
          relationships and innovative solutions to problems that seem unsolvable. Your child will seek to understand 
          the complexity of the world and take action to create a thriving local community, country, and world.
        </p>
        <div className="goal-content">
          <div className="accordion">
            {accordionItems.map((item, index) => (
              <div key={index} className="accordion-item">
                <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                  {item.title} <span>{openIndex === index ? "▲" : "▼"}</span>
                </button>
                {openIndex === index && <p className="accordion-content">{item.content}</p>}
              </div>
            ))}
          </div>
          <div className="goal-image">
            <img src="/images/our goal.jpeg" alt="CEUSC Students" />
          </div>
        </div>
      </div>

      {/* Leaders Section */}
      <div className="leaders-section">
        <h2 className="leaders-title">Message from Our Leaders</h2>
        
        <div className="leader-container">
          {/* Chairman Section */}
          <div className="leader-box">
            <img src="/images/mosh.jpg" alt="Chairman" className="leader-image"/>
            <h3>Honourable Chairman</h3>
            <p>
              Education is the basis of all progress. Long experience has taught us that progress is possible only 
              when men and women are equally educated. The sole purpose of education is not only to limit the knowledge 
              of the book but also to inculcate in the student human values such as knowledge, compassion, courage, 
              humility, honesty and reliability. Chittagong  Engineering University School and College  bears witness 
              to the academic facilities of the students, sports, national programs and regular extra-curricular activities.</p>
              <p>The institution encourages students to learn about the ever-changing environment around them, 
              as well as providing support and guidance in their decision-making and social skills practice.</p>
              <p>We are sure that this institution is the best place for your child. We welcome your active 
              interest and participation in your child’s progress and activities. The administration and teachers of 
              Chittagong  Engineering University School and College are committed to fulfill the responsibilities entrusted to them. </p>         
              <p>We look forward to your continued support.

              <p>
              <strong>Dr. Mohammad Moshiul Hoque</strong></p>
              Chairman
              </p>

          </div>

          {/* Principal Section */}
          <div className="leader-box">
            <img src="/images/runu.jpg" alt="Principal" className="leader-image"/>
            <h3>Respected Principal</h3>
            <p>
              "Chittagong Engineering University  School and College is a renowned traditional educational institution.
              It is located on the campus of Chittagong University of Engineering and Technology in the beautiful valley 
              near the banks of the river Karnafuli.</p>

              <p>This institution started its journey in 1983 under the patronage of Honorable Vice-Chancellor and under the management of efficient Board of Directors.
              </p>

              <p>Every year, the students are inspired by the influence of humanity and are spreading to the golden destination of success as an honest, courageous and conscious generation. In the age of globalization, in the light of technology based education, this organization is constantly working to achieve the sustainable development goals. My expectation is that this institution, which is an excellent center of physical and mental care as well as curricular education, will always be moving towards a new horizon."</p>

              <p>
            <strong>Runu Mozumdar</strong>
            <br />
            Principal  
            </p>

          </div>
        </div>
      </div>

      {/* Footer Section */}
  <footer className="footer">
  <div className="footer-container">
    <p>&copy; 2025 CUET School and College. All Rights Reserved.</p>
    <div className="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact Us</a>
    </div>
  </div>
  </footer>
    </div>



  );
};

export default Home;



