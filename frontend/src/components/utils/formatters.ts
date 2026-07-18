// Format currency
export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };
  
  // Format date
  export const formatDate = (date: Date | string, format = 'medium', locale = 'en-US'): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const options: Intl.DateTimeFormatOptions = 
      format === 'short' ? { month: 'numeric', day: 'numeric', year: '2-digit' } :
      format === 'medium' ? { month: 'short', day: 'numeric', year: 'numeric' } :
      format === 'long' ? { month: 'long', day: 'numeric', year: 'numeric' } :
      format === 'full' ? { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' } :
      { month: 'short', day: 'numeric', year: 'numeric' };
    
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };
  
  // Format time
  export const formatTime = (date: Date | string, locale = 'en-US'): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  };
  
  // Format date and time
  export const formatDateTime = (date: Date | string, locale = 'en-US'): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  };
  
  // Format phone number (US format)
  export const formatPhoneUS = (phone: string): string => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    
    return phone;
  };
  
  // Format VIN (Vehicle Identification Number)
  export const formatVIN = (vin: string): string => {
    return vin.toUpperCase();
  };
  
  // Format license plate
  export const formatLicensePlate = (plate: string): string => {
    return plate.toUpperCase();
  };
  
  // Format mileage with commas
  export const formatMileage = (mileage: number): string => {
    return mileage.toLocaleString() + ' mi';
  };
  
  // Format file size
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format percentage
  export const formatPercentage = (value: number, decimals = 1): string => {
    return value.toFixed(decimals) + '%';
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Capitalize first letter
  export const capitalizeFirst = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  // Title case (capitalize each word)
  export const titleCase = (text: string): string => {
    if (!text) return '';
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  export default {
    formatCurrency,
    formatDate,
    formatTime,
    formatDateTime,
    formatPhoneUS,
    formatVIN,
    formatLicensePlate,
    formatMileage,
    formatFileSize,
    formatPercentage,
    truncateText,
    capitalizeFirst,
    titleCase
  };