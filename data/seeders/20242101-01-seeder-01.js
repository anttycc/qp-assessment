module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([ 
            queryInterface.bulkInsert('users', [{
            "firstname": "admin",
            "lastname": "admin",
            "email": "admin@gmail.com",
            "mobilenumber": "9834712342",
            "password":"$2a$10$s3K6b9xkVtQXiOkuPh.1HeIQBqrQMRpLUB3pa.nMbzMt6J4DMxeTC",
            "status": "Active",
            "createdAt": "2024-01-21T08:48:25.603Z",
            "updatedAt": "2024-01-21T08:48:25.603Z"
        }]),
        queryInterface.bulkInsert('roles', [{
            "name": "Admin",
            "permissions":['ALL'],
            "createdAt": "2024-01-21T08:48:25.603Z",
            "updatedAt": "2024-01-21T08:48:25.603Z"
        }]),
        queryInterface.bulkInsert('user_roles', [{
            "user_id":1,
            "role_id":1,
            "createdAt": "2024-01-21T08:48:25.603Z",
            "updatedAt": "2024-01-21T08:48:25.603Z"
        }]),
    ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};