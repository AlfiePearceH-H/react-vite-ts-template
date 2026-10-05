export function formatName(firstName?: string, lastName?: string): string {
    return [firstName, lastName].filter(Boolean).join(' ').trim();
}

export function getInitials(name: string): string {
    return name.split(' ').filter(Boolean).map(part => part[0].toUpperCase()).join('');
}