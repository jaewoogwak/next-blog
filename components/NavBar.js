import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const route = useRouter();
  return (
    <nav>
      <h2>jaewoogwak.log</h2>
      <div>
        <Link href={`/`}>
          <a>Home</a>
        </Link>
        <Link href={`/about`}>
          <a>About</a>
        </Link>
        <Link href={`/posts`}>
          <a>Post</a>
        </Link>
      </div>

      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 5px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }

        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav h2 {
          padding-left: 20px;
        }
        nav div {
          display: flex;
          gap: 30px;
          padding-right: 50px;
          align-items: center;
        }
      `}</style>
    </nav>
  );
}
