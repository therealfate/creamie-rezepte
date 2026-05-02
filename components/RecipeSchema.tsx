import type { Recipe } from "@/lib/recipes";
import { siteConfig } from "@/lib/site";

export function RecipeSchema({ recipe }: { recipe: Recipe }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: [`${siteConfig.url}${recipe.hero.src.startsWith("http") ? "" : recipe.hero.src}`].map((s) =>
      s.startsWith("http") ? s : recipe.hero.src
    ),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: `${siteConfig.url}/ueber`,
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt ?? recipe.publishedAt,
    description: recipe.description,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.yields,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((text) => ({
      "@type": "HowToStep",
      text,
    })),
    ...(recipe.nutrition && {
      nutrition: {
        "@type": "NutritionInformation",
        ...(recipe.nutrition.calories && { calories: recipe.nutrition.calories }),
        ...(recipe.nutrition.protein && { proteinContent: recipe.nutrition.protein }),
        ...(recipe.nutrition.carbs && { carbohydrateContent: recipe.nutrition.carbs }),
        ...(recipe.nutrition.fat && { fatContent: recipe.nutrition.fat }),
      },
    }),
    ...(recipe.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: recipe.rating.value,
        reviewCount: recipe.rating.count,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
