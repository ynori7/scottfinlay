import { TimelineEntry } from '@/data/timeline';

interface TimelineItemProps {
  image?: string;
  imageAlt?: string;
  position: 'left' | 'right';
  entries: TimelineEntry[];
}

export default function TimelineItem({ image, imageAlt, position, entries }: TimelineItemProps) {
  const isInverted = position === 'right';
  const isGrouped = entries.length > 1;

  // Show company once as a header if all grouped entries share the same company
  const allSameCompany = isGrouped && entries.every(e => e.company === entries[0].company);
  const groupCompany = allSameCompany ? entries[0].company : undefined;
  const groupCompanyUrl = allSameCompany ? entries[0].companyUrl : undefined;

  return (
    <li className={isInverted ? 'timeline-inverted' : ''}>
      <div className="timeline-image">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt ?? ''} />
        ) : null}
      </div>
      <div className="timeline-panel">
        {groupCompany && (
          <div className="timeline-heading">
            <h4 className="font-bold text-[#777]">
              {groupCompanyUrl ? (
                <a href={groupCompanyUrl} target="_blank" rel="nofollow noreferrer">
                  {groupCompany}
                </a>
              ) : groupCompany}
            </h4>
          </div>
        )}
        {entries.map((entry, i) => (
          <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-gray-200' : ''}>
            <div className="timeline-heading">
              <h4 className="text-[#222] font-bold">{entry.date}</h4>
              <h4 className="font-bold text-[#777]">
                {entry.titleUrl ? (
                  <a href={entry.titleUrl} target="_blank" rel="noreferrer">
                    {entry.title}
                  </a>
                ) : entry.title}
                {!groupCompany && entry.company && (
                  <>
                    {' at '}
                    {entry.companyUrl ? (
                      <a href={entry.companyUrl} target="_blank" rel="nofollow noreferrer">
                        {entry.company}
                      </a>
                    ) : entry.company}
                  </>
                )}
              </h4>
            </div>
            {entry.description && (
              <div className="timeline-body">
                <p
                  className="text-[#777]"
                  dangerouslySetInnerHTML={{ __html: entry.description }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </li>
  );
}
