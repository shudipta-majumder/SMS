"use client";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import { keyframes } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@mui/material/Paper";
import PersonalInformation from "../../StudentAdmission/PersonalInformation";
import GuardianDetail from "../../StudentAdmission/GuardianDetail";
import SingleStudentAdmissionDetails from "../../StudentAdmission/SingleStudentAdmissionDetails";
import CompleteRegistration from "../../StudentAdmission/CompleteRegistration";

const getSteps = () => {
  return [
    "Personal Information",
    "Guardian Detail",
    "Admission Details",
    "Complete Registration",
  ];
};

const StudentDetailsEdit = ({
  genderData,
  religionData,
  bloodGroupData,
  relationData,
  occupationData,
  classNameData,
  sectioinData,
  sessionData,
  versionData,
  shiftData,
  id,
  detail,
  accessToken,
  classSectionData,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [progress, setProgress] = React.useState(1);
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skippedSteps, setSkippedSteps] = React.useState([]);
  const [checkData, setCheckData] = React.useState({});
  const [responseId, setResponseId] = React.useState();
  const [backTrigered, setBackTrigered] = React.useState(false);
  const [responseGuardianID, setGardianId] = React.useState();
  const [data, setData] = React.useState();
  const [guardian, setGuardianData] = React.useState();
  const [responseEnrollId, setResponseEnrollId] = React.useState();
  const [addMore, setAddMore] = React.useState(true);
  const [removeForm, setRemoveForm] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [guardianPhoto, setGauardianPhoto] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectBirthFile, setSelectBirthFile] = React.useState(null);
  const dateofbirth = dayjs(detail?.dob);
  const admissiondate = dayjs(detail?.admission_date);

  //schema validation
  const personalInfoSchema = [
    yup.object().shape({
      first_name: yup.string().required("This field may not be blank."),
      last_name: yup.string().required("This field may not be blank."),
      gender: yup.string().required("This field may not be blank."),
      email: yup.string().email().required("This field may not be blank."),
      dob: yup.date().required("This field may not be blank."),
      mobile_no: yup.string().required("This field may not be blank."),
      religion: yup.string().required("This field may not be blank."),
      admission_date: yup.string().required("This field may not be blank."),
      shift: yup.string().required("This field may not be blank."),
      blood_group: yup.string().required("This field may not be blank."),
      present_address: yup.string().required("This field may not be blank."),
      permanent_address: yup.string().required("This field may not be blank."),
    }),

    yup.object({
      gardian_first_name: yup.string().required("This field may not be blank."),
      gardian_last_name: yup.string().required("This field may not be blank."),
      gardian_gender: yup.string().required("This field may not be blank."),
      gardian_mobile_no: yup.string().required("This field may not be blank."),
      occupation: yup.string().required("This field may not be blank."),
      relation: yup.string().required("This field may not be blank."),
      nid: yup.string().required("This field may not be blank."),
      // fieldArrayName: yup.array().of(
      //   yup.object().shape({
      // gardian_last_name_2: yup
      //   .string()
      //   .required("This field may not be blank."),
      // gardian_gender_2: yup.string().required("This field may not be blank."),
      // gardian_mobile_no_2: yup
      //   .string()
      //   .required("This field may not be blank."),
      // occupation_2: yup.string().required("This field may not be blank."),
      // relation_2: yup.string().required("This field may not be blank."),
      //   })
      // ),
    }),
    yup.object({
      class_name: yup.string().required("This field may not be blank."),
      version: yup.string().required("This field may not be blank."),
      session: yup.string().required("This field may not be blank."),
      section: yup.string().required("This field may not be blank."),
    }),
  ];

  const methods = useForm({
    defaultValues: {
      first_name: detail && detail ? detail?.first_name : "",
      last_name: detail && detail ? detail?.last_name : "",
      gender: detail && detail ? detail?.gender?.id : "",
      email: detail && detail ? detail?.email : "",
      dob: detail && detail ? dateofbirth : "",
      religion: detail && detail ? detail?.religion?.id : "",
      admission_date: detail && detail ? admissiondate : "",
      shift: detail && detail ? detail?.shift : "",
      mobile_no: detail && detail ? detail?.mobile_no : "",
      blood_group: detail && detail ? detail?.blood_group.id : "",
      birth_reg_scert_no: detail && detail ? detail?.birth_reg_scert_no : "",
      present_address: detail && detail ? detail?.present_address : "",
      permanent_address: detail && detail ? detail?.permanent_address : "",

      guardianSchema:
        detail && detail.guardians
          ? detail.guardians.map((guardian) => ({
              gardian_first_name: guardian?.first_name,
              gardian_last_name: guardian?.last_name,
              relation: guardian.relation?.id,
              occupation: guardian.occupation?.id,
              gardian_mobile_no: guardian?.mobile_no,
              gardian_gender: guardian.gender?.id,
              nid: guardian?.nid,
              gardian_image: guardian?.gardian_image,
              is_guardian: guardian?.is_guardian,
            }))
          : [],
      class_name: detail && detail ? detail?.enroll[0]?.class_name?.id : "",
      version: detail && detail ? detail?.enroll[0]?.version?.id : "",
      session: detail && detail ? detail?.enroll[0]?.session?.id : "",
      section: detail && detail ? detail?.enroll[0]?.section?.id : "",
    },
    // resolver: yupResolver(personalInfoSchema[activeStep]),
  });

  const { control, setValue, watch, register } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guardianSchema",
  });

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleGuardianChecked = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  const handleNext = async (data) => {
    const photoSend = new FormData();
    photoSend.append("photo", selectedFile);

    const stdBirthCertphotoSend = new FormData();
    stdBirthCertphotoSend.append("birth_cert_file", selectBirthFile);
    const dataToSend = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      email: data.email,
      dob: dayjs(data.dob).format("YYYY-MM-DD"),
      religion: data.religion,
      admission_date: dayjs(data.admission_date).format("YYYY-MM-DD"),
      shift: data.shift,
      mobile_no: data.mobile_no,
      blood_group: data.blood_group,
      birth_reg_scert_no: data.birth_reg_scert_no,
      present_address: data.present_address,
      permanent_address: data.permanent_address,
    };

    const dataToEdit = {
      guardians: data.guardianSchema.map((guardian, index) => ({
        id: detail?.guardians.id,
        first_name: guardian.gardian_first_name,
        last_name: guardian.gardian_last_name,
        gender: guardian.gardian_gender,
        mobile_no: guardian.gardian_mobile_no,
        relation: guardian.relation,
        occupation: guardian.occupation,
        nid: guardian.nid,
        is_guardian: guardian.is_guardian,
      })),
    };

    const enrollData = {
      enroll: [
        {
          version: data.version,
          session: data.session,
          class_name: data.class_name,
          section: data.section,
        },
      ],
    };

    let response;
    let responseData;
    let imgresponses;
    let studentBirthCertimg;
    let x;
    console.log("firsccccccccccct", responseId);

    // if (responseId) {
    if (activeStep == 0) {
      x = {
        ...dataToSend,
        id: responseId,
      };
    }

    if (activeStep == 1)
      x = {
        guardians: dataToEdit.guardians,
      };

    if (responseId && responseGuardianID && activeStep == 1) {
      x.guardians = x.guardians.map((guardian, index) => ({
        ...guardian,
        id: responseGuardianID[index],
      }));
    }

    console.log("xxxxxxxx", x);

    if (activeStep == 2) {
      x = {
        // ...x,
        enroll: enrollData.enroll,
      };
    }

    if (responseId && responseEnrollId && activeStep == 2) {
      x.enroll = [
        {
          ...x.enroll[0], // Preserve existing properties of the first guardian
          id: responseEnrollId,
        },
      ];
    }

    console.log("gardianId", guardian);

    response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/student/api/student/detail/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
      }
    );

    if (activeStep == 0 && selectedFile) {
      imgresponses = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/student/image/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: photoSend,
        }
      );
    }
    if (activeStep == 0 && selectBirthFile) {
      studentBirthCertimg = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/student/birth-certificate/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: stdBirthCertphotoSend,
        }
      );
    }

    responseData = await response.json();
    console.log("after put response", responseData);
    setResponseId(detail?.id);
    setGardianId(detail?.guardians.map((guardian) => guardian.id));

    setResponseEnrollId(responseData?.data?.enroll[0]?.id);

    console.log("response data", responseId);
    console.log("guardian id", responseGuardianID);

    if (activeStep == 1 && guardianPhoto) {
      let guardianImageResponse;
      console.log("maping guaridan", responseData.gardians);
      responseData?.data?.guardians?.map(async (guardianId, guardianIndex) => {
        // const guardianPhotos = guardianPhoto[guardianId.id];
        const formData = new FormData();

        const guardianImageFiles = watch(
          `guardianSchema.${guardianIndex}.gardian_image`
        );

        if (guardianImageFiles && guardianImageFiles.length > 0) {
          // Append each file to the FormData
          for (let i = 0; i < guardianImageFiles.length; i++) {
            formData.append("photo", guardianImageFiles[i]);
          }
        }
        guardianImageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/student/api/guardian/image/${guardianId.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );
      });
    }

    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
    setCheckData(data);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setBackTrigered(true);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PersonalInformation
            Controller={Controller}
            useFormContext={useFormContext}
            genderData={genderData}
            religionData={religionData}
            bloodGroupData={bloodGroupData}
            shiftData={shiftData}
            setSelectBirthFile={setSelectBirthFile}
            setSelectedFile={setSelectedFile}
          />
        );

      case 1:
        return (
          <GuardianDetail
            Controller={Controller}
            useFormContext={useFormContext}
            genderData={genderData}
            relationData={relationData}
            occupationData={occupationData}
            setAddMore={setAddMore}
            addMore={addMore}
            removeForm={removeForm}
            setRemoveForm={setRemoveForm}
            useFieldArray={useFieldArray}
            handleGuardianChecked={handleGuardianChecked}
            isChecked={isChecked}
            remove={remove}
            append={append}
            fields={fields}
            control={control}
            setValue={setValue}
            setGauardianPhoto={setGauardianPhoto}
            watch={watch}
            register={register}
            guardianPhoto={guardianPhoto}
          />
        );
      case 2:
        return (
          <SingleStudentAdmissionDetails
            Controller={Controller}
            useFormContext={useFormContext}
            classNameData={classNameData}
            sectioinData={sectioinData}
            sessionData={sessionData}
            versionData={versionData}
          />
        );
      case 3:
        return <CompleteRegistration checkData={checkData} />;
      default:
        return "unknown step";
    }
  }

  console.log("single Edit data", detail);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Box>
          <Typography sx={{ p: "20px 0px", fontWeight: "bold", ml: "30px" }}>
            Student Info Edit
          </Typography>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              const stepProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography
                    variant="caption"
                    align="center"
                    style={{ display: "block" }}
                  >
                    optional
                  </Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? (
            <Typography variant="h3" align="center">
              Thank You
            </Typography>
          ) : (
            <Box>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                      >
                        skip
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={handleNext}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default StudentDetailsEdit;
