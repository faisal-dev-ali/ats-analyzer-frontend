export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div>
          <h3 className="text-lg font-semibold">ATSMirror</h3>

          <p className="text-sm text-muted-foreground">
            AI-powered ATS Resume Analyzer
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 ATSMirror. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
