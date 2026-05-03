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
      'Years of experience in backend development in websites in PHP as well as frontend development with HTML/JavaScript/CSS. Years of experience building APIs and micro services with Golang, PHP, and Java in event-driven systems.',
  },
  {
    icon: faLaptop,
    title: 'Responsive Design',
    description:
      'Experience developing responsive websites for large media companies and for small personal web pages.',
  },
  {
    icon: faLock,
    title: 'Web Security',
    description:
      'I have a university degree in computer science with an emphasis in security and many years of practice in penetration testing.',
  },
];
