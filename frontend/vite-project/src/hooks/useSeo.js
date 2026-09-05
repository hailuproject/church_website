import { useEffect } from 'react';
import { useChurch } from './useHomeSections';

const setOrCreateMeta = (attrName, attrValue, content) => {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setOrCreateLink = (rel, href) => {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const removeStructuredData = () => {
  document.querySelectorAll('script[data-seo-type="jsonld"]').forEach((el) => el.remove());
};

export const useSeo = ({ title = '', description = '', path, schema = null } = {}) => {
  const church = useChurch();
  const churchName = church.name || 'Holy Trinity – Gebre Christos Church';
  const defaultDescription =
    church.footerText ||
    'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church in Inglewood, CA. Join us for worship and fellowship.';

  useEffect(() => {
    // Default to the actual route so og:url/canonical always match the page.
    const fullPath = path || window.location.pathname;
    // The homepage is the root URL; keep trailing-slash behaviour tidy.
    const canonicalPath = fullPath === '/' ? '/' : fullPath.replace(/\/+$/, '') || '/';
    const canonicalUrl = `${window.location.origin}${canonicalPath}`;

    const fullTitle = title ? `${title} | ${churchName}` : churchName;
    const metaDesc = description || defaultDescription;
    // Always resolve a shareable, absolute image.
    const ogImage =
      church.logo || `${window.location.origin}/images/hero.webp`;

    document.title = fullTitle;

    // Basic meta
    setOrCreateMeta('name', 'description', metaDesc);

    // Open Graph
    setOrCreateMeta('property', 'og:title', fullTitle);
    setOrCreateMeta('property', 'og:description', metaDesc);
    setOrCreateMeta('property', 'og:type', 'website');
    setOrCreateMeta('property', 'og:url', canonicalUrl);
    setOrCreateMeta('property', 'og:site_name', churchName);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('property', 'og:locale', 'en_US');
    setOrCreateMeta('property', 'og:locale:alternate', 'am_ET');

    // Twitter
    setOrCreateMeta('name', 'twitter:title', fullTitle);
    setOrCreateMeta('name', 'twitter:description', metaDesc);
    setOrCreateMeta('name', 'twitter:card', 'summary');
    setOrCreateMeta('name', 'twitter:image', ogImage);

    // Canonical
    setOrCreateLink('canonical', canonicalUrl);

    // Structured data (JSON-LD)
    removeStructuredData();
    const addSchema = (data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoType = 'jsonld';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    if (schema) {
      addSchema(schema);
    } else if (canonicalPath === '/') {
      // Homepage: Church organization schema.
      addSchema({
        '@context': 'https://schema.org',
        '@type': 'Church',
        name: churchName,
        image: church.logo || ogImage,
        telephone: church.phone || '',
        email: church.email || '',
        address: church.address
          ? {
              '@type': 'PostalAddress',
              streetAddress: typeof church.address === 'object' ? church.address.street : church.address,
              addressLocality: typeof church.address === 'object' ? church.address.city : '',
              addressRegion: typeof church.address === 'object' ? church.address.region : '',
              addressCountry: 'US',
            }
          : undefined,
        url: canonicalUrl,
      });
    } else {
      // Other pages: WebPage + BreadcrumbList.
      addSchema({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description: metaDesc,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', name: churchName, url: window.location.origin },
      });
      addSchema({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: title || churchName, item: canonicalUrl },
        ],
      });
    }
  }, [
    title,
    description,
    path,
    schema,
    churchName,
    defaultDescription,
    church?.logo,
    church?.phone,
    church?.email,
    church?.address,
  ]);

  return null;
};
