import { createClient } from "next-sanity";
// 1. Change to the named export inside curly braces
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "regpiees",
  dataset: "production",
  apiVersion: "2026-01-07",
  useCdn: true,
});

// 2. Use the specific named builder function
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getPosts() {
  return await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    title, 
    slug, 
    publishedAt, 
    mainImage,
    description,
    podcastUrl,  
  }`);
}

export async function getSinglePost(slug) {
  return await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage,
      podcastUrl,
      publishedAt,
      "categories": categories[]->{
        title,
        "slug": slug
      }
    }`,
    { slug }
  );
}

export async function getCategories() {
  return await client.fetch(`*[_type == "category"]{
    title,
    "slug": slug.current,
    description
  }`);
}
export async function getMainPractices() {
  // We look for practiceAreas that DON'T have a parent (Umbrellas)
  return await client.fetch(`*[_type == "practiceArea" && !defined(parentArea)]{
    title,
    "slug": slug.current,
    description,
    mainImage,
    icon,
    iconType,  
    customSvg   
  }`);
}
export async function getPracticeArea(slug) {
  return await client.fetch(
    `
    *[_type == "practiceArea" && slug.current == $slug][0]{
      title,
      description,
      mainImage,
      body,
      faqs,
      "subAreas": *[_type == "practiceArea" && references(^._id)]{
        title,
        "slug": slug.current,
        description,
        icon, // <--- AND THIS LINE
      },
      icon,
      "reviews": *[_type == "review" && isFeatured == true][0...3]
    }
  `,
    { slug }
  );
}

export async function getAboutSection() {
  // We search for the document with the type 'aboutComponent'
  // The [0] ensures we only get one result
  const query = `*[_type == "aboutComponent"][0]{
    subtitle,
    title,
    bio
  }`;
  return await client.fetch(query);
}

export async function getSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getTeamMembers() {
  const query = `*[_type == "team"] | order(name asc) {
    name,
    role,
    "slug": slug.current,
    image,
    phone,
    email,
    languages,
    education,
    memberships,
    bio,
    linkedin,
    tiktokVideo
  }`;
  return await client.fetch(query);
}
export async function getReviews() {
  const query = `*[_type == "review"] | order(_createdAt desc) {
    _id,
    clientName,
    clientImage,
    reviewType,
    content,
    videoUrl,
    reviewImage,
    rating
  }`;
  return await client.fetch(query);
}
