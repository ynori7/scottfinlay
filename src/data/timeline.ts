export interface TimelineEntry {
  date: string;
  title: string;
  titleUrl?: string;
  company?: string;
  companyUrl?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  position: 'left' | 'right';
}

export const timelineEntries: TimelineEntry[] = [
  {
    date: '2011–2012',
    title: 'Application Developer',
    company: 'Oracle',
    companyUrl: 'https://www.oracle.com/industries/retail/index.html',
    description:
      'Developed new features for Oracle\'s Retail Invoice Matching Software and developed. Performed static code analysis with Fortify and implemented extensive security measures and patches. Worked with Java Development Frameworks, e.g. Spring and Struts, and JSP to develop web applications.',
    image: '/img/cv/logo-oracle1.jpg',
    imageAlt: 'Oracle',
    position: 'left',
  },
  {
    date: '2011',
    title: 'Launched halls-of-valhalla.org',
    titleUrl: 'http://halls-of-valhalla.org',
    description:
      'Launched a self-owned and operated website called Halls of Valhalla. The site expanded over time to eventually include news, articles, code snippets, a forum, education challenges, and more. All backend development, frontend development, design, and system administration is handled by myself.',
    image: '/img/cv/logo-valhalla.jpg',
    imageAlt: 'Valhalla',
    position: 'right',
  },
  {
    date: '2012–2013',
    title: 'Software Developer',
    company: 'HYVE AG',
    companyUrl: 'https://www.hyve.net/',
    description:
      'Backend and frontend development for websites for idea contests in PHP, JavaScript, and HTML/CSS. Performed penetration tests on Hyve\'s various platforms to ensure they were up to standards. Proofread English texts. Gave presentations on security and testing (i.e. unit and integration tests).',
    image: '/img/cv/logo-hyve.jpg',
    imageAlt: 'Hyve',
    position: 'left',
  },
  {
    date: '2013–2015',
    title: 'PHP Developer',
    company: 'CHIP Digital GmbH',
    companyUrl: 'http://www.chip.de',
    description:
      'Backend (primarily PHP) for one of Germany\'s largest <a href="http://beste-apps.chip.de" target="_blank" rel="nofollow">app advisors</a>. Also did backend development for one of the largest price comparison sites in the country.',
    image: '/img/cv/logo-chip.jpg',
    imageAlt: 'Chip',
    position: 'right',
  },
  {
    date: '2015–2016',
    title: 'Senior Software Developer',
    company: 'CHIP Digital GmbH',
    companyUrl: 'http://www.chip.de',
    description:
      'Backend (primarily PHP) and frontend (HTML, JavaScript, CSS) development for the largest download portal in Germany. Completely rebuilt the downloads section, both backend and frontend. Additionally worked on Chip\'s downloader application for the desktop. Performed security reviews and implemented numerous fixes and standards for frontend security issues.',
    image: '/img/cv/logo-chip.jpg',
    imageAlt: 'Chip',
    position: 'right',
  },
  {
    date: '2016–2019',
    title: 'Manager Software Development',
    company: 'Sixt SE',
    companyUrl: 'https://www.sixt.com/',
    description:
      'Created microservices and APIs in Go using an eventsourcing architecture and asynchronous techniques for Sixt\'s CRM components. Worked with focus on concurrency, performance, and test-driven development.',
    image: '/img/cv/logo-sixt.png',
    imageAlt: 'Sixt',
    position: 'left',
  },
  {
    date: '2019–2021',
    title: 'Software Development Engineer III',
    company: 'Sixt SE',
    companyUrl: 'https://www.sixt.com/',
    description:
      "Architected and implemented the backend (in Golang microservices) for Sixt's Fastlane product, allowing customers to select their vehicle, start their rental, and unlock the car using the Sixt app. Served as the architect for the Reservation team working to modernize the product.",
    image: '/img/cv/logo-sixt.png',
    imageAlt: 'Sixt',
    position: 'left',
  },
  {
    date: '2021–2023',
    title: 'Staff Engineer',
    company: 'Sixt SE',
    companyUrl: 'https://www.sixt.com/',
    description:
      "Architected and implemented the backend (in Golang microservices) for Sixt's new third party API, allowing external partners to integrate with Sixt's rental products. Regularly represented Sixt towards external business partners, serving as the technical contact person. Served as the technical lead and architect for the digital checkout initiative. Helped to drive a new security community of practice while designing and developing frameworks for common security patterns such as rate limiting. Together with other tech leads, developed organization-wide backend NFRs.",
    image: '/img/cv/logo-sixt.png',
    imageAlt: 'Sixt',
    position: 'left',
  },
  {
    date: '2023–2026',
    title: 'Senior Staff Engineer',
    company: 'Sixt SE',
    companyUrl: 'https://www.sixt.com/',
    description:
      "Architect for multiple development teams. Led a new application security team, designing security best practices, performing vendor evaluations, providing frameworks, and performing security consultations and penetration tests. Designed and built in-house automated security scanners to proactively and automatically detect common security issues such as insufficient access controls and hardcoded credentials.",
    image: '/img/cv/logo-sixt.png',
    imageAlt: 'Sixt',
    position: 'left',
  },
    {
    date: '2026-NOW',
    title: 'Senior Staff Software & Security Engineer',
    company: 'Sixt SE',
    companyUrl: 'https://www.sixt.com/',
    description:
      "Independently deliver and collaborate on high-impact, complex engineering efforts while improving and maintaining the software ecosystem. Actively mentor engineers and provide deep technical guidance to Directors, VPs, and the CTO through design and implementation work. Create and drive application and product security initiatives, including secure code reviews, threat modeling, vulnerability analysis, and remediation; proactively identify and mitigate risks, and participate in security incident detection and response. Implement, scale, and operate application and product security frameworks and tooling, integrating security controls into development workflows, CI/CD pipelines, and runtime environments.",
    image: '/img/cv/logo-sixt.png',
    imageAlt: 'Sixt',
    position: 'left',
  },
];
