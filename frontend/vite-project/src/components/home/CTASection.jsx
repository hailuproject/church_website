import Container from '../Container';
import AnimatedSection from '../AnimatedSection';
import Button from '../Button';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-6 block">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join Our Church Family
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re seeking spiritual growth, worship, or fellowship, we welcome
              you with open hearts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Plan Your Visit
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
