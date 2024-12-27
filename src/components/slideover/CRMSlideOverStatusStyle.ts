export const generateStatusStyle = (index: number) => {
    switch (index) {
        case 0:
            return { backgroundColor: 'var(--incoming)' };
        case 1:
            return { backgroundColor: 'var(--toBeAgreed)' };
        case 2:
            return { backgroundColor: 'var(--inProgress)' };
        case 3:
            return { backgroundColor: 'var(--produced)' };
        case 4:
            return { backgroundColor: 'var(--done)' };
    }
};