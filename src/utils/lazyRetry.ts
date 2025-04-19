export const lazyRetry = <T>(componentImport: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        // Check if the window has already been refreshed
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem("retry-lazy-refreshed") || "false"
        );

        // Try to import the component
        componentImport()
            .then((component) => {
                // Success, so reset the refresh flag
                window.sessionStorage.setItem("retry-lazy-refreshed", "false");
                resolve(component);
            })
            .catch((error) => {
                if (!hasRefreshed) {
                    // Not been refreshed yet
                    window.sessionStorage.setItem("retry-lazy-refreshed", "true"); // Set refresh flag
                    window.location.reload(); // Refresh the page
                } else {
                    // Default error behavior if already tried refresh
                    reject(error);
                }
            });
    });
};