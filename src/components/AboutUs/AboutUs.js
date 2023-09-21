import React from 'react';
import './AboutUs.css';
import sakiPic from '../../images/saki-profile.jpg';

const AboutUs = () => {
  return (
    <div className='about-page'>
       <p className='page-title about-title'>About the Style Stash Creators</p>
       <section className='about-container'>
        <div className='about-pic'>
          <img className='about-img' alt='Saki co creater of Style Stash'src={sakiPic}/>
        </div>
        <div className='about-info'>
          <p className='about-name'>Saki C</p>
          <p className='info-text'>Hello! I'm a Denver-based software engineer with a unique journey  that blends culture, entrepreneurship, and technology. As the daughter of a first-generation immigrant from Thailand, I've embraced diverse perspectives since childhood. After earning a degree in Psychology and Japanese Studies from the University of Colorado, Boulder, I co-owned a thriving restaurant for a decade, honing skills in management, communication, and creative problem-solving. My next chapter is focused on transitioning into software development, driven by my passion for problem-solving and technology.<br /><br />
          With a foundation in entrepreneurship, I bring leadership, adaptability, and a unique cultural perspective to the table. I'm on the lookout for a role that marries my skills and experiences, ideally contributing to a company dedicated to enhancing user experiences by bridging cultures. </p>
          <div className='btn-container'>
            <button className='login-link-btn'><a href="https://www.linkedin.com/in/saki-c-a7306b259/" target="_blank" rel="noreferrer">LinkedIn</a></button>
            <button className='login-link-btn'><a href="https://github.com/sakisandrac" target="_blank" rel="noreferrer">GitHub</a></button>
          </div>
        </div>
       </section>
       <section className='about-container'>
       <div className='about-pic2'>
          <img className='about-img' alt='Laura co creater of Style Stash'src='https://i.imgur.com/phQ7cly.jpeg'/>
        </div>
        <div className='about-info'>
          <p className='about-name'>Laura G</p>
          <p className='info-text'>
          As an immigrant from Brazil, my journey has been defined by a commitment to empowering individuals with disadvantaged backgrounds. Over the past five years, I have dedicated myself to the mental health treatment field, witnessing the transformative power of support and opportunities for those in need. <br /><br />
          During this time, I also discovered my love for innovative problem-solving and a thirst for continuous learning. It was through this pursuit that I stumbled upon a new path in Software Engineering—a field that offered me the chance to create valuable changes through product design and customer interfaces.<br /><br />
          Taking a leap of faith, I joined Turing's program to equip myself with the skills to make a difference in a different way. For me, giving back means working in a role where I can create a tangible impact, and I firmly believe that software development provides numerous opportunities to achieve that goal.
          </p>
          <div className='btn-container'>
            <button className='login-link-btn'><a href="https://www.linkedin.com/in/laura-garcia-guerra/" target="_blank" rel="noreferrer">LinkedIn</a></button>
            <button className='login-link-btn'><a href="https://github.com/lauraguerra1" target="_blank" rel="noreferrer">GitHub</a></button>
          </div>
        </div>
        <div className='about-pic1'>
          <img className='about-img' alt='Laura co creater of Style Stash'src='https://i.imgur.com/phQ7cly.jpeg'/>
        </div>
       </section>
    </div>
  )
}

export default AboutUs