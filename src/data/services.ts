import { faCogs, faLaptop, faLock } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ServiceItem {
  icon: IconDefinition;
  title: string;
  description: string;
}

export const serviceItems: ServiceItem[] = [
  {
    icon: faCogs,
    title: 'Backend Development',
    description:
      'Over a decade of experience building APIs and microservices with Golang, PHP, and Java in large-scale event-driven systems. Many years of experience in backend development of websites in PHP and Go as well as frontend development with HTML/JavaScript/CSS.',
  },
  {
    icon: faLaptop,
    title: 'Responsive Design',
    description:
      'Experience developing responsive websites for large media companies and for small personal web pages.',
  },
  {
    icon: faLock,
    title: 'Application Security',
    description:
      'I have a university degree in computer science with an emphasis in security and many years of practice in penetration testing, cyber incident response, forensic investigations, and application security.',
  },
];
