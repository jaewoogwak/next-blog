import Link from "next/link";

export default function LoginView() {
  return (
    <div>
      <Link href="/login">
        <a>Go Sign In</a>
      </Link>
    </div>
  );
}
