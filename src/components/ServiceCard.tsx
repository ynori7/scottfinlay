import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ServiceCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div
        className="relative flex items-center justify-center rounded-full mb-5"
        style={{
          width: '112px',
          height: '112px',
          backgroundColor: '#ee3030',
          border: '7px solid #f1f1f1',
        }}
      >
        <FontAwesomeIcon icon={icon} size="3x" className="text-white" />
      </div>
      <h4
        className="mb-3 font-semibold text-[#222]"
        style={{ textTransform: 'none', fontSize: '18px' }}
      >
        {title}
      </h4>
      <p className="text-[#777]">{description}</p>
    </div>
  );
}
