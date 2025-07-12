import { getBlogs } from "@/api-services";
import HomePage from "./home-page";

export default async function Root() {
  const blogs = await getBlogs();

  return <HomePage blogs={blogs} />;
}
