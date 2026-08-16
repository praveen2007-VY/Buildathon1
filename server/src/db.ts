import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  User,
  Course,
  TeacherClass,
  StudentAssignment,
  TeacherSubmission,
  SubjectAttendance,
  TeacherAttendanceRecord,
  StudentExam,
  StudentGradeRecord,
  TeacherGradeEntry,
  ScheduleItem,
  AIRecommendation,
  WeakTopic,
  SystemMonitoringLog,
  SystemHealthItem,
  AtRiskStudent,
  AdminTeacher
} from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  users: User[];
  courses: Course[];
  classes: TeacherClass[];
  assignments: StudentAssignment[];
  submissions: TeacherSubmission[];
  attendance: SubjectAttendance[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  exams: StudentExam[];
  grades: StudentGradeRecord[];
  teacherGrades: TeacherGradeEntry[];
  schedules: ScheduleItem[];
  aiRecommendations: AIRecommendation[];
  weakTopics: WeakTopic[];
  systemLogs: SystemMonitoringLog[];
  systemHealth: SystemHealthItem[];
  students: AtRiskStudent[];
  teachers: AdminTeacher[];
}

// Initial Seed Data - Starts completely empty
const getInitialSeedData = (): DatabaseSchema => {
  return {
    users: [],
    courses: [],
    classes: [],
    assignments: [],
    submissions: [],
    attendance: [],
    teacherAttendanceRecords: [],
    exams: [],
    grades: [],
    teacherGrades: [],
    schedules: [],
    aiRecommendations: [],
    weakTopics: [],
    systemLogs: [],
    systemHealth: [],
    students: [],
    teachers: []
  };
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing with fresh seed data.', e);
    }

    const initial = getInitialSeedData();
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save database file:', e);
    }
  }

  public get<K extends keyof DatabaseSchema>(collection: K): DatabaseSchema[K] {
    return this.data[collection];
  }

  public set<K extends keyof DatabaseSchema>(collection: K, value: DatabaseSchema[K]): void {
    this.data[collection] = value;
    this.saveData(this.data);
  }

  public update<K extends keyof DatabaseSchema, T extends { id?: string }>(
    collection: K,
    id: string,
    updater: (item: T) => T
  ): T | null {
    const list = this.data[collection] as unknown as T[];
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    list[index] = updater(list[index]);
    this.saveData(this.data);
    return list[index];
  }

  public insert<K extends keyof DatabaseSchema, T>(collection: K, item: T): T {
    const list = this.data[collection] as unknown as T[];
    list.push(item);
    this.saveData(this.data);
    return item;
  }

  public delete<K extends keyof DatabaseSchema, T extends { id?: string }>(
    collection: K,
    id: string
  ): boolean {
    const list = this.data[collection] as unknown as T[];
    const initialLen = list.length;
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length !== initialLen) {
      (this.data[collection] as unknown as T[]) = filtered;
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public getAll(): DatabaseSchema {
    return this.data;
  }

  public reset(): void {
    this.data = getInitialSeedData();
    this.saveData(this.data);
  }
}

export const db = new Database();
