import Header from "@/components/Header";
import Head from "next/head";
import Login from "@/components/Login";
import { getSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed"; 
import Widgets from "@/components/Widgets";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/firebase"; // Ensure firebaseApp is initialized

export default function Home({ session, posts }) {
  // if (!session) return <Login />;

  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      {/* Header */}
      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed posts={posts}/>
        {/* Widgets */}
        <Widgets />   
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user session
  const session = await getSession(context);

  // Initialize Firestore
  const db = getFirestore(firebaseApp);

  // Fetch posts
  const postQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const postSnap = await getDocs(postQuery);

  const posts = postSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: null,
  }));

  return {
    props: { session, posts },
  };
}
