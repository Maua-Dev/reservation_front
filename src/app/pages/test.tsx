import { useState } from 'react'
import {
  useCreatePostMutation,
  usePostsQuery
  // useUsersQuery
} from '../hooks/use-booking'
import { BiLoaderAlt } from 'react-icons/bi'

export function Test() {
  // const { data: users, isLoading: usersIsLoading } = useUsersQuery()
  const [postId, setPostId] = useState<number>(1)
  const { data: posts, isLoading, refetch } = usePostsQuery()
  const { mutateAsync: createPost } = useCreatePostMutation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <BiLoaderAlt className="animate-spin text-2xl" size={64} />
      </div>
    )
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-3 flex-col items-center justify-center py-32">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
      <button onClick={() => setPostId(postId + 1)} className="text-9xl">
        +
      </button>
      <button
        onClick={async () => {
          try {
            await createPost({
              userId: 1,
              title: 'New Post',
              body: 'This is a new post'
            })
            refetch()
          } catch (e) {
            console.log(e)
          }
        }}
        className="text-9xl"
      >
        Criar post
      </button>
    </div>
  )
}
