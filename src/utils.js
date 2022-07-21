import wiley from '@/images/logos/partners/wiley.png'
import cairn from '@/images/logos/partners/cairn.png'
import sage from '@/images/logos/partners/sage.png'
import emeraldinsight from '@/images/logos/partners/emeraldinsight.png'
import natgeo from '@/images/logos/partners/natgeo.jpg'
import taylor from '@/images/logos/partners/taylor.png'
import sae from '@/images/logos/partners/sae.png'
import eltech from '@/images/logos/partners/eltech.png'
import ebsco from '@/images/logos/partners/ebsco.png'
import cenage from '@/images/logos/partners/cenage.png'
import bmj from '@/images/logos/partners/bmj.jpg'
import almanhal from '@/images/logos/partners/almanhal.png'

export const partners = [
  {
    name: 'Reporting',
    summary: 'WILEY ONLINE LIBRARY.',
    description:
      'A Global Research business is a provider of content-enabled solutions to improve outcomes in research, education and professional practice with online tools, journals, books, databases, reference works and laboratory protocols. With strengths in every major academic, scientific and professional field, and strong brands including Wiley Blackwell and Wiley VCH, Wiley proudly partners with over 800 prestigious societies representing two million members.',
    image: wiley,
    icon: function ReportingIcon() {
      let id = useId()
      return (
        <>
          <defs>
            <linearGradient
              id={id}
              x1='11.5'
              y1={18}
              x2={36}
              y2='15.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='.194' stopColor='#fff' />
              <stop offset={1} stopColor='#6692F1' />
            </linearGradient>
          </defs>
          <path
            d='m30 15-4 5-4-11-4 18-4-11-4 7-4-5'
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </>
      )
    }
  },
  {
    name: 'Cairn',
    summary:
      'CAIRN.INFO',
    description:
      'A major French-language web portal, founded in 2005, containing scholarly materials in the humanities and social sciences. Much of the collection is in French, but it also includes an English-language international interface to facilitate use by non-francophones. Primary research areas include communications, economics, education, geography, history, literature, linguistics, philosophy, political science, law, psychology, sociology, and cultural studies.',
    image: cairn,
    icon: function InventoryIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z'
            fill='#fff'
          />
          <path
            opacity='.3'
            d='M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z'
            fill='#fff'
          />
          <path
            d='M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'Sage',
    summary:
      'SAGE PUBLICATION',
    description:
      'Was founded 50 years ago by Sara Miller McCune to support the dissemination of usable knowledge and educate a global community. SAGE now publishes over 800 books a year, over 900 journals – including those of more than 400 learned societies and institutions – across a broad range of subject areas encompassing business, humanities, social sciences, and science, technology, and medicine. Alongside this SAGE has a growing suite of innovative library products such as archives, data, case studies, video and the highly successful online tool SAGE Research Methods. SAGE remains majority-owned by our founder, who has ensured that the company will remain permanently independent.',
    image: sage,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'EMERALD INSIGHTS ',
    summary:
      'EMERALD INSIGHTS',
    description:
      'Emerald Group Publishing Limited is a scholarly publisher of academic journals and books in the fields of management, business, education, library studies, health care, and engineering. It was founded in the United Kingdom in 1967 and has its headquarters in Bingley. The company manages a portfolio of more than 300 journals and over 2650 books and book series volumes. It operates worldwide with offices and associates in Australia, Brazil, China, the Czech Republic, Dubai, India, Indonesia, Japan, Lithuania, Malaysia, Mexico, Singapore, South Africa, South Korea, Turkey, and the United States.',
    image: emeraldinsight,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'NATIONAL GEOGRAPHIC LEARNING',
    summary:
      'NATIONAL GEOGRAPHIC LEARNING',
    description:
      'A part of Cengage Learning, is a leading educational publisher of school, higher education, English Language Teaching, library and reference materials. At National Geographic Learning, we believe that an engaged and motivated learner will be a successful one, and we design our materials to motivate. We believe that learning can be exciting, inspiring, and transformational.',
    image: natgeo,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'TAYLOR AND FRANCIS',
    summary:
      'TAYLOR AND FRANCIS',
    description:
      'Taylor & Francis Group publishes quality peer-reviewed journals under the Routledge and Taylor & Francis imprints. Our journal content is hosted on Taylor & Francis Online, our content platform, where you can browse by subject, drill down to journal level to find the aims, scope and editorial board for each individual title and benefit from saved searching functionality.',
    image: taylor,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'SAE',
    summary:
      'SAE International',
    description:
      'A global association of engineers and related technical experts in the automotive, aerospace and commercial-vehicle industries. SAE’s core competencies are standards development and life-long learning, and through its charitable arm, the SAE Foundation, programs including A World in Motion® and the Collegiate Design Series are supported.',
    image: sae,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'ELTEACH',
    summary:
      'ELTEACH.',
    description:
      'An online, integrated Professional Development, Assessment, and Certificate program supporting teachers of English through coursework and assessments in:' +
      +' English-for-Teaching,' +
      ' Professional Knowledge for ELT' +
      'ELTeach is designed to ensure that teachers of English have the language and professional knowledge necessary to implement their national English curriculum successfully and confidently.',
    image: eltech,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'EBSCO',
    summary:
      'EBSCO',
    description:
      'EBSCO Information Services is a part of the information technology community, our needs are those of our customers. We’re dedicated to developing customizable services, supporting the technology needs of our customers and creating strong user experiences to help libraries and other institutions support their end users and improve access to information',
    image: ebsco,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'CENGAGE',
    summary:
      'CENGAGE',
    description:
      'For more than 60 years, Gale, a Cengage company has partnered with libraries around the world to empower the discovery of knowledge and insights by all people, for all purposes. Knowledge is power, and the act of learning is empowering. Access to knowledge offers learners an opportunity to discover the motivation and inspiration vital to making a positive contribution in not only their own lives, but the rest of the world. That’s why Gale provides libraries with original and curated content, as well as the modern research tools that are crucial in connecting libraries to learning, and learners to libraries.',
    image: cenage,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'British Medical Journal',
    summary:
      'British Medical Journal',
    description:
      'Started out over 170 years ago as a medical journal, publishing our first research paper on the treatment of squinting.\n' +
      'Now, as a global brand with a worldwide audience, we help medical organizations and clinicians tackle today’s most critical healthcare challenges. We do this by publishing the newest, cutting edge academic research, providing professional development solutions and creating clinical decision support tools.',
    image: bmj,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  },
  {
    name: 'Al MANHAL',
    summary:
      'Al MANHAL',
    description:
      'the leading Arabic electronic information provider. We are the world’s only provider of full-text searchable databases of scholarly and scientific publications from the Middle East, Africa & Asia’s. Al Manhal combines deep publishing and library expertise with best-in-class technology to enable university, government, corporate, school and public library users to efficiently discover and access thousands of eBooks, eJournals, eTheses, intelligence reports, and conference proceedings from the Middle East, Africa & Asia’s leading publishers and research institutes.',
    image: almanhal,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity='.5'
            d='M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z'
            fill='#fff'
          />
          <path
            d='M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z'
            fill='#fff'
          />
        </>
      )
    }
  }
]
