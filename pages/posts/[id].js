import Link from "next/link";
import { useRouter } from "next/router";

export default function post() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <Link href={`/`}>
        <a>Back to Home</a>
      </Link>
      <div>
        post detail
        {router.query.id}
      </div>
    </div>
  );
}
