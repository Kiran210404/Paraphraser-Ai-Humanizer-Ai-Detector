
import React from 'react';
import { Spinner } from './Spinner';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <button
      className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-sky-600 rounded-lg shadow-lg hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span className="ml-2">Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
