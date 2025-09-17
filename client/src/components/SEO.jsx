import { Helmet } from 'react-helmet';

const SEO = ({
  title = 'Guyu Chat - Chat Bebas, Tanpa Drama',
  description = 'Platform chat aman dan privat untuk berkomunikasi bebas tanpa khawatir. End-to-end encryption, real-time messaging, dan desain modern. 100% gratis!',
  keywords = 'chat, messaging, privat, aman, end-to-end encryption, real-time, gratis, indonesia',
  image = '/logo.webp', // harus ada di public/
  url = 'https://guyuchat.vercel.app',
  type = 'website',
  siteName = 'Guyu Chat',
  locale = 'id_ID',
  twitterHandle = '@guyuchat',
  canonical,
  noindex = false,
  nofollow = false,
  additionalMetaTags = [],
}) => {
  const fullTitle = title.includes('Guyu Chat') ? title : `${title} | Guyu Chat`;
  const currentUrl = canonical || (typeof window !== 'undefined' ? `${url}${window.location.pathname}` : url);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* meta keywords udah ga dipake Google, tapi ga masalah kalau mau ditambah */}
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Robots Meta */}
      {(noindex || nofollow) && <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Language & Region */}
      <meta name="language" content="id" />
      <meta name="geo.region" content="ID" />
      <meta name="geo.country" content="ID" />

      {/* Additional Custom Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: siteName,
            url: url,
            description: description,
            applicationCategory: 'ChatApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${url}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          null,
          2
        )}
      </script>
    </Helmet>
  );
};

export default SEO;
