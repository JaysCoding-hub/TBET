import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateLogEntryData {
  logEntry_insert: LogEntry_Key;
}

export interface CreateLogEntryVariables {
  habitId: UUIDString;
  isRelapse: boolean;
  logDate: DateString;
  notes?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

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

export interface Habit_Key {
  id: UUIDString;
  __typename?: 'Habit_Key';
}

export interface LogEntry_Key {
  id: UUIDString;
  __typename?: 'LogEntry_Key';
}

export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}

export interface UpdateHabitVariables {
  habitId: UUIDString;
  name?: string | null;
  description?: string | null;
  targetAbstinenceDays?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetHabitsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetHabitsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetHabitsForUserData, undefined>;
  operationName: string;
}
export const getHabitsForUserRef: GetHabitsForUserRef;

export function getHabitsForUser(): QueryPromise<GetHabitsForUserData, undefined>;
export function getHabitsForUser(dc: DataConnect): QueryPromise<GetHabitsForUserData, undefined>;

interface CreateLogEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLogEntryVariables): MutationRef<CreateLogEntryData, CreateLogEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLogEntryVariables): MutationRef<CreateLogEntryData, CreateLogEntryVariables>;
  operationName: string;
}
export const createLogEntryRef: CreateLogEntryRef;

export function createLogEntry(vars: CreateLogEntryVariables): MutationPromise<CreateLogEntryData, CreateLogEntryVariables>;
export function createLogEntry(dc: DataConnect, vars: CreateLogEntryVariables): MutationPromise<CreateLogEntryData, CreateLogEntryVariables>;

interface UpdateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  operationName: string;
}
export const updateHabitRef: UpdateHabitRef;

export function updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;
export function updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

