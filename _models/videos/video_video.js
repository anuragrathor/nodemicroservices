const { DataTypes } = require("sequelize");
const db = require("../../_db");


const Video_video = db.sequelize.define('Video_videos', {
    video_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    parent_video_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    business_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    slug_folder: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug_smart: {
      type: DataTypes.STRING(255)
      // allowNull defaults to true
    },
    slug_user : {
      type: DataTypes.STRING(255)
    },
    url: {
      type: DataTypes.TEXT
    },
    video_extention: {
      type: DataTypes.STRING(255)
    },
    title: {
      type: DataTypes.STRING(255)
    },
    thumbnail: {
      type: DataTypes.STRING(255)
    },
    privacy_status: {
        type: DataTypes.INTEGER(11)
    },
    ffmpeg_status: {
      type: DataTypes.INTEGER(11)
    },
    player_frame_id: {
      type: DataTypes.INTEGER(11)
    },
    player_theme_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    is_deleted: {
      type: DataTypes.INTEGER(11)
    },
    is_audible: {
      type: DataTypes.INTEGER(11)
    },
    file_size: {
      type: DataTypes.INTEGER(11)
    },
    played_time_avg: {
      type: DataTypes.INTEGER(11)
    },
    duration: {
      type: DataTypes.INTEGER(11)
    },
    width: {
        type: DataTypes.INTEGER(11)
    },
    height: {
        type: DataTypes.INTEGER(11)
    },
    description: {
        type: DataTypes.TEXT
    },
    subtitles: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING(255)
    },
    category_id: {
        type: DataTypes.STRING(255)
    },
    meta_title: {
        type: DataTypes.STRING(255)
    }

});


Video_video.sync().then(() => {
    console.log('Video videos Table Created Successfully');
}).catch((error)=> {
    console.log('Unable to create table', error);
})


module.exports = Video_video;