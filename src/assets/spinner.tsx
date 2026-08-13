import { motion } from 'motion/react'
export function PulsingRing({ size = 48, color = "#C97B4A" }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border-2"
          style={{ borderColor: color, width: size, height: size }}
          animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.75,
            ease: "easeOut",
          }}
        />
      ))}
      <span
        className="rounded-full"
        style={{ width: size * 0.3, height: size * 0.3, backgroundColor: color }}
      />
    </div>
  );
}