
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={8}
        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200 disabled:opacity-50"
        {...props}
      />
    </div>
  );
};
