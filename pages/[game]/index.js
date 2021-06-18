import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import MeetupCard from '../../components/meetups/MeetupCard';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 25px;
  max-width: var(--maxWidth);
  margin: auto;
  padding-bottom: 10rem;
`;

const TitleStyles = styled.h1`
  margin: auto;
  text-align: center;
  font-size: 3rem;
  padding: 4rem;
`;

export async function getStaticPaths() {
  const mongoDb = process.env.DB_CONNECTION_STRING;
  const client = await MongoClient.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true});
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { game: 1 }).toArray();

  const removal = (meetups) => {
    const flag = {};
    const unique = [];
    meetups.forEach(elem => {
      if(!flag[elem.game]) {
        flag[elem.game] = true;
        unique.push(elem.game);
      }
    })
    return unique;
  }
  
  const unique = removal(meetups);

  client.close();
  
  return {
    fallback: true,
    paths: unique.map(meetup => ({ params: { game: meetup }}))
  }
}

export async function getStaticProps(context) {
  const game = context.params.game;
  console.log(game);

  const mongoDb = process.env.DB_CONNECTION_STRING;
  const client = await MongoClient.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true});
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { game: game }).toArray();
  const filteredMeetups = meetups.filter(meetup => meetup.game === game);
  
  if (!filteredMeetups) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  client.close();

  return {
    props: {
      meetups: filteredMeetups.map(meetup => ({
        title: meetup.title,
        game: meetup.game,
        image: meetup.image,
        address: meetup.address,
        date: meetup.date,
        time: meetup.time,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
  }
}



export default function GameTypeHome({meetups}) {
  const router = useRouter();

  const game = router.query.game;
  const typeTitle = game ? game.split('-').join(' ').toUpperCase() : '';

  return (
    <>
      <Head>
        <title>{typeTitle}</title>
        <meta name="description" content={`See what type of ${typeTitle} meetups we have listed and join in on the fun`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>    
      <TitleStyles>{typeTitle}</TitleStyles>
      <GridStyles>
        {meetups.sort(function(a,b){ 
          return new Date(a.date) - new Date(b.date); 
        }).map(meetup => 
          {if(meetup.game === game) {
            return (
              <MeetupCard 
                key={meetup.id} 
                url={game} 
                meetup={meetup} 
              />
            )
          }}
        )}     
      </GridStyles>
    </>
  )
}
