module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "post",
      {
        post_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "게시물 고유번호",
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "게시물 제목",
        },
        excerpt: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "게시물 요약 내용",
        },
        coverImage: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "게시물의 표지 이미지 URL",
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          comment: "게시물 작성일시",
        },
        author_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "작성자 ID",
          references: {
            model: "user", // 작성자 정보가 있는 사용자 테이블 참조
            key: "user_id",
          },
        },
        ogImage: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "Open Graph 이미지 URL",
        },
        view_cnt: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "게시물 조회수",
        },
      },
      {
        sequelize,
        tableName: "post",
        timestamps: false,
        comment: "게시물 정보",
        indexes: [
          {
            unique: true,
            using: "BTREE",
            fields: [{ name: "post_id" }],
          },
          {
            name: "author_index",
            fields: [{ name: "author_id" }],
          },
        ],
      }
    );
  };
  