export const ensureHttps = (url: string): string => {
    // Check if the URL already starts with "https://"
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        return `https://${url}`; // Add "https://" if missing
    }
    return url; // Return the original URL if it already starts with "https://" or "http://"
};