export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatVelocity(kmh: number): string {
  return `${(kmh / 1000).toFixed(1)}K km/h`;
}

export function formatSize(cm: number): string {
  if (cm >= 100) return `${(cm / 100).toFixed(1)} m`;
  return `${cm} cm`;
}

export function getRiskColor(risk: string, colors: Record<string, string>): string {
  switch (risk) {
    case 'critical': return colors.danger;
    case 'high': return colors.warning;
    case 'medium': return colors.accent;
    default: return colors.success;
  }
}

export function getTypeLabel(type: string): string {
  switch (type) {
    case 'debris': return 'Detrito';
    case 'satellite': return 'Satélite';
    case 'fragment': return 'Fragmento';
    case 'rocket_body': return 'Foguete';
    default: return type;
  }
}

export function getMissionMethodLabel(method: string): string {
  switch (method) {
    case 'laser': return 'Laser';
    case 'capture': return 'Captura';
    case 'combined': return 'Combinado';
    default: return method;
  }
}

export function getMissionStatusLabel(status: string): string {
  switch (status) {
    case 'planned': return 'Planejada';
    case 'in_progress': return 'Em Andamento';
    case 'completed': return 'Concluída';
    case 'failed': return 'Falhou';
    default: return status;
  }
}
