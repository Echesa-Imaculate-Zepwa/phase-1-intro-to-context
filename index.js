// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeOutEvents: [],
		timeInEvents: [],
	};
}

function createEmployeeRecords(employeeRecordRows) {
	return employeeRecordRows.map((row) => createEmployeeRecord(row));
}

function createTimeInEvent(employeeRecord, dateStamp) {
	const [date, time] = dateStamp.split(" ");

	employeeRecord.timeInEvents.push({
		type: "TimeIn",
		date,
		hour: parseInt(time),
	});
	return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
	const [date, time] = dateStamp.split(" ");

	employeeRecord.timeOutEvents.push({
		type: "TimeOut",
		date,
		hour: parseInt(time),
	});
	return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, soughtDate) {
	const timeIn = employeeRecord.timeInEvents.find(
		(time) => time.date === soughtDate
	);
	const timeOut = employeeRecord.timeOutEvents.find(
		(time) => time.date === soughtDate
	);


	return parseInt((timeOut.hour - timeIn.hour) / 100);
}

function wagesEarnedOnDate(employeeRecord, soughtDate) {
	return (
		hoursWorkedOnDate(employeeRecord, soughtDate) *
		parseFloat(employeeRecord.payPerHour)
	);
}

function allWagesFor(employeeRecord) {
	return employeeRecord.timeInEvents.reduce((accumulator, event) => {
		return accumulator + wagesEarnedOnDate(employeeRecord, event.date);
	}, 0);
}
z

function calculatePayroll(arrayOfEmployeeRecords) {
	return arrayOfEmployeeRecords.reduce((accumulator, currentValue) => {
		return accumulator + allWagesFor(currentValue);
	}, 0);
}
