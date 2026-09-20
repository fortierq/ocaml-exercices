import { useRef } from 'react';

interface ResizeHandleProps {
  label: string;
  controls: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  // Convert pointer movement in pixels into the unit used by value.
  unitsPerPixel?: number;
  step?: number;
  className?: string;
}

export default function ResizeHandle({
  label, controls, value, min, max, onChange,
  unitsPerPixel = 1, step = 16, className = ''
}: ResizeHandleProps) {
  const drag = useRef<{ x: number; value: number } | null>(null);
  const update = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-controls={controls}
      aria-orientation="vertical"
      aria-valuemin={Math.round(min)}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      title={label}
      className={`resize-handle ${className}`}
      onPointerDown={event => {
        if (event.button !== 0 || !event.isPrimary) return;
        event.preventDefault();
        event.currentTarget.focus();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { x: event.clientX, value };
      }}
      onPointerMove={event => {
        if (drag.current) update(drag.current.value + (event.clientX - drag.current.x) * unitsPerPixel);
      }}
      onPointerUp={event => {
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onKeyDown={event => {
        const next = event.key === 'ArrowLeft' ? value - step
          : event.key === 'ArrowRight' ? value + step
          : event.key === 'Home' ? min
          : event.key === 'End' ? max : null;
        if (next !== null) {
          event.preventDefault();
          update(next);
        }
      }}
    />
  );
}
