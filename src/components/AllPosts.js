import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import DefaultLayout from "./layouts/DefaultLayout.js";
import '../styles/style.scss'
import imageUrlBuilder from "@sanity/image-url";
import NavBar from "./NavBar.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
        "name": author->name,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  function formatDate(computerDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(computerDate).toLocaleDateString("sv-SE", options);
    
    return date;
  }

  return (
    <DefaultLayout>
      <div className="post-grid">
        <div className="post-grid-child-container">
        {allPostsData &&
          allPostsData.map((post, index) => (
            <div className="blog-post-card">
            <Link to={"/" + post.slug.current} key={post.slug.current}>
              <span key={index}>
                <img src={urlFor(post.mainImage.asset).width(500).url()} alt="" />
                <span>
                  <h2>{post.title}</h2>
                  <span className="date">{formatDate(post.publishedAt)}</span>
                  <br />
                  <span className="author">{post.name}</span>

                </span>
              </span>
            </Link>
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </DefaultLayout>
  );
}