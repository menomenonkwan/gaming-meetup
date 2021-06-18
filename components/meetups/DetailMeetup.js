import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from '../styles/DetailMeetup.module.css';

export default function DetailMeetup({ meetup }) {
  const router = useRouter();

  const game = router.query.game;

  const formattedDate = format(parseISO(`${meetup.date}T${meetup.time}`), 'EEEE MMMM do, yyyy @ p');

  return (
    <div className={styles.description}>
      <img
        src={meetup.image}
        alt={meetup.title}
        className={styles.image}      
      />
      <h1>{meetup.title}</h1>
      <h2>{formattedDate}</h2>
      <address>{meetup.address}</address>
      <p>{meetup.description}</p>
      <div className={styles.return}>
        <Link href={`/${game}`}>Go Back</Link>
      </div>
    </div>
  )
}
