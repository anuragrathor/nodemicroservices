const { DataTypes } = require("sequelize");
const db = require("../../_db");


const video_video_visitor = db.sequelize.define('video_video_visitors', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    business_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    video_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    session_id: {
      type: DataTypes.STRING(255)
    },
    visitor_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    video_session_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    conversion_count_all: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    duration: {
      type: DataTypes.INTEGER(11)
    },
    played_time: {
      type: DataTypes.INTEGER(11)
    },
    video_buffer_size: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    buffered_time: {
      type: DataTypes.INTEGER(11)
    },
    buffered_stats: {
      type: DataTypes.STRING(255)
    },
    is_deleted: {
      type: DataTypes.INTEGER(11)
    }
});


video_video_visitor.sync().then(() => {
    console.log('Video Visitors Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = video_video_visitor;