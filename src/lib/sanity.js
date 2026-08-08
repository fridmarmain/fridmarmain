import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-07",
  // Set useCdn to false if you are currently hit by a 402 CDN limit
  // to route requests via the standard API endpoints temporarily.
  useCdn: process.env.NODE_ENV === "production",
  // useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Default caching duration (1 hour) for Next.js Data Cache
const REVALIDATE_TIME = 3600;

export async function getPosts() {
  const query = `{
    "blog": *[_type == "post" && format == "blog"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "video": *[_type == "post" && format == "video"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "podcast": *[_type == "post" && format == "podcast"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "latest": *[_type == "post"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    }
  }`;

  const { blog, video, podcast, latest } = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["posts"] } },
  );

  const formatPicks = [blog[0], video[0], podcast[0]].filter(Boolean);

  const latestPost = latest[0];
  const alreadyIncluded = latestPost
    ? formatPicks.some((p) => p.slug === latestPost.slug)
    : true;

  if (latestPost && !alreadyIncluded) {
    formatPicks.push(latestPost);
  }

  return formatPicks;
}

export async function getPostForHome() {
  const query = `{
    "blog": *[_type == "post" && format == "blog"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "video": *[_type == "post" && format == "video"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "podcast": *[_type == "post" && format == "podcast"] | order(publishedAt desc) [0...1] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    },
    "extras": *[_type == "post"] | order(publishedAt desc) [0...20] {
      title,
      "slug": slug.current,
      publishedAt,
      format,
      mainImage,
      excerpt,
      podcastUrl,
      "categoryTitles": categories[]->title
    }
  }`;

  const { blog, video, podcast, extras } = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["posts"] } },
  );

  const formatPicks = [blog[0], video[0], podcast[0]].filter(Boolean);
  const pickedSlugs = new Set(formatPicks.map((p) => p.slug));

  const pool = extras.filter((p) => !pickedSlugs.has(p.slug));
  if (pool.length > 0) {
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    formatPicks.push(randomPick);
  }

  return formatPicks;
}

export async function getTermsOfUse() {
  const query = `*[_type == "termsOfUse"][0] {
    title,
    lastUpdated,
    sections[] {
      heading,
      body
    }
  }`;

  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["termsOfUse"] } },
  );
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

  // Keep revalidation shorter (e.g., 60 seconds) when searching to keep active queries fresh
  const revalidate = searchTerm ? 60 : REVALIDATE_TIME;

  return await client.fetch(
    query,
    {},
    { next: { revalidate, tags: ["posts"] } },
  );
}

export async function getSinglePost(slug) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      "categories": categories[]->{_id, title, "slug": slug.current}
    }`,
    { slug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`post-${slug}`] } },
  );
}

export async function getNextPost(currentSlug, format, categoryId) {
  const currentPost = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      publishedAt
    }`,
    { slug: currentSlug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`post-${currentSlug}`] } },
  );

  if (!currentPost?.publishedAt) return null;

  return await client.fetch(
    `*[
      _type == "post" && 
      format == $format && 
      references($categoryId) &&
      slug.current != $currentSlug &&
      publishedAt < $currentPublishedAt
    ] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current,
      publishedAt,
      format
    }`,
    {
      currentSlug,
      format,
      categoryId,
      currentPublishedAt: currentPost.publishedAt,
    },
    { next: { revalidate: REVALIDATE_TIME, tags: ["posts"] } },
  );
}

export async function getPreviousPost(currentSlug, format, categoryId) {
  const currentPost = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      publishedAt
    }`,
    { slug: currentSlug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`post-${currentSlug}`] } },
  );

  if (!currentPost?.publishedAt) return null;

  return await client.fetch(
    `*[
      _type == "post" && 
      format == $format && 
      references($categoryId) &&
      slug.current != $currentSlug &&
      publishedAt > $currentPublishedAt
    ] | order(publishedAt asc)[0] {
      title,
      "slug": slug.current,
      publishedAt,
      format
    }`,
    {
      currentSlug,
      format,
      categoryId,
      currentPublishedAt: currentPost.publishedAt,
    },
    { next: { revalidate: REVALIDATE_TIME, tags: ["posts"] } },
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
  return await client.fetch(
    query,
    { format, currentSlug },
    { next: { revalidate: REVALIDATE_TIME, tags: ["posts"] } },
  );
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }`;
  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["categories"] } },
  );
}

export async function getMegaMenuList() {
  return await client.fetch(
    `
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
  `,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["megaMenu"] } },
  );
}

export async function getMainPractices() {
  return await client.fetch(
    `*[_type == "practiceArea" && !defined(parentArea)] | order(title asc){
      title,
      "slug": slug.current,
      description,
      mainImage,
      icon,
      iconType,  
      customSvg   
    }`,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["practiceAreas"] } },
  );
}

