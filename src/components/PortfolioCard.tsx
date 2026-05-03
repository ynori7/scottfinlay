import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface PortfolioCardProps {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}

export default function PortfolioCard({ title, subtitle, image, onClick }: PortfolioCardProps) {
  return (
    <div className="portfolio-item mb-4 md:mb-6">
      <button
        onClick={onClick}
        className="group relative block w-full max-w-[400px] mx-auto cursor-pointer bg-transparent border-none p-0"
        aria-label={`View details for ${title}`}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(238, 48, 48, 0.9)' }}
        >
          <FontAwesomeIcon icon={faPlus} size="3x" className="text-white" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full block" />
      </button>
      <div
        className="max-w-[400px] mx-auto text-center px-6 py-6 bg-white"
      >
        <h4 className="m-0 text-[#222] font-bold" style={{ textTransform: 'none' }}>
          {title}
        </h4>
        <p className="m-0 italic text-[#777]" style={{ fontSize: '16px' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
