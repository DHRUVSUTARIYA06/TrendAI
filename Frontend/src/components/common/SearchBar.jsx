import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search templates, users, actions...',
  style = {},
  className = ''
}) {
  return (
    <div
      className={`admin-search-bar ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '360px',
        ...style
      }}
    >
      <Search
        size={16}
        color="var(--text-muted)"
        style={{
          position: 'absolute',
          left: '14px',
          pointerEvents: 'none'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: '40px',
          paddingRight: '14px',
          height: '42px',
          backgroundColor: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          fontSize: '13px',
          color: 'var(--text-primary)',
          width: '100%'
        }}
      />
    </div>
  );
}
