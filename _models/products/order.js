const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Order = db.sequelize.define('Order', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER(11)
    },
    isPaid: {
        type: DataTypes.BOOLEAN
    },
    paidAt: {
      type: DataTypes.INTEGER(11)
    },
    isDelivered: {
      type: DataTypes.BOOLEAN
    },
    deliveredAt: {
      type: DataTypes.DATE
    },
    shippingAddress: {
      type: DataTypes.STRING(255)
    },
    paymentMethod: {
      type: DataTypes.STRING(255)
    },
    paymentStripeId: {
      type: DataTypes.STRING(255)
    },
    taxPrice: {
      type: DataTypes.INTEGER(11)
    },
    shippingPrice: {
      type: DataTypes.INTEGER(11)
    },
    phone: {
      type: DataTypes.STRING(255)
    },
    status: {
      type: DataTypes.STRING(255)
    }
});


Order.sync().then(() => {
    console.log('Order Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Order;