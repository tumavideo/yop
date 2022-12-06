import { ChevronRightIcon } from '@heroicons/react/solid'

import {
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  CommandLineIcon,
  MegaphoneIcon,
} from '@heroicons/react/outline'

import assets from '../images/assets'

export const sidebarNav = [
  {
    name: 'Skills',
    alt: 'Acquire Skills',
    description:
      'Once a skill gap has been identifed, develop and hone these skills',
    href: '/education',
    icon: assets.Skills,
    iconColor: 'bg-yellow-500',
    current: false,
  },
  {
    name: 'Finance',
    alt: 'Access Finance',
    description:
      'Access to funding for start-ups, business growth, skills and career training bursaries.',
    href: '/finance',
    icon: assets.Money,
    iconColor: 'bg-red-500',
    current: false,
  },
  {
    name: 'Careers',
    alt: 'Business & Career Development',
    description:
      'Provide business support to start-up’s and established MSMEs in form of capacity building and training, on-the-job coaching, mentorship and hands-on advisory services.',
    href: '/careers',
    icon: assets.Vector,
    iconColor: 'bg-green-500',
    current: false,
  },
  {
    name: 'Market',
    alt: 'Market Place',
    description: 'Linking sellers to buyers.',
    href: '/marketplace',
    icon: assets.Market,
    iconColor: 'bg-purple-500',
    current: false,
  },
  {
    name: 'Jobs',
    alt: 'Jobs',
    description:
      'Find jobs and employees. Match interests, work values and skills with the world of work, as well as, hire people that fit your criteria.',
    href: '/jobs',
    icon: assets.Jobs,
    iconColor: 'bg-blue-500',
    current: false,
  },
  {
    name: 'Companies',
    alt: 'Companies',
    description:
      'Find companies and employees. Match interests, work values and skills with the world of work, as well as, hire people that fit your criteria.',
    href: '/companies',
    icon: assets.Jobs,
    iconColor: 'bg-blue-500',
    current: false,
  },
  // { name: 'Profile', href: '/settings', icon: assets.CogIcon, current: false },
]

export const secondaryNavigation = [
  { name: 'Help', href: '#', icon: assets.QuestionMarkCircleIcon },
]
