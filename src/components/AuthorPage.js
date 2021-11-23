import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import DefaultLayout from "./layouts/DefaultLayout.js";
import '../styles/style.scss';
import { NavLink } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AuthorPage() {
  const [authorData, setAuthorData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="author" && name==$name]{
          name,
          bio,
          image{
          asset->{
            _id,
            url
            }
          }
        }`,
        { name }
      )
      .then((data) => setAuthorData(data[0]))
      .catch(console.error);
  }, [name]); 

  if(!authorData) return <div> </div>

  return (
    <DefaultLayout>
      <div className="author-page">
        <h2> {authorData.name} </h2>
        <img className="photo"
          src={urlFor(authorData.image).width(500).url()}
          alt={"image of" + authorData.name}
        />
        <BlockContent
          className="author-bio"
          blocks={authorData.bio}
          projectId={sanityClient.config().projectId}
          dataset={sanityClient.config().dataset}
        />
      </div>
      <div className="nav-bar">
            <NavLink to='/about' className="navlink">
                    <h2>Tillbaka</h2>
            </NavLink>
        </div> 
    </DefaultLayout>
  );
}