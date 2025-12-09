# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetHabitsForUser*](#gethabitsforuser)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateLogEntry*](#createlogentry)
  - [*UpdateHabit*](#updatehabit)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetHabitsForUser
You can execute the `GetHabitsForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHabitsForUser(): QueryPromise<GetHabitsForUserData, undefined>;

interface GetHabitsForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetHabitsForUserData, undefined>;
}
export const getHabitsForUserRef: GetHabitsForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHabitsForUser(dc: DataConnect): QueryPromise<GetHabitsForUserData, undefined>;

interface GetHabitsForUserRef {
  ...
  (dc: DataConnect): QueryRef<GetHabitsForUserData, undefined>;
}
export const getHabitsForUserRef: GetHabitsForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHabitsForUserRef:
```typescript
const name = getHabitsForUserRef.operationName;
console.log(name);
```

### Variables
The `GetHabitsForUser` query has no variables.
### Return Type
Recall that executing the `GetHabitsForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHabitsForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHabitsForUserData {
  habits: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    targetAbstinenceDays: number;
    completedAt?: DateString | null;
    createdAt: TimestampString;
  } & Habit_Key)[];
}
```
### Using `GetHabitsForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHabitsForUser } from '@dataconnect/generated';


// Call the `getHabitsForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHabitsForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHabitsForUser(dataConnect);

console.log(data.habits);

// Or, you can use the `Promise` API.
getHabitsForUser().then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

### Using `GetHabitsForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHabitsForUserRef } from '@dataconnect/generated';


// Call the `getHabitsForUserRef()` function to get a reference to the query.
const ref = getHabitsForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHabitsForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.habits);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateLogEntry
You can execute the `CreateLogEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLogEntry(vars: CreateLogEntryVariables): MutationPromise<CreateLogEntryData, CreateLogEntryVariables>;

interface CreateLogEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLogEntryVariables): MutationRef<CreateLogEntryData, CreateLogEntryVariables>;
}
export const createLogEntryRef: CreateLogEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLogEntry(dc: DataConnect, vars: CreateLogEntryVariables): MutationPromise<CreateLogEntryData, CreateLogEntryVariables>;

interface CreateLogEntryRef {
  ...
  (dc: DataConnect, vars: CreateLogEntryVariables): MutationRef<CreateLogEntryData, CreateLogEntryVariables>;
}
export const createLogEntryRef: CreateLogEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLogEntryRef:
```typescript
const name = createLogEntryRef.operationName;
console.log(name);
```

### Variables
The `CreateLogEntry` mutation requires an argument of type `CreateLogEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLogEntryVariables {
  habitId: UUIDString;
  isRelapse: boolean;
  logDate: DateString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateLogEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLogEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLogEntryData {
  logEntry_insert: LogEntry_Key;
}
```
### Using `CreateLogEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLogEntry, CreateLogEntryVariables } from '@dataconnect/generated';

// The `CreateLogEntry` mutation requires an argument of type `CreateLogEntryVariables`:
const createLogEntryVars: CreateLogEntryVariables = {
  habitId: ..., 
  isRelapse: ..., 
  logDate: ..., 
  notes: ..., // optional
};

// Call the `createLogEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLogEntry(createLogEntryVars);
// Variables can be defined inline as well.
const { data } = await createLogEntry({ habitId: ..., isRelapse: ..., logDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLogEntry(dataConnect, createLogEntryVars);

console.log(data.logEntry_insert);

// Or, you can use the `Promise` API.
createLogEntry(createLogEntryVars).then((response) => {
  const data = response.data;
  console.log(data.logEntry_insert);
});
```

### Using `CreateLogEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLogEntryRef, CreateLogEntryVariables } from '@dataconnect/generated';

// The `CreateLogEntry` mutation requires an argument of type `CreateLogEntryVariables`:
const createLogEntryVars: CreateLogEntryVariables = {
  habitId: ..., 
  isRelapse: ..., 
  logDate: ..., 
  notes: ..., // optional
};

// Call the `createLogEntryRef()` function to get a reference to the mutation.
const ref = createLogEntryRef(createLogEntryVars);
// Variables can be defined inline as well.
const ref = createLogEntryRef({ habitId: ..., isRelapse: ..., logDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLogEntryRef(dataConnect, createLogEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.logEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.logEntry_insert);
});
```

## UpdateHabit
You can execute the `UpdateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHabitRef:
```typescript
const name = updateHabitRef.operationName;
console.log(name);
```

### Variables
The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateHabitVariables {
  habitId: UUIDString;
  name?: string | null;
  description?: string | null;
  targetAbstinenceDays?: number | null;
}
```
### Return Type
Recall that executing the `UpdateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHabitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}
```
### Using `UpdateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHabit, UpdateHabitVariables } from '@dataconnect/generated';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  habitId: ..., 
  name: ..., // optional
  description: ..., // optional
  targetAbstinenceDays: ..., // optional
};

// Call the `updateHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHabit(updateHabitVars);
// Variables can be defined inline as well.
const { data } = await updateHabit({ habitId: ..., name: ..., description: ..., targetAbstinenceDays: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHabit(dataConnect, updateHabitVars);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
updateHabit(updateHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

### Using `UpdateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHabitRef, UpdateHabitVariables } from '@dataconnect/generated';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  habitId: ..., 
  name: ..., // optional
  description: ..., // optional
  targetAbstinenceDays: ..., // optional
};

// Call the `updateHabitRef()` function to get a reference to the mutation.
const ref = updateHabitRef(updateHabitVars);
// Variables can be defined inline as well.
const ref = updateHabitRef({ habitId: ..., name: ..., description: ..., targetAbstinenceDays: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHabitRef(dataConnect, updateHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

