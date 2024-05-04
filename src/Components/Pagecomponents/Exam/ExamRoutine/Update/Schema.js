import * as yup from "yup";

const schema = yup.object().shape({
  examDetail: yup.array().of(
    yup.object().shape({
      exam_date: yup
        .date()
        .nullable()
        .required("Date is required")
        .typeError("Date must be a valid date"),
      subject_name: yup.string().required().label("Subject Name"),
      room_no: yup.string().required().label("Room No"),
      exam_start_time: yup
        .date()
        .nullable()
        .required("Start Time is required")
        .typeError("Start Time must be a valid date"),
      exam_end_time: yup
        .date()
        .nullable()
        .required("Exam End Time is required")
        .min(
          yup.ref("exam_start_time"),
          "The Exam End Time should not be less than the Start Time."
        )
        .typeError("Exam End Time must be a valid date"),
      teacher: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number(),
            label: yup.string(),
          })
        )
        .min(1, "At least one teacher is required")
        .max(3, "maximum two  teacher can added"),
    })
  ),
});

export default schema;
