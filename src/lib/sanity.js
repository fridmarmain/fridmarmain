import { createClient } from "next-sanity";
// 1. Change to the named export inside curly braces
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  // This looks for the variable we just made in .env.local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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
  order = "desc",
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
    { slug },
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
export async function getMegaMenuList() {
  return await client.fetch(`
    *[_type == "practiceArea" && level == "umbrella"]
    | order(title asc) {
      _id,
      title,
      "slug": slug.current,

      "categories": *[
        _type == "practiceArea" &&
        parentArea._ref == ^._id
      ] | order(title asc) {
        _id,
        title,
        "slug": slug.current,

        "services": *[
          _type == "practiceArea" &&
          parentArea._ref == ^._id
        ] | order(title asc) {
          title,
          "slug": slug.current
        }
      }
    }
  `);
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
      level,
      description,
      mainImage,
      body,
      faqs,
      // Fetch the parent's slug to help build the breadcrumb path logic
      "parent": parentArea->{ 
        title, 
        "slug": slug.current,
        "parent": parentArea->{ title, "slug": slug.current } 
      },
      // Fetch children (Categories if this is an Umbrella, Services if this is a Category)
      "subAreas": *[_type == "practiceArea" && references(^._id)] | order(title asc) {
        title,
        "slug": slug.current,
        description,
        icon,
        iconType,
        customSvg
      },
      icon,
      iconType,
      customSvg,
      "reviews": *[_type == "review" && isFeatured == true][0...3] {
        clientName,
        content,
        rating
      }
    }
  `,
    { slug },
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

export async function getTeamMembers(limit = 100) {
  // Use [0...limit] for slicing
  const query = `*[_type == "team"] | order(name asc) [0...$limit] {
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

  return await client.fetch(query, { limit });
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

// Query for the main Hub page (gets all regions)
export const GET_REGIONS_QUERY = `*[_type == "region"] | order(_createdAt asc) {
  title,
  intro,
  groups[]{
    groupName,
    cities
  }
}`;
// Query for the individual city page
// It looks for a custom cityPage first, then finds the region info as a fallback
export const GET_CITY_PAGE_QUERY = `
  {
    "customData": *[_type == "cityPage" && slug.current == $citySlug][0],
    "regionData": *[_type == "region" && cityList match $cityName][0]{
      title,
      intro
    }
  }
`;
