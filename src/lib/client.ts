import {createClient} from 'next-sanity';

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset : process.env.SANITY_DATASET || 'production',
    // useCdn: process.env.NODE_ENV === 'production' ? true : false,
    useCdn: false,
    apiVersion : '2024-04-12',
    // token : process.env.SANITY_SECRET_TOKEN
});



//get all posts
export async function getData(){
    const query = 
    `
    *[_type == 'post'] | order(publishedAt desc)
    {
      _id,
      title,
      shortDescription,
      "slug":slug.current,
       'imageUrl':featureImage.asset->url,
      'altFtImg': featureImage.alt,
         publishedAt,
        'body': pt::text(body),
        'author' : *[_type == 'author' && _id== ^.author._ref][0]{
        _id,
          name,
          'slug' : slug.current,
        },
      categories[]->{
        _id,
        name,
        slug
      },
               'content' : body
        
    }
    `
    const data = await client.fetch(query);
    

    // console.log("Fetching posts from Sanity...");
    // console.log("Fetched posts:", data);
  return data;
  }

  // get posts with destinations
  // getData.ts


export const getPlacesData = async () => {
  const query = 
    `
    *[_type == 'post' && 
    "Places" in categories[]->name
    ] | order(publishedAt desc)
     {
      _id,
      title,
      shortDescription,
      "slug":slug.current,
       'imageUrl':featureImage.asset->url,
      'altFtImg': featureImage.alt,
         publishedAt,
        'body': pt::text(body),
        'author' : *[_type == 'author' && _id== ^.author._ref][0]{
        _id,
          name,
          'slug' : slug.current,
        },
      categories[]->{
        _id,
        name,slug
      },
      places[]->{
      _id,
      name,
      slug
      },
       'content' : body
    }`;

  const posts = await client.fetch(query);
  return posts;
};


