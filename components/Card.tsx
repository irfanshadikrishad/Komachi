import Link from "next/link";
import styles from "@/styles/search.module.css";
// Icons
import { FaClosedCaptioning } from "react-icons/fa6";
import { BiSolidMicrophone } from "react-icons/bi";

export default function Card({
  id,
  image,
  title,
  subCount,
  dubCount,
  totalCount,
  isAdult,
  lastEpisode,
}: {
  id: string;
  image: string;
  title: string;
  subCount: string | number;
  dubCount: string | number;
  totalCount: string | number;
  isAdult: string;
  lastEpisode?: number;
}) {
  return (
    <Link
      href={lastEpisode ? `/watch/${id}?eps=${lastEpisode}` : `/watch/${id}`}
      className={styles.billboard_Individual}
      title={`${title}`}
    >
      <img
        src={image}
        alt={image}
        className={styles.billboard_Poster}
        draggable={false}
      />
      <p className={styles.billboard_Title}>{title}</p>

      <div className={styles.tags}>
        <p className={styles.tag}>
          <FaClosedCaptioning />
          {subCount}
        </p>
        {Number(dubCount) > 0 && (
          <p className={styles.tag}>
            <BiSolidMicrophone />
            {dubCount}
          </p>
        )}
        <p className={styles.tag}>
          {totalCount < subCount ? subCount : totalCount}
        </p>
        {isAdult === "true" && (
          <p className={`${styles.tag} ${styles.adult}`}>18+</p>
        )}
      </div>
    </Link>
  );
}
