export function ATSPreview() {
  const scores = [
    ["ATS Compatibility", "92%"],
    ["Keyword Match", "78%"],
    ["Readability", "85%"],
    ["Impact Score", "71%"],
  ];

  const missingSkills = [
    "Docker",
    "Kubernetes",
    "Testing",
    "Scalability",
    "CI/CD",
  ];

  const detectedSkills = ["Java", "Spring Boot", "React", "SQL", "AWS"];

  return (
    <section className="bg-[#fff8f6] pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[40px] border border-[#ebebeb] bg-white p-10 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-6">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-[#ff385c] text-5xl font-bold text-[#222222]">
                  82
                </div>

                <div>
                  <div className="mb-3 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    ATS Analysis Complete
                  </div>

                  <h2 className="text-4xl font-bold text-[#222222]">
                    Software Engineer Resume.pdf
                  </h2>

                  <p className="mt-3 text-[#6a6a6a]">
                    2 Pages • 1245 Words • Mid Level Engineer
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {scores.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-[#ebebeb] bg-[#fafafa] p-6"
                  >
                    <div className="mb-3 flex justify-between">
                      <span className="font-medium text-[#222222]">
                        {label}
                      </span>

                      <span className="font-semibold text-[#ff385c]">
                        {value}
                      </span>
                    </div>

                    <div className="h-3 rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-[#ff385c]"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-[#ebebeb] p-8">
                <h3 className="mb-6 text-3xl font-bold text-[#222222]">
                  Recruiter Suggestions
                </h3>

                <div className="space-y-5">
                  {[
                    "Add measurable outcomes in experience bullets.",
                    "Improve keyword coverage for backend engineering roles.",
                    "Use more action-oriented achievements.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-2xl bg-[#fafafa] p-5"
                    >
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff385c]/10 text-[#ff385c]">
                        ✓
                      </div>

                      <p className="text-[#4b5563]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-[#ebebeb] p-8">
                <h3 className="mb-5 text-2xl font-bold text-[#222222]">
                  Missing Keywords
                </h3>

                <div className="flex flex-wrap gap-3">
                  {missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ebebeb] p-8">
                <h3 className="mb-5 text-2xl font-bold text-[#222222]">
                  Detected Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {detectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ebebeb] bg-[#fafafa] p-8">
                <h3 className="mb-4 text-2xl font-bold text-[#222222]">
                  Quick Summary
                </h3>

                <div className="space-y-4 text-[#4b5563]">
                  <div className="flex justify-between">
                    <span>Detected Role</span>
                    <span>Software Engineer</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Experience</span>
                    <span>3-4 Years</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="text-green-600">ATS Compatible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
