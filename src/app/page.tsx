export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {/* Hero Section */}
          <section className="flex min-h-[80vh] flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Aakash Yadav
                </h1>
                <h2 className="text-xl text-foreground/70 sm:text-2xl md:text-3xl">
                  Blockchain Developer
                </h2>
                <p className="max-w-2xl text-lg text-foreground/60 sm:text-xl">
                  Backend developer specializing in decentralized systems, Golang, and
                  infrastructure. Building the future of Web3 automation.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com/5kyguy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5 px-6 py-3 text-base font-medium transition-colors hover:bg-foreground/10 hover:border-foreground/30"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-base font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
