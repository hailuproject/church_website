import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import Accordion from '../common/Accordion';
import { faqs } from '../../data/homeData';

export default function FAQSection() {
  return (
    <Section id="faq" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Questions"
          title="Frequently Asked Questions"
          description="Find quick answers to the most common questions about our church."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </Container>
    </Section>
  );
}
