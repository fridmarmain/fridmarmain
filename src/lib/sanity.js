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
      format,
    mainImage,
    description,
    podcastUrl,  
      excerpt,
  }`);
}

export async function getPaginatedPosts(
  lastPublishedAt = null,
  categorySlug = null,
  searchTerm = "",
  order = "desc"
) {
  let filter = `_type == "post"`;
  if (categorySlug)
    filter += ` && "${categorySlug}" in categories[]->slug.current`;
  if (searchTerm)
    filter += ` && (title match "*${searchTerm}*" || excerpt match "*${searchTerm}*")`;

  // Use the order for pagination: if desc, we want < date; if asc, we want > date
  if (lastPublishedAt) {
    const comparison = order === "desc" ? "<" : ">";
    filter += ` && publishedAt ${comparison} "${lastPublishedAt}"`;
  }

  const query = `*[${filter}] | order(publishedAt ${order}) [0...6] {
    title,
    "slug": slug.current,
    format,
    mainImage,
    publishedAt,
    excerpt,
    "categoryTitles": categories[]->title
  }`;

  return await client.fetch(query);
}

export async function getSinglePost(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
    ...,
    "categories": categories[]->{title, "slug": slug.current}
  }`,
    { slug }
  );
}

export async function getRelatedPosts(format, currentSlug) {
  const query = `*[_type == "post" && format == $format && slug.current != $currentSlug] | order(publishedAt desc) [0...4] {
    title,
    "slug": slug.current,
    format,
    mainImage,
    publishedAt,
    excerpt,
    "categoryTitles": categories[]->title
  }`;
  return await client.fetch(query, { format, currentSlug });
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}
export async function getMainPractices() {
  // We look for practiceAreas that DON'T have a parent (Umbrellas)
  return await client.fetch(`*[_type == "practiceArea" && !defined(parentArea)] | order(title asc){
    title,
    "slug": slug.current,
    description,
    mainImage,
    icon,
    iconType,  
    customSvg   
  }`);
}

export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    "categories": categories[]->title
  }`;
  return await client.fetch(query, { slug });
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
export async function getReviews(limit = null) {
  const range = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "review"] | order(_createdAt desc) ${range} {
_id,
    clientName,
    clientRole,
    clientImage,
    reviewType,
    videoSource,
    content,
    rating,
    videoUrl,
    videoThumbnail,
    
    "muxPlaybackId": videoUpload.asset->playbackId, 
    "videoAspect": videoUpload.asset->data.aspect_ratio
  }`;
  return await client.fetch(query);
}
