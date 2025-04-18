import { generateOGImage } from "fumadocs-ui/og";
import { blogsMetaImage } from "@/lib/metadata-image";
import type { ImageResponse } from "next/og";
import { generateAllParams } from "@/app/(home)/blog/[[...slug]]/(components)/blog-static-params";

export const GET = blogsMetaImage.createAPI((page: any): ImageResponse => {
  return generateOGImage({
    title: page.data.title,
    // description: page.data.description,
    site: "rjv.im",
  });
});

export function generateStaticParams() {
  const params = blogsMetaImage.generateParams();
  return params;
}
