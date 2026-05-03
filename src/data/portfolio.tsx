import React from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: React.ReactNode;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'valhalla',
    title: 'Halls of Valhalla',
    subtitle: 'IT Website',
    image: '/img/portfolio/valhalla1.jpg',
    description: (
      <>
        <p>
          Valhalla is a place where users can submit code, articles, and news. The site also provides an
          extensive list of affiliates with a list of tags so users can find other similar sites which offer
          exactly what they&apos;re looking for. Valhalla also has an interactive forum with over 2000 registered
          users and{' '}
          <a href="http://halls-of-valhalla.org/beta/irc" target="_blank" rel="noreferrer">
            IRC
          </a>{' '}
          channel so it&apos;s easy to get help with technical questions and to connect with other IT professionals.
        </p>
        <p>
          The site also has a large collection of original IT security and development related challenges where
          you can test your skills and learn about new concepts. There are nearly one hundred challenges in a
          variety of categories ranging from code-debugging to SQL injection to electrical engineering.
        </p>
      </>
    ),
  },
  {
    id: 'credential-detector',
    title: 'Credential Detector',
    subtitle: 'Command-Line Security Tool',
    image: '/img/portfolio/credential-detector.jpeg',
    description: (
      <>
        <p>
          Credential Detector is a simple command that allows you to scan projects to detect potentially
          hard-coded credentials. This highly configurable tool scans a multitude of file types searching for
          potential credentials. It reports suspiciously named variables (excluding variables whose value
          indicates that it&apos;s obviously test data or some constant such as a header name). It additionally
          searches code comments and various configuration files. The scanner can also detect private key and
          certificate files.
        </p>
        <p>
          Check it out on{' '}
          <a href="https://github.com/ynori7/credential-detector" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'core-utils-lib',
    title: 'Valhalla Core Utils Library',
    subtitle: 'PHP Utilities Library',
    image: '/img/portfolio/core-utils-lib1.jpg',
    description: (
      <>
        <p>
          This is a project intended to supply useful utility classes to ensure that you do not need to reinvent
          the wheel in each of your projects. The project has utilities including: Memcached, cURL, Basic HTTP
          Requests (for non-cURL requests), Array Utilities, Cross-site request forgery tokens, Session, PDO SQL
          database connection, Pagination, and JSON Config Handler, and much more.
        </p>
        <p>
          You can checkout the code from my Git repository{' '}
          <a
            href="https://bitbucket.org/ynori7/valhalla-core-utils-lib/overview"
            target="_blank"
            rel="noreferrer nofollow"
          >
            here
          </a>{' '}
          and take a look at the documentation{' '}
          <a href="http://core-utils.halls-of-valhalla.org/" target="_blank" rel="noreferrer nofollow">
            here
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'ip-info',
    title: 'IP-Info',
    subtitle: 'Networking Information Website',
    image: '/img/portfolio/ip-info1.png',
    description: (
      <p>
        <a href="https://www.ip-info.xyz" target="_blank" rel="noreferrer">
          IP-Info
        </a>{' '}
        is a website where you can find out what your IP is as well as your user agent and information about
        your browser and OS. The site also has tools for looking up information about a particular IP and
        reverse DNS lookups. There is also a tool for checking if a site is down or not and numerous
        informative articles.
      </p>
    ),
  },
  {
    id: 'scottfinlayauthor',
    title: 'Scott Finlay Author',
    subtitle: 'Fiction Author Website',
    image: '/img/portfolio/scottfinlayauthor.png',
    description: (
      <p>
        <a href="https://www.scottfinlayauthor.com" target="_blank" rel="noreferrer">
          Scott Finlay Author
        </a>{' '}
        is a website with information, news, and updates about myself as a fiction author. Here you can find
        all of the novels I&apos;ve published and also a bit about my inspiration as well as news updates
        related to my writing.
      </p>
    ),
  },
];
