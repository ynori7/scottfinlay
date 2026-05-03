import TimelineItem from '@/components/TimelineItem';
import TimelineEndMarker from '@/components/TimelineEndMarker';
import { timelineEntries, TimelineEntry } from '@/data/timeline';

interface TimelineGroup {
  image?: string;
  imageAlt?: string;
  position: 'left' | 'right';
  entries: TimelineEntry[];
}

function groupTimelineEntries(entries: TimelineEntry[]): TimelineGroup[] {
  const groups: TimelineGroup[] = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.image && last.image === entry.image) {
      last.entries.push(entry);
    } else {
      groups.push({
        image: entry.image,
        imageAlt: entry.imageAlt,
        position: entry.position,
        entries: [entry],
      });
    }
  }
  return groups;
}

export default function CVSection() {
  const groups = groupTimelineEntries(timelineEntries);

  return (
    <section id="cv">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2
            className="uppercase font-bold"
            style={{ fontSize: '40px', marginTop: 0, marginBottom: '15px', color: '#222' }}
          >
            Curriculum Vitae
          </h2>
          <p
            style={{
              marginBottom: '75px',
              fontSize: '16px',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#777',
            }}
          >
            Here is a short list of my major accomplishments
          </p>
        </div>
        <ul className="timeline">
          {groups.map((group, index) => (
            <TimelineItem key={index} {...group} />
          ))}
          <TimelineEndMarker />
        </ul>
      </div>
    </section>
  );
}
