export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function formatTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '';
  }
}

export function formatDateTime(isoString: string): string {
  return `${formatDate(isoString)} • ${formatTime(isoString)}`;
}

export function getMonthYearKey(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return 'Unknown';
  }
}

export function getHourOfDay(isoString: string): number {
  try {
    return new Date(isoString).getHours();
  } catch {
    return 12;
  }
}

export function getDayOfWeek(isoString: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  try {
    return days[new Date(isoString).getDay()];
  } catch {
    return 'Monday';
  }
}

export function isWeekend(isoString: string): boolean {
  try {
    const day = new Date(isoString).getDay();
    return day === 0 || day === 6;
  } catch {
    return false;
  }
}

export function getDifferenceInHours(date1: string, date2: string): number {
  const diffMs = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  return diffMs / (1000 * 60 * 60);
}
