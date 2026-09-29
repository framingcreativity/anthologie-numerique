import { useEffect } from 'react';

import {
  canonicalUrl,
} from '../lib/site';

type PageMetaProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  robots?: string;
};

function ensureMeta(
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  value: string,
) {
  let element =
    document.head.querySelector<HTMLMetaElement>(
      selector,
    );

  if (!element) {
    element =
      document.createElement('meta');

    element.setAttribute(
      attribute,
      key,
    );

    document.head.appendChild(
      element,
    );
  }

  element.setAttribute(
    'content',
    value,
  );
}

export default function PageMeta({
  title,
  description,
  canonicalPath,
  robots = 'index,follow',
}: PageMetaProps) {
  useEffect(
    () => {
      document.documentElement.lang =
        'fr';

      document.title =
        title;

      ensureMeta(
        'meta[name="description"]',
        'name',
        'description',
        description,
      );

      ensureMeta(
        'meta[name="robots"]',
        'name',
        'robots',
        robots,
      );

      ensureMeta(
        'meta[property="og:title"]',
        'property',
        'og:title',
        title,
      );

      ensureMeta(
        'meta[property="og:description"]',
        'property',
        'og:description',
        description,
      );

      ensureMeta(
        'meta[property="og:type"]',
        'property',
        'og:type',
        'website',
      );

      if (canonicalPath) {
        ensureMeta(
          'meta[property="og:url"]',
          'property',
          'og:url',
          canonicalUrl(
            canonicalPath,
          ),
        );

        let canonical =
          document.head.querySelector<HTMLLinkElement>(
            'link[rel="canonical"]',
          );

        if (!canonical) {
          canonical =
            document.createElement(
              'link',
            );

          canonical.rel =
            'canonical';

          document.head.appendChild(
            canonical,
          );
        }

        canonical.href =
          canonicalUrl(
            canonicalPath,
          );
      } else {
        document.head
          .querySelector(
            'meta[property="og:url"]',
          )
          ?.remove();

        document.head
          .querySelector(
            'link[rel="canonical"]',
          )
          ?.remove();
      }
    },
    [
      title,
      description,
      canonicalPath,
      robots,
    ],
  );

  return null;
}
