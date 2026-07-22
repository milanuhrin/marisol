import React from "react";
import { Link } from "gatsby";
import SEO from "Components/SEO";

const NotFoundPage = () => (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-[#e6f6ff] px-6 text-center">
    <div className="max-w-md">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
        404
      </p>
      <h1 className="mt-3 bg-gradient-to-r from-snakeGr1 to-snakeGr2 bg-clip-text text-4xl font-extrabold text-transparent">
        Stránka sa nenašla
      </h1>
      <p className="mt-5 text-gray-600">
        Adresa, ktorú hľadáte, neexistuje alebo bola presunutá.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        Späť na hlavnú stránku
      </Link>
    </div>
  </main>
);

export const Head = () => <SEO title="Stránka sa nenašla" />;

export default NotFoundPage;
