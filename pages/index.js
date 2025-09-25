import Head from "next/head";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>SSR Blog Listing</title>
        <meta name="description" content="Latest blog posts rendered with SSR" />
        <meta name="keywords" content="blog, next.js, SSR, SEO" />
      </Head>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Latest Blog Posts</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

// Fetch posts at request time (SSR)
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: { posts: posts.slice(0, 10) }, // only first 10
  };
}
