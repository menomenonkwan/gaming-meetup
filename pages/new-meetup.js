import { useRouter } from "next/router";
import Head from 'next/head';
import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    router.replace('/')
  }

  return (
    <>
      <Head>
        <title>Add A Gamming Meetup</title>
        <meta name="description" content="Add a new gaming meetup, make new friends, and have a lot of fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}
