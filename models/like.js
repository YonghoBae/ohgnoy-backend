module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "like",
      {
        like_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "좋아요 고유번호",
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "좋아요를 누른 사용자 ID",
          references: {
            model: "user",
            key: "user_id",
          },
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "좋아요가 눌린 게시물 ID",
          references: {
            model: "post",
            key: "post_id",
          },
        },
        comment_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "좋아요가 눌린 댓글 ID",
          references: {
            model: "comment",
            key: "comment_id",
          },
        },
        reg_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          comment: "좋아요를 누른 시간",
        },
      },
      {
        sequelize,
        tableName: "like",
        timestamps: false,
        comment: "게시물 또는 댓글에 대한 좋아요 정보",
        indexes: [
          {
            unique: true,
            using: "BTREE",
            fields: [{ name: "like_id" }],
          },
          {
            name: "user_like_index",
            unique: true,
            fields: [{ name: "user_id" }, { name: "post_id" }, { name: "comment_id" }],
          },
        ],
      }
    );
  };
  