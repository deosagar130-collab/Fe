// Fake.jsxx — intentionally nonstandard extension for testing
// A tiny React-like component (JSX) exported as default.
// Note: .jsxx is nonstandard; your tooling may not process it automatically.

import React from 'react';

export default function Fake() {
  return (
    <div className="fake-component" style={{padding: '1rem', border: '1px dashed #999'}}>
      <h3>Todo.jsxx Component</h3>
      <p>This is a fake component file with a nonstandard <code>.jsxx</code> extension.</p>
    </div>
  );
}
