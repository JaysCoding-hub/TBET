const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'bet',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getHabitsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsForUser');
}
getHabitsForUserRef.operationName = 'GetHabitsForUser';
exports.getHabitsForUserRef = getHabitsForUserRef;

exports.getHabitsForUser = function getHabitsForUser(dc) {
  return executeQuery(getHabitsForUserRef(dc));
};

const createLogEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLogEntry', inputVars);
}
createLogEntryRef.operationName = 'CreateLogEntry';
exports.createLogEntryRef = createLogEntryRef;

exports.createLogEntry = function createLogEntry(dcOrVars, vars) {
  return executeMutation(createLogEntryRef(dcOrVars, vars));
};

const updateHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}
updateHabitRef.operationName = 'UpdateHabit';
exports.updateHabitRef = updateHabitRef;

exports.updateHabit = function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
};
