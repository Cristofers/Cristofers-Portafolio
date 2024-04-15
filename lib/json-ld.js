export const getPersonJsonLd = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    url: 'https://zenorocha.com/',
    affiliation: [
      {
        '@type': 'Organization',
        '@id': 'https://www.wikidata.org/wiki/Q123921042',
        url: 'https://resend.com/',
        name: 'Resend',
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.wikidata.org/wiki/Q2616400',
        url: 'https://www.ycombinator.com/',
        name: 'Y Combinator',
      },
    ],
    description: 'Cristofers Valdez Quintin',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Zeno_Rocha.png',
    name: 'Cristofers Valdez Quitin',
    givenName: 'Cristofers',
    familyName: 'Valdez Quitin',
    gender: 'Male',
    birthPlace: 'Bani',
    jobTitle: '',
    sameAs: [],
    knowsAbout: [],
    knowsLanguage: [
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q1321',
        name: 'Español',
      },
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q1860',
        name: 'English',
      },
    ],
    nationality: [
      {
        '@type': 'Country',
        '@id': 'https://www.wikidata.org/wiki/Q155',
        name: 'Dominicano',
      },
    ],
  }
}
