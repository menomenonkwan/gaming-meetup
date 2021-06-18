import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import DetailMeetup from '../../../components/meetups/DetailMeetup';

export async function getStaticPaths() {
  // const mongoDb = process.env.DB_CONNECTION_STRING;
  const client = await MongoClient.connect('mongodb+srv://brannon:LiEDes9282PbJ0kN@cluster0.yzd7e.mongodb.net/meetup?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true});
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  
  return {
    paths: meetups.map(meetup => ({ params: { game: meetup.game, id: meetup._id.toString() },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const game = context.params.game;
  const id = context.params.id;

  // const mongoDb = process.env.DB_CONNECTION_STRING;
  const client = await MongoClient.connect('mongodb+srv://brannon:LiEDes9282PbJ0kN@cluster0.yzd7e.mongodb.net/meetup?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true});
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ 
    _id: ObjectId(id) 
  });

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        game: selectedMeetup.game,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        date: selectedMeetup.date,
        time: selectedMeetup.time,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  }
}


export default function MeetupDetail({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailMeetup meetup={meetupData} key={meetupData.id}/>
    </>
  )
}
