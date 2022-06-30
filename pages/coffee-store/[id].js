import cls from "classname";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStorsData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";

// export function getStaticProps({ params }) {
export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      CoffeeStore: coffeeStorsData.find((CoffeeStore) => {
        return CoffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStorsData.map((coffeeStor) => {
    return {
      params: {
        id: coffeeStor.id.toString(),
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
  const { name, address, imgUrl, neighbourhood } = props.CoffeeStore;
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
            src={imgUrl}
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
            <p>{address}</p>
          </div>
          <div className="styles iconWrapper">
            <Image
              src="/Static/nearme.svg"
              width="24"
              height="24"
              alt="locationIcon"
            />
            <p>{neighbourhood}</p>
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
