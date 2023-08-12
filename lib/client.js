import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "d9p0l1rj",
  dataset: "production",
  apiVersion: "2022-04-26",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const postSanityObject = (mutations) =>
  fetch(
    `https://${"d9p0l1rj"}.api.sanity.io/v2021-06-07/data/mutate/${"production"}`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    }
  );
