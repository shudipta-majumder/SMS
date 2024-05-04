"use client";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import "dayjs/locale/en-gb";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FeesEntryFields = ({
  feesTypeData,
  feesEntryData,
  feesEntryId,
  accessToken,
}) => {
  const [feesDetailsId, setFeesDetailsId] = React.useState();

  const feesEntryFieldSchema = {
    fees_type: yup.string().required("Select The Fees Field"),
    due_date: yup.date().required("Select The Due Date Field"),
    amount: yup.string().required("Please Write Your Amount"),
  };
  const feesEntrySchema = yup.object({
    feesEntry: yup.array().of(yup.object().shape(feesEntryFieldSchema)),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      feesEntry: feesEntryData
        ? feesEntryData.data.fees_detail.map((feesDetails) => ({
            fees_type: feesDetails ? feesDetails?.fees_type?.id : "",
            due_date: feesDetails ? dayjs(feesDetails?.due_date) : "",
            amount: feesDetails ? feesDetails?.amount : "",
            percentage: feesDetails ? feesDetails?.percentage : "",
            fix_amt: feesDetails ? feesDetails?.fix_amt : "",
          }))
        : [
            {
              fees_type: "",
              due_date: null,
              amount: "",
              percentage: "",
              fix_amt: "",
            },
          ],
    },
    resolver: yupResolver(feesEntrySchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "feesEntry",
  });

  const onSubmit = async (data) => {
    console.log("data", data);

    let dataToEdit = {
      fees_detail: data?.feesEntry?.map((fee) => ({
        fees_type: fee.fees_type,
        amount: fee.amount,
        percentage: fee.percentage,
        fix_amt: fee.fix_amt,
        due_date: dayjs(fee?.due_date).format("YYYY-MM-DD"),
      })),
    };

    let response;
    let responseData;
    let x;

    x = {
      fees_detail: dataToEdit.fees_detail,
    };

    if (feesDetailsId) {
      x.fees_detail = x.fees_detail.map((fees, index) => ({
        ...fees,
        id: feesDetailsId[index],
      }));
    }

    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-entry/detail/${feesEntryId}`,
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
      // setReRenderFeesDetailsPage(!reRenderFeesDetailsPage);
      setFeesDetailsId(
        feesEntryData?.data?.fees_detail?.map(
          (feesDetails) => feesDetails.fees_type.id
        )
      );
      if (responseData.code == 400) {
        toast.error(`${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Network response was not ok");
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
        });
        throw new Error("Network response was not ok");
      }
      if (responseData.code == 200) {
        toast.success(`Fees collected Successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <Box>
                <Grid
                  container
                  spacing={2}
                  key={item.id}
                  sx={{ bgcolor: "white", padding: "10px" }}
                >
                  {/* Fees Type */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4} xl={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Fees Type</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        name={`feesEntry.${index}.fees_type`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            select
                            label="Select Fees Type"
                            sx={{ textAlign: "left" }}
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          >
                            {feesTypeData?.data?.map((feesType) => (
                              <MenuItem key={feesType?.id} value={feesType?.id}>
                                {feesType?.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* Due Date */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4} xl={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Due Date</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                      >
                        <Controller
                          name={`feesEntry.${index}.due_date`}
                          control={control}
                          // defaultValue={null}
                          render={({ field }) => (
                            <DatePicker
                              adapterLocale="en-gb"
                              {...field}
                              sx={{ backgroundColor: "#F8F7FA" }}
                              fullWidth
                              slotProps={{ textField: { size: "small" } }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4} xl={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Amount</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        name={`feesEntry.${index}.amount`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            label="Amount"
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          ></TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* Fine */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4} xl={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>Fine %</Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        name={`feesEntry.${index}.percentage`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            label="Fine"
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          ></TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  {/* Fix Amount */}
                  <Grid item xs={12} sm={12} md={6} lg={2.4} xl={2.4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        <Typography sx={{ ml: "15px" }}>
                          Fixed Amount
                        </Typography>
                        <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                          *
                        </Typography>
                      </Box>
                      <Controller
                        // name="nid"
                        name={`feesEntry.${index}.fix_amt`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={!!error}
                            label="Fixed Amount"
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="Type Here"
                          ></TextField>
                        )}
                      />
                    </Box>
                  </Grid>
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Button
                      //   className={classes.button}
                      type="button"
                      variant="contained"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              </Box>
            );
          })}

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              //   className={classes.button}
              variant="contained"
              type="button"
              onClick={() => {
                append({
                  fees_type: "",
                  due_date: null,
                  amount: "",
                  percentage: "",
                  fix_amt: "",
                });
              }}
            >
              Add More +
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default FeesEntryFields;
