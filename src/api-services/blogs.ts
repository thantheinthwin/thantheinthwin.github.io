import { parseString } from "xml2js";

export interface Blog {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  author: string;
}

interface XmlItem {
  title?: string[];
  description?: string[];
  link?: string[];
  pubDate?: string[];
  "dc:creator"?: string[];
  author?: string[];
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[] | null;
  message: string;
}

export async function getBlogs(): Promise<BlogsResponse> {
  try {
    const response = await fetch("https://medium.com/feed/@thantheinthwin.dev");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse the XML to extract blog data using xml2js
    return new Promise((resolve) => {
      parseString(xmlText, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          resolve({
            success: false,
            data: null,
            message: "Failed to parse XML response",
          });
          return;
        }

        try {
          const items = result.rss?.channel?.[0]?.item || [];
          const blogs: Blog[] = items.map((item: XmlItem, index: number) => {
            const title = item.title?.[0] || `Blog ${index + 1}`;
            const description = item.description?.[0] || "";
            const link = item.link?.[0] || "";
            const pubDate = item.pubDate?.[0] || "";
            const author =
              item["dc:creator"]?.[0] || item.author?.[0] || "Unknown Author";

            return {
              id: `blog-${index}`,
              title,
              description,
              link,
              pubDate,
              author,
            };
          });

          resolve({
            success: true,
            data: blogs,
            message: `Successfully fetched ${blogs.length} blogs`,
          });
        } catch (parseError) {
          console.error("Error processing parsed XML:", parseError);
          resolve({
            success: false,
            data: null,
            message: "Failed to process blog data",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Failed to fetch blogs",
    };
  }
}
