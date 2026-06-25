const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const videoSitemapPath = path.join(__dirname, '../public/video-sitemap.xml');

// Update sitemap.xml
if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf8');
  content = content.replace(/<lastmod>[^]*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log(`Updated lastmod in sitemap.xml to ${today}`);
}

// Update video-sitemap.xml
if (fs.existsSync(videoSitemapPath)) {
  let content = fs.readFileSync(videoSitemapPath, 'utf8');
  content = content.replace(/<video:publication_date>[^]*?<\/video:publication_date>/g, `<video:publication_date>${today}T00:00:00+04:00</video:publication_date>`);
  fs.writeFileSync(videoSitemapPath, content, 'utf8');
  console.log(`Updated publication_date in video-sitemap.xml to ${today}`);
}
