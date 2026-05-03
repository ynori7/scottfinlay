interface HeroProps {
  leadIn: string;
  heading: string;
}

export default function Hero({ leadIn, heading }: HeroProps) {
  return (
    <header
      id="page-top"
      className="relative text-center text-white"
      style={{
        backgroundImage: 'url(/img/code-bg4.png)',
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className="py-24 md:py-48"
          style={{ paddingTop: '100px', paddingBottom: '50px' }}
        >
          <p
            className="mb-6 italic"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(22px, 4vw, 40px)',
              lineHeight: '1.2',
            }}
          >
            {leadIn}
          </p>
          <h1
            className="mb-6 font-bold uppercase"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(50px, 8vw, 75px)',
              lineHeight: '1',
              color: '#fff',
            }}
          >
            {heading}
          </h1>
        </div>
      </div>
    </header>
  );
}
