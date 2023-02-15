"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			postId: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
			},
			postTitle: {
				type: Sequelize.STRING,
			},
			postBody: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Posts");
	},
};
