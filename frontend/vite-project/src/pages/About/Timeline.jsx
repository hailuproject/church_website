import TimelineItem from './TimelineItem';

export default function Timeline({ events }) {
  return (
    <div className="relative" role="list" aria-label="Church history timeline">
      {/* Vertical line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/60 via-secondary/30 to-secondary/10 md:-translate-x-px"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-12 md:gap-16">
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
