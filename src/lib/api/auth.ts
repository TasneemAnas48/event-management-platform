import { users } from '@/lib/mock/users';
import { User } from '@/types/user';

// Query keys for React Query
export const authKeys = {
    all: ['auth'] as const,
    login: () => [...authKeys.all, 'login'] as const,
};

// Query functions
export const authApi = {
    login: async ({email, password}: {email: string, password: string}): Promise<User> => {
        const user = users.find(user => user.email === email && user.password === password);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user as User);
            }, 1000);
        });
    },
    logout: async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    },
};
