import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Url extends Model {
  public id!: number;
  public originalUrl!: string;
  public shortCode!: string;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Url',
    tableName: 'urls',
    timestamps: false,
  }
);

export default Url;
