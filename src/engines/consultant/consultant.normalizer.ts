import {
  Consultant,
  ConsultantBooking,
  ConsultantSkillSet,
} from "src/common/interfaces/consultant.interface";

export function consultantNormalizer(
  consultant: Consultant,
): Pick<Consultant, "bookings" | "successRate" | "skillSet" | "qualification"> {
  return {
    successRate: consultant.successRate || 0,
    skillSet: consultant.skillSet.map((skill: ConsultantSkillSet) => {
      return {
        name: skill.name || "Other",
        level: skill.level || "Beginner",
      };
    }),
    qualification: {
      specialization: consultant.qualification.specialization,
      otherQualifications: consultant.qualification.otherQualifications,
    },
    bookings: consultant.bookings.map((booking: ConsultantBooking) => {
      return {
        status: booking.status,
        endDate: booking.endDate,
        startDate: booking.startDate,
      };
    }),
  };
}
