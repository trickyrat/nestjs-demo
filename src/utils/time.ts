export function getNowString(): string {
  let currentLocale = Intl.DateTimeFormat().resolvedOptions().locale
  let options: Intl.DateTimeFormatOptions = {
    hourCycle: "h24",
    timeStyle: "long",
    dateStyle: "long"
  }
  let date = new Date() // get current time
  return new Intl.DateTimeFormat(currentLocale, options).format(date)
}