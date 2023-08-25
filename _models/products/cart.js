const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Cart = db.sequelize.define('Cart', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    items: {
      type: DataTypes.JSON(2000)
    },
    totalPrice: {
        type: DataTypes.INTEGER(11)
    },
    totalQuantity: {
      type: DataTypes.INTEGER(11)
    }

});


Cart.sync().then(() => {
    console.log('Cart Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Cart;