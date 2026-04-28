export function FeatureSection() {
  const features = [
    {
      title: "Real ATS Score",
      description:
        "Get transparent ATS scores based on formatting, readability, keywords, and recruiter standards.",
    },
    {
      title: "Keyword & Skill Detection",
      description:
        "See detected skills, missing keywords, and domain relevance from your actual resume content.",
    },
    {
      title: "Practical Suggestions",
      description:
        "Receive direct recommendations to improve impact, readability, structure, and ATS compatibility.",
    },
  ];

  return (
    <section className="bg-[#fff8f6] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold tracking-tight text-[#222222]">
            Simple & Honest Resume Analysis
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#6a6a6a]">
            No fake low scores. No locked reports. Just upload your resume and
            get transparent ATS analysis instantly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[28px] border border-[#ebebeb] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff385c]/10 text-2xl">
                ✦
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                {feature.title}
              </h3>

              <p className="leading-7 text-[#6a6a6a]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
