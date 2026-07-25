export default function Section({ children, className = '', id = '', as: Tag = 'section' }) {
  return (
    <Tag id={id} className={`py-24 md:py-32 ${className}`}>
      {children}
    </Tag>
  );
}
