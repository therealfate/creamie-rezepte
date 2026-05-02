import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { Container } from "@/components/Container";
import { RecipeMeta } from "@/components/RecipeMeta";
import { RecipeSchema } from "@/components/RecipeSchema";
import { AffiliateBox } from "@/components/AffiliateBox";
import { AuthorBox } from "@/components/AuthorBox";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const mdxComponents = {
  AffiliateBox,
  NewsletterForm,
};

export async function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `${siteConfig.url}/rezepte/${slug}` },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.hero.src],
      type: "article",
      publishedTime: recipe.publishedAt,
      modifiedTime: recipe.updatedAt,
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <article>
      <RecipeSchema recipe={recipe} />

      {/* HERO */}
      <header className="bg-cream-100 border-b">
        <Container size="narrow" className="py-10 sm:py-14">
          <p className="text-xs uppercase tracking-[0.2em] text-berry-600 font-semibold mb-3">
            {recipe.cluster}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-tight mb-5">
            {recipe.title}
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-6 max-w-2xl">
            {recipe.description}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Von {siteConfig.author.name} · Veröffentlicht am{" "}
            {formatDate(recipe.publishedAt)}
            {recipe.updatedAt && recipe.updatedAt !== recipe.publishedAt && (
              <>
                {" "}
                · Aktualisiert am {formatDate(recipe.updatedAt)}
              </>
            )}
          </p>
        </Container>

        <Container size="narrow" className="pb-10 sm:pb-14">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={recipe.hero.src}
              alt={recipe.hero.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {recipe.hero.credit && (
            <p className="text-xs text-[var(--muted)] mt-2">
              Foto:{" "}
              {recipe.hero.creditUrl ? (
                <a
                  href={recipe.hero.creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {recipe.hero.credit}
                </a>
              ) : (
                recipe.hero.credit
              )}
            </p>
          )}
        </Container>
      </header>

      {/* META + INGREDIENTS */}
      <Container size="narrow" className="py-10">
        <RecipeMeta
          prepTime={recipe.prepTime}
          totalTime={recipe.totalTime}
          yields={recipe.yields}
          category={recipe.category}
          rating={recipe.rating}
        />

        <div className="grid sm:grid-cols-2 gap-8 my-10">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">
              Zutaten
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[1.0625rem] leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-berry-500 mt-2.5 flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">
              Zubereitung
            </h2>
            <ol className="space-y-3">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                  <span className="font-display font-semibold text-berry-600 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.affiliate && recipe.affiliate.length > 0 && (
          <AffiliateBox items={recipe.affiliate} />
        )}

        {/* MDX CONTENT */}
        <div className="prose-recipe">
          <MDXRemote
            source={recipe.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    { behavior: "wrap", properties: { className: "anchor" } },
                  ],
                ],
              },
            }}
          />
        </div>

        <AuthorBox />
        <NewsletterForm />
      </Container>
    </article>
  );
}
