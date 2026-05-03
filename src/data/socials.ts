import {
  faFacebook,
  faGithub,
  faLinkedin,
  faXing,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: faXTwitter,
    href: 'https://x.com/SFinlayAuthor',
    label: 'X (Twitter)',
  },
  {
    icon: faFacebook,
    href: 'https://www.facebook.com/scott.finlay.94',
    label: 'Facebook',
  },
  {
    icon: faLinkedin,
    href: 'https://www.linkedin.com/pub/scott-finlay/4b/316/356',
    label: 'LinkedIn',
  },
  {
    icon: faXing,
    href: 'https://www.xing.com/profile/Scott_Finlay4',
    label: 'Xing',
  },
  {
    icon: faGithub,
    href: 'https://github.com/ynori7',
    label: 'GitHub',
  },
];
