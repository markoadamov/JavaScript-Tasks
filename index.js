const fs = require("fs");

// Helper function to format the current date and time
function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("en-US");
  const time = now.toLocaleTimeString("en-US");
  return `[${date} ${time}]`;
}

// Logger function to log actions to a file
logAction = (action) => {
  const logLine = getCurrentDateTime() + " " + action;
  fs.appendFileSync("log.txt", logLine + "\n");
};


class Doctor {
  constructor(firstName, lastName, specialty) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialty = specialty;
    logAction(`Created doctor "${this.firstName} ${this.lastName}".`);
  }

  scheduleLabTest(patient, labTestType, date, time) {
    const labTest = new LabTest(labTestType, date, time);
    patient.scheduleLabTest(this, labTest);
  }
}


class Patient {
  constructor(firstName, lastName, idNumber, healthCardNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.healthCardNumber = healthCardNumber;
    this.selectedDoctor = null;
    this.labTests = [];

    logAction(`Created patient "${this.firstName} ${this.lastName}".`);
  }

  chooseDoctor(doctor) {
    this.selectedDoctor = doctor;
    logAction(
      `Patient "${this.firstName} ${this.lastName}" chose doctor "${doctor.firstName} ${doctor.lastName}".`
    );
  }

  scheduleLabTest(doctor, labTest) {
    this.labTests.push(labTest);

    logAction(
      `Doctor "${doctor.firstName} ${doctor.lastName}" scheduled a ${this.labTests[this.labTests.length-1].type} lab test for patient "${this.firstName} ${this.lastName}" on ${this.labTests[this.labTests.length-1].date} at ${this.labTests[this.labTests.length-1].time}.`
    );
  }

  receiveLabTestResult(labTest) {
    logAction(
      `Patient "${this.firstName} ${this.lastName}" received lab test result for ${labTest.type}: ${labTest.result}.`
    );
  }
}


class LabTest {
  constructor(type, date, time) {
    this.type = type;
    this.result = null;
    this.date = date;
    this.time = time;
  }

  perform() {

    switch (this.type) {
      case "Blood Sugar Level": {
        const value = Math.floor(Math.random() * 100);
        const timeOfLastMeal = Math.floor(Math.random() * 24);
        this.result = `level : ${value}, time of last meal: ${timeOfLastMeal}`;

        logAction(
          `Performed Blood Sugar Level lab test with result, ${this.result}.`
        );
        break;
      }
      case "Blood Pressure": {
        const upperValue = Math.floor(Math.random() * 100);
        const lowerValue = Math.floor(Math.random() * 100);
        const puls = Math.floor(Math.random() * 100);
        this.result = `upper value : ${upperValue}, lower value: ${lowerValue}, puls: ${puls}`;
        logAction(`Performed Blood Pressure lab test with result, ${this.result}.`);
        break;
      }
      case "Cholesterol": {
        const value = Math.floor(Math.random() * 100);
        const timeOfLastMeal = Math.floor(Math.random() * 24);
        this.result = `level : ${value}, time of last meal: ${timeOfLastMeal}`;
        logAction(`Performed Cholesterol lab test with result ${this.result}.`);
        break;
      }
    }
  }
}


const doctorMilan = new Doctor("Milan", "Milanovic", "General Doctor");

const patientDragan = new Patient("Dragan", "Petrovic", "123456789", "ABC123");

patientDragan.chooseDoctor(doctorMilan);

// Doctor Milan schedules a blood sugar level lab test for patient Dragan
doctorMilan.scheduleLabTest(
  patientDragan,
  "Blood Sugar Level",
  "1.1.2024",
  "18h"
);

// Doctor Milan schedules a blood pressure lab test for patient Dragan
doctorMilan.scheduleLabTest(patientDragan, "Blood Pressure", "2.2.2024", "19h");

// Performing all tests for patientDragan
patientDragan.labTests.forEach(labTest => labTest.perform());

// Receiving all tests for patientDragan
patientDragan.labTests.forEach(labTest => patientDragan.receiveLabTestResult(labTest));
