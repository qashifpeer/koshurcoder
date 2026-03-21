// // src/lib/getBlogs.ts
// import { getData } from "@/lib/client";
// export async function getBlogs() {
//   try {
//     const query = `*[_type == "post"] | order(publishedAt desc)[0..5] {
//       _id,
//       title,
//       shortDescription,
//       "slug": slug.current,
//       "imageUrl": mainImage.asset->url,
//       altFtImg,
//       publishedAt
//     }`;

//     const blogs = await getData.fetch(query);
//     return blogs || [];
//   } catch (err) {
//     console.error("Sanity fetch failed:", err);
//     return [];
//   }
// }
