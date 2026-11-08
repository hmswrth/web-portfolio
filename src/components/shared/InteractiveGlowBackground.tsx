import React from 'react';

const InteractiveGlowBackground: React.FC = () => {
  return (
    <div className="interactive-glow-canvas" aria-hidden="true">
      {/* Floating chromatic ambient watercolor orbs for authentic light/dark frosted glass refraction */}
      <div className="aurora-orb aurora-orb-cyan" />
      <div className="aurora-orb aurora-orb-indigo" />
      <div className="aurora-orb aurora-orb-violet" />
      <div className="aurora-orb aurora-orb-emerald" />
      <div className="aurora-orb aurora-orb-amber" />
      {/* Multi-point watercolor mesh */}
      <div className="aurora-ambient-mesh" />
      {/* Crisp dotted matrix background overlay */}
      <div className="aurora-grid-overlay" />
    </div>
  );
};

export default React.memo(InteractiveGlowBackground);
