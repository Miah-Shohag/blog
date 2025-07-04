import React from "react";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import demoImage from "../../assets/demo.jpg";
import { FiFacebook, FiShare, FiShare2, FiTwitter } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import BlogCard from "./BlogCard";

import postImage from "../../assets/demo.jpg";
import RelatedPost from "./RelatedPost";
const relatedPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    link: "/blog/react-hooks",
  },
  {
    id: 2,
    title: "Building a Blog with Tailwind CSS",
    link: "/blog/tailwind-blog",
  },
  {
    id: 3,
    title: "JavaScript Tips & Tricks for 2025",
    link: "/blog/js-tips",
  },
];

const comments = [
  {
    name: "shohag",
    message:
      "I really found a cool showcase post that hightlighted great commment section designs and always remember ten deadly sins of web design",
    image: { avatar },
  },
  {
    name: "shohag",
    message:
      "I really found a cool showcase post that hightlighted great commment section designs and always remember ten deadly sins of web design",
    image: { avatar },
  },
];
const SingleBlog = () => {
  const { slug } = useParams();

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        <img
          src={demoImage}
          alt="Blog Cover"
          className="w-full h-80 object-cover"
        />

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatar}
              alt="Author"
              className="w-14 h-14 rounded-full object-cover border-4 border-secondary"
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Shohag Miah
              </h4>
              <p className="text-xs text-gray-500">March 20, 2025</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Master React in 30 Days: The Ultimate Roadmap
          </h1>

          <div className="prose dark:prose-invert max-w-none mb-10 text-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
              expedita odit praesentium atque vel rem est, eveniet officiis,
              provident laborum, fugit quae nesciunt hic ad nostrum eos.
              Voluptate, doloribus recusandae!
            </p>
            <p>
              Nulla corrupti molestias explicabo unde voluptatem perferendis,
              veniam consequatur dolor repellat consectetur magni ipsa. Sint
              libero dolorem porro? Reiciendis, obcaecati. Temporibus mollitia
              architecto odio voluptate incidunt explicabo fugiat deserunt.
            </p>
            <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 dark:text-gray-300">
              “Success with React doesn’t come from shortcuts. It comes from
              consistency, curiosity, and community.”
            </blockquote>
            <p>
              Sapiente assumenda placeat delectus ea debitis labore nesciunt
              ratione eveniet pariatur obcaecati error! Temporibus, unde iure
              fuga autem hic quidem. Ducimus quisquam odio saepe.
            </p>
          </div>

          {/* Share Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Share this post:
            </h3>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-blue-600 hover:underline text-base font-medium"
              >
                <FiFacebook />
              </a>
              <a
                href="#"
                className="text-sky-500 hover:underline text-base font-medium"
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="text-rose-500 hover:underline text-base font-medium"
              >
                <FaPinterest />
              </a>
              <a
                href="#"
                className="text-rose-500 hover:underline text-base font-medium"
              >
                <FiShare2 />
              </a>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
              Leave a Comment
            </h3>
            <form className="grid gap-4">
              <textarea
                rows="5"
                placeholder="Write your comment..."
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              ></textarea>
              <button
                type="submit"
                className="bg-secondary w-fit text-xs font-medium text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition"
              >
                Submit Comment
              </button>
            </form>
          </div>

          {/* Display Comments */}
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              {comments.length > 0 && (
                <div className="mt-10 w-fit">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Comments
                  </h4>
                  <ul className="space-y-4 w-fit">
                    {comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col gap-3"
                      >
                        <div className="flex gap-5">
                          <div className="w-15 h-10 border-2 border-secondary rounded-full">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={avatar}
                              alt=""
                            />
                          </div>
                          <div className="">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                              {comment.name}
                            </p>
                            <span className="text-xs">
                              Fri 20 2025 <strong>at</strong> 10:15 PM{" "}
                            </span>

                            <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                              {comment.message}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
              Related Posts
            </h3>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-4">
                <RelatedPost
                  image={postImage}
                  avatar={avatar}
                  author="Alex Khan"
                  date="June 28, 2025"
                  title="State Management in React: Which to Choose?"
                  excerpt="Redux, Context, Zustand or Jotai — what’s best for your project?"
                  category="React"
                  link="/blog/state-management"
                />
              </div>
              <div className="col-span-4">
                <RelatedPost
                  image={postImage}
                  avatar={avatar}
                  author="Alex Khan"
                  date="June 28, 2025"
                  title="State Management in React: Which to Choose?"
                  excerpt="Redux, Context, Zustand or Jotai — what’s best for your project?"
                  category="React"
                  link="/blog/state-management"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SingleBlog;
