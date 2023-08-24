const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Product = db.sequelize.define('Product', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.INTEGER(11)
    },
    size: {
      type: DataTypes.INTEGER(11)
    }

});


Product.sync().then(() => {
    console.log('Product Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Product;