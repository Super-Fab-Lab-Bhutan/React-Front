import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async (req, res) => {
  const links = [
    { url: "/", changefreq: "monthly", priority: 1 },
    { url: "/login", changefreq: "never", priority: 0.8 },
    { url: "/news", changefreq: "monthly", priority: 0.8 },
    { url: "/service", changefreq: "yearly", priority: 0.8 },

    { url: "/machines/carpentry", changefreq: "yearly", priority: 0.7 },
    { url: "/machines/electronics", changefreq: "yearly", priority: 0.7 },
    { url: "/machines/heavymachines", changefreq: "yearly", priority: 0.7 },
    { url: "/machines/metalworks", changefreq: "yearly", priority: 0.7 },

    { url: "/programs/education", changefreq: "yearly", priority: 0.7 },
    { url: "/programs/training", changefreq: "yearly", priority: 0.7 },
    { url: "/programs/research", changefreq: "yearly", priority: 0.7 },

    { url: "/booking/front", changefreq: "yearly", priority: 0.6 },

    { url: "/register", changefreq: "yearly", priority: 0.7 },
    { url: "/register/student", changefreq: "yearly", priority: 0.7 },
    { url: "/register/community", changefreq: "yearly", priority: 0.7 },
    { url: "/register/startup", changefreq: "yearly", priority: 0.7 },
    { url: "/register/company", changefreq: "yearly", priority: 0.7 },

    { url: "/resource", changefreq: "yearly", priority: 0.6 },
    { url: "/resource/video", changefreq: "yearly", priority: 0.6 },
    { url: "/resource/machine", changefreq: "yearly", priority: 0.6 },
    { url: "/resource/training", changefreq: "yearly", priority: 0.6 },

    { url: "/aboutus", changefreq: "monthly", priority: 0.8 },
    { url: "/aboutus/team", changefreq: "monthly", priority: 0.7 },
    { url: "/aboutus/gallery", changefreq: "monthly", priority: 0.6 },
    { url: "/aboutus/virtualtour", changefreq: "never", priority: 0.6 },
  ];

  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
