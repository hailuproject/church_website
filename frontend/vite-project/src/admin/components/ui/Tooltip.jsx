import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);

  const show = () => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + 6,
        left: Math.min(rect.left + rect.width / 2, window.innerWidth - 60),
      });
    }
    setVisible(true);
  };

  return (
    <>
      <span ref={targetRef} onMouseEnter={show} onMouseLeave={() => setVisible(false)} className="inline-flex">
        {children}
      </span>
      {visible &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
