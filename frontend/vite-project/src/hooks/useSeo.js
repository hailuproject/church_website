import { useEffect } from 'react';
import { useChurch } from './useHomeSections';

const setMetaDescription = (description) => {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', description);
};

export const useSeo = ({ title = '', description = '' } = {}) => {
  const church = useChurch();
  const churchName = church.name || 'Holy Trinity – Gebre Christos Church';

  useEffect(() => {
    document.title = title ? `${title} | ${churchName}` : churchName;
    if (description) setMetaDescription(description);
  }, [title, description, churchName]);
};
