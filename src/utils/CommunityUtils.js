const users = [];

const addUser = ({ userId, categoryId, userName, categoryName }) => {
    const existingUser = users.find((user) => (user.userId = userId));

    if (!userId) return { error: 'User are required!' };
    if (existingUser) return { error: 'User is already taken!' };

    const user = { userId, categoryId, userName, channel: categoryName };
    users.push(user);
    return { user };
};

const removeUser = (userId) => {
    const index = users.findIndex((user) => user.userId === userId);

    if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (userId) => users.find((user) => user.userId === userId);

const getUserInCategoryChannel = (categoryName) => users.filter((user) => user.channel === categoryName);

module.exports = { addUser, removeUser, getUser, getUserInCategoryChannel };
