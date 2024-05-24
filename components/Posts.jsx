import React from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

export default function Posts({ posts }) {
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const [realtimePosts] = useCollection(q);

  return (
    <div>
      {realtimePosts && realtimePosts.docs.length > 0
        ? realtimePosts.docs.map((post) => (
          <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
          />
        ))
        : posts && posts.length > 0
          ? posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))
          : <p>No posts available</p>
      }
    </div>
  );
}
