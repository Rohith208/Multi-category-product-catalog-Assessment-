import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../data/product";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;

  const productIndex = Number(id);
  const product = products[productIndex];

  if (!product) return notFound();

  const similarProducts = products
    .map((item, index) => ({ ...item, index }))
    .filter(
      (item) =>
        item.category === product.category &&
        item.index !== productIndex
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-100 px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition mb-5 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[280px] sm:min-h-[420px] lg:min-h-130 bg-slate-100">
              <Image
                src={product.image}
                alt={product.itemname}
                fill
                className="object-fill hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 text-slate-800 text-xs sm:text-sm font-medium shadow">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
              <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-blue-600 font-semibold mb-2 sm:mb-3">
                Product Detail
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-3 sm:mb-4">
                {product.itemname}
              </h1>

              <p className="text-slate-500 mb-6 sm:mb-8 text-sm sm:text-base">
                Explore specifications and details for this product.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.itemprops.map((prop, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 mb-1">
                      {prop.label}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 break-words">
                      {prop.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-10">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex justify-center px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition"
                >
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Similar Products
              </h2>

              <span className="text-sm text-slate-500">
                {product.category}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {similarProducts.map((item) => (
                <Link
                  key={item.index}
                  href={`/product/${item.index}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-44 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.itemname}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-4">
                    {/* <p className="text-xs text-blue-600 font-medium mb-1">
                      {item.category}
                    </p> */}

                    <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">
                      {item.itemname}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}