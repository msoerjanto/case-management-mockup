import React from 'react';

export function Textarea(props) {
  return (
    <textarea
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      {...props}
    />
  );
}
