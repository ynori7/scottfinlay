'use client';

import { useState } from 'react';
import PortfolioCard from '@/components/PortfolioCard';
import PortfolioModal from '@/components/PortfolioModal';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';

export default function PortfolioSection() {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2
            className="uppercase font-bold"
            style={{ fontSize: '40px', marginTop: 0, marginBottom: '15px', color: '#222' }}
          >
            Portfolio
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
            Here is some information about a few of my larger projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              onClick={() => setActiveItem(item)}
            />
          ))}
        </div>
      </div>

      {activeItem && (
        <PortfolioModal
          isOpen={true}
          onClose={() => setActiveItem(null)}
          title={activeItem.title}
          subtitle={activeItem.subtitle}
          image={activeItem.image}
          description={activeItem.description}
        />
      )}
    </section>
  );
}
