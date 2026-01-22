export function getColor(percent: number): string {
  if (percent >= 80) return "green";
  if (percent >= 60) return "lightgreen";
  if (percent >= 40) return "yellow";
  if (percent >= 20) return "orange";
  return "red";
}
