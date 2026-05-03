import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from '@/data/socials';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#222',
        backgroundImage: 'url(/img/map-image2.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2
            className="uppercase font-bold"
            style={{ fontSize: '40px', marginTop: 0, marginBottom: '15px', color: '#fff' }}
          >
            Contact Me
          </h2>
          <p
            style={{
              marginBottom: '75px',
              fontSize: '16px',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#aaa',
            }}
          >
            Send me an email at{' '}
            <a href="mailto:scott.p.finlay@gmail.com" className="text-[#ee3030] hover:text-[#c01010]">
              scott.p.finlay@gmail.com
            </a>
          </p>
        </div>

        <div className="flex justify-center">
          <ul className="flex flex-wrap justify-center gap-3 list-none m-0 p-0">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-[#ee3030]"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#222',
                    fontSize: '20px',
                  }}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
