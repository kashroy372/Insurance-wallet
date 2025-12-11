import bcrypt from 'bcryptjs';

// In-memory user storage (replace with database in production)
const users = [
    {
        id: '1',
        name: 'Demo User',
        email: 'demo@insurancewallet.com',
        password: bcrypt.hashSync('demo123', 10), // pre-hashed password
    },
];

let userIdCounter = 2;

export const UserModel = {
    findByEmail: (email) => {
        return users.find((user) => user.email === email);
    },

    findById: (id) => {
        return users.find((user) => user.id === id);
    },

    create: async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = {
            id: String(userIdCounter++),
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        };
        users.push(newUser);
        return newUser;
    },

    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },

    // Return user without password
    sanitize: (user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },
};
