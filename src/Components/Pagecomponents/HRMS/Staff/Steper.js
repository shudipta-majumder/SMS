"use client";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { keyframes } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonalInformation from "./StaffComponents/PersonalInformation";
import StaffEducation from "./StaffComponents/StaffEducation";
import Payroll from "./StaffComponents/Payroll";
import BankInfo from "./StaffComponents/BankInfo";
import SocialMedia from "./StaffComponents/SocialMedia";
import CompleteRegistration from "./StaffComponents/CompleteRegistration";
import AdmissionModal from "./StaffComponents/Modal";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useOnlyIcon } from "../../../Layout/NavContext";

const dayjs = require("dayjs");
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

const steps = [
  "Personal Information",
  "Staff Education",
  "Payroll",
  "Bank Info",
  "Social Media",
  "Complete or Check",
];

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

const Steper = ({
  genderData,
  roleData,
  meritialStatusData,
  religionData,
  bloodGroupData,
  departmentData,
  designationData,
  shiftData,
  boardData,
  contractTypeData,
  bankData,
  editingRowData,
  editID,
  accessToken,
}) => {
    const {color, colorX, palette } = useOnlyIcon();
  const stepCalculation = editingRowData && editingRowData?.data?.step - 1;
  const [activeStep, setActiveStep] = React.useState(
    (stepCalculation && stepCalculation) || 0
  );
  const [skipped, setSkipped] = React.useState(new Set());

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [progress, setProgress] = React.useState(0);
  const [backTrigered, setBackTrigered] = React.useState(false);
  const [responseID, setResponseID] = React.useState("");
  const [educationID, setEducationID] = React.useState([]);
  const [payrollID, setPayrollID] = React.useState([]);
  const [bankID, setBankID] = React.useState([]);
  const [socialMediaID, setSocialMediaID] = React.useState([]);
  const [checkoutData, setCheckoutData] = React.useState({});
  const [pickImage, setPickImage] = React.useState(null);
  const [formEntriesEdu, setFormEntriesEdu] = React.useState([{ id: 1 }]);
  const [formEntriesPay, setFormEntriesPay] = React.useState([{ id: 1 }]);
  const [formEntriesBank, setFormEntriesBank] = React.useState([{ id: 1 }]);
  const [formEntriesSocial, setFormEntriesSocial] = React.useState([{ id: 1 }]);
  const maxSize = 5000000;

  React.useEffect(() => {
    if (activeStep == 1) {
      setProgress(25);
    }
    if (activeStep == 2) {
      setProgress(42);
    }
    if (activeStep == 3) {
      setProgress(60);
    }
    if (activeStep == 4) {
      setProgress(75);
    }
    if (activeStep == 5) {
      setProgress(95);
    }
  }, []);

  const generateEducationSchema = (formEntriesEdu) => {
    const schema = {};

    formEntriesEdu.forEach((entry) => {
      const id = entry.id;
      schema[`edu_board_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`institution_name_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`registration_no_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`title_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`start_date_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`end_date_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`passing_year_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`result_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`result_out_of_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`remarks_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      // Add other fields as needed...
    });

    return yup.object().shape(schema);
  };

  const generatePayrollSchema = (formEntriesPay) => {
    const schema = {};

    formEntriesPay.forEach((entry) => {
      const id = entry.id;
      schema[`contract_type_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`gross_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`basic_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`medical_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`convence_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`others_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`start_date_pay_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`end_date_pay_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`remarks_pay_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      // Add other fields as needed...
    });

    return yup.object().shape(schema);
  };
  const generateBankSchema = (formEntriesBank) => {
    const schema = {};

    formEntriesBank.forEach((entry) => {
      const id = entry.id;
      schema[`bank_name_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`account_title_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`account_number_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`branch_name_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`remarks_bank_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      // Add other fields as needed...
    });

    return yup.object().shape(schema);
  };

  const generateSocialMediaSchema = (formEntriesSocial) => {
    const schema = {};

    formEntriesSocial.forEach((entry) => {
      const id = entry.id;
      schema[`name_social_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`username_social_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      schema[`url_${id}`] = yup
        .string()
        .required("This field may not be blank.");
      // Add other fields as needed...
    });

    return yup.object().shape(schema);
  };

  const personalInfoSchema = [
    yup.object({
      first_name: yup
        .string()
        .required()
        .label("First Name")
        .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
      last_name: yup
        .string()
        .required()
        .label("First Name")
        .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),
      gender: yup.string().required("This field may not be blank."),
      shift: yup.string().required("This field may not be blank."),
      email: yup.string().email().required("This field may not be blank."),
      dob: yup.date().required("This field may not be blank."),
      doj: yup.date().required("This field may not be blank."),
      mobile_no: yup.string().required("This field may not be blank."),
      emergency_number: yup.string().required("This field may not be blank."),
      nid: yup.string().required("This field may not be blank."),
      meritial: yup.string().required("This field may not be blank."),
      role: yup.string().required("This field may not be blank."),
      designation: yup.string().required("This field may not be blank."),
      department: yup.string().required("This field may not be blank."),
      blood_group: yup.string().required("This field may not be blank."),
      religion: yup.string().required("This field may not be blank."),
      // image: yup
      // .mixed()
      // .test("fileSize", "The file is not larger than 5MB", (value) => {
      //   return value && value[0] && value[0]?.size <= 5000000;
      // }),
      present_address: yup.string().required("This field may not be blank."),
      permanent_address: yup.string().required("This field may not be blank."),
    }),
    generateEducationSchema(formEntriesEdu),
    generatePayrollSchema(formEntriesPay),
    generateBankSchema(formEntriesBank),
    generateSocialMediaSchema(formEntriesSocial),
  ];

  React.useEffect(() => {
    if (editingRowData?.data) {
      const educationIDs =
        editingRowData?.data?.staff_education?.map(
          (education) => education.id
        ) || [];
      setEducationID(educationIDs);

      const payrollIDs =
        editingRowData?.data?.payroll?.map((payroll) => payroll.id) || [];
      setPayrollID(payrollIDs);

      const socialIDs =
        editingRowData?.data?.social_media?.map((social) => social.id) || [];
      setSocialMediaID(socialIDs);
    }
  }, []);

  const methods = useForm({
    defaultValues: {
      first_name: (editingRowData && editingRowData?.data?.first_name) || "",
      last_name: editingRowData?.data?.last_name || "",
      gender: editingRowData?.data?.gender?.id || "",
      shift: editingRowData?.data?.shift?.id || "",
      email: editingRowData?.data?.email || "",
      // dob:  editingRowData?.data?.dob || "",
      // doj:  editingRowData?.data?.doj || "",
      mobile_no: editingRowData?.data?.mobile_no || "",
      emergency_number: editingRowData?.data?.emergency_number || "",
      nid: editingRowData?.data?.nid || "",
      meritial: editingRowData?.data?.marital_status?.id || "",
      role: editingRowData?.data?.role?.id || "",
      designation: editingRowData?.data?.designation?.id || "",
      department: editingRowData?.data?.department?.id || "",
      religion: editingRowData?.data?.religion?.id || "",
      blood_group: editingRowData?.data?.blood_group?.id || "",
      present_address: editingRowData?.data?.present_address || "",
      permanent_address: editingRowData?.data?.permanent_address || "",

      ...editingRowData?.data?.staff_education?.reduce(
        (acc, education, index) => {
          return {
            ...acc,
            [`edu_board_${index + 1}`]: education.edu_board.id,
            [`institution_name_${index + 1}`]: education.institution_name,
            [`registration_no_${index + 1}`]: education.registration_no,
            [`title_${index + 1}`]: education?.title,
            // [`start_date_${index + 1}`]: education.start_date,
            // [`end_date_${index + 1}`]: education.end_date,
            [`passing_year_${index + 1}`]: education.passing_year,
            [`result_${index + 1}`]: education.result,
            [`result_out_of_${index + 1}`]: education.result_out_of,
            [`remarks_${index + 1}`]: education.remarks,
          };
        },
        {}
      ),
      ...editingRowData?.data?.payroll?.reduce((acc, pay, index) => {
        return {
          ...acc,
          [`contract_type_${index + 1}`]: pay.contract_type.id,
          [`gross_${index + 1}`]: pay.gross,
          [`basic_${index + 1}`]: pay.basic,
          [`medical_${index + 1}`]: pay?.medical,
          [`convence_${index + 1}`]: pay?.convence,
          [`others_${index + 1}`]: pay?.others,
          // [`start_date_pay_${index + 1}`]: pay.start_date,
          // [`end_date_pay_${index + 1}`]: pay.end_date,
          [`remarks_pay_${index + 1}`]: pay.remarks,
        };
      }, {}),
      ...editingRowData?.data?.bank_info?.reduce((acc, bank, index) => {
        return {
          ...acc,
          [`bank_name_${index + 1}`]: bank.bank_name.id,
          [`account_title_${index + 1}`]: bank.account_title,
          [`account_number_${index + 1}`]: bank.account_number,
          [`branch_name_${index + 1}`]: bank?.branch_name,
          [`remarks_bank_${index + 1}`]: bank?.remarks,
        };
      }, {}),
      ...editingRowData?.data?.social_media?.reduce((acc, social, index) => {
        return {
          ...acc,
          [`name_social_${index + 1}`]: social.name,
          [`username_social_${index + 1}`]: social.username,
          [`url_${index + 1}`]: social.url,
        };
      }, {}),
    },
    resolver: yupResolver(personalInfoSchema[activeStep]),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleNextClick = () => {
    if (progress < 100) {
      setProgress((prevProgress) => Math.min(prevProgress + 24, 100));
    }
  };

  const handlePrevClick = () => {
    if (progress > 0) {
      setProgress((prevProgress) => Math.max(prevProgress - 24, 5));
    }
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async (data) => {
    setCheckoutData(data);
    const dataToImageSend = new FormData();
    dataToImageSend.append("photo", pickImage);

    const FirstName = data.first_name;
    const LastName = data.last_name;
    const gender = data.gender;
    const dob = dayjs(data.dob).format("YYYY-MM-DD");
    const doj = dayjs(data.doj).format("YYYY-MM-DD");
    const shift = data.shift;
    const email = data.email;
    const mobile_no = data.mobile_no;
    const emergency_number = data.emergency_number;
    const nid = data.nid;
    const meritial = data.meritial;
    const role = data.role;
    const blood_group = data.blood_group;
    const department = data.department;
    const designation = data.designation;
    const religion = data.religion;
    const permanent_address = data.permanent_address;
    const present_address = data.present_address;
    const Step = activeStep + 2;

    const dataToSend = {
      first_name: FirstName,
      last_name: LastName,
      gender: gender,
      dob: dob,
      doj: doj,
      shift: shift,
      email: email,
      mobile_no: mobile_no,
      emergency_number: emergency_number,
      nid: nid,
      role: role,
      blood_group: blood_group,
      department: department,
      designation: designation,
      religion: religion,
      permanent_address: permanent_address,
      present_address: present_address,
      step: Step,
    };

    const dataToPut = {
      ...(activeStep === 0 && {
        first_name: FirstName,
        last_name: LastName,
        gender: gender,
        dob: dob,
        doj: doj,
        shift: shift,
        email: email,
        mobile_no: mobile_no,
        emergency_number: emergency_number,
        nid: nid,
        meritial: meritial,
        role: role,
        blood_group: blood_group,
        department: department,
        designation: designation,
        religion: religion,
        permanent_address: permanent_address,
        present_address: present_address,
      }),
      ...(activeStep === 1 && {
        staff_education: formEntriesEdu.map((entry) => ({
          edu_board: data[`edu_board_${entry.id}`],
          institution_name: data[`institution_name_${entry.id}`],
          registration_no: data[`registration_no_${entry.id}`],
          title: data[`title_${entry.id}`],
          start_date: dayjs(data[`start_date_${entry.id}`]).format(
            "YYYY-MM-DD"
          ),
          end_date: dayjs(data[`end_date_${entry.id}`]).format("YYYY-MM-DD"),
          passing_year: data[`passing_year_${entry.id}`],
          result: data[`result_${entry.id}`],
          result_out_of: data[`result_out_of_${entry.id}`],
          remarks: data[`remarks_${entry.id}`],
        })),
      }),
      ...(activeStep === 2 && {
        payroll: formEntriesPay.map((entry) => ({
          contract_type: data[`contract_type_${entry.id}`],
          gross: data[`gross_${entry.id}`],
          basic: data[`basic_${entry.id}`],
          medical: data[`medical_${entry.id}`],
          convence: data[`convence_${entry.id}`],
          others: data[`others_${entry.id}`],
          start_date: dayjs(data[`start_date_pay_${entry.id}`]).format(
            "YYYY-MM-DD"
          ),
          end_date: dayjs(data[`end_date_pay_${entry.id}`]).format(
            "YYYY-MM-DD"
          ),
          remarks: data[`remarks_pay_${entry.id}`],
        })),
      }),
      ...(activeStep === 3 && {
        bank_info: formEntriesBank.map((entry) => ({
          bank_name: data[`bank_name_${entry.id}`],
          account_title: data[`account_title_${entry.id}`],
          account_number: data[`account_number_${entry.id}`],
          branch_name: data[`branch_name_${entry.id}`],
          remarks: data[`remarks_bank_${entry.id}`],
        })),
      }),
      ...(activeStep === 4 && {
        social_media: formEntriesSocial.map((entry) => ({
          name: data[`name_social_${entry.id}`],
          username: data[`username_social_${entry.id}`],
          url: data[`url_${entry.id}`],
        })),
      }),
      step: Step,
    };

    if (activeStep === 1 && educationID.length > 0) {
      dataToPut.staff_education.forEach((education, index) => {
        if (index < educationID.length) {
          education.id = educationID[index];
        }
      });
    }

    if (activeStep === 2 && payrollID.length > 0) {
      dataToPut.payroll.forEach((payroll, index) => {
        if (index < payrollID.length) {
          payroll.id = payrollID[index];
        }
      });
    }

    if (activeStep === 3 && bankID.length > 0) {
      dataToPut.bank_info.forEach((bank, index) => {
        if (index < bankID.length) {
          bank.id = bankID[index];
        }
      });
    }
    if (activeStep === 4 && socialMediaID.length > 0) {
      dataToPut.social_media.forEach((social, index) => {
        if (index < socialMediaID.length) {
          social.id = socialMediaID[index];
        }
      });
    }

    let response;
    let responseData;
    let imgresponses;

    if (responseID || backTrigered || editingRowData?.data) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/staff/api/detail/${
          editingRowData?.data ? editID : responseID
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToPut),
        }
      );
      responseData = await response.json();
      const eduID = responseData?.data?.staff_education.map((eID) => eID.id);
      setEducationID(eduID);
      const payID = responseData?.data?.payroll.map((pay) => pay.id);
      setPayrollID(payID);
      const bankInfoID = responseData?.data?.bank_info.map((bank) => bank.id);
      setBankID(bankInfoID);
      const socialMediasID = responseData?.data?.social_media.map(
        (social) => social.id
      );
      setSocialMediaID(socialMediasID);
    }
    if (!backTrigered && activeStep == 0 && !editingRowData?.data) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/staff/api/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      responseData = await response.json();
      setResponseID(responseData.data.id);
    }
    if (activeStep == 0 && pickImage) {
      imgresponses = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/staff/api/image/${
          editingRowData?.data ? editID : responseData?.data?.id
        }`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: dataToImageSend,
        }
      );
    }

    if (responseData.code == 200) {
      toast.success(`${responseData.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: "70px" },
      });
    }
    if (responseData.code == 401) {
      toast.error("Permission denied", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: "70px" },
      });
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setBackTrigered(true);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [clicked, setClicked] = React.useState(false);
  const handleButtonClick = () => {
    setClicked(true);
    setActiveStep(0);
    handleClose();
    setProgress(5);
  };

  const handalePersonalDetails = () => {
    setActiveStep(0);
    setProgress(5);
  };
  const handaleGardianDetails = () => {
    setActiveStep(1);
    setProgress(35);
  };
  const handaleAdmissionDetails = () => {
    setActiveStep(2);
    setProgress(65);
  };
  const handleConfirm = () => {
    setProgress(100);
  };

  const stepComponents = [
    <PersonalInformation
      errors={errors}
      Controller={Controller}
      register={register}
      useFormContext={useFormContext}
      genderData={genderData}
      roleData={roleData}
      meritialStatusData={meritialStatusData}
      religionData={religionData}
      bloodGroupData={bloodGroupData}
      designationData={designationData}
      departmentData={departmentData}
      shiftData={shiftData}
      methods={methods}
      handleNext={handleNext}
      pickImage={pickImage}
      setPickImage={setPickImage}
      editingRowData={editingRowData}
    />,
    <StaffEducation
      errors={errors}
      Controller={Controller}
      useFormContext={useFormContext}
      boardData={boardData}
      formEntriesEdu={formEntriesEdu}
      setFormEntriesEdu={setFormEntriesEdu}
      educationID={educationID}
    />,
    <Payroll
      errors={errors}
      Controller={Controller}
      useFormContext={useFormContext}
      contractTypeData={contractTypeData}
      formEntriesPay={formEntriesPay}
      setFormEntriesPay={setFormEntriesPay}
      payrollID={payrollID}
    />,
    <BankInfo
      errors={errors}
      Controller={Controller}
      useFormContext={useFormContext}
      bankData={bankData}
      formEntriesBank={formEntriesBank}
      setFormEntriesBank={setFormEntriesBank}
      bankID={bankID}
    />,
    <SocialMedia
      errors={errors}
      Controller={Controller}
      useFormContext={useFormContext}
      formEntriesSocial={formEntriesSocial}
      setFormEntriesSocial={setFormEntriesSocial}
      bankID={bankID}
    />,
    <CompleteRegistration
      checkoutData={checkoutData}
      handalePersonalDetails={handalePersonalDetails}
      handaleGardianDetails={handaleGardianDetails}
      handaleAdmissionDetails={handaleAdmissionDetails}
    />,
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box>
        <Typography sx={{ p: "20px 0px", fontWeight: "bold", ml: "30px" }}>
          Staff Modification
        </Typography>
        <Stepper sx={stepStyle} activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box sx={{ padding: "0px 10px" }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                content: '""',
                position: "absolute",
                backgroundColor: "#D9D9D9",
                width: "100%",
                height: "4px",
                borderRadius: "10px",
              }}
            ></Box>
            <Box
              sx={{
                content: '""',
                position: "absolute",
                width: `${progress}%`,
                height: "4px",
                borderRadius: "10px",
                animation: `${customKeyframes} 3s ease-in 0s forwards`,
                animationPlayState: progress === 0 ? "paused" : "running",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#958BF3",
                  borderRadius: "10px",
                  animationPlayState: progress === 0 ? "paused" : "running",
                },
              }}
            ></Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                backgroundColor: palette.customColors.boxBg,
                borderRadius: "5px",
                padding: "30px 30px",
              }}
            >
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {/* <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                  >
                    {stepComponents.map((stepContent, index) => (
                      <div key={index}>{stepContent}</div>
                    ))}
                  </SwipeableViews> */}

                  <Box>{stepComponents[activeStep]}</Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            disabled={activeStep === 0}
                            onClick={() => {
                              // handlePrevClick();
                              handleBack();
                            }}
                          >
                            <ArrowCircleLeftIcon
                              sx={{ color: "#8F8F8F", fontSize: "50px" }}
                            />
                          </Button>
                          <Typography sx={{ fontWeight: "700" }}>
                            GO Back
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Box>
                          {activeStep === steps.length - 1 ? (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "right",
                                alignItems: "center",
                              }}
                            >
                              <Typography sx={{ fontWeight: "700" }}>
                                Registration Confirmation
                              </Typography>{" "}
                              <Button onClick={handleConfirm}>
                                <ArrowCircleRightIcon
                                  onClick={handleOpen}
                                  sx={{ color: "#877DF2", fontSize: "50px" }}
                                />
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <AdmissionModal
                                    handleButtonClick={handleButtonClick}
                                  />
                                </Box>
                              </Modal>
                              <Backdrop
                                className={blurBackdrop}
                                open={open}
                                onClick={handleClose}
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "right",
                                alignItems: "center",
                              }}
                              type="submit"
                            >
                              <Typography sx={{ fontWeight: "700" }}>
                                Save & Continue
                              </Typography>
                              <Button type="submit">
                                <ArrowCircleRightIcon
                                  // onClick={() => {
                                  //   handleNextClick();
                                  // }}
                                  sx={{ color: "#877DF2", fontSize: "50px" }}
                                />
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    <></>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default Steper;
