import { CheerioAPI } from "cheerio";

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getAbsolutePath = (url: string, relativePath: string) => {
  if (!validateUrl(url)) {
    return;
  }

  const { origin, pathname } = new URL(url);

  if (relativePath.slice(0, 1) === "/") {
    return origin + pathname + relativePath.slice(1);
  }

  if (relativePath.slice(0, 2) === "./") {
    return origin + pathname + relativePath.slice(2);
  }

  return relativePath;
};

export const getTitle = (html: CheerioAPI) => {
  let title = html("meta[property='og:title']").attr("content");

  if (!title) {
    title = html("title").text();
  }

  return title;
};

export const getDescription = (html: CheerioAPI) => {
  const description = html("meta[property='og:description']").attr("content") || html("meta[name='description']").attr("content");

  return description;
};

export const getDomain = (url: string) => {
  if (!validateUrl(url)) {
    return;
  }

  const urlObj = new URL(url);

  const domain = urlObj.hostname.replace("www.", "");

  return domain;
};

export const getFavicon = (url: string, html: CheerioAPI) => {
  let favicon = html("link[rel='icon']").attr("href");

  if (favicon) {
    favicon = getAbsolutePath(url, favicon);
  }

  return favicon;
};

export const getImage = (url: string, html: CheerioAPI) => {
  let image = html("meta[property='og:image']").attr("content");

  if (image) {
    image = getAbsolutePath(url, image);
  }

  return image;
};

export const getOgUrl = (html: CheerioAPI) => {
  const url = html("meta[property='og:url']").attr("content");

  return url;
};

export const getSiteName = (html: CheerioAPI) => {
  const siteName = html("meta[property='og:site_name']").attr("content");

  return siteName;
};

export const getType = (html: CheerioAPI) => {
  const type = html("meta[property='og:type']").attr("content");

  return type;
};
