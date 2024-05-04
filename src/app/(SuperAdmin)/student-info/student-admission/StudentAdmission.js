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
import PersonalInformation from "../../../../Components/Pagecomponents/StudentInformation/StudentAdmission/PersonalInformation";
import GuardianDetail from "../../../../Components/Pagecomponents/StudentInformation/StudentAdmission/GuardianDetail";
import AdmissionDetails from "../../../../Components/Pagecomponents/StudentInformation/StudentAdmission/AdmissionDetails";
import CompleteRegistration from "../../../../Components/Pagecomponents/StudentInformation/StudentAdmission/CompleteRegistration";
import { useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const stepStyle = {
  "& .MuiStepIcon-root": {
    color: "black",
    fontSize: "28px",
  },
  "& .Mui-active": {
    "& .MuiStepIcon-root": {
      color: "#9A90F4",
    },
    "& .MuiStepLabel-label": {
      fontWeight: "bold",
    },
  },
  "& .MuiStepLabel-label": {
    fontWeight: "bold",
  },
  "& .Mui-completed": {
    "& .MuiStepIcon-root": {
      color: "#786CF0",
    },
    "& .MuiStepLabel-label": {
      fontWeight: "400",
    },
  },
  "& .MuiStepConnector-horizontal": {
    display: "flex",
    flexDirection: "row",
  },
  mb: "10px",
};

const customKeyframes = keyframes({
  "0%": {
    width: "5%",
  },
  "20%": {
    width: "20%",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "15px",
};

const getSteps = () => {
  return [
    "Personal Information",
    "Guardian Detail",
    "Admission Details",
    "Complete Registration",
  ];
};

const dayjs = require("dayjs");

const StudentAdmission = ({
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
  session,
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
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectBirthFile, setSelectBirthFile] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const [guardianPhoto, setGauardianPhoto] = React.useState([]);

  console.log("guardian photo state", guardianPhoto);

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
      birth_reg_scert_no: yup.string().required("This field may not be blank."),
      present_address: yup.string().required("This field may not be blank."),
      permanent_address: yup.string().required("This field may not be blank."),
    }),

    yup.object({
      // gardian_first_name: yup.string().required("This field may not be blank."),
      // gardian_last_name: yup.string().required("This field may not be blank."),
      // gardian_gender: yup.string().required("This field may not be blank."),
      // gardian_mobile_no: yup.string().required("This field may not be blank."),
      // occupation: yup.string().required("This field may not be blank."),
      // relation: yup.string().required("This field may not be blank."),
      // nid: yup.string().required("This field may not be blank."),
      // guardianSchema: yup.array().of(
      //   yup.object().shape({
      //     gardian_first_name_: yup
      //       .string()
      //       .required("This field may not be blank."),
      //     gardian_last_name_: yup
      //       .string()
      //       .required("This field may not be blank."),
      //     gardian_gender: yup.string().required("This field may not be blank."),
      //     gardian_mobile_no: yup
      //       .string()
      //       .required("This field may not be blank."),
      //     occupation: yup.string().required("This field may not be blank."),
      //     relation: yup.string().required("This field may not be blank."),
      //     nid: yup.string().required("This field may not be blank."),
      //     gardian_image: yup.mixed(),
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
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      // gardian_gender: "",
      dob: null,
      religion: "",
      // nid: "",
      admission_date: null,
      shift: "",
      mobile_no: "",
      // gardian_mobile_no: "",
      blood_group: "",
      birth_reg_scert_no: "",
      present_address: "",
      permanent_address: "",
      guardianSchema: [
        {
          gardian_first_name: "",
          gardian_last_name: "",
          relation: "",
          occupation: "",
          gardian_mobile_no: "",
          gardian_gender: "",
          nid: "",
          gardian_image: null,
          // is_guardian: "",
        },
      ],
      class_name: "",
      version: "",
      session: "",
      section: "",
    },
    resolver: yupResolver(personalInfoSchema[activeStep]),
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
  };

  const handleNext = async (data) => {
    setGauardianPhoto(data?.guardianSchema);
    console.log("data", data);
    const photoSend = new FormData();
    photoSend.append("photo", selectedFile);

    const stdBirthCertphotoSend = new FormData();
    stdBirthCertphotoSend.append("birth_cert_file", selectBirthFile);

    // console.log("guardian image", guardianPhoto);
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
      gardians: data.guardianSchema.map((guardian) => ({
        first_name: guardian.gardian_first_name,
        last_name: guardian.gardian_last_name,
        gender: guardian.gardian_gender,
        mobile_no: guardian.gardian_mobile_no,
        relation: guardian.relation,
        nid: guardian.nid,
        occupation: guardian.occupation,
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

    const accessToken = session?.user?.data?.token?.access;

    let response;
    let responseData;
    let imgresponses;
    let studentBirthCertimg;
    let guardianImageResponse;
    let x;
    // console.log("firsccccccccccct", responseId);
    console.log("guardian c", dataToEdit);

    if (responseId) {
      if (activeStep == 0) {
        x = {
          ...dataToSend,
          id: responseId,
        };
      }

      if (activeStep == 1)
        x = {
          guardians: dataToEdit.gardians,
        };

      if (responseId && responseGuardianID && activeStep == 1) {
        x.guardians = [
          {
            ...x.guardians, // Preserve existing properties of the first guardian
            id: responseGuardianID,
          },
        ];
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
            ...x.enroll[0],
            id: responseEnrollId[0],
          },
        ];
      }

      console.log("gardianId", guardian);

      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/student/detail/${responseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(x),
        }
      );

      responseData = await response.json();
      const gardianID = responseData?.data?.guardians.map((gID) => gID.id);
      const enrollId = responseData?.data?.enroll.map((eID) => eID.id);
      setGardianId(gardianID);
      setResponseEnrollId(enrollId);

      if (activeStep == 1 && guardianPhoto) {
        let guardianImageResponse;
        console.log("maping guaridan", responseData.gardians);
        responseData?.data?.guardians?.map(
          async (guardianId, guardianIndex) => {
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
          }
        );
      }
    } else {
      console.log("print");
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/student/api/student`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      console.log(" form data", data);

      responseData = await response.json();
      setResponseId(responseData.id);

      if (activeStep == 0 && selectedFile) {
        imgresponses = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/student/api/student/image/${responseData?.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: photoSend,
          }
        );
      }

      if (activeStep == 0 && selectedFile && selectBirthFile) {
        studentBirthCertimg = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/student/api/student/birth-certificate/${responseData?.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: stdBirthCertphotoSend,
          }
        );
      }
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
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setSelectBirthFile={setSelectBirthFile}
            selectBirthFile={selectBirthFile}
            session={session}
            shiftData={shiftData}
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
            session={session}
            handleGuardianChecked={handleGuardianChecked}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
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
          <AdmissionDetails
            Controller={Controller}
            useFormContext={useFormContext}
            classNameData={classNameData}
            sectioinData={sectioinData}
            sessionData={sessionData}
            versionData={versionData}
            session={session}
            classSectionData={classSectionData}
          />
        );
      case 3:
        return <CompleteRegistration checkData={checkData} />;
      default:
        return "unknown step";
    }
  }

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
            Student Admission
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
export default StudentAdmission;
