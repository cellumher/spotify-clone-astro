export function getFormattedTime(totalSeconds: number): string {

  if (totalSeconds <= 0) return '0 s';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  let timeStringArray = [];
  if (hours > 0) {
    timeStringArray.push(hours + ' h');
  }
  if (minutes > 0) {
    timeStringArray.push(minutes + ' min');
  }
  if (seconds > 0 && hours === 0) {
    timeStringArray.push(seconds + ' s');
  } else if (seconds > 0) {
    timeStringArray.push('aproximadamente');
  }

  return timeStringArray.join(' ');

}