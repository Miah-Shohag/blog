import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import BlogCard from "./BlogCard"; // Reusable card component

import avatar from "../../assets/avatar.jpg";
import postImage from "../../assets/demo.jpg";
const leftPost = {
  id: 0,
  image: "/assets/demo.jpg",
  avatar: "/assets/avatar.jpg",
  author: "Editor Pick",
  date: "July 4, 2025",
  title: "The Ultimate React Trends in 2025",
  excerpt:
    "Explore the next-gen trends in React development and how they’ll shape modern web applications.",
  category: "Featured",
  link: "/blog/react-trends-2025",
};

const sliderPosts = [
  {
    id: 1,
    image: "/assets/demo.jpg",
    avatar: { postImage },
    author: "Sarah Ali",
    date: "July 1, 2025",
    title: "Create a Stunning Portfolio with Tailwind CSS",
    excerpt: "A beginner-friendly guide to building stylish websites.",
    category: "Tailwind",
    link: "/blog/tailwind-portfolio",
  },
  {
    id: 2,
    image: "/assets/demo.jpg",
    avatar: { postImage },
    author: "Alex Khan",
    date: "June 28, 2025",
    title: "State Management in React: Which to Choose?",
    excerpt: "Redux, Context, Zustand or Jotai — what’s best for your project?",
    category: "React",
    link: "/blog/state-management",
  },
  {
    id: 3,
    image: "/assets/demo.jpg",
    avatar: { postImage },
    author: "Shohag Miah",
    date: "June 20, 2025",
    title: "JavaScript Features You Should Know in 2025",
    excerpt: "Stay updated with the latest ECMAScript features.",
    category: "JavaScript",
    link: "/blog/js-features-2025",
  },
];

const FeaturedSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
        Featured Posts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Static Featured Post */}
        <div data-aos="fade-right">
          <BlogCard
            id={leftPost.id}
            image={postImage}
            avatar={leftPost.avatar}
            author={leftPost.author}
            date={leftPost.date}
            title={leftPost.title}
            excerpt={leftPost.excerpt}
            category={leftPost.category}
            link={leftPost.link}
          />
        </div>

        {/* Right Column: Responsive Fade Slider */}
        <div className="">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
            }}
            effect="fade"
            slidesPerView={2}
            loop={true}
            breakpoints={{
              0: {
                effect: "slide",
                spaceBetween: 10,
              },
              1024: {
                effect: "fade",
                spaceBetween: 20,
              },
            }}
          >
            {sliderPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard
                  id={post.id}
                  image={postImage}
                  avatar={post.avatar}
                  author={post.author}
                  date={post.date}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  link={post.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
