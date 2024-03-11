export function truncateText(value) {
    const words = value.trim().split("").slice(0,20).join('')
    return words;
  }