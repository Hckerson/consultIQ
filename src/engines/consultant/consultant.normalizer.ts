import {
  Consultant,
  ConsultantBooking,
  ConsultantSkillSet,
} from "src/common/interfaces/consultant.interface";
import { Experience } from "src/common/interfaces/interface";
import { ConsultantSpecialization } from "src/common/types/consultant.type";

export function consultantNormalizer(consultant: Consultant): Consultant {
  const { successRate, skillSet, qualification, bookings, ...rest } =
    consultant;
  return {
    ...rest,
    successRate: successRate || 0,
    skillSet: skillSet
      .filter(
        (skill: ConsultantSkillSet) => skill.name.trim() && skill.level.trim(),
      )
      .map((skill: ConsultantSkillSet) => {
        return {
          name: skill.name,
          level: skill.level,
        };
      }),
    qualification: {
      specialization: qualification.specialization || {},
      otherQualifications: qualification.otherQualifications
        .filter(
          (q: Experience<ConsultantSpecialization>) =>
            q.title.trim() && q.years,
        )
        .map((q: Experience<ConsultantSpecialization>) => {
          return {
            title: q.title,
            years: q.years,
            niches: q.niches,
          };
        }),
    },
    bookings: bookings
      .filter((booking: ConsultantBooking) => booking.status === "confirmed")
      .map((booking: ConsultantBooking) => {
        return {
          status: booking.status,
          endDate: booking.endDate,
          startDate: booking.startDate,
        };
      }),
  };
}
