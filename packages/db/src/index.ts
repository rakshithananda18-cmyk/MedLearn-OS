export { createDbClient, type DbClient, type DbConfig } from './client';
export type { Database } from './database.types';
export { checkDatabase } from './health';
export { createProgressRepository, type ProgressRepository, type SaveResult } from './progress';
export { createReportsRepository, type ReportsRepository } from './reports';
export { createSubjectsRepository, type SubjectsRepository, toSubject } from './subjects';
