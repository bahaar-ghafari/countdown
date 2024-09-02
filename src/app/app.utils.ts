export function padWithZeros(number: number, length: number): string {
    return number.toString().padStart(length, '0')
  }
  
  export function setLocalStorageItem(key: string, title: string) {
    localStorage.setItem(key, title)
  }
  
  export function getLocalStorageItem(key: string) {
    return localStorage.getItem(key)
  }
  