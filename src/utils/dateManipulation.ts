export function formatDate(datetimeString: string): string {
    const date = new Date(datetimeString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Add 'th', 'st', 'nd', 'rd' suffixes to the day
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';

    return formattedDate.replace(/\d+/, `${day}${suffix}`);
}
