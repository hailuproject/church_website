import { useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FieldWrapper } from './Input';

const FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
  'background',
  'align',
  'script',
  'clean',
];

export const RichEditor = ({ value, onChange, label, hint, error, placeholder, height = 200 }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link'],
        ['clean'],
      ],
    }),
    []
  );

  return (
    <FieldWrapper label={label} hint={hint} error={error}>
      <div style={{ height }} className="overflow-hidden rounded-lg">
        <ReactQuill
          theme="snow"
          value={value || ''}
          onChange={(html) => onChange?.(html)}
          placeholder={placeholder}
          modules={modules}
          formats={FORMATS}
          style={{ height: height - 42 }}
        />
      </div>
    </FieldWrapper>
  );
};

export default RichEditor;
