// Fake component — same functionality and output, rewritten for style only.
// The UI and behavior are unchanged; just a different code structure.

import React, { memo, useMemo } from 'react'

function Fake() {
  // Extract style to a memoized object (no behavior change)
  const containerStyle = useMemo(
    () => ({ padding: '1rem', border: '1px dashed #999' }),
    []
  )

  return (
    <section className='fake-component' style={containerStyle}>
      <header>
        <h3>Fake.jsxx Component</h3>
      </header>
      <p>
        This is a fake component file with a nonstandard <code>.jsxx</code>
        extension.
      </p>
    </section>
  )
}

// Wrap in memo to avoid re-renders when props/state don't change (logic intact)
export default memo(Fake)
