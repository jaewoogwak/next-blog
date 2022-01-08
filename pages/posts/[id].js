import { useRouter } from "next/router";

export default function post() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      post detail
      {router.query.id}
    </div>
  );
}
