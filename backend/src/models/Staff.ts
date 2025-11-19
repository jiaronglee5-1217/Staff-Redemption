import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Staff extends Model {
  public staff_pass_id!: string;
  public team_name!: string;
  public created_at!: Date;
  public redeemed!: Boolean;
  public redeemed_at?: Date | null;
}

Staff.init(
  {
    staff_pass_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    redeemed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Staff',
    tableName: 'Employees',
    timestamps: false,
  }
);

export default Staff;
