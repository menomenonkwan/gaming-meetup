import Head from 'next/head'
import { MongoClient } from 'mongodb';

import TypeList from '../components/meetups/TypeList';

export async function getStaticProps() {
  // fetch data

  const mongoDb = process.env.DB_CONNECTION_STRING;
  const client = await MongoClient.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true});
  const db = client.db();

  const meetupsCollection = db.collection('categories');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        name: meetup.name,
        image: meetup.image,
        url: meetup.url,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }

}

export default function Home({ meetups }) {
  return (
    <>
      <Head>
        <title>Gaming Meetups</title>
        <meta name="description" content="Gaming meetups for people who like games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <TypeList meetup_type={meetups} />     
    </>
  )
}
