import React from "react";
import BlogCard from "../../components/client/BlogCard";
import avatar from "../../assets/avatar.jpg";
import postImage from "../../assets/demo.jpg";
import FeaturedSlider from "../../components/client/FeaturedPostSlider ";

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className=" col-span-12 lg:col-span-8">
        <div className="grid grid-cols-2 gap-5">
          <BlogCard
            image={postImage}
            avatar={avatar}
            author="Alex Khan"
            date="June 28, 2025"
            title="State Management in React: Which to Choose?"
            excerpt="Redux, Context, Zustand or Jotai — what’s best for your project?"
            category="React"
            link="/blog/state-management"
          />
          <BlogCard
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
      <div className="col-span-12 lg:col-span-4">Right</div>
    </div>
  );
};

export default Home;
