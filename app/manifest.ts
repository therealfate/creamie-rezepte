import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Creamie Rezepte",
    short_name: "Creamie",
    description: "Ninja Creami Rezepte, Proteineis und alles rund ums selbst gemachte Eis",
    start_url: "/",
    display: "standalone",
    background_color: "#fefcf9",
    theme_color: "#fdf6e9",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
