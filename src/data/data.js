export const users = [
  {
    id: '1',
    email: 'pizza.chef@example.com',
    password: 'pizza123',
    role: 'Staff',
    name: 'Chef Pizza',
  },
  {
    id: '2',
    email: 'cafe.chef@example.com',
    password: 'cafe123',
    role: 'Staff',
    name: 'Chef Café',
  },
  {
    id: '3',
    email: 'taco.chef@example.com',
    password: 'taco123',
    role: 'Staff',
    name: 'Chef Tacos',
  },
  {
    id: '4',
    email: 'manager@example.com',
    password: 'manager123',
    role: 'Manager',
    name: 'Manager',
  },
];

export const ticketsData = [
  { id: '1', orderNumber: '123', orderDetails: 'Pizza Margherita', status: 'En attente', chefId: '1' },
  { id: '2', orderNumber: '124', orderDetails: 'Pizza Pepperoni', status: 'En préparation', chefId: '1' },
  { id: '3', orderNumber: '125', orderDetails: 'Pizza Végétarienne', status: 'Terminé', chefId: '1' },
  { id: '4', orderNumber: '126', orderDetails: 'Café Espresso', status: 'En attente', chefId: '2' },
  { id: '5', orderNumber: '127', orderDetails: 'Tacos Mexicain', status: 'En préparation', chefId: '3' },
];
