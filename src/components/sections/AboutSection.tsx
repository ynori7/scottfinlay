import ServiceCard from '@/components/ServiceCard';
import { serviceItems } from '@/data/services';

export default function AboutSection() {
  return (
    <section id="about" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2
            className="section-heading uppercase font-bold"
            style={{ fontSize: '40px', marginTop: 0, marginBottom: '15px', color: '#222' }}
          >
            About Me
          </h2>
          <p
            className="mx-auto max-w-2xl"
            style={{
              marginBottom: '75px',
              fontSize: '16px',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#777',
            }}
          >
            I&apos;m a software developer from the United States currently living in Germany. I studied
            computer science at the{' '}
            <a href="https://twin-cities.umn.edu/" target="_blank" rel="nofollow noreferrer">
              University of Minnesota
            </a>{' '}
            with an emphasis in security. I enjoy writing code, writing technical articles, learning new things, and solving problems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((item) => (
            <ServiceCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
