import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ value, onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  }

  function handleDrag(e) {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    handleFile(file);
  }

  if (value) {
    return (
      <div className="relative group">
        <img
          src={value}
          alt="Card"
          className="w-full h-48 object-contain rounded-xl bg-surface-100 dark:bg-surface-800"
        />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        >
          <X size={14} />
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
        >
          Replace
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
        dragActive
          ? 'border-primary-500 bg-primary-500/5'
          : 'border-surface-300 dark:border-surface-700 hover:border-primary-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
      <div className={`p-3 rounded-xl mb-2 ${dragActive ? 'bg-primary-500/10' : 'bg-surface-100 dark:bg-surface-800'}`}>
        {dragActive ? <Upload size={20} className="text-primary-500" /> : <ImageIcon size={20} className="text-surface-400" />}
      </div>
      <p className="text-sm font-medium text-surface-600 dark:text-surface-400">
        {dragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-xs text-surface-400 mt-1">PNG, JPG up to 5MB</p>
    </div>
  );
}
