import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import usflag from "../../assets/img/usflag.png";
import arrowdown from "../../assets/img/arrowdown.png";
import whitearrow from "../../assets/img/whitearrow.png";
import facebook from "../../assets/img/facebook.png";
import instagram from "../../assets/img/instagram.png";
import twitter from "../../assets/img/twitter.png";
import mail from "../../assets/img/mail.png";


const socialLinks = [
  { icon: facebook, alt: "Facebook", url: "/" },
  { icon: instagram, alt: "Instagram", url: "/" },
  { icon: twitter, alt: "Twitter", url: "/" },
  { icon: mail, alt: "Mail", url: "/" },
];

const footerLinks = [
  {
    title: "Shop",
    links: ["My Account", "Login", "Wishlist", "Cart"],
  },
  {
    title: "Information",
    links: ["Shipping Policy", "Returns & Refunds", "Cookies Policy", "Frequently asked"],
  },
  {
    title: "Company",
    links: ["About us", "Privacy Policy", "Terms & Conditions", "Contact Us"],
  },
];

function Footer() {
  return (
    <div className="bg-grayLight px-[21px] pt-[72px] pb-8">
      <footer className="container">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 pb-[72px] gap-6">
          {/* Logo & Newsletter */}
          <div className="col-span-2">
            <img src={logo} alt="Logo" className="w-40 h-8 mb-10" />

            <form className="border-b border-darkPrice flex w-fit">
              <input
                type="text"
                placeholder="Get latest offer to your inbox"
                className="border-none bg-transparent focus:outline-none mr-8 w-full text-base font-medium text-[#787A7C] leading-[160%]"
              />
              <button type="submit" className="bg-darkPrice px-4 py-2 rounded-lg">
                <img src={whitearrow} alt="arrow" className="h-5 w-5" />
              </button>
            </form>

            {/* Social Icons */}
            <ul className="flex gap-6 items-center mt-5">
              {socialLinks.map((social) => (
                <li key={social.alt}>
                  <Link
                    to={social.url}
                    className="bg-white w-9 h-9 rounded-full flex justify-center items-center"
                  >
                    <img src={social.icon} alt={social.alt} className="w-[1.125rem] h-[1.125rem]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {footerLinks.map((section) => (
            <div key={section.title} className="mt-6 md:mt-0">
              <ul className="flex flex-col gap-4">
                <li>
                  <h3 className="md:text-sm text-[1.125rem] font-semibold text-darkPrice leading-6">
                    {section.title}
                  </h3>
                </li>
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="text-sm font-normal text-darkPrice leading-[22px]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container">
          <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between md:items-center">
          <p className="text-sm text-[#3E3E59]">&copy; John Lewis plc 2001 - 2024</p>

          <div className="flex gap-4 items-center mt-4 md:mt-0 ml-auto">
            <div className="flex gap-2 items-center">
              <img src={usflag} alt="US Flag" className="w-5 h-4" />
              <p className="font-medium text-darkPrice text-sm">English</p>
              <button>
                <img src={arrowdown} alt="Dropdown" className="w-3 h-2" />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-darkPrice text-sm">USD</p>
              <button>
                <img src={arrowdown} alt="Dropdown" className="w-3 h-2" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
