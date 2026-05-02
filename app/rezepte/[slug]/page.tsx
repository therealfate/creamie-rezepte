import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Container } from "@/components/Container";
import { RecipeMeta } from "@/components/RecipeMeta";
import { RecipeSchema } from "@/components/RecipeSchema";
import { AffiliateBox } from "@/components/AffiliateBox";
import { AuthorBox } from "@/components/AuthorBox";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortionConverter } from "@/components/PortionConverter";
import { IceMode } from "@/components/IceMode";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

function PinterestButton({
  url,
  imageUrl,
  description,
}: {
  url: string;
  imageUrl: string;
  description: string;
}) {
  const pinterestUrl =
    `https://pinterest.com/pin/create/button/?` +
    `url=${encodeURIComponent(url)}` +
    `&media=${encodeURIComponent(imageUrl)}` +
    `&description=${encodeURIComponent(description)}`;
  return (
    <a
      href={pinterestUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Auf Pinterest speichern"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-berry-600 transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
      Auf Pinterest speichern
    </a>
  );
}

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
          <Breadcrumbs
            items={[
              { label: "Start", href: "/" },
              { label: "Rezepte", href: "/rezepte" },
              { label: recipe.cluster },
              { label: recipe.title },
            ]}
          />
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
          <div className="flex items-center justify-between mt-2">
            {recipe.hero.credit ? (
              <p className="text-xs text-[var(--muted)]">
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
            ) : (
              <span />
            )}
            <PinterestButton
              url={`${siteConfig.url}/rezepte/${recipe.slug}`}
              imageUrl={recipe.hero.src}
              description={recipe.title}
            />
          </div>
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

        <PortionConverter
          ingredients={recipe.ingredients ?? []}
          basePortions={parseInt(recipe.yields, 10) || 4}
        />

        <div className="my-10">
          <h2 className="font-display text-2xl font-semibold mb-4">
            Zubereitung
          </h2>
          <ol className="space-y-3">
            {(recipe.instructions ?? []).map((step, i) => (
              <li
                key={i}
                className="flex gap-4 text-[1.0625rem] leading-relaxed"
              >
                <span className="font-display font-semibold text-berry-600 flex-shrink-0">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <IceMode
            title={recipe.title}
            steps={recipe.instructions ?? []}
            ingredients={recipe.ingredients ?? []}
            basePortions={parseInt(recipe.yields, 10) || 4}
          />
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
              },
            }}
          />
        </div>

        <AuthorBox />
        <NewsletterForm />
      </Container>

      <Container size="default">
        <RelatedRecipes current={recipe} />
      </Container>
    </article>
  );
}
