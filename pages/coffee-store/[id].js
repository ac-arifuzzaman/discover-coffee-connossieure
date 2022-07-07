import cls from "classname";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import FetchCoffeeStore from "../../lib/coffee-stores";
import styles from "../../styles/coffee-store.module.css";

// export function getStaticProps({ params }) {
export async function getStaticProps(staticProps) {
  const coffeeStores = await FetchCoffeeStore();
  const params = staticProps.params;
  return {
    props: {
      CoffeeStore: coffeeStores.find((CoffeeStore) => {
        return CoffeeStore.fsq_id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await FetchCoffeeStore();
  const paths = coffeeStores.map((coffeeStor) => {
    return {
      params: {
        id: coffeeStor.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id } = router.query;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, location, imgUrl, cross_street, timezone } = props.CoffeeStore;
  const handleUpvoteButton = () => {
    console.log("handle upvote button");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.homeLink}>
            <Link href="/">
              <a>Go Home</a>
            </Link>
          </div>
          {/* <Image
        src={props.CoffeeStore.imgUrl}
        alt="coffeeStore"
        width="900"
        height="700"
      />
      <p>{props.CoffeeStore.name}</p>
      <p>{props.CoffeeStore.address}</p>
      <p>{props.CoffeeStore.neighbourhood}</p> */}
          <div className={styles.nameWraper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1469631423273-6995642a6a40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1203&q=80"
            }
            alt={name}
            width="600"
            height="360"
            className={styles.storeImage}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className="styles iconWrapper">
            <Image
              src="/Static/locatin.svg"
              width="24"
              height="24"
              alt="locationIcon"
            />
            <p>{timezone}</p>
          </div>
          <div className="styles iconWrapper">
            <Image
              src="/Static/nearme.svg"
              width="24"
              height="24"
              alt="locationIcon"
            />
            <p>{location.address}</p>
          </div>
          <div className="styles iconWrapper">
            <Image
              src="/Static/star.svg"
              width="24"
              height="24"
              alt="locationIcon"
            />
            <p>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
