import React from 'react';
import Link from 'next/link'; // For navigation
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-branding">
          <h1 className="footer-title" style={{ color: 'white' }}>Simplifying USA Taxation</h1>
          <p className="footer-tagline">
            Making tax calculations easier, faster, and smarter.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-links">
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>

        {/* Right Section with Social Media */}
        <div className="footer-social">
          <h2>Follow Us</h2>
          {/* LinkedIn Profile Link for Mehboob Iqbal with 'Founder' Text */}
          <a href="https://www.linkedin.com/in/mehboob-iqbal-3b1263190" target="_blank" rel="noopener noreferrer">
            <img 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAY1BMVEX///8AAAD4+PiAgIDBwcElJSXy8vJwcHCRkZEqKiq+vr5OTk7e3t6cnJzu7u78/Pzn5+eLi4uzs7PY2Nhra2vHx8fOzs4aGhogICB5eXmlpaU8PDwUFBRXV1czMzNERERhYWHcYGXlAAAE2ElEQVR4nO2c63aqMBBGDSiiILcACqL4/k95xHZVa2XyRWtCemb/Lq7sQm6TmcxmDMMwI3heEHip7Vb8AknV5s3yjB+2tWe7NS8h88N+Kz7Z9qc2s92ip5HNUXyn68PEdqueIg078YBjYbthTyDv38oXpXMvpxhTGTqPtN06LVLK5dx1nLIpHnaXK3uHbKoV7SLEwZkxOitVLqLLHZlA043iIxs4rm03E0NGahchlk58aF6IuIidE68GezFCNC7MnfQUc+VY226pmsAHZcRm+gNavEdlltP/zirURfSx7baqUKzKbpn+Cs3bwDKist1YFeAsc2HyMw0+mAlRTD1i4+UaMrYbq+JPfWZpi8tMfwmwhl0Wkx+aZzWwmfnAgd1mdkBl/MB2W5Xgs+bkR+Yz863aYyCafpeBwhkXwunvAGbqoNkH+8mvzC5kJ0Qmd6DHDBTKGOB5M+NCj7mgXmzuJr8u+yJRzjW+7SZqoAo3ldOfL2+Q5LtZOjEqXyFmm50D65g7ks3IOWBUOPZeBryqeTB7rkJnxuTvJD90jmHt3Cf2RSDb63KgK4vYwS/shtQLZLUuinUV/438GYZhGIZhGOa/5LyuTZIsi6WUcZxlWeLq6jZNYlls/FO/+txFdYv9wd8UdZwFbhmlWd36IzGh4ykv6icPg1K5BhhJz0jmzzyaynY5mnr8IVRuqmd8vHy3UrLbPH642i+Uj7b3KlWOpIWdfaT25+ZBqQDh44fnO/Wjd/+H2odzj6JQ9+28JrPQlElyWOVMF7V6L8eoTNFrqAxs9U7sDMokS02VC/d9bhoyaDroPUs8eGdMpqJHY4ITPA4YkknXcPrET0rUxpAMdg48RgPamJHB0ycfk2P9xojMGvg7kq6F4t4mZGLd6eUnCyjdzYCM99T8csceyas2INOC+Tk0yJH322Xa+MnJ8h4gS/ztMqFGhi5JNAGZ7UszzC1z+zK/R6TcDzgks1XmiTkkox7QXJJRlr24JLMdias4KaPMSXJKRhURcEpGlZLolIzw6e/MLZkTPZ65JaPIr3ZLpqM7jQWZVVQ2A+Wp197p0Gn8pmV6v5jXWTKQxfW6LYHY+w10Lb9ZmUMrv8dZ0qzS2u8cyJnGpExfZA9W8YFOrHNFlr4ZlPEfqQygdS8D5A7NnAwRyNMofiVPbEzJdCM/8WnToL9D3ktgSqahXGYzOITjU/EzQzK9KoaHBtfI8w1DMsoKHHQQiKjVmRmZk8oFfjVH+zJAYXSM1b+SZclGZA5qF6Rc7AL1fzEiA51HFNiPUZsAEzI76JoXieU7UP8YEzJYoZeHTTW2ZcAib6zTUD9mQga8f6eFzguoxZkBmR48+K6gfRq1ODMgg17zlAGFyfTG2YAMeIg/C6BNmmUZ7Az/vIWGxmbLMvCNFdDYTN0caUAGvn4HWp1RH+37Zbbw9TvQPQtUefL7ZY5wZiK0pbErg19dCwUC7Mrgd1ZATbEsA98m6IAMuWtnGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGZZhGV0ZqM5jTAYpe8cLG14uOUnbcqmkHLmbQDbAszl8dzTUFLIczwsARn4ghZ6Fb5B/pSkMw/x3/APg3H7KXOASKAAAAABJRU5ErkJggg==" 
              style={{ height: '30px', width: '30px' }} // Smaller size
            />
            <span>Founder</span>
          </a>

          {/* LinkedIn Badge */}
          <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="mehboob-iqbal-3b1263190" data-version="v1">
            <a className="badge-base__link LI-simple-link" href="https://pk.linkedin.com/in/mehboob-iqbal-3b1263190?trk=profile-badge">
              Mehboob Iqbal
            </a>
          </div>
        </div> {/* <-- Closed the 'footer-social' div */}
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tax Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
