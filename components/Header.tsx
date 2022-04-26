import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Blogs", href: "/blogs", current: false },
  { name: "Products", href: "/products", current: false },
];

const Header: React.FC = () => {
  const { data:session, status } = useSession();
  console.log(session)
  const loading = status === "loading";

  return (
    <header className="bg-gray-700 py-4 px-6 text-white flex justify-between">
      <ul className="flex gap-3">
        {navigation.map((nav, index) => {
          return (
            <li key={index}>
              <Link href={nav.href}>
                <a>{nav.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className={`flex gap-3 ${!session && loading ? 'opacity-0 transition-opacity':'opacity-100 transition-opacity'}`}>
        {!loading && !session && (
          <li>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                   signIn("github") //For Direct Signin without NextAuth SignIn page
                  // signIn();
                }}
              >
                SignIn
              </a>
            </Link>
          </li>
        )}
        {session?.user && (
          <li>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                SignOut
              </a>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
