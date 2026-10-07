import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, products } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.cat.name} — M.K. Enterprises` : "Collection — M.K. Enterprises";
    const d = loaderData ? `Shop ${loaderData.cat.name} products at M.K. Enterprises.` : "Shop products.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: Collection,
});

function Collection() {
  const { cat } = Route.useLoaderData();
  const list = products.filter((p) => p.category === cat.slug);
  return (
    <div>
      <div className="bg-brand-gradient py-14 text-center text-primary-foreground">
        <h1 className="text-4xl font-extrabold">{cat.name}</h1>
        <p className="mt-2 opacity-80">{list.length} products</p>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
