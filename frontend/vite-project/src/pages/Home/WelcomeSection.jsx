import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AnimatedSection from '../../components/AnimatedSection';
import Button from '../../components/Button';
import { FiCheck } from 'react-icons/fi';
import { welcomeData } from '../../data/homeData';

export default function WelcomeSection() {
  return (
    <Section id="welcome" className="bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-xs" />
              <img
                src={welcomeData.image}
                alt="Ethiopian Orthodox Church interior"
                className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-xs shadow-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-3 rounded-xs shadow-lg">
                <span className="text-sm font-semibold">Est. 4th Century</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="flex flex-col gap-6">
              <SectionHeader
                subtitle="Welcome"
                title={welcomeData.title}
                align="left"
              />
              <p className="text-muted leading-relaxed">
                {welcomeData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {welcomeData.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xs bg-primary/10 flex items-center justify-center shrink-0">
                      <FiCheck className="text-sm text-primary" />
                    </div>
                    <span className="text-sm font-medium text-text">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Button href="/about" variant="primary">
                  About Us
                </Button>
                <Button href="/contact" variant="outline-dark">
                  Contact Us
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
