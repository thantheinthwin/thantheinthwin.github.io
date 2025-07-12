import { parseString } from "xml2js";

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
}

interface XmlItem {
  title?: string[];
  description?: string[];
  "content:encoded"?: string[];
  link?: string[];
  pubDate?: string[];
  "dc:creator"?: string[];
  author?: string[];
  category?: string[];
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[] | null;
  message: string;
}

// Helper function to extract first paragraph as excerpt
function extractExcerpt(content: string): string {
  if (!content) return "";

  // Find the first <p> tag and extract its content
  const pMatch = content.match(/<p[^>]*>(.*?)<\/p>/);
  if (pMatch) {
    const pContent = pMatch[1];
    // Remove any remaining HTML tags and decode entities
    return pContent
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
      .replace(/&amp;/g, "&") // Replace &amp; with &
      .replace(/&lt;/g, "<") // Replace &lt; with <
      .replace(/&gt;/g, ">") // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim();
  }

  return "";
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
            const content = item["content:encoded"]?.[0] || "";
            const excerpt = extractExcerpt(content);
            const link = item.link?.[0] || "";
            const pubDate = item.pubDate?.[0] || "";
            const author =
              item["dc:creator"]?.[0] || item.author?.[0] || "Unknown Author";
            const categories = item.category || [];

            return {
              id: `blog-${index}`,
              title,
              excerpt,
              link,
              pubDate,
              author,
              categories,
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
