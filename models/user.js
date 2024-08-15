module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "사용자 고유번호",
      },
      nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "사용자 닉네임",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 이메일은 고유해야 하므로 unique 인덱스를 추가했습니다.
        validate: {
          isEmail: true, // 유효한 이메일 형식인지 확인합니다.
        },
        comment: "사용자 이메일",
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "사용자 난독화된 단방향 암호화된 텍스트값",
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "간략한 자기소개",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // 등록 시 현재 시간을 기본값으로 설정합니다.
        comment: "등록일시",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정일시",
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: false,
      comment: "사용자 계정정보",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "email_unique",
          unique: true,
          fields: [{ name: "email" }], // 이메일에 대한 고유 인덱스 추가
        },
      ],
    }
  );
};