export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    "categories": categories[]->title
  }`;
  return await client.fetch(
    query,
    { slug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`post-${slug}`] } },
  );
}

export async function getCategoryBySlug(slug) {
  return await client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,
      heroSubtitle,
      heroImage
    }`,
    { slug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`category-${slug}`] } },
  );
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
      "parent": parentArea->{ 
        title, 
        "slug": slug.current,
        "parent": parentArea->{ title, "slug": slug.current } 
      },
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
    { next: { revalidate: REVALIDATE_TIME, tags: [`practice-${slug}`] } },
  );
}

export async function getAboutSection() {
  const query = `*[_type == "aboutComponent"][0]{
    subtitle,
    title,
    bio,
    image1,
    image2
  }`;
  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["about"] } },
  );
}

export async function getSettings() {
  return await client.fetch(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["settings"] } },
  );
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    calendlyUrl,
    footerTagline,
    footerBackgroundText,
    socialLinks {
      linkedin,
      tiktok,
      instagram,
      facebook,
      youtube
    },
    footerColumns[] {
      columnHeading,
      links[] { label, path }
    },
    bookingLabel,
    bookingUrl,
    resourcesLabel,
    resourcesPath,
    customResourcesLinks[] { label, path },
    reviewsLabel,
    reviewsPath,
    extraLinks[] { 
      _type, 
      label, 
      path, 
      links[] { label, path } 
    }
  }`;
  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["settings"] } },
  );
}

export async function getTeamMembers(limit = 100) {
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

  const results = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["team"] } },
  );
  return results.slice(0, limit);
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
  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["reviews"] } },
  );
}

export async function getHomepageReviews() {
  const query = `{
    "videoReviews": *[_type == "review" && reviewType == "video"] | order(_createdAt desc) {
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
    },
    "textReviews": *[_type == "review" && reviewType == "text"] | order(_createdAt desc) {
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
    }
  }`;

  const { videoReviews, textReviews } = await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["reviews"] } },
  );

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const videos = shuffle(videoReviews).slice(0, 2);
  const texts = shuffle(textReviews).slice(0, 1);

  return [videos[0], texts[0], videos[1], texts[1]].filter(Boolean);
}

export const GET_REGIONS_QUERY = `*[_type == "region"] | order(_createdAt asc) {
  title,
  intro,
  groups[]{
    groupName,
    cities
  }
}`;

export const GET_CITY_PAGE_QUERY = `
  {
    "customData": *[_type == "cityPage" && slug.current == $citySlug][0],
    "regionData": *[_type == "region" && cityList match $cityName][0]{
      title,
      intro
    }
  }
`;

export async function getPageBySlug(slug) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    pageBuilder[] {
      _type,
      _type == "heroSection" => {
        heading,
        subheading,
        backgroundImage,
        infoLinks[] {
          title,
          url,
          icon,
          isActive
        }
      },
      _type == "ctaSection" => {
        heading,
        buttonText,
        buttonLink
      },
      _type == "practiceSection" => {
        displayLevel,
        header {
          sideHeader,
          mainHeader,
          subHeader,
          description
        }
      },
      _type == "teamSection" => {
        layoutType,
        header {
          sideHeader,
          mainHeader,
          subHeader,
          description
        },
        "members": members[]-> {
          name,
          "slug": slug.current,
          role,
          image,
          phone,
          email
        }
      },
      _type == "blogSection" => {
        postsCount,
        header {
          sideHeader,
          mainHeader,
          subHeader,
          description
        }
      },
      _type == "reviewSection" => {
        showLoadMore,
        header {
          sideHeader,
          mainHeader,
          subHeader,
          description
        }
      },
      _type == "aboutComponent" => {
        title,
        subtitle,
        bio,
        image1,
        image2,
        visionMissionCards[] {
          cardId,
          label,
          subtitle,
          text,
          wide
        }
      },
      _type == "ceoSection" => {
        subtitle,
        quoteText,
        description,
        portraitImage,
        ctaLabel,
        ctaUrl
      },
      _type == "contactSection" => {
        heading,
        subheading,
        formHeading,     
        formSubheading,
        officeImage,
        locationAddress,
        phone,
        fax,
        email,
        hoursWeekdays,
        formImage
      }
    }
  }`;

  return await client.fetch(
    query,
    { slug },
    { next: { revalidate: REVALIDATE_TIME, tags: [`page-${slug}`] } },
  );
}

export async function getGlobalContactInfo() {
  const query = `*[_type == "contactSection"][0]{
    heading,
    subheading,
    formHeading,      
    formSubheading,
    officeImage,
    locationAddress,
    phone,
    fax,
    email,
    hoursWeekdays,
    formImage
  }`;

  return await client.fetch(
    query,
    {},
    { next: { revalidate: REVALIDATE_TIME, tags: ["contact"] } },
  );
}
