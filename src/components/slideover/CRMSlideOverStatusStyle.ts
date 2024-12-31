export const generateStatusStyle = (index: string | undefined) => {
    switch (index) {
        case 'Incoming':
            return { backgroundColor: 'var(--incoming)' };
        case 'To be agreed':
            return { backgroundColor: 'var(--toBeAgreed)' };
        case 'In progress':
            return { backgroundColor: 'var(--inProgress)' };
        case 'Produced':
            return { backgroundColor: 'var(--produced)' };
        case 'Done':
            return { backgroundColor: 'var(--done)' };
    }
};