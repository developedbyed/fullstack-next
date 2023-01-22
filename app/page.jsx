import Post from "./Post"
import AddPost from "./AddPost"

export default async function Home() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/getPosts`, {
    next: { revalidate: 0 },
  })
  const data = await res.json()
  return (
    <div>
      <AddPost />
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
          likes={post.likes}
        />
      ))}
    </div>
  )
}
