import React from 'react';
import './footer.css'
import lego3 from './images/lego3.jpg';

const Footer = (props) => {
  
  return (
  <footer>
    <img className='footerImage' src={lego3} alt='legobrick background'/>
    <div className='github'>
      <a href='https://github.com/schneur?tab=repositories' target='_blank' alt='github link'><i class="fab fa-github"></i></a>
    </div>
    <div className='portfolio'>
      <a href='https://hungry-bhaskara-4ca864.netlify.app/' target='_blank' alt='personal portfolio link'><i class="fas fa-portrait"></i></a>
    </div>
  </footer>
  )
  };

  export default Footer;

