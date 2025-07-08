const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

// Define the URLs you want to include in the sitemap (static and dynamic).
const staticUrls = [
  "/",
  "/lions",
  "/sightings",
  "/about",
  // Add more static URLs as needed.
];

// If you have dynamic routes, you can fetch them (e.g., from an API or a database).
const dynamicUrls = [
  "/lions/Gijima-Coalition",
  "/lions/Ndhzenga-Coalition",
  // Add dynamic URLs as needed.
];

// Combine static and dynamic URLs.
const allUrls = [...staticUrls, ...dynamicUrls];

// Create a writable stream to output the sitemap to a file.
const writeStream = fs.createWriteStream(
  path.resolve(__dirname, "public", "sitemap.xml")
);
const sitemapStream = new SitemapStream({
  hostname: "https://wildlion.vercel.app",
});

// Pipe the sitemapStream to the writeStream
sitemapStream.pipe(writeStream);

// Push all URLs to the sitemap
allUrls.forEach((url) => {
  sitemapStream.write({
    url: url,
    changefreq: "daily", // Change frequency (optional)
    priority: 0.7, // Priority (optional)
    lastmod: new Date().toISOString(), // Last modified date (optional)
  });
});

// End the stream
sitemapStream.end();

// Wait for the writeStream to finish, then log success.
writeStream.on("finish", () => {
  console.log("Sitemap successfully generated!");
});
