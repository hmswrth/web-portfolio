import React from 'react';

const InteractiveGlowBackground = () => {
  return (
    <div className="interactive-glow-canvas" aria-hidden="true">
      {/* Original dotted grid overlay without any background glow orbs */}
      <div className="aurora-grid-overlay" />
    </div>
  );
};

export default React.memo(InteractiveGlowBackground);
