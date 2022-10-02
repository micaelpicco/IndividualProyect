const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficult: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      season: {
        type: DataTypes.ENUM(
          "Summer",
          "Autumn",
          "Winter",
          "Spring",
          "summer",
          "autumn",
          "winter",
          "spring"
        ),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
