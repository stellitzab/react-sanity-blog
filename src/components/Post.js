import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
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

  /*
  function checkData() {
    if (!postData) {
      setTimeout(checkData, 5000)
    }
    else {
      return
    }
  }

  checkData() */

  if(!postData) return <div> </div>

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(postData.publishedAt).toLocaleDateString("sv-SE", options);


  return (
    <DefaultLayout>
        <div className="blog-post">
            <h2>{postData.title}</h2>
            <p className="date">{date}</p>
                <BlockContent 
                className="content"
                blocks={postData.body}
                projectId={sanityClient.config().projectId}
                dataset={sanityClient.config().dataset}
                />
            <div className="author-footer">
              <NavLink to={'/author/' + postData.name} style={{textDecoration: "none"}} className="navlink">
                <div className="author-holder">
                <img className="photo"
                    src={urlFor(postData.authorImage).size(200, 200).url()}
                    alt={"image of" + postData.name}
                />
                <h4>{postData.name}</h4>
                </div>
              </NavLink>
            </div>
        </div>
    </DefaultLayout>
  );
}