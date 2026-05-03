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
        <p>
          The project was discontinued in 2024.
        </p>
      </>
    ),
  },
  {
    id: 'credential-detector',
    title: 'Credential Detector',
    subtitle: 'Command-Line Security Tool',
    image: '/img/portfolio/credential-detector.png',
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
    id: 'hulksmash',
    title: 'Hulk Smash',
    subtitle: 'A very easy-to-use library for building a custom brute-force requester for QA purposes',
    image: '/img/portfolio/hulksmash.png',
    description: (
      <>
        <p>
          This is a very easy-to-use library for building a custom brute-force requester for QA purposes. This tool can be useful, for example, for performance and load testing 
          or for testing your rate-limiter. This tool automatically adds randomized headers to anonymize the request such as X-Forwarded-For and User-Agent.
        </p>
        <p>This tool is to be used only for benign purposes!</p>
        <p>
          You can checkout the code from my Git repository{' '}
          <a
            href="https://github.com/ynori7/hulksmash"
            target="_blank"
            rel="noreferrer nofollow"
          >
            here
          </a>.
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
  {
    id: 'draque',
    title: 'Draque',
    subtitle: 'An API surface intelligence tool that reconstructs real-world endpoints from logs, archives, and specs and generates high-quality test inputs for security analysis',
    image: '/img/portfolio/draque.png',
    description: (
      <>
        <p>
          Named after Sir Francis Drake (a.k.a. El Draque), the famous privateer and explorer, this security exploration 
          tool allows you to explore an API ecosystem for security testing purposes.
        </p>
        <p>
          Features:
        </p>
        <ul className="list-disc pl-6 text-left mb-8 space-y-2">
          <li>Find historical endpoints via the Wayback Machine's API</li>
          <li>Find endpoints via log files</li>
          <li>Find and understand endpoints from Swagger docs</li>
          <li>Take all known endpoints from all sources, group them together by route, collect relevant IDs, and automatically infer valid input data for similar endpoints.</li>
          <li>Analyze top routes and top parameters with examples for each.</li>
        </ul>
        <p>
          You can checkout the code from my Git repository{' '}
          <a
            href="https://github.com/ynori7/draque"
            target="_blank"
            rel="noreferrer nofollow"
          >
            here
          </a>.
        </p>
      </>
    ),
  },
  {
    id: 'susanfinlaywrites',
    title: 'Susan Finlay Writes',
    subtitle: 'Fiction Author Website',
    image: '/img/portfolio/susanfinlay.png',
    description: (
      <p>
        <a href="https://www.susanfinlay.com/" target="_blank" rel="noreferrer">
          Susan Finlay Writes
        </a>{' '}
        is a website with information, news, blog posts, and updates about mystery author Susan Finlay. Here you can find
        all of the novels she&apos;s published and also a bit about her inspiration as well as news updates
        related to her writing.
      </p>
    ),
  },
    {
    id: 'aiheartproject',
    title: 'AI Heart Project',
    subtitle: 'Website for the AI HEART Project',
    image: '/img/portfolio/aiheartproject.png',
    description: (
      <>
        <p>
          The{' '}
          <a href="https://yasmin-fy.github.io/ai-heart-project/" target="_blank" rel="noreferrer">
            AI HEART Project
          </a>{' '}
          was founded with the common goal of safe artificial intelligence for everyone. The project team believes that 
          AI offers great potential to improve the world and to enhance life quality for everyone. However, there are 
          clear risks associated with this advance in technology and the way it is being implemented. These risks, however, 
          can be mitigated if they&#x27;re given appropriate attention. The project's goal is to ensure that AI is safe for people 
          of all ages, races, and backgrounds, including vulnerable and under-represented populations.
      </p>
      <p>
        My involvement in the project primarily involves technical support including building the website and providing technical 
          expertise for the project&#x27;s various initiatives. You can check out the code for the website{' '}
          <a href="https://github.com/Yasmin-FY/ai-heart-project" target="_blank" rel="noreferrer">
            here
          </a>.
      </p>
    </>
    ),
  },
];
