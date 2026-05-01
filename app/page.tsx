import { Sparkles } from "lucide-react";
import ProductSwiper from "./components/ProductSwiper";
import { products } from "./data/product";

export default function Home() {
  const categoryData = products.reduce<
    {
      categoryName: string;
      items: ((typeof products)[number] & { index: number })[];
    }[]
  >((acc, item, index) => {
    const existing = acc.find((group) => group.categoryName === item.category);

    const productWithIndex = {
      index,
      ...item,
    };

    if (existing) {
      existing.items.push(productWithIndex);
    } else {
      acc.push({
        categoryName: item.category,
        items: [productWithIndex],
      });
    }

    return acc;
  }, []);

  console.log(categoryData);

  return (
    <main className="min-h-screen px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        <section className="px-6 pb-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Product Showcase
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Multi Category Product Catalog
            </h1>

            <p className="mt-2 text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              Browse and explore products across categories.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap justify-center md:justify-between gap-5 md:gap-6 xl:gap-8">
          {categoryData.map((category) => (
            <div
              key={category.categoryName}
              className="basis-full md:basis-[48%] xl:basis-[31%] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-slate-200"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b-2 bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800">
                  {category.categoryName}
                </h2>

                <span className="text-sm text-slate-500">
                  {category.items.length} Items
                </span>
              </div>

              {/* Carousel */}
              <div className="py-1.5 px-1.5">
                <ProductSwiper items={category.items} />
              </div>

              <div className="px-4 py-2 text-right text-xs border-t text-slate-400">
                Select an item to view details
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
