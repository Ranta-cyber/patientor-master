import React from "react";
import { useStateValue } from './../state/state'
import { Grid, Button, Modal } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {  BaseEntry, 
  HealthCheckRating, 
  EntryType , 
  HospitalEntry,
Discharge} from "../types";

import { DiagnosisSelection, NumberField, TextField } from './FormField';

import { SelectFieldCheck, CheckOption } from './FormEntryField';

//HUOM
//export type EntryFormValues = Omit<BaseEntry, "id">;

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  error?: string;
}

const checkOptions: CheckOption[] = [
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"}
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: EntryType.Hospital,
      specialist: "",
      diagnosisCodes: [""],
      description: "",
      date: "",
      discharge:{date:"", criteria:""}
       
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.specialist) {
        errors.name = requiredError;
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
           <Field
              label="specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
          <SelectFieldCheck
              label="Entry type"
              name="entryType"
              options={checkOptions}
            />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />    

            <Grid>    
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;