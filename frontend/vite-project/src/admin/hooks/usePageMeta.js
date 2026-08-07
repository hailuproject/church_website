import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_TITLES } from '../constants/navigation';

export const usePageMeta = (title) => {
  const location = useLocation();
  useEffect(() => {
    const page = title || PAGE_TITLES[location.pathname] || 'Admin';
    document.title = `${page} | Church CMS`;
  }, [title, location.pathname]);
};
