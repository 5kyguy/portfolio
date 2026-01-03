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
                  href="https://x.com/0x5kyguy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5 px-6 py-3 text-base font-medium transition-colors hover:bg-foreground/10 hover:border-foreground/30"
                >
                  X (Twitter)
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

          {/* About Section */}
          <section id="about" className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About
            </h2>
            <div className="space-y-4 text-lg leading-8 text-foreground/80">
              <p>
                I'm a backend developer with 2 years of experience specializing in
                blockchain infrastructure and decentralized systems. My work focuses on
                building robust, scalable solutions for the Web3 ecosystem.
              </p>
              <p>
                Currently, I'm part of the team behind{" "}
                <strong className="text-foreground">TriggerX</strong>, a decentralized
                keeper network built on the EigenLayer platform. TriggerX provides
                secure, multi-chain automation for blockchain applications, enabling
                time-based, event-driven, and condition-based task execution across
                diverse networks.
              </p>
              <p>
                My technical expertise spans <strong className="text-foreground">Golang</strong>,{" "}
                <strong className="text-foreground">Docker</strong>, and{" "}
                <strong className="text-foreground">ScyllaDB</strong>, with a deep focus on
                infrastructure design and distributed systems. I'm passionate about Linux,
                open-source software, and building systems that prioritize security,
                reliability, and decentralization.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
