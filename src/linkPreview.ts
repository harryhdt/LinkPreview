import { load as loadHTML } from "cheerio";
import { getDescription, getDomain, getFavicon, getImage, getOgUrl, getSiteName, getTitle, getType, validateUrl } from "./utils";

const linkPreview = async (link: string) => {
  try {
    const url = link.startsWith("http") ? link : `http://${link}`;
    if (!url || !validateUrl(url)) {
      console.log("Invalid url");
      return {
        error: true,
        message: "Invalid URL",
      };
    }
    const response = await fetch(url);
    const html = await response.text();
    const $ = loadHTML(html);
    return {
      title: getTitle($),
      description: getDescription($),
      thumbnail: getImage(url, $),
      siteName: getSiteName($),
      ogUrl: getOgUrl($),
      type: getType($),
      domain: getDomain(url),
      favicon: getFavicon(url, $),
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Something went wront, please check your link",
    };
  }
};

export default linkPreview;
