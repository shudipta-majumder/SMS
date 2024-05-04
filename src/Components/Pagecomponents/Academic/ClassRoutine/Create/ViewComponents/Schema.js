import * as yup from "yup";

const schema = yup.object().shape({
  test: yup.array().of(
    yup.object().shape({
      subject: yup
        .object()
        .shape({
          id: yup.number(),
          name: yup.string(),
        })
        .required("Subject name is required"),
      teacher: yup
        .object()
        .shape({
          id: yup.number(),
          label: yup.string(),
        })
        .required("Teacher name is required"),
      classperiods: yup
        .object()
        .shape({
          id: yup.number(),
          label: yup.string(),
        })
        .required("Class Periods is required"),
      roomno: yup
        .object()
        .shape({
          id: yup.number(),
          label: yup.string(),
        })
        .required("Room No is required"),
    })
  ),
});

export default schema;
