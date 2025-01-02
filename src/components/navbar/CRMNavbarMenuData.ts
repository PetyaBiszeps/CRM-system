export interface IMenuItem {
    name: string;
    icon: string;
    url: string;
}

export const MenuData: IMenuItem[] = [
    { name: 'Home', icon: 'radix-icons:dashboard', url: '/' },
    { name: 'Products', icon: 'ep:goods', url: '/products' },
    { name: 'Payments', icon: 'ph:contactless-payment', url: '/payments' },
    { name: 'Orders', icon: 'fluent:receipt-28-regular', url: '/orders' },
    { name: 'Customers', icon: 'mingcute:group-line', url: '/customers' },
    { name: 'Feedback', icon: 'fluent:person-feedback-48-regular', url: '/feedback' },
    { name: 'Settings', icon: 'radix-icons:gear', url: '/settings' },
    { name: 'Help Center', icon: 'radix-icons:question-mark', url: '/help' },
];