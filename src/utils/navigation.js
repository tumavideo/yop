import assets from '../images/assets'

export const sidebarNav = [
  {
    name: 'Skills',
    alt: 'Acquire Skills',
    description:
      'Once a skill gap has been identifed, develop and hone these skills',
    href: '/education',
    icon: assets.Skills,
    altIcon: assets.SkillsWhite,
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
    altIcon: assets.MoneyWhite,
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
    altIcon: assets.VectorWhite,
    iconColor: 'bg-green-500',
    current: false,
  },
  {
    name: 'Market',
    alt: 'Market Place',
    description: 'Linking sellers to buyers.',
    href: '/marketplace',
    icon: assets.Market,
    altIcon: assets.MarketWhite,
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
    altIcon: assets.JobsWhite,
    iconColor: 'bg-blue-500',
    current: false,
  },
  {
    name: 'Success Stories',
    alt: 'Testimonials',
    description: 'Hear from others, about their experience with our platform.',
    href: '/success-stories',
    icon: assets.Company,
    altIcon: assets.CompanyWhite,
    iconColor: 'bg-blue-500',
    current: false,
  },
  // { name: 'Profile', href: '/settings', icon: assets.CogIcon, current: false },
]

export const secondaryNavigation = [
  { name: 'Help', href: '#', icon: assets.QuestionMarkCircleIcon },
]
