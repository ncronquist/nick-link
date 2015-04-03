"use strict";
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define("link", {
    url: DataTypes.TEXT,
    clicked: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};