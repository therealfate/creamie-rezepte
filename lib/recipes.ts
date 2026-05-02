import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");

export type RecipeFrontmatter = {
  title: string;
  slug: string;
  description: string;
  cluster: string;
  hero: {
    src: string;
    alt: string;
    credit?: string;
    creditUrl?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  prepTime: string; // ISO 8601 duration e.g. "PT5M"
  cookTime: string; // freeze time e.g. "PT24H"
  totalTime: string;
  yields: string;
  category: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  nutrition?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  rating?: { value: string; count: string };
  affiliate?: { name: string; url: string; price?: string }[];
  type?: "pillar" | "spoke";
  related?: string[];
};

export type Recipe = RecipeFrontmatter & {
  content: string;
};

export function getAllRecipeSlugs(): string[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];
  return fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const filePath = path.join(RECIPES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as RecipeFrontmatter), content };
}

export function getAllRecipes(): Recipe[] {
  return getAllRecipeSlugs()
    .map((slug) => getRecipeBySlug(slug))
    .filter((r): r is Recipe => r !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getRecipesByCluster(cluster: string): Recipe[] {
  return getAllRecipes().filter((r) => r.cluster === cluster);
}
