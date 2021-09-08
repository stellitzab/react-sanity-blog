import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import DefaultLayout from "./layouts/DefaultLayout.js";
import '../styles/style.scss';



const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Post() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(postData.publishedAt).toLocaleDateString("sv-SE", options);


  return (
    <DefaultLayout>
        <div className="blog-post">
            <h2>{postData.title}</h2>
            <p className="date">{date}</p>
            <div className="content">
                <img src={urlFor(postData.mainImage).url()} alt="" />
                <BlockContent
                blocks={postData.body}
                projectId={sanityClient.clientConfig.projectId}
                dataset={sanityClient.clientConfig.dataset}
                />
            </div>
            <div className="author-footer">
                <div className="author-holder">
                <img className="photo"
                    src={urlFor(postData.authorImage).width(100).url()}
                    alt="Author is Kap"
                />
                <h4>{postData.name}</h4>
                </div>
            </div>
        </div>
    </DefaultLayout>
  );
}