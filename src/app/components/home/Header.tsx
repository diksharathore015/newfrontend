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
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    store.dispatch(setHomepageTitle(seodata.title));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    { title: "Contact Us", hasDropdown: false, href: "/contactus" },
    { title: "About Us", hasDropdown: false, href: "/aboutus" },
  ];

  const [show, setShow] = useState(false);
  const logo = useAppSelector((state) => state.HomepageReducer.seoData.logo);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "  bg-blue-700 text-white  shadow-lg"
          : "bg-blue-800 text-white "
      }`}
    >
      <div className="flex items-center justify-between px-4 pt-3 md:px-8 md:py-4">
        {/* Logo Section */}
        <div className="flex items-start gap-4">
          <Image
            onClick={() => router.push("/")}
            src={logo || AppAssets.logo}
            alt="Royal Defence Academy Logo"
            width={65}
            height={65}
            className="cursor-pointer object-contain -mt-2"
          />
          <h1 className="text-lg font-bold uppercase font-Tinos tracking-wide md:text-2xl">
            Royal Defence Academy
            <span
              style={{ lineHeight: "14px" }}
              className=" text-[10px] md:text-sm py-2 animate-pulse text-white   font-normal capitalize md:block hidden tracking-tight"
            >
              Best Boarding School Coaching for Boys and Girls: AISSEE, Sainik
              School, Military School, RIMC, and RMS 2025.
            </span>
          </h1>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex items-center md:hidden">
          <BiMenu
            className={`h-6 w-6 cursor-pointer ${show ? "hidden" : "block"}`}
            onClick={() => setShow(true)}
          />
          <CgClose
            className={`h-6 w-6 cursor-pointer ${show ? "block" : "hidden"}`}
            onClick={() => setShow(false)}
          />
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setShowDropdown(index)}
              onMouseLeave={() => item.hasDropdown && setShowDropdown(null)}
            >
              <a
                href={item.href}
                className="text-base font-medium hover:underline  transition-colors"
              >
                {item.title.replaceAll(/\{location\}/gi, "india")}
              </a>

              {item.hasDropdown && showDropdown === index && (
                <div className="absolute left-0 top-full -mt-1 w-96 bg-white   ">
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/${subItem?.slug_field}`}
                      className="block px-4 py-2 text-sm border-b  text-blue-800 font-poppins hover:bg-blue-800 hover:text-white transition"
                    >
                      {subItem.title.replaceAll(
                        /{(location|Location)}/g,
                        "india"
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Call to Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:6377871603"
            className="flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-md transition-transform transform hover:scale-105"
          >
            <FaPhoneAlt className="mr-2 text-lg" /> Call Us
          </a>
          <a
            href="https://wa.me/+918619453001?text=Hey%20Royal%20Defence%20Academy%2C%20I%20want%20more%20information."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-md transition-transform transform hover:scale-105"
          >
            <FaWhatsapp className="mr-2 text-lg" /> WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-transparent   fixed shadow-lg transition-transform duration-300 ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col px-4 py-3 border-t   bg-white">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a
                href={item.href}
                className="block py-2 text-blue-800 font-medium border-b hover:text-blue-500"
              >
                {item.title.replaceAll(/{(location|Location)}/g, "india")}
              </a>

              {item.hasDropdown && (
                <div className="pl-4 ">
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={`/${subItem?.slug_field}`}
                      className="block py-1 text-sm border-b text-blue-800 hover:text-blue-500"
                    >
                      {subItem.title.replaceAll(
                        /{(location|Location)}/g,
                        "india"
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
