export const convertToLocalTime = (dateString: string): string => {
    // Append " UTC" to ensure correct parsing
    const date = new Date(dateString + " UTC");

    // Extract components in local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date as YYYY-MM-DD HH:mm
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

export const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
