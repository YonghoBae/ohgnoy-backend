module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "comment",
      {
        comment_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "댓글 고유번호",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "댓글 내용",
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "게시물 ID",
          references: {
            model: "post", // 게시물 테이블 참조
            key: "post_id",
          },
        },
        author_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "댓글 작성자 ID",
          references: {
            model: "user", // 사용자 테이블 참조
            key: "user_id",
          },
        },
        reg_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          comment: "댓글 작성일시",
        },
      },
      {
        sequelize,
        tableName: "comment",
        timestamps: false,
        comment: "게시물에 대한 댓글 정보",
        indexes: [
          {
            unique: true,
            using: "BTREE",
            fields: [{ name: "comment_id" }],
          },
          {
            name: "post_comment_index",
            fields: [{ name: "post_id" }],
          },
          {
            name: "author_comment_index",
            fields: [{ name: "author_id" }],
          },
        ],
      }
    );
  };
  