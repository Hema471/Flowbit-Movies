import { useRef, useEffect } from 'react';

interface CircleRatingProps {
  rate: number; // The movie rating
  size: string; // Size of the rating circle
}

const CircleRating: React.FC<CircleRatingProps> = ({ rate, size }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Round the rating to 1 decimal place and convert to string
    let rateStr = (Math.round(rate * 10) / 10).toString();
    if (rateStr.length === 1) {
      rateStr += '.0';
    }

    // Define circle colors based on the rating
    let circleColor: string;
    let bgCircleColor: string;

    if (rate >= 7) {
      circleColor = '#3dd07a';
      bgCircleColor = '#204529';
    } else if (rate >= 4) {
      circleColor = '#d2d531';
      bgCircleColor = '#423d0f';
    } else {
      circleColor = '#db2360';
      bgCircleColor = '#551534';
    }

    // Get the canvas and its context
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the outer black circle
    ctx.beginPath();
    ctx.arc(36, 36, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#06090E';
    ctx.fill();

    // Draw the background arc for the rating circle
    ctx.beginPath();
    ctx.arc(36, 36, 30, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = bgCircleColor;
    ctx.stroke();

    // Draw the rating arc based on the rating value
    ctx.beginPath();
    ctx.arc(36, 36, 30, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * rate) / 10);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = circleColor;
    ctx.stroke();

    // Set the font and color for the rating text
    ctx.font = 'bold 30px Inconsolata';
    ctx.fillStyle = circleColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rateStr, 36, 36);
  }, [rate]);

  return (
    <canvas
      ref={ref}
      height="72px"
      width="72px"
      style={{ height: size, width: size }}
      title="Rated score"
    />
  );
};

export default CircleRating;
