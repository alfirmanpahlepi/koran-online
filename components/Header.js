import Link from "next/link";
import {
  BookmarkIcon,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./icon";

export default function Header({ navs }) {
  return (
    <>
      <header className="bg-black text-white">
        <div className=" flex py-4 mx-auto w-11/12">
          <div className="flex items-center flex-1 space-x-3">
            {socialMedias.map((e, i) => (
              <a
                key={i}
                href="#"
                className={`${e.color} rounded-full bg-gray-800 h-10 w-10 flex items-center justify-center duration-150`}
              >
                {e.icon}
              </a>
            ))}
          </div>
          <Link href="/">
            <a className="flex-[3] text-5xl text-green-400 text-center oswald font-extrabold uppercase">
              koran online
            </a>
          </Link>
          <div className="flex-1 flex items-center justify-end space-x-2">
            <BookmarkIcon />
            <Link href="/saved">
              <a className="h-[22px] w-[22px] text-[10px] font-semibold grid place-items-center bg-gray-700 hover:bg-green-400 duration-300 rounded-full">
                10
              </a>
            </Link>
          </div>
        </div>
      </header>
      <nav className="bg-white sticky top-0 z-50 shadow-lg">
        <div className="w-11/12 mx-auto flex items-center">
          <div className="flex-1 h-full flex items-center">
            <MenuIcon />
          </div>
          <ul className="flex-[3] flex items-center justify-center space-x-6">
            {navs.map((nav, i) => (
              <li key={i}>
                <Link href={nav.link}>
                  <a className="uppercase pt-3 pb-1 block text-gray-600 border-b-4 border-transparent hover:border-green-300 oswald">
                    {nav.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 h-full flex items-center justify-end">
            <div className="inline-block relative">
              <input
                placeholder="search"
                className="border rounded-xl px-3 w-40"
              />
              <div className="absolute right-2 top-0 h-full flex items-center">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

const socialMedias = [
  {
    name: "facebook",
    icon: <FacebookIcon />,
    color: "hover:bg-[#3b5998]",
  },
  {
    name: "twitter",
    icon: <TwitterIcon />,
    color: "hover:bg-[#00acee]",
  },
  {
    name: "instagram",
    icon: <InstagramIcon />,
    color: "instagram-color",
  },
  {
    name: "youtube",
    icon: <YoutubeIcon />,
    color: "hover:bg-[#FF0000]",
  },
];
