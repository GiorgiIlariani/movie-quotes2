export default function MainCurtain() {
    return (
        <section className="col-start-1 row-start-1 flex size-full flex-col items-center justify-center gap-6 bg-black">
            <h1 className="max-w-3xl px-2 text-center text-4xl leading-normal font-bold text-cream md:text-6xl">
                Find any quote in millions of movie lines
            </h1>
            <button
                type="button"
                className="rounded-sm border border-brand bg-brand px-4 py-2 text-white"
            >
                Get started
            </button>
        </section>
    );
}
