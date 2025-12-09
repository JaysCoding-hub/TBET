import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'bet',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const getHabitsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHabitsForUser');
}
getHabitsForUserRef.operationName = 'GetHabitsForUser';

export function getHabitsForUser(dc) {
  return executeQuery(getHabitsForUserRef(dc));
}

export const createLogEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLogEntry', inputVars);
}
createLogEntryRef.operationName = 'CreateLogEntry';

export function createLogEntry(dcOrVars, vars) {
  return executeMutation(createLogEntryRef(dcOrVars, vars));
}

export const updateHabitRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHabit', inputVars);
}
updateHabitRef.operationName = 'UpdateHabit';

export function updateHabit(dcOrVars, vars) {
  return executeMutation(updateHabitRef(dcOrVars, vars));
}

