import React, { ReactFragment, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";


const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();



  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = patients[id];

  console.log('patient on:', patient);

  return (
    <div>
      <h3>Patient </h3>

      <h1>{patient.name} 
      {patient.gender === 'male' ? <Icon name='mars'/> : <Icon name='venus'/>}
      
      </h1> 
      
      <p> SSN: {patient.ssn} </p>
      <p> Birth date: {patient.dateOfBirth} </p>
      <p> Occupation: {patient.occupation} </p>
    </div>

  );
};
export default PatientPage;