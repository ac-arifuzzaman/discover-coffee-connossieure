import cls from "classname";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.bg}>
      <Link href={props.href} className={styles.bg}>
        <a className={styles.cardLink}>
          <div className={cls("glass", styles.container)}>
            <div className={styles.cardHeaderWraper}>
              <h2 className={styles.cardHeader}>{props.name}</h2>
            </div>
            <div className={styles.cardImageWraper}>
              <Image
                className={styles.cardImage}
                src={props.imgUrl}
                width={260}
                height={160}
                alt="cofee-store"
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
