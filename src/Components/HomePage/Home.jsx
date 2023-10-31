import React, { useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import { Link } from 'react-router-dom';

function Home() {
  const [visibleHero, setVisibleHero] = useState(false);
  const [visibleBenefits, setVisibleBenefits] = useState(false);
  const [visibleSocialProof, setVisibleSocialProof] = useState(false);

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 text-white p-16 space-y-20">

      {/* 1. Main Headline */}
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold mb-3">EmergenSync</h1>
        <h2 className="text-4xl mb-3">Streamline the ER Experience</h2>
        <p className="text-xl font-light">Innovation for paramedics and hospitals alike.</p>
      </div>

{/* 2. Hero Section */}
<div className="relative w-full flex items-center bg-white bg-opacity-20 p-12 rounded-xl shadow-2xl space-x-8">
          
          {/* Image on the left */}
          <img src="/paramedicUpdated.png" alt="EmergenSync Hero"  width={200} height={200} className="object-cover " />
          
          {/* Subheader and button on the right */}
          <div className="flex-1 flex flex-col items-start">
              <h3 className="text-5xl font-semibold mb-4">Transforming ER Management</h3>
              <p className="text-2xl mb-8">With real-time data integration and global scalability.</p>
              
              {/* Button centered below the subheader */}
              <Link to="/login" className="self-center py-3 px-10 text-2xl font-bold rounded-full shadow-2xl bg-white text-purple-500 hover:bg-purple-200 hover:text-purple-700 focus:outline-none transition transform duration-500 ease-in-out">
                  Login
              </Link>
          </div>
      </div>
      
{/* 3. Benefits with Trigger */}
<ScrollTrigger onEnter={() => setVisibleBenefits(true)} onExit={() => setVisibleBenefits(false)}>
  <div className={`text-center space-y-8 bg-purple-600 bg-opacity-70 p-10 rounded-xl shadow-2xl transition-opacity duration-1000 ${visibleBenefits ? 'opacity-100' : 'opacity-0'}`}>
    <h2 className="text-5xl font-bold">Benefits</h2>
    <ul className="space-y-4 text-2xl">
      <li>Efficient System for Ambulance Drivers</li>
      <li>Real-time Hospital Management</li>
      <li>Real-time Data Integration for Faster Decision Making</li>
      <li>Scalable Design for Global Application</li>
    </ul>
  </div>
</ScrollTrigger>

      {/* 4. Social Proof with Trigger */}
      <ScrollTrigger onEnter={() => setVisibleSocialProof(true)} onExit={() => setVisibleSocialProof(false)}>
        <div className={`text-center space-y-8 w-full p-10 bg-green-500 bg-opacity-40 rounded-xl shadow-2xl transition-opacity duration-1000 ${visibleSocialProof ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold">What People Are Saying</h2>
          <div className="space-y-6">
            <blockquote className="italic">
              &quot;EmergenSync has drastically improved our ER management.&quot; <cite>&apos;-&apos; St. Peter&apos;s Hospital</cite>
            </blockquote>
            <blockquote className="italic">
              &quot;The platform is intuitive and has reduced our response time significantly.&quot; <cite>&apos;-&apos; John, Paramedic</cite>
            </blockquote>
          </div>
        </div>
      </ScrollTrigger>

      {/* 5. Conversion Goal */}
      <div className="flex space-x-6">
        <button className="py-3 px-10 text-2xl font-bold rounded-full shadow-2xl bg-white text-purple-500 hover:bg-purple-200 hover:text-purple-700 focus:outline-none transition transform duration-500 ease-in-out">
          Get Started
        </button>
        <button className="py-3 px-10 text-2xl font-bold rounded-full shadow-2xl hover:bg-purple-700 hover:text-white focus:outline-none transition transform duration-500 ease-in-out">
          Learn More
        </button>
      </div>

    </div>
  );
}

export default Home;
