import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CommonButton from "../Common/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployeeAction,
  manipulateEcployeeListAction,
} from "../../Actions/actions";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#02BF94",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "20px",
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
const alfaNumericRegex = /^[a-zA-Z0-9]{1,100}$/;

export default function AddEmployee(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.storeData);
  const [inputObj, setinputObj] = useState({
    employeeName: "",
    role: "",
    location: "",
    active: "True",
  });
  const [errorObject, seterrorObject] = useState({
    employeeName: {
      isError: false,
      errorValue: "",
    },
    role: {
      isError: false,
      errorValue: "",
    },
    location: {
      isError: false,
      errorValue: "",
    },
  });

  useEffect(() => {
    if (props.isUpdate) {
      setinputObj({ ...inputObj, ...props.data });
    }
  }, []);
  console.log(inputObj, errorObject);
  const handleInputChange = (e, fieldName) => {
    setinputObj({ ...inputObj, [fieldName]: e.target.value });
  };
  const handleCancel = () => {
    if (props.isUpdate) {
      props.handleCancel();
    } else {
      props.history.push("/");
    }
  };
  const validateFields = () => {
    let errors = {};
    console.log(
      alfaNumericRegex.test(inputObj.employeeName),
      inputObj.employeeName
    );
    if (
      !alfaNumericRegex.test(inputObj.employeeName) ||
      inputObj.employeeName === ""
    ) {
      errors = {
        ...errors,
        ["employeeName"]: {
          isError: true,
          errorValue: "This field is required and must be Alphanumeric",
        },
      };
    } else {
      errors = {
        ...errors,
        ["employeeName"]: {
          isError: false,
          errorValue: "",
        },
      };
    }
    if (inputObj.location === "") {
      errors = {
        ...errors,
        ["location"]: {
          isError: true,
          errorValue: "Role is required",
        },
      };
    } else {
      errors = {
        ...errors,
        ["location"]: {
          isError: false,
          errorValue: "",
        },
      };
    }
    for (let v in state.listOfemployees) {
      if (
        state.listOfemployees[v].employeeName.toLowerCase() ===
          inputObj.employeeName.toLowerCase() &&
        state.listOfemployees[v].role.toLowerCase() ===
          inputObj.role.toLowerCase() &&
        state.listOfemployees[v].id !== inputObj.id
      ) {
        errors = {
          ...errors,
          ["role"]: {
            isError: true,
            errorValue:
              "Employee name with this role already exist. Please change the Employee name/ Role",
          },
        };
      } else {
        if (inputObj.role === "") {
          errors = {
            ...errors,
            ["role"]: {
              isError: true,
              errorValue: "Role is required",
            },
          };
        } else {
          errors = {
            ...errors,
            ["role"]: {
              isError: false,
              errorValue: "",
            },
          };
        }
      }
    }

    seterrorObject({ ...errorObject, ...errors });
    return errors;
  };
  const handleSave = async () => {
    let myPromis = new Promise(async (resolve, reject) => {
      let result = await validateFields();
      await resolve(result);
    });
    myPromis.then((value) => {
      if (
        !value.employeeName.isError &&
        !value.role.isError &&
        !value.location.isError
      ) {
        console.log(props.isUpdate);
        if (props.isUpdate) {
          handleUpdateEmployee();
        } else {
          handleSaveEmployee();
        }
      }
    });
  };
  const handleSaveEmployee = async () => {
    await dispatch(
      addEmployeeAction({ ...inputObj, id: state.listOfemployees.length })
    );
    await props.history.push("/");
  };
  const handleUpdateEmployee = () => {
    let list = state.listOfemployees;
    let objIndex = list.findIndex((obj) => obj.id == props.data.id);
    list[objIndex] = { ...inputObj };
    dispatch(manipulateEcployeeListAction(list));
    props.handleCancel();
  };
  return (
    <div className="main-Content">
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Employee List
            </Link>
            
            <Typography color="textPrimary">{props.isUpdate ? "Update Employee" : "Add Employee" }</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            error={errorObject.employeeName.isError}
            value={inputObj.employeeName}
            fullWidth
            id="employeeName"
            label="Name"
            helperText={errorObject.employeeName.errorValue}
            variant="outlined"
            onChange={(e) => handleInputChange(e, "employeeName")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            value={inputObj.role}
            error={errorObject.role.isError}
            fullWidth
            id="role"
            label="Role"
            helperText={errorObject.role.errorValue}
            variant="outlined"
            onChange={(e) => handleInputChange(e, "role")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            value={inputObj.location}
            error={errorObject.location.isError}
            fullWidth
            id="location"
            label="Location"
            helperText={errorObject.location.errorValue}
            variant="outlined"
            onChange={(e) => handleInputChange(e, "location")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} style={{ display: "flex" }}>
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Active</FormLabel>
            <RadioGroup
              value={inputObj.active}
              aria-label="Active"
              name="customized-radios"
              className={classes.radioGroup}
              onChange={(e) => {
                handleInputChange(e, "active");
              }}
            >
              <FormControlLabel
                value="True"
                control={<StyledRadio />}
                label="True"
              />
              <FormControlLabel
                value="False"
                control={<StyledRadio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="flex-end">
        <CommonButton handleAddButtonClick={handleCancel}>Cancel</CommonButton>
        <CommonButton handleAddButtonClick={handleSave}>Save</CommonButton>
      </Grid>
    </div>
  );
}
