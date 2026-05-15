export type Point = {
  x: number;
  y: number;
};

function heartPoint(t: number): Point {
  return {
    x: 16 * Math.sin(t) ** 3,
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

function normalizeContour(raw: Point[]): Point[] {
  const xs = raw.map((point) => point.x);
  const ys = raw.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;

  return raw.map((point) => ({
    x: ((point.x - minX) / width) * 2 - 1,
    y: -(((point.y - minY) / height) * 2 - 1)
  }));
}

export function createHeartContour(steps = 720) {
  const raw: Point[] = [];

  for (let index = 0; index < steps; index += 1) {
    const t = (index / steps) * Math.PI * 2;
    raw.push(heartPoint(t));
  }

  return normalizeContour(raw);
}

function randomInsideHeart(iteration: number): Point {
  const radius = Math.sqrt(Math.random());
  const angle = Math.random() * Math.PI * 2;
  const sample = heartPoint(angle);
  const scale = 0.24 + radius * (0.98 - 0.24);
  const jitter = Math.sin(iteration * 12.9898) * 0.04;

  return {
    x: sample.x * scale + jitter,
    y: sample.y * scale - jitter * 0.7
  };
}

export function createHeartFill(count: number) {
  const raw: Point[] = [];

  for (let index = 0; index < count; index += 1) {
    raw.push(randomInsideHeart(index));
  }

  return normalizeContour(raw);
}
