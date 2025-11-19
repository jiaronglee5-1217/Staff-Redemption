import Staff from "../models/Staff";

 type StaffRedemptionRes = {
    staff: string;
    team: string;
    redeemed_at: string;
    redemption_remark: string;
  }

export async function staffRedeem(csvFileString: string): Promise<StaffRedemptionRes[] | Error> {

  const employees: {
  staff_pass_id: string;
  team_name: string;
  created_at: Date;
  }[] = [];

  let remark: string = '';

  const redemptionResult: StaffRedemptionRes[] = [];

  try {
    const lines = csvFileString.split('\n').slice(1)
    for (const line of lines) {
    const [staff_pass_id, team_name, created_at] = line.split(',');
    employees.push({
      staff_pass_id: staff_pass_id!,
      team_name: team_name!,
      created_at: new Date(Number(created_at!)) 
    });
  };

    // Process each employee
    for (const employee of employees) {
      const staffRecord = await Staff.findOne({ where: { staff_pass_id: employee.staff_pass_id } }); // find if this employee exists in the system
      const existingTeamMember = await Staff.findAll({ where: { team_name: employee.team_name }}) // find any exisitng memeber from the same team
      const now = new Date();
      const hasRedeemed = !!existingTeamMember?.some(member => member.redeemed);
      const teamRedeemedAt = existingTeamMember?.find(member => member.redeemed)?.redeemed_at;
      if (!staffRecord) {
        await Staff.create({
          staff_pass_id: employee.staff_pass_id,
          team_name: employee.team_name,
          created_at: now,
          redeemed: hasRedeemed,
          redeemed_at: teamRedeemedAt || null
        });
      }

      if (!hasRedeemed) {
        await Staff.update({
          redeemed: true,
          redeemed_at: new Date()},
        { where: { team_name: employee.team_name } });
      }

      redemptionResult.push({
        staff: employee.staff_pass_id,
        team: employee.team_name,
        redeemed_at: teamRedeemedAt ? teamRedeemedAt.toLocaleString() : now.toLocaleString(),
        redemption_remark: 
        teamRedeemedAt ? `Unsuccessful redemption for ${employee.staff_pass_id} as one of your team member has redeemed on behalf of your team ${employee.team_name} at ${teamRedeemedAt.toLocaleString()}` :
        `Team ${employee.team_name} has been redeemed by representative ${employee.staff_pass_id}`
      });
    }
  } catch (error) {
    console.error('Error staff redemption failed', error);
    return new Error ('Error staff redemption failed');
  }
  
  return redemptionResult;
}