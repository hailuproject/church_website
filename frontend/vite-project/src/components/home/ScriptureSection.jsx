import Container from '../Container';
import AnimatedSection from '../AnimatedSection';
import Button from '../Button';
import { dailyScripture } from '../../data/homeData';

export default function ScriptureSection() {
  return (
    <section
      id="scripture"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Daily Scripture"
    >
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-xs bg-secondary/20 flex items-center justify-center">
                <span className="text-4xl text-secondary" aria-hidden="true">☦</span>
              </div>
            </div>

            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
              Today&apos;s Scripture
            </span>

            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
              &ldquo;{dailyScripture.verse}&rdquo;
            </blockquote>

            <p className="text-lg text-secondary-light font-semibold mb-10">
              — {dailyScripture.reference}
            </p>

            <Button href="/resources" variant="outline" size="md">
              Read More Scriptures
            </Button>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
