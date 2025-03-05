/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import { setHomepageTitle } from "@/store/homepageSlice";
import { AppAssets } from "@/Constants/assets";
import { store, useAppSelector } from "@/store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Header({ cityList, seodata, courselist }: any) {
  const [showDropdown, setShowDropdown] = useState<any>();
  const [isScrolled, setIsScrolled] = useState(false);
  // console.log("courselistcourselistcourselistcourselist",courselist)
  // const homepagedata = useAppSelector((state) => state.HomepageReducer.seoData);
  // console.log("homepageseo", seodata);
  const pathmane = usePathname();
  // console.log("testpathname", pathmane);
  const [currentLocation, setCurrentLocation] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    // console.log("114444");

    setCurrentLocation(pathSegments[1]);
  }, [pathname]);

  useEffect(() => {
    store.dispatch(setHomepageTitle(seodata.title));
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Courses",
      hasDropdown: true,
      href: "/course",
      submenu: courselist,
    },
    { title: "Blog", hasDropdown: false, href: "/blogs" },
    { title: "News", hasDropdown: false, href: "/news" },
    { title: "ContactUs", hasDropdown: false, href: "/contactus" },
    { title: "AboutUs", hasDropdown: false, href: "/aboutus" },
  ];
  const [show, setShow] = useState(false);
  const logo = useAppSelector((state) => state.HomepageReducer.seoData.logo);
  return (
    <header
      className={`sticky top-0    z-50 w-full ${
        isScrolled
          ? "bg-primary text-white backdrop-blur-sm "
          : "bg-white text-primary"
      }`}
    >
      <div
        className={`  md:flex md:items-center md:justify-between flex items-start justify-between w-full shadow-lg ${
          isScrolled
            ? "bg-primary text-white backdrop-blur-sm "
            : "bg-white text-primary"
        } transition-all ease-in-out`}
      >
        {/* Logo */}
        <div className="flex flex-col  md:w-[50%]">
          <div className="md:flex md:items-center md:justify-start flex   justify-center items-center   w-full  ">
            <Image
              onClick={() => (window.location.href = "/")}
              src={logo || AppAssets.logo}
              alt="logo"
              width={150}
              height={200}
              className="object-contain h-14 md:h-24 hover:cursor-pointer   md-w-full w-20"
              title="Royal Defence Academy"
            />
            <span
              className={`   w-full ${
                isScrolled ? "text-white" : ""
              } text-gray-900 hover:text-primary text-[25px] font-rowdies  transition-all duration-300 md:font-bold 2xl:text-6xl xl:text-3xl lg:text-4xl `}
            >
              Royal Defence Academy
            </span>
          </div>
          <div className="flex md:hidden     justify-center gap-3  my-2 pl-10 w-full  mx-auto    ">
            <a
              href="tel:6377871603"
              className={`flex items-center justify-center px-8 hover:text-gray-400 transition-colors   2xl:text-3xl     font-bold rounded-md md:p-2 border-4 border-red-700 animate-pulse ${
                isScrolled ? "bg-red-600 text-white" : "bg-white text-red-600"
              }`}
            >
              <FaPhoneAlt className="mr-2" />
              Call Us
            </a>
            <a
              href="https://wa.me/+918619453001?text=Hey%20Royal%20Defence%20Academy%2C%20I%20want%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center  px-4  hover:text-gray-400 transition-colors  md:text-3xl   font-bold rounded-md md:p-2 border-4 border-green-700 animate-pulse    ${
                isScrolled
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600"
              }`}
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex justify-end  md:hidden text-white pr-2 mt-5  ">
          <BiMenu
            className={`h-5 w-5 ${!show ? "block" : "hidden"} ${
              isScrolled ? "text-white" : "text-primary"
            }`}
            onClick={() => setShow(true)}
          />
          <CgClose
            className={`h-5 w-5 ${show ? "block" : "hidden"} text-primary  ${
              isScrolled ? "text-white" : "text-primary"
            }`}
            onClick={() => setShow(false)}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="md:flex hidden  2xl:gap-9 gap-3 md:justify-between  md:py-0 pt-3  md:ml-0 ">
          {/* <a 
            href="mailto:info@example.com"
            className="flex items-center hover:text-gray-400 transition-colors"
          >
            <FaEnvelope className="mr-2" />
            Email Us6377871603
          </a> */}
          <a
            href="tel:6377871603"
            className={`flex items-center justify-center w-28 2xl:w-36   hover:text-gray-400 transition-colors  2xl:text-2xl text-lg  font-bold rounded-md md:px-1 border-4 border-red-700 animate-pulse    ${
              isScrolled ? "bg-red-600 text-white" : "bg-white text-red-600"
            }`}
          >
            <FaPhoneAlt className="mr-2" />
            Call Us
          </a>
          <a
            href="https://wa.me/+918619453001?text=Hey%20Royal%20Defence%20Academy%2C%20I%20want%20more%20information."
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center hover:text-gray-400 transition-colors  2xl:text-2xl   font-bold rounded-md md:p-2 border-4 border-green-700 animate-pulse    ${
              isScrolled ? "bg-green-600 text-white" : "bg-white text-green-600"
            }`}
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </a>
        </div>

        <nav className="hidden md:flex md:items-center md:justify-end   2xl:px-10">
          {navItems.map((item: any, index: any) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setShowDropdown(index)}
              onMouseLeave={() => item.hasDropdown && setShowDropdown(null)}
            >
              <a
                href={item?.href}
                className={`py-1 mr-1  2xl:px-3   text-[1.4rem] rounded-t-md px-1 border-primary  hover:border-1 transition-all ease-linear hover:bg-primary hover:text-white ${
                  item.hasDropdown
                    ? "border-transparent"
                    : "hover:border-primary"
                } hover:cursor-pointer   font-medium   transition-all duration-200 ${
                  isScrolled
                    ? "text-white hover:text-amber-400"
                    : "text-primary hover:text-blue-600"
                }
                ${showDropdown === index ? "border-primary" : ""}
                `}
              >
                {item.title.replaceAll(/(?:\{location\}|\{Location\})/g, "")}
              </a>

              {/* Dropdown */}
              {item.hasDropdown && showDropdown === index && (
                <div
                  className={`absolute top-full  left-0 w-96 bg-white  shadow-lg border-t-2 border-primary z-50 rounded-b-md transition-all duration-300`}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/${subItem?.slug_field}`}
                      className={`block px-4 pb-3 capitalize  text-primary tracking-tight pt-2  hover:cursor-pointer font-semibold hover:bg-primary hover:text-white transition-all ease-linear text-gray-70 ${
                        isScrolled ? "text-white" : ""
                      }0 `}
                    >
                      {subItem.title.replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        ""
                      )}
                      <hr />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Dropdown */}
        <nav
          className={`absolute top-14 left-0 w-full bg-white px-2 py-1 transition-transform duration-300 ease-in-out md:hidden ${
            show ? "translate-x-0 " : "-translate-x-[100%]  w-0"
          }`}
        >
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group  "
              onMouseEnter={() => setShowDropdown(index)}
              onMouseLeave={() => setShowDropdown(null)}
            >
              <a
                href={item?.href}
                className="text-primary border-b block px-5 py-1 text-lg font-semibold hover:text-blue-600 transition-all duration-200"
              >
                {item.title}
              </a>

              {/* Dropdown */}
              {item.hasDropdown && showDropdown === index && (
                <div className="absolute z-[9999] left-0 mt-2 w-64   text-gray-800 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/${subItem?.slug_field}`}
                      className="block px-5 py-3 capitalize   text-sm font-medium hover:bg-blue-500 hover:text-white rounded-md transition-all duration-200"
                    >
                      {subItem.title.replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        ""
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Placeholder for Right Side Content */}

        {/* Animation for Dropdowns */}

        {/* {
          <Popup showSidebar={showFlyOut} setShowSidebar={setShowFlyOut}>
            <div className="h-full w-full">
              <EnquiryForm
                list={list}
                setList={setList}
                setShowFlyOut={setShowFlyOut}
              />
            </div>
          </Popup>
        } */}
      </div>
    </header>
  );
}
