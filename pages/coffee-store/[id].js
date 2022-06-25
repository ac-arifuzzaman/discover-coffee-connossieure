import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;
  return <><div>CoffeeStore {id}</div>
  <Link href="/">Go Home</Link>
  </>
};

export default CoffeeStore;
