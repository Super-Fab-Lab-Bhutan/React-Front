import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Resource.module.css";

import file from "../../public/assets/icons/file.jpg";

export default function CardContent({ Data }) {
  return (
    <div className={styles.card2}>
      <Image src={file} width={80} height={80} alt="file logo" />
      <p className="title2">{Data.equipmentName}</p>
      <p>{Data.description}</p>
      <Link href="/" passHref>
        <button className="button2">Read more</button>
      </Link>
    </div>
  );
}
