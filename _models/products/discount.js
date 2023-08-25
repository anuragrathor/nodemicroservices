const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Discount = db.sequelize.define('Discount', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER(11)
    },
    available: {
        type: DataTypes.INTEGER(11)
    }
});


Discount.sync().then(() => {
    console.log('Discount Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Discount;